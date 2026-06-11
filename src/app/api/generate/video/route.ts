import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Replicate from "replicate";

export const maxDuration = 300;

const COST_MAP: Record<string, number> = { "3": 5, "5": 10, "10": 15, "3s": 5, "5s": 10, "10s": 15 };

const MODEL_MAP: Record<string, string> = {
  "veo3":    "google/veo-3",
  "kling":   "klingai/kling-video-1.6-pro",
  "runway":  "runway-ml/gen-4-turbo",
  "minimax": "minimax/video-01",
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized — please log in" }, { status: 401 });

    const body = await req.json();
    const { prompt, duration = "5", model = "minimax" } = body;

    if (!prompt?.trim()) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    const durationKey = String(duration).replace("s", "");
    const cost = COST_MAP[durationKey] ?? 10;

    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (!profile || profile.credits < cost) {
      return NextResponse.json({ error: "Not enough credits — buy more to continue" }, { status: 402 });
    }

    await supabase
      .from("profiles")
      .update({ credits: profile.credits - cost })
      .eq("id", user.id);

    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
    const replicateModel = MODEL_MAP[model] ?? MODEL_MAP["minimax"];
    const durationSeconds = parseInt(durationKey);

    // Veo 3 only accepts 4, 6, or 8 — map to nearest valid value
    const veoDuration = durationSeconds <= 4 ? 4 : durationSeconds <= 6 ? 6 : 8;
    const inputDuration = model === "veo3" ? veoDuration : durationSeconds;

    const output = await replicate.run(
      replicateModel as `${string}/${string}`,
      { input: { prompt, duration: inputDuration } }
    );

    console.log("Replicate video output:", JSON.stringify(output));

    let url: string | null = null;
    if (typeof output === "string") {
      url = output;
    } else if (Array.isArray(output)) {
      const first = output[0];
      url = typeof first === "string" ? first : (first as { url?: () => string })?.url?.() ?? String(first);
    } else if (output && typeof output === "object") {
      const o = output as Record<string, unknown>;
      url = (o.url as string) ?? (o.video as string) ?? (o.output as string) ?? null;
    }

    if (!url) {
      return NextResponse.json({ error: `Generation failed — unexpected output: ${JSON.stringify(output)}` }, { status: 500 });
    }

    await supabase.from("generations").insert({
      user_id: user.id,
      type: "video",
      prompt,
      output_url: String(url),
      credits_used: cost,
    });

    return NextResponse.json({ url: String(url) });

  } catch (err: unknown) {
    console.error("Video generation error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
