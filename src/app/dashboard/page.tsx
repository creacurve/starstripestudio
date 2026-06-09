"use client";
import { useState } from "react";
import Link from "next/link";
import { ImageIcon, Video, Sparkles, PenTool, ChevronLeft, ChevronRight, ChevronDown, Minus, Plus } from "lucide-react";

const TOOL_CARDS = [
  {
    label: "Generate Image",
    href: "/generate/image",
    icon: <ImageIcon className="w-5 h-5 text-white" />,
    iconBg: "bg-blue-600",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80",
  },
  {
    label: "Generate Video",
    href: "/generate/video",
    icon: <Video className="w-5 h-5 text-white" />,
    iconBg: "bg-red-600",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
  },
  {
    label: "Upscale & Enhance",
    href: "/generate/image",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    iconBg: "bg-orange-600",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80",
    badge: "4K",
  },
  {
    label: "Edit Image",
    href: "/generate/image",
    icon: <PenTool className="w-5 h-5 text-white" />,
    iconBg: "bg-violet-600",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
  },
];

const IMAGE_MODELS = [
  { name: "Nano Banana Pro", desc: "Google's fast, iteration-friendly image model.", badge: "Featured", badgeIcon: "⭐", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "GPT Image 2", desc: "Cinematic visuals, natural light, atmospheric mood.", badge: "Trending", badgeIcon: "⚡", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80" },
  { name: "Nano Banana 2", desc: "Photorealistic flagship with unmatched detail.", badge: "New", badgeIcon: "✦", img: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=400&q=80" },
  { name: "DaVinci Ultra", desc: "DaVinci's cinematic, production-ready flagship.", badge: "Fast", badgeIcon: "⚡", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
];

const MODELS_LIST = ["Nano Banana", "GPT Image 2", "FLUX Pro", "Stable Diffusion 3.5"];
const RATIOS = ["1:1", "16:9", "9:16", "4:3"];

const BADGE_COLORS: Record<string, string> = {
  Featured: "bg-[#1a1a2e] text-blue-300 border border-blue-500/30",
  Trending: "bg-[#1a1a1a] text-amber-300 border border-amber-500/30",
  New: "bg-[#0d1a0d] text-green-400 border border-green-500/30",
  Fast: "bg-[#1a1a1a] text-orange-300 border border-orange-500/30",
};

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Nano Banana");
  const [ratio, setRatio] = useState("1:1");
  const [count, setCount] = useState(1);

  return (
    <div className="px-8 py-8 max-w-5xl mx-auto">

      {/* Hero prompt */}
      <h1 className="text-2xl font-bold text-center mb-6">What do you want to create today?</h1>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 mb-10">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your image"
          rows={3}
          className="w-full bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none resize-none mb-3"
        />
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode toggles */}
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 text-xs">
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 text-xs">
            <Video className="w-3.5 h-3.5" />
          </button>

          {/* Model picker */}
          <div className="relative">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-lg pr-6 focus:outline-none cursor-pointer hover:bg-white/10 transition-colors"
            >
              {MODELS_LIST.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
          </div>

          {/* Ratio */}
          <div className="relative">
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-lg pr-6 focus:outline-none cursor-pointer hover:bg-white/10 transition-colors"
            >
              {RATIOS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
          </div>

          {/* Count */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5">
            <button onClick={() => setCount(Math.max(1, count - 1))} className="text-white/40 hover:text-white transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs text-white/80 px-1 min-w-[16px] text-center">{count}</span>
            <button onClick={() => setCount(Math.min(8, count + 1))} className="text-white/40 hover:text-white transition-colors">
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1" />

          <Link
            href={`/generate/image?prompt=${encodeURIComponent(prompt)}`}
            className="btn-blue text-xs px-5 py-1.5"
          >
            Generate
          </Link>
        </div>
      </div>

      {/* 4 Tool cards */}
      <div className="grid grid-cols-4 gap-3 mb-10">
        {TOOL_CARDS.map((card) => (
          <Link key={card.label} href={card.href} className="group relative rounded-xl overflow-hidden aspect-[4/3] block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.img} alt={card.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {/* Type icon top-right */}
            <div className={`absolute top-2.5 right-2.5 w-7 h-7 ${card.iconBg} rounded-lg flex items-center justify-center shadow-lg`}>
              {card.icon}
            </div>
            {/* 4K badge */}
            {card.badge && (
              <div className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {card.badge}
              </div>
            )}
            <p className="absolute bottom-2.5 left-3 text-sm font-medium text-white">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Explore image models */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-base font-semibold">Explore image models</h2>
          <p className="text-white/35 text-xs mt-0.5">Explore the world's best models, now available.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 text-white/50" />
          </button>
          <button className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4">
        {IMAGE_MODELS.map((m) => (
          <Link key={m.name} href="/generate/image" className="group block rounded-xl overflow-hidden border border-white/8 hover:border-white/20 transition-all bg-[#0a0a0a]">
            <div className="relative aspect-[3/2] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className={`absolute top-2.5 left-2.5 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${BADGE_COLORS[m.badge]}`}>
                <span>{m.badgeIcon}</span> {m.badge}
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-white mb-0.5">{m.name}</p>
              <p className="text-xs text-white/40 leading-relaxed">{m.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
