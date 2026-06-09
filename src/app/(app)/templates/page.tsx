"use client";
import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Marketing", "Social Media", "Film & Video", "Art & Design", "Photography"];

const TEMPLATES = [
  {
    id: 1,
    name: "Product Hero Shot",
    category: "Marketing",
    photo: "photo-1542744173-8e7e53415bb0",
    isNew: true,
    desc: "Clean white background product photography",
  },
  {
    id: 2,
    name: "Portrait Edit",
    category: "Photography",
    photo: "photo-1534528741775-53994a69daeb",
    isNew: false,
    desc: "Cinematic portrait with color grading",
  },
  {
    id: 3,
    name: "Instagram Reel Cover",
    category: "Social Media",
    photo: "photo-1611162617213-7d7a39e9b1d7",
    isNew: true,
    desc: "Aesthetic vertical format with text overlay",
  },
  {
    id: 4,
    name: "Film Still",
    category: "Film & Video",
    photo: "photo-1485846234645-a62644f84728",
    isNew: false,
    desc: "Cinematic widescreen with dramatic lighting",
  },
  {
    id: 5,
    name: "Abstract Art Poster",
    category: "Art & Design",
    photo: "photo-1579783902614-a3fb3927b6a5",
    isNew: true,
    desc: "Bold abstract shapes with vivid colors",
  },
  {
    id: 6,
    name: "LinkedIn Banner",
    category: "Marketing",
    photo: "photo-1519681393784-d120267933ba",
    isNew: false,
    desc: "Professional landscape for LinkedIn profile",
  },
  {
    id: 7,
    name: "Fashion Editorial",
    category: "Photography",
    photo: "photo-1529626455594-4ff0802cfb7e",
    isNew: false,
    desc: "High-fashion editorial with editorial lighting",
  },
  {
    id: 8,
    name: "Story Template",
    category: "Social Media",
    photo: "photo-1558618666-fcd25c85cd64",
    isNew: true,
    desc: "9:16 format with animated background",
  },
  {
    id: 9,
    name: "Concert Promo",
    category: "Film & Video",
    photo: "photo-1507003211169-0a1dd7228f2d",
    isNew: false,
    desc: "Dynamic video intro for events and concerts",
  },
  {
    id: 10,
    name: "Minimalist Print",
    category: "Art & Design",
    photo: "photo-1557804506-669a67965ba0",
    isNew: false,
    desc: "Clean minimalist art for wall printing",
  },
];

export default function TemplatesPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = TEMPLATES.filter((t) => {
    const matchesCat = category === "All" || t.category === category;
    const matchesQuery = !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Templates</h1>
          <p className="text-white/40 text-sm">Start faster with curated AI prompts and styles</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates..."
            className="bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#1a73e8]/50 transition-colors w-56"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? "bg-[#1a73e8] text-white"
                : "bg-white/5 text-white/50 hover:text-white hover:bg-white/8 border border-white/8"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="group relative border border-white/8 rounded-2xl bg-[#0d0d0d] overflow-hidden cursor-pointer hover:border-white/20 transition-all"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://images.unsplash.com/${t.photo}?w=400&q=80`}
                alt={t.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1.5">
                {t.isNew && (
                  <span className="bg-[#1a73e8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="flex items-center gap-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
                  Use Template <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-white text-sm font-medium mb-0.5 truncate">{t.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[#1a73e8] text-[10px] font-medium bg-[#1a73e8]/10 px-2 py-0.5 rounded-full">
                  {t.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-24">
          <Sparkles className="w-10 h-10 text-white/20 mb-3" />
          <p className="text-white/40 text-sm">No templates found</p>
        </div>
      )}
    </div>
  );
}
