import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Replicate from "replicate";

const IMAGE_COST = 1;

const MODEL_MAP: Record<string, string> = {
  "flux-pro":     "black-forest-labs/flux-1.1-pro",
  "flux-schnell": "black-forest-labs/flux-schnell",
  "sd35":         "stability-ai/stable-diffusion-3.5-large",
  "ideogram":     "ideogram-ai/ideogram-v2",
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized — please log in" }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, style, ratio, model = "flux-schnell" } = body;

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Check credits
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (!profile || profile.credits < IMAGE_COST) {
      return NextResponse.json({ error: "Not enough credits — buy more to continue" }, { status: 402 });
    }

    // Deduct credits
    await supabase
      .from("profiles")
      .update({ credits: profile.credits - IMAGE_COST })
      .eq("id", user.id);

    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

    const fullPrompt = style && style !== "None"
      ? `${prompt}, ${style} style`
      : prompt;

    const widthMap: Record<string, [number, number]> = {
      "1:1":  [1024, 1024],
      "16:9": [1344, 768],
      "9:16": [768, 1344],
      "4:3":  [1152, 896],
    };
    const [width, height] = widthMap[ratio] ?? [1024, 1024];

    const replicateModel = MODEL_MAP[model] ?? MODEL_MAP["flux-schnell"];

    const output = await replicate.run(replicateModel as `${string}/${string}`, {
      input: { prompt: fullPrompt, width, height, num_outputs: 1 },
    });

    const url = Array.isArray(output) ? output[0] : output;

    if (!url) {
      return NextResponse.json({ error: "Generation failed — no output returned" }, { status: 500 });
    }

    // Save to history
    await supabase.from("generations").insert({
      user_id: user.id,
      type: "image",
      prompt,
      output_url: String(url),
      credits_used: IMAGE_COST,
    });

    return NextResponse.json({ url: String(url) });

  } catch (err: unknown) {
    console.error("Image generation error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
