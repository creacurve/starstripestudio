import { Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const TOP_CREATORS = [
  { name: "Zara K.", initials: "ZK", count: 142, color: "bg-pink-500" },
  { name: "Marcus L.", initials: "ML", count: 98, color: "bg-violet-500" },
  { name: "Priya S.", initials: "PS", count: 87, color: "bg-emerald-500" },
  { name: "Tom W.", initials: "TW", count: 76, color: "bg-amber-500" },
  { name: "Aiko N.", initials: "AN", count: 65, color: "bg-cyan-500" },
  { name: "Luis M.", initials: "LM", count: 54, color: "bg-rose-500" },
];

const TRENDING_PROMPTS = [
  "Cinematic portrait of a warrior in golden armor, epic fantasy",
  "Minimalist product shot on white marble background",
  "Retro synthwave city at night with neon reflections",
  "Watercolor landscape of misty Japanese mountains",
  "Hyper-realistic macro photo of a butterfly wing",
  "Abstract fluid art with blue and gold ink drops",
];

const COMMUNITY_PICKS = [
  { photo: "photo-1534528741775-53994a69daeb", model: "FLUX 1.1 Pro", author: "Zara K.", likes: 284 },
  { photo: "photo-1579783902614-a3fb3927b6a5", model: "Ideogram 2.0", author: "Marcus L.", likes: 201 },
  { photo: "photo-1519681393784-d120267933ba", model: "FLUX Schnell", author: "Priya S.", likes: 178 },
  { photo: "photo-1507003211169-0a1dd7228f2d", model: "SD 3.5", author: "Tom W.", likes: 155 },
  { photo: "photo-1485846234645-a62644f84728", model: "FLUX 1.1 Pro", author: "Aiko N.", likes: 132 },
  { photo: "photo-1557804506-669a67965ba0", model: "Ideogram 2.0", author: "Luis M.", likes: 119 },
];

export default function SpotlightPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Spotlight</h1>
        <p className="text-white/40 text-sm">Featured creations and community highlights</p>
      </div>

      {/* Hero Feature */}
      <div className="relative rounded-2xl overflow-hidden mb-10 border border-white/8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80"
          alt="Featured creation"
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Featured this week</span>
          </div>
          <h2 className="text-white text-2xl font-bold mb-1">"Neon Dreams — Fashion Forward"</h2>
          <div className="flex items-center gap-3">
            <span className="bg-[#1a73e8]/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full">FLUX 1.1 Pro</span>
            <span className="text-white/50 text-sm">by Zara K.</span>
            <span className="text-white/30 text-sm">·</span>
            <span className="text-white/50 text-sm">284 likes</span>
          </div>
        </div>
      </div>

      {/* Top Creators */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Users className="w-4 h-4 text-[#1a73e8]" />
          <h2 className="text-white font-semibold">Top Creators This Week</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {TOP_CREATORS.map((creator) => (
            <div
              key={creator.name}
              className="flex-shrink-0 border border-white/8 rounded-2xl bg-[#0d0d0d] p-5 flex flex-col items-center text-center w-32 cursor-pointer hover:border-white/20 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${creator.color} flex items-center justify-center mb-3`}>
                <span className="text-white text-sm font-bold">{creator.initials}</span>
              </div>
              <p className="text-white text-sm font-medium mb-0.5 truncate w-full">{creator.name}</p>
              <p className="text-white/40 text-xs">{creator.count} creations</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Prompts */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-[#1a73e8]" />
          <h2 className="text-white font-semibold">Trending Prompts</h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {TRENDING_PROMPTS.map((prompt, i) => (
            <Link
              key={i}
              href="/generate/image"
              className="bg-white/5 hover:bg-[#1a73e8]/15 border border-white/8 hover:border-[#1a73e8]/30 text-white/70 hover:text-white text-sm px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              {prompt}
            </Link>
          ))}
        </div>
      </section>

      {/* Community Picks */}
      <section>
        <h2 className="text-white font-semibold mb-5">Community Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {COMMUNITY_PICKS.map((pick, i) => (
            <div
              key={i}
              className="group relative border border-white/8 rounded-2xl overflow-hidden bg-[#0d0d0d] cursor-pointer hover:border-white/20 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://images.unsplash.com/${pick.photo}?w=500&q=80`}
                alt="Community pick"
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="bg-[#1a73e8]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {pick.model}
                    </span>
                    <p className="text-white/70 text-xs mt-1">by {pick.author}</p>
                  </div>
                  <div className="flex items-center gap-1 text-white/60 text-xs">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {pick.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
