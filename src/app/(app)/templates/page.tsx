"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ImageIcon, Video, TrendingUp, Flame, Star, RefreshCw, Loader2 } from "lucide-react";

type LivePrompt = { id: string; prompt: string; image: string; source: string };

type Prompt = {
  id: number;
  name: string;
  prompt: string;
  category: string;
  type: "image" | "video";
  photo: string;
  trending?: boolean;
  hot?: boolean;
  featured?: boolean;
};

const CATEGORIES = ["All", "Portrait", "Cinematic", "Fantasy", "Nature", "Architecture", "Abstract", "Fashion", "Video"];

const PROMPTS: Prompt[] = [
  // Portrait
  {
    id: 1, type: "image", category: "Portrait", trending: true,
    name: "Neon Portrait",
    prompt: "Cinematic close-up portrait of a woman with neon blue and purple lighting, dark background, ultra realistic, 8k, photographic, shallow depth of field",
    photo: "photo-1531746020798-e6953c6e8e04",
  },
  {
    id: 2, type: "image", category: "Portrait", hot: true,
    name: "Golden Hour Face",
    prompt: "Beautiful woman portrait, golden hour sunlight, soft bokeh background, film grain, Kodak Portra 400, editorial photography",
    photo: "photo-1524504388940-b1c1722653e1",
  },
  {
    id: 3, type: "image", category: "Portrait",
    name: "Cyberpunk Character",
    prompt: "Male cyberpunk character with glowing eye implants, neon city background, rain, ultra detailed, cinematic lighting, 8k",
    photo: "photo-1618336753974-aae8e04506aa",
  },
  // Cinematic
  {
    id: 4, type: "image", category: "Cinematic", trending: true,
    name: "Blade Runner City",
    prompt: "Futuristic city at night, flying cars, neon signs in Japanese and Arabic, rain, fog, cinematic widescreen, 35mm film look, moody",
    photo: "photo-1477959858617-67f85cf4f1df",
  },
  {
    id: 5, type: "image", category: "Cinematic", featured: true,
    name: "Desert Dunes Epic",
    prompt: "Lone figure standing on massive sand dunes at golden hour, epic scale, dramatic shadows, cinematic composition, National Geographic style",
    photo: "photo-1509316785289-025f5b846b35",
  },
  {
    id: 6, type: "image", category: "Cinematic",
    name: "Stormy Ocean Ship",
    prompt: "Wooden sailing ship in a violent ocean storm, massive waves, lightning, dark dramatic sky, oil painting style, extremely detailed",
    photo: "photo-1505118380757-91f5f5632de0",
  },
  // Fantasy
  {
    id: 7, type: "image", category: "Fantasy", hot: true,
    name: "Dragon & Castle",
    prompt: "Ancient dragon flying over a medieval castle at night, full moon, lightning storm, epic fantasy art style, detailed scales, volumetric lighting",
    photo: "photo-1518709268805-4e9042af9f23",
  },
  {
    id: 8, type: "image", category: "Fantasy", trending: true,
    name: "Enchanted Forest",
    prompt: "Magical glowing forest at night, fireflies, giant ancient trees with bioluminescent mushrooms, fairy lights, dreamlike atmosphere",
    photo: "photo-1448375240586-882707db888b",
  },
  {
    id: 9, type: "image", category: "Fantasy",
    name: "Underwater Kingdom",
    prompt: "Majestic underwater palace with glowing coral, mermaids swimming, rays of light from above, deep ocean, cinematic, ultra detailed",
    photo: "photo-1583212292454-1fe6229603b7",
  },
  // Nature
  {
    id: 10, type: "image", category: "Nature",
    name: "Northern Lights",
    prompt: "Aurora borealis over a frozen lake in Iceland, reflections on ice, starry sky, snowy mountains, long exposure photography, ultra realistic",
    photo: "photo-1531366936337-7c912a4589a7",
  },
  {
    id: 11, type: "image", category: "Nature", featured: true,
    name: "Volcano Eruption",
    prompt: "Active volcano erupting at night, lava flows into the ocean, dramatic red sky, aerial drone shot, cinematic 4K, National Geographic",
    photo: "photo-1562155618-e1a8bc2eb04f",
  },
  {
    id: 12, type: "image", category: "Nature",
    name: "Cherry Blossom",
    prompt: "Cherry blossom trees in full bloom, petals falling, soft morning light, Japanese garden, peaceful, shallow depth of field, film photography",
    photo: "photo-1490750967868-88df5691cc7b",
  },
  // Architecture
  {
    id: 13, type: "image", category: "Architecture", trending: true,
    name: "Futuristic Dubai",
    prompt: "Futuristic skyscraper in Dubai at sunset, glass and steel twisted tower, reflection in water, dramatic clouds, architectural visualization, 8k",
    photo: "photo-1512453979798-5ea266f8880c",
  },
  {
    id: 14, type: "image", category: "Architecture",
    name: "Ancient Temple",
    prompt: "Ancient Mayan temple covered in jungle vines, golden hour, atmospheric fog, dramatic lighting, detailed stone carvings, cinematic",
    photo: "photo-1518638150340-f706e86654de",
  },
  // Abstract
  {
    id: 15, type: "image", category: "Abstract", hot: true,
    name: "Liquid Chrome",
    prompt: "Liquid chrome morphing abstract art, iridescent reflections, fluid simulation, ultra detailed, macro photography, dark background",
    photo: "photo-1579783902614-a3fb3927b6a5",
  },
  {
    id: 16, type: "image", category: "Abstract",
    name: "Neon Geometry",
    prompt: "Abstract geometric shapes floating in space, neon colors, glowing edges, dark background, 3D render, ultra detailed, 4K",
    photo: "photo-1558591710-4b4a1ae0f665",
  },
  // Fashion
  {
    id: 17, type: "image", category: "Fashion", featured: true,
    name: "Haute Couture",
    prompt: "High fashion model wearing avant-garde couture dress, Paris rooftop, editorial lighting, Vogue magazine style, sharp details, dramatic shadows",
    photo: "photo-1529626455594-4ff0802cfb7e",
  },
  {
    id: 18, type: "image", category: "Fashion",
    name: "Street Style",
    prompt: "Stylish woman in streetwear, Tokyo Shibuya crossing, neon lights, rain, street photography, cinematic color grading, 35mm",
    photo: "photo-1509631179647-0177331693ae",
  },
  // Videos
  {
    id: 19, type: "video", category: "Video", trending: true,
    name: "Mountain Drone",
    prompt: "Aerial drone shot flying over snow-capped mountains at golden hour, camera slowly pushing forward, cinematic 4K, smooth motion",
    photo: "photo-1519681393784-d120267933ba",
  },
  {
    id: 20, type: "video", category: "Video", hot: true,
    name: "Ocean Waves",
    prompt: "Slow motion ocean waves crashing on a rocky cliff at sunset, water spray, dramatic lighting, cinematic 4K, smooth",
    photo: "photo-1505118380757-91f5f5632de0",
  },
  {
    id: 21, type: "video", category: "Video",
    name: "City Timelapse",
    prompt: "Timelapse of New York City at night from rooftop, cars leaving light trails, clouds moving fast, epic cinematic wide shot",
    photo: "photo-1477959858617-67f85cf4f1df",
  },
  {
    id: 22, type: "video", category: "Video", featured: true,
    name: "Candle Macro",
    prompt: "Extreme close-up of a candle flame flickering in a dark room, slow motion 240fps, cinematic, wax dripping",
    photo: "photo-1513151233558-d860c5398176",
  },
  {
    id: 23, type: "video", category: "Video",
    name: "Running Dog",
    prompt: "A golden retriever running through a field of sunflowers at sunset, slow motion, cinematic, shallow depth of field, warm colors",
    photo: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    id: 24, type: "video", category: "Video",
    name: "Rainy Street",
    prompt: "Neon-lit rainy street at night, reflections on wet pavement, pedestrians with umbrellas, cinematic 4K, atmospheric fog",
    photo: "photo-1493246507139-91e8fad9978e",
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [livePrompts, setLivePrompts] = useState<LivePrompt[]>([]);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveQuery, setLiveQuery] = useState("");

  async function fetchLive() {
    setLiveLoading(true);
    try {
      const res = await fetch("/api/trending-prompts");
      const data = await res.json();
      setLivePrompts(data.prompts ?? []);
      setLiveQuery(data.query ?? "");
    } catch {}
    setLiveLoading(false);
  }

  useEffect(() => { fetchLive(); }, []);

  const filtered = PROMPTS.filter((t) => {
    const matchesCat = category === "All" || t.category === category;
    const matchesQuery = !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.prompt.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  function usePrompt(p: Prompt) {
    const path = p.type === "video" ? "/generate/video" : "/generate/image";
    router.push(`${path}?prompt=${encodeURIComponent(p.prompt)}`);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-[#1a73e8]" />
            <h1 className="text-2xl font-bold text-white">Trending Prompts</h1>
          </div>
          <p className="text-white/40 text-sm">Ready-to-use prompts — click to generate instantly</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts..."
            className="bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-[#1a73e8]/50 transition-colors w-56"
          />
        </div>
      </div>

      {/* ── Live Trending from Lexica ── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <h2 className="text-white font-semibold text-sm">Live Trending</h2>
            {liveQuery && <span className="text-white/30 text-xs">— {liveQuery}</span>}
            <span className="text-[10px] bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full font-semibold">Updated hourly</span>
          </div>
          <button onClick={fetchLive} disabled={liveLoading}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors disabled:opacity-40">
            <RefreshCw className={`w-3.5 h-3.5 ${liveLoading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {liveLoading ? (
          <div className="flex items-center gap-2 py-8 justify-center text-white/30">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Fetching live prompts…</span>
          </div>
        ) : livePrompts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {livePrompts.map((p) => (
              <div key={p.id}
                className="group relative border border-white/8 rounded-xl bg-[#0d0d0d] overflow-hidden cursor-pointer hover:border-[#1a73e8]/40 transition-all"
                onClick={() => router.push(`/generate/image?prompt=${encodeURIComponent(p.prompt)}`)}>
                <div className="aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.prompt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                  <p className="text-white text-[10px] text-center leading-relaxed line-clamp-4 mb-2">"{p.prompt}"</p>
                  <span className="flex items-center gap-1 bg-[#1a73e8] text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                    <Sparkles className="w-2.5 h-2.5" /> Use prompt
                  </span>
                </div>
                <div className="absolute top-1.5 left-1.5">
                  <span className="flex items-center gap-0.5 bg-green-500/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    <TrendingUp className="w-2 h-2" /> Live
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/30 text-sm py-4">Could not load live prompts — check your connection.</p>
        )}
      </section>

      {/* Category Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat ? "bg-[#1a73e8] text-white" : "bg-white/5 text-white/50 hover:text-white hover:bg-white/8 border border-white/8"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((t) => (
          <div key={t.id}
            className="group relative border border-white/8 rounded-2xl bg-[#0d0d0d] overflow-hidden cursor-pointer hover:border-white/20 transition-all"
            onClick={() => usePrompt(t)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://images.unsplash.com/${t.photo}?w=400&q=80`}
                alt={t.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                {t.trending && (
                  <span className="flex items-center gap-0.5 bg-[#1a73e8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-2.5 h-2.5" /> Trending
                  </span>
                )}
                {t.hot && (
                  <span className="flex items-center gap-0.5 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Flame className="w-2.5 h-2.5" /> Hot
                  </span>
                )}
                {t.featured && (
                  <span className="flex items-center gap-0.5 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Star className="w-2.5 h-2.5" /> Featured
                  </span>
                )}
              </div>
              {/* Type badge */}
              <div className="absolute top-2 right-2">
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  t.type === "video" ? "bg-rose-500/80 text-white" : "bg-black/60 text-white/80"
                }`}>
                  {t.type === "video" ? <Video className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                  {t.type === "video" ? "Video" : "Image"}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                <p className="text-white text-xs text-center leading-relaxed mb-3 line-clamp-4">"{t.prompt}"</p>
                <button className="flex items-center gap-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
                  <Sparkles className="w-3 h-3" /> Use this prompt
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-white text-sm font-medium mb-0.5 truncate">{t.name}</p>
              <span className="text-[10px] text-white/40">{t.category}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-24">
          <Sparkles className="w-10 h-10 text-white/20 mb-3" />
          <p className="text-white/40 text-sm">No prompts found</p>
        </div>
      )}
    </div>
  );
}
