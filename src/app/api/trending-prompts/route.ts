import { NextResponse } from "next/server";

const QUERIES = ["cinematic portrait", "fantasy landscape", "cyberpunk city", "nature macro", "abstract art"];

export const revalidate = 3600; // cache 1 hour

export async function GET() {
  try {
    const query = QUERIES[Math.floor(Math.random() * QUERIES.length)];
    const res = await fetch(
      `https://lexica.art/api/v1/search?q=${encodeURIComponent(query)}&n=20`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error("Lexica fetch failed");

    const data = await res.json();
    const prompts = (data.images ?? [])
      .filter((img: { prompt: string; src: string }) => img.prompt && img.src)
      .slice(0, 12)
      .map((img: { prompt: string; src: string; id: string }) => ({
        id: img.id,
        prompt: img.prompt,
        image: img.src,
        source: "lexica",
      }));

    return NextResponse.json({ prompts, query });
  } catch {
    return NextResponse.json({ prompts: [], query: "" });
  }
}
