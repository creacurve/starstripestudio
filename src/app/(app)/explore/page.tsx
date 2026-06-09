"use client";
import { useState } from "react";
import { Search, Zap } from "lucide-react";

const FILTERS = ["All", "Images", "Videos", "Trending", "New"];

const CARDS = [
  { id: 1, photo: "photo-1534528741775-53994a69daeb", model: "FLUX 1.1 Pro", prompt: "Cinematic portrait of a woman in golden light, hyper-realistic", type: "image" },
  { id: 2, photo: "photo-1506794778202-cad84cf45f1d", model: "FLUX Schnell", prompt: "Dramatic close-up of a man with intense gaze, studio lighting", type: "image" },
  { id: 3, photo: "photo-1579783902614-a3fb3927b6a5", model: "Ideogram 2.0", prompt: "Abstract colorful painting with flowing shapes and textures", type: "image" },
  { id: 4, photo: "photo-1529626455594-4ff0802cfb7e", model: "SD 3.5", prompt: "Fashion portrait with neon pink highlights, editorial style", type: "image" },
  { id: 5, photo: "photo-1507003211169-0a1dd7228f2d", model: "FLUX 1.1 Pro", prompt: "Young man smiling in natural light, bokeh background", type: "image" },
  { id: 6, photo: "photo-1558618666-fcd25c85cd64", model: "FLUX Schnell", prompt: "Close-up of green leaves with morning dew drops, macro", type: "image" },
  { id: 7, photo: "photo-1519058082700-08a9f672bc1e", model: "Ideogram 2.0", prompt: "Man in white linen shirt, warm summer afternoon light", type: "image" },
  { id: 8, photo: "photo-1485846234645-a62644f84728", model: "FLUX 1.1 Pro", prompt: "Epic landscape with mountains and dramatic storm clouds", type: "video" },
  { id: 9, photo: "photo-1542744173-8e7e53415bb0", model: "SD 3.5", prompt: "Team brainstorming in a modern minimalist office", type: "image" },
  { id: 10, photo: "photo-1519681393784-d120267933ba", model: "FLUX Schnell", prompt: "Snowy mountain peak at night with stars, long exposure", type: "image" },
  { id: 11, photo: "photo-1611162617213-7d7a39e9b1d7", model: "FLUX 1.1 Pro", prompt: "Aesthetic flat lay with coffee, book, and plants", type: "image" },
  { id: 12, photo: "photo-1557804506-669a67965ba0", model: "Ideogram 2.0", prompt: "City skyline reflection on water at golden hour", type: "video" },
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = CARDS.filter((c) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Images" && c.type === "image") ||
      (filter === "Videos" && c.type === "video") ||
      filter === "Trending" ||
      filter === "New";
    const matchesQuery =
      !query || c.prompt.toLowerCase().includes(query.toLowerCase()) || c.model.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Explore</h1>
        <p className="text-white/40 text-sm">Discover creations from the community</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search prompts, models..."
          className="w-full bg-white/5 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-white/30 outline-none focus:border-[#1a73e8]/50 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? "bg-[#1a73e8] text-white"
                : "bg-white/5 text-white/50 hover:text-white hover:bg-white/8 border border-white/8"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry-style Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filtered.map((card) => (
          <div
            key={card.id}
            className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://images.unsplash.com/${card.photo}?w=400&q=80`}
              alt={card.prompt}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-[#1a73e8]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {card.model}
                </span>
                {card.type === "video" && (
                  <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">Video</span>
                )}
              </div>
              <p className="text-white text-xs line-clamp-2">{card.prompt}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <Zap className="w-10 h-10 text-white/20 mb-4" />
          <p className="text-white/40 text-sm">No results found</p>
        </div>
      )}
    </div>
  );
}
