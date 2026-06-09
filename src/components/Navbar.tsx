"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { LogoFull } from "./Logo";

const IMAGE_MODELS = [
  { name: "FLUX 1.1 Pro", desc: "Highest quality images", href: "/models/flux-pro" },
  { name: "FLUX Schnell", desc: "Fast & free tier", href: "/models/flux-schnell" },
  { name: "Stable Diffusion 3.5", desc: "Open source powerhouse", href: "/models/sd35" },
  { name: "Ideogram 2.0", desc: "Great for text in images", href: "/models/ideogram" },
];

const VIDEO_MODELS = [
  { name: "Google Veo 3", desc: "Best cinematic quality", href: "/models/veo3" },
  { name: "Kling 1.6", desc: "Fast & creative", href: "/models/kling" },
  { name: "Runway Gen-4", desc: "Visual storytelling", href: "/models/runway" },
  { name: "MiniMax Video-01", desc: "Smooth motion", href: "/models/minimax" },
];

function DropdownMenu({ items }: { items: typeof IMAGE_MODELS }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
      {items.map((item) => (
        <Link key={item.name} href={item.href} className="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
          <span className="text-sm font-medium text-white">{item.name}</span>
          <span className="text-xs text-white/40 mt-0.5">{item.desc}</span>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 h-14 border-b border-white/8"
      style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)" }}
      onMouseLeave={() => setOpen(null)}
    >
      <Link href="/" className="mr-8">
        <LogoFull size={28} />
      </Link>

      <div className="hidden md:flex items-center gap-1 text-sm">
        {[
          { label: "AI Image", key: "image", items: IMAGE_MODELS },
          { label: "AI Video", key: "video", items: VIDEO_MODELS },
        ].map(({ label, key, items }) => (
          <div key={key} className="relative" onMouseEnter={() => setOpen(key)}>
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/70 hover:text-white transition-colors">
              {label} <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {open === key && <DropdownMenu items={items} />}
          </div>
        ))}
        <Link href="/editor" className="px-3 py-2 rounded-lg text-white/70 hover:text-white transition-colors">AI Editor</Link>
        <Link href="/explore" className="px-3 py-2 rounded-lg text-white/70 hover:text-white transition-colors">Explore</Link>
        <Link href="/templates" className="px-3 py-2 rounded-lg text-white/70 hover:text-white transition-colors">Templates</Link>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">Pricing</Link>
        <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors">Sign in</Link>
        <Link href="/signup" className="btn-blue text-sm">Start Free Now</Link>
      </div>
    </nav>
  );
}
