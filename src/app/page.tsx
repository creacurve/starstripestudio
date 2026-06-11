import Link from "next/link";
import Navbar from "@/components/Navbar";
import { LogoMark } from "@/components/Logo";
import {
  ArrowRight, ChevronRight, Check, Zap, Star,
  ImageIcon, Video, Wand2, Sparkles, PenTool,
  Expand, ScanSearch, Layers, Film, Camera,
  Palette, Type, Crop, Eraser, RefreshCw,
  Download, Share2, Clock, Shield
} from "lucide-react";

/* ── Video models ── */
const VIDEO_MODELS = [
  { name: "Google Veo 3", tag: "Cinematic", href: "/models/veo3", color: "bg-blue-600", video: "https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=600&q=80" },
  { name: "Kling 1.6 Pro", tag: "Fast & Creative", href: "/models/kling", color: "bg-rose-600", video: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80" },
  { name: "Runway Gen-4", tag: "Visual Story", href: "/models/runway", color: "bg-amber-600", video: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80" },
  { name: "MiniMax Video-01", tag: "Smooth Motion", href: "/models/minimax", color: "bg-teal-600", video: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80" },
];

/* ── Image models ── */
const IMAGE_MODELS = [
  { name: "FLUX 1.1 Pro", tag: "Best Quality", href: "/models/flux-pro", color: "bg-orange-600", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" },
  { name: "FLUX Schnell", tag: "Fastest", href: "/models/flux-schnell", color: "bg-sky-600", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" },
  { name: "Stable Diffusion 3.5", tag: "Open Source", href: "/models/sd35", color: "bg-violet-600", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80" },
  { name: "Ideogram 2.0", tag: "Text in Images", href: "/models/ideogram", color: "bg-emerald-600", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80" },
];

/* ── All Tools / Icons ── */
const ALL_TOOLS = [
  { icon: <ImageIcon className="w-5 h-5" />, label: "Image Generator", desc: "Text to image", href: "/generate/image", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { icon: <Video className="w-5 h-5" />, label: "Video Generator", desc: "Text to video", href: "/generate/video", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  { icon: <Wand2 className="w-5 h-5" />, label: "AI Editor", desc: "Edit with AI", href: "/editor", color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
  { icon: <ScanSearch className="w-5 h-5" />, label: "Upscale 4K", desc: "Enhance resolution", href: "/editor", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { icon: <Eraser className="w-5 h-5" />, label: "Remove BG", desc: "Clean backgrounds", href: "/editor", color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { icon: <Expand className="w-5 h-5" />, label: "Expand Canvas", desc: "Outpainting", href: "/editor", color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  { icon: <Sparkles className="w-5 h-5" />, label: "Face Fix", desc: "Restore faces", href: "/editor", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { icon: <Layers className="w-5 h-5" />, label: "Templates", desc: "Ready-made styles", href: "/templates", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { icon: <Film className="w-5 h-5" />, label: "Spotlight", desc: "Featured creations", href: "/spotlight", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { icon: <Camera className="w-5 h-5" />, label: "Reference Image", desc: "Image-to-image", href: "/generate/image", color: "text-green-400 bg-green-500/10 border-green-500/20" },
  { icon: <Palette className="w-5 h-5" />, label: "Style Transfer", desc: "Apply art styles", href: "/generate/image", color: "text-red-400 bg-red-500/10 border-red-500/20" },
  { icon: <Type className="w-5 h-5" />, label: "Text in Image", desc: "Legible AI text", href: "/models/ideogram", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
];

/* ── Generated video examples ── */
const VIDEO_EXAMPLES = [
  { prompt: "Drone flying over snowy mountains at golden hour", model: "Veo 3", duration: "5s", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80" },
  { prompt: "Woman walking through neon-lit city streets at night", model: "Kling 1.6", duration: "5s", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80" },
  { prompt: "Ocean waves crashing against rocky cliffs, cinematic 4K", model: "Runway Gen-4", duration: "5s", img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80" },
  { prompt: "Timelapse of clouds moving over desert dunes", model: "MiniMax", duration: "3s", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" },
  { prompt: "Close-up of flower blooming in slow motion", model: "Veo 3", duration: "5s", img: "https://images.unsplash.com/photo-1490750967868-88df5691cc7b?w=600&q=80" },
  { prompt: "Futuristic city car chase, high speed, cinematic", model: "Runway Gen-4", duration: "10s", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80" },
];

/* ── Pricing ── */
const PLANS = [
  { name: "Starter", credits: 100, price: 9, per: "$0.09/cr", popular: false },
  { name: "Creator", credits: 500, price: 39, per: "$0.08/cr", popular: true },
  { name: "Pro", credits: 1500, price: 99, per: "$0.07/cr", popular: false },
];

/* ── Features ── */
const FEATURES = [
  { icon: <Zap className="w-5 h-5 text-[#1a73e8]" />, title: "Pay per credit", desc: "No subscriptions. Buy once, use anytime. Credits never expire." },
  { icon: <Download className="w-5 h-5 text-green-400" />, title: "HD downloads", desc: "Download every creation in full resolution — yours forever." },
  { icon: <RefreshCw className="w-5 h-5 text-violet-400" />, title: "Unlimited retries", desc: "Not happy? Re-run with tweaked prompts at no extra cost." },
  { icon: <Clock className="w-5 h-5 text-amber-400" />, title: "Generation history", desc: "All your past creations saved and accessible at any time." },
  { icon: <Share2 className="w-5 h-5 text-pink-400" />, title: "Share & explore", desc: "Browse community creations and share your best work." },
  { icon: <Shield className="w-5 h-5 text-teal-400" />, title: "Private by default", desc: "Your generations are private unless you choose to share." },
];

export default function HomePage() {
  const realVideos: { output_url: string; prompt: string }[] = [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="pt-24">
        <div className="px-8 lg:px-16 pt-8 pb-2">
          <p className="text-sm text-white/35 flex items-center gap-1.5">
            Home <ChevronRight className="w-3.5 h-3.5" /> AI Studio
          </p>
        </div>

        <div className="px-8 lg:px-16 grid lg:grid-cols-2 gap-12 items-center py-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1a73e8]/10 border border-[#1a73e8]/25 text-[#1a73e8] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Zap className="w-3 h-3" /> 10 free credits on signup
            </div>
            <h1 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-5">
              AI Image &<br />Video Generator
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg">
              Turn text into cinematic images and videos using FLUX, Veo 3, Kling, and Runway — all in one studio.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/signup" className="btn-blue text-base px-6 py-3 rounded-full">
                Start creating free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/explore" className="btn-outline text-base px-6 py-3 rounded-full">View gallery</Link>
            </div>
            <p className="text-white/25 text-sm mt-4">No credit card required · 10 free credits</p>
          </div>

          {/* Hero image grid */}
          <div className="grid grid-cols-2 gap-3 h-[460px]">
            <div className="rounded-2xl overflow-hidden row-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=85" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=85" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=85" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ ALL TOOLS (Icon grid) ══ */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Everything in one studio</h2>
          <p className="text-white/35 text-sm">All the AI tools you need — generate, edit, upscale, and more.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ALL_TOOLS.map((tool) => (
            <Link key={tool.label} href={tool.href}
              className={`group flex flex-col items-center gap-2.5 p-4 rounded-2xl border bg-[#0d0d0d] hover:border-white/20 transition-all text-center ${tool.color.split(' ').slice(1).join(' ')}`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${tool.color}`}>
                {tool.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">{tool.label}</p>
                <p className="text-[11px] text-white/35 mt-0.5">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ GENERATED VIDEOS ══ */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-white/35 mb-1">AI Video</p>
            <h2 className="text-2xl font-bold">Generated video examples</h2>
            <p className="text-white/35 text-sm mt-1">Real outputs from our AI video models</p>
          </div>
          <Link href="/generate/video" className="text-sm text-[#1a73e8] hover:underline flex items-center gap-1">
            Make your own <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {realVideos.length > 0 ? realVideos.map((v, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-white/20 transition-all">
              <div className="relative aspect-video overflow-hidden bg-black">
                <video
                  src={v.output_url}
                  className="w-full h-full object-cover"
                  loop muted playsInline
                  onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLVideoElement; el.pause(); el.currentTime = 0; }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-white/60 leading-relaxed line-clamp-2">"{v.prompt}"</p>
              </div>
            </div>
          )) : VIDEO_EXAMPLES.map((v) => (
            <div key={v.prompt} className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-white/20 transition-all">
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.img} alt={v.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded">{v.duration}</div>
              </div>
              <div className="p-4">
                <p className="text-xs text-white/60 leading-relaxed mb-2 line-clamp-2">"{v.prompt}"</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-[#1a73e8]/15 text-[#1a73e8] border border-[#1a73e8]/25 px-2 py-0.5 rounded-full font-semibold">{v.model}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/generate/video" className="btn-blue px-8 py-3 rounded-full inline-flex items-center gap-2">
            <Video className="w-4 h-4" /> Generate your video
          </Link>
        </div>
      </section>

      {/* ══ VIDEO MODELS ══ */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-white/35 mb-1">AI Video Models</p>
            <h2 className="text-2xl font-bold">Choose your video AI</h2>
          </div>
          <Link href="/generate/video" className="text-sm text-[#1a73e8] hover:underline flex items-center gap-1">See all <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {VIDEO_MODELS.map((m) => (
            <Link key={m.name} href={m.href} className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all">
              <div className="aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.video} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[10px] text-white/50 mb-0.5">{m.tag}</p>
                <p className="font-semibold text-sm">{m.name}</p>
              </div>
              <div className={`absolute top-3 right-3 w-7 h-7 ${m.color} rounded-lg flex items-center justify-center`}>
                <Video className="w-3.5 h-3.5 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ IMAGE MODELS ══ */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-white/35 mb-1">AI Image Models</p>
            <h2 className="text-2xl font-bold">Choose your image AI</h2>
          </div>
          <Link href="/generate/image" className="text-sm text-[#1a73e8] hover:underline flex items-center gap-1">See all <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {IMAGE_MODELS.map((m) => (
            <Link key={m.name} href={m.href} className="group rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all bg-[#0d0d0d]">
              <div className="aspect-square overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`absolute top-2.5 left-2.5 w-7 h-7 ${m.color} rounded-lg flex items-center justify-center`}>
                  <ImageIcon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] text-white/40 mb-0.5">{m.tag}</p>
                <p className="font-semibold text-sm">{m.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8">
        <h2 className="text-2xl font-bold text-center mb-2">Built for creators</h2>
        <p className="text-white/35 text-sm text-center mb-10">Everything you need to create professional visuals.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-white/8 rounded-2xl bg-[#0d0d0d] p-5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">{f.icon}</div>
              <div>
                <p className="font-semibold text-sm mb-1">{f.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8">
        <h2 className="text-2xl font-bold text-center mb-2">Simple credit pricing</h2>
        <p className="text-white/35 text-sm text-center mb-10">Buy once, use anytime. No subscriptions.</p>
        <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative border rounded-2xl p-6 flex flex-col bg-[#0d0d0d] ${p.popular ? "border-[#1a73e8]/50" : "border-white/8"}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a73e8] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                  <Star className="w-2.5 h-2.5" /> Most Popular
                </div>
              )}
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{p.name}</p>
              <p className="text-3xl font-black text-white mb-1">${p.price}</p>
              <p className="text-white/30 text-xs mb-4">{p.per}</p>
              <div className="flex items-center gap-1.5 text-[#1a73e8] text-sm font-bold mb-5">
                <Zap className="w-3.5 h-3.5" /> {p.credits.toLocaleString()} credits
              </div>
              <ul className="space-y-1.5 mb-5 flex-1">
                {["Image generation", "Video generation", "HD downloads", "Never expires"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                    <Check className="w-3.5 h-3.5 text-[#1a73e8] flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${p.popular ? "bg-[#1a73e8] hover:bg-[#1557b0] text-white" : "border border-white/15 hover:bg-white/5"}`}>
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="px-8 lg:px-16 py-20 border-t border-white/8">
        <div className="max-w-2xl mx-auto text-center">
          <LogoMark size={48} />
          <h2 className="text-3xl font-black mt-6 mb-3">Start creating with StarStripe Studio</h2>
          <p className="text-white/40 text-base mb-8">Join thousands of creators making stunning AI visuals every day.</p>
          <Link href="/signup" className="btn-blue text-base px-8 py-3.5 rounded-full inline-flex items-center gap-2">
            Get started free <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-white/25 text-sm mt-4">10 free credits · No credit card required</p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/8 px-8 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <LogoMark size={32} />
          <div className="flex flex-wrap gap-6 text-sm text-white/35">
            {["AI Image", "AI Video", "AI Editor", "Pricing", "Explore", "Templates", "Spotlight", "Sign in"].map((l) => (
              <Link key={l} href="#" className="hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
          <p className="text-sm text-white/25">© 2026 StarStripe Studio</p>
        </div>
      </footer>
    </div>
  );
}
