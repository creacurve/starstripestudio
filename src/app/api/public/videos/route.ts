import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("generations")
      .select("output_url, prompt, created_at")
      .eq("type", "video")
      .not("output_url", "is", null)
      .order("created_at", { ascending: false })
      .limit(6);
    return NextResponse.json({ videos: data ?? [] });
  } catch {
    return NextResponse.json({ videos: [] });
  }
}
