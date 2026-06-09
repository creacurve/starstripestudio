import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Replicate from "replicate";

const IMAGE_COST = 1;

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { prompt, style, ratio } = await req.json();
  if (!prompt?.trim()) return NextResponse.json({ error: "Prompt required" }, { status: 400 });

  // Check credits
  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();

  if (!profile || profile.credits < IMAGE_COST) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  // Deduct credits
  await supabase
    .from("profiles")
    .update({ credits: profile.credits - IMAGE_COST })
    .eq("id", user.id);

  // Generate via Replicate
  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
  const fullPrompt = style !== "Photorealistic" ? `${prompt}, ${style} style` : prompt;

  const widthMap: Record<string, [number, number]> = {
    "1:1": [1024, 1024],
    "16:9": [1344, 768],
    "9:16": [768, 1344],
    "4:3": [1152, 896],
  };
  const [width, height] = widthMap[ratio] ?? [1024, 1024];

  const output = await replicate.run(
    "black-forest-labs/flux-schnell",
    { input: { prompt: fullPrompt, width, height, num_outputs: 1 } }
  ) as string[];

  const url = Array.isArray(output) ? output[0] : output;

  // Save generation
  await supabase.from("generations").insert({
    user_id: user.id,
    type: "image",
    prompt,
    output_url: url,
    credits_used: IMAGE_COST,
  });

  return NextResponse.json({ url });
}
