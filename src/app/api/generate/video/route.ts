import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Replicate from "replicate";

const COST_MAP: Record<string, number> = { "3s": 5, "5s": 10, "10s": 15 };

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { prompt, duration, model } = await req.json();
  if (!prompt?.trim()) return NextResponse.json({ error: "Prompt required" }, { status: 400 });

  const cost = COST_MAP[duration] ?? 10;

  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();

  if (!profile || profile.credits < cost) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  await supabase
    .from("profiles")
    .update({ credits: profile.credits - cost })
    .eq("id", user.id);

  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

  const durationSeconds = parseInt(duration);
  let output: unknown;

  if (model === "runway") {
    output = await replicate.run(
      "minimax/video-01",
      { input: { prompt, duration: durationSeconds } }
    );
  } else {
    output = await replicate.run(
      "klingai/kling-video",
      { input: { prompt, duration: durationSeconds } }
    );
  }

  const url = typeof output === "string" ? output : (output as string[])[0];

  await supabase.from("generations").insert({
    user_id: user.id,
    type: "video",
    prompt,
    output_url: url,
    credits_used: cost,
  });

  return NextResponse.json({ url });
}
