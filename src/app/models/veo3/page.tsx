import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ChevronRight } from "lucide-react";

const FEATURES = [
  { title: "Direct scenes with cinematic prompts", desc: "Describe your vision as if you're directing a shot. Veo 3 interprets film language such as time-lapse, over-the-shoulder angles, dolly zooms, and more to shape each scene accurately." },
  { title: "Define opening and closing frames", desc: "Take finer control of each sequence by setting how scenes begin and end. Create cleaner transitions and a polished, professional flow." },
  { title: "Develop concepts at speed", desc: "Generate fast concept videos for ads, music projects, and short films. Sketch storyboards, experiment with visual styles, and validate ideas in minutes instead of days." },
  { title: "Generate video sound", desc: "Create immersive videos with audio, including ambient voices, and dialogue synchronized with the visual content." },
];

const WHO_FOR = [
  { title: "Content creators & YouTubers", desc: "Create thumbnails and social art instantly, with characters that stay consistent and results that always look polished.", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80" },
  { title: "Brands & marketing agencies", desc: "Produce clean, on-brand campaign visuals in 4K — perfect for design, product shots, and ads.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80" },
  { title: "Storytellers & filmmakers", desc: "Generate concept frames, storyboards, and mood boards, and explore different scene variations, lighting setups, and cinematic camera angles.", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80" },
];

export default function Veo3Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-8 lg:px-16 pt-20 pb-0">
        <p className="text-sm text-white/40 flex items-center gap-1.5 pt-4">
          Home <ChevronRight className="w-3.5 h-3.5" />
          Video Generator <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/70">Veo 3</span>
        </p>
      </div>

      {/* Hero */}
      <section className="px-8 lg:px-16 py-12 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
            Google Veo 3 AI Video Generator
          </h1>
          <p className="text-white/55 leading-relaxed mb-8 max-w-lg">
            Turn text prompts or images into high-end cinematic videos with Google's Veo 3 model. Engineered for rich visual storytelling, delivering natural motion, high clarity, and precisely aligned sound.
          </p>
          <Link href="/generate/video?model=veo3" className="btn-blue">Try Veo 3</Link>
        </div>
        <div className="rounded-2xl overflow-hidden h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=85"
            alt="Veo 3 example"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Why creators choose */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8">
        <h2 className="text-2xl font-bold mb-2">Why creators choose Veo 3</h2>
        <Link href="/generate/video?model=veo3" className="btn-blue mt-4 mb-10 inline-flex">Start Creating</Link>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-5">
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-white/45 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to create */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-3">How to create with Veo 3</h2>
            <p className="text-white/50 text-sm mb-6">Veo 3 by Google is fast and intuitive, and you can get it right inside the AI Studio Toolkit.</p>
            <Link href="/generate/video?model=veo3" className="btn-blue">Start Creating</Link>
          </div>
          <div className="space-y-3">
            {[
              { n: "1", title: "Start creating in AI Studio", desc: "Access our AI image and video generator and select the Veo 3 model to get started." },
              { n: "2", title: "Add references or enter a prompt", desc: "Upload a reference image or describe your scene. Veo 3 interprets complex film-language prompts accurately." },
              { n: "3", title: "Create, refine, and download", desc: "Generate your video and refine it with follow-up prompts. Download in high resolution when you're satisfied." },
            ].map((s, i) => (
              <details key={s.n} className="card group" open={i === 0}>
                <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none">
                  <span className="w-6 h-6 rounded-full bg-[#1a73e8] flex items-center justify-center text-xs font-bold flex-shrink-0">{s.n}</span>
                  <span className="font-medium text-sm">{s.title}</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed pl-[60px]">{s.desc}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="px-8 lg:px-16 py-16 border-t border-white/8 text-center">
        <h2 className="text-2xl font-bold mb-2">Who is Veo 3 for?</h2>
        <p className="text-white/40 text-sm mb-4">Veo 3 is for creators, agencies, filmmakers, and professionals.</p>
        <Link href="/generate/video?model=veo3" className="btn-blue mb-10 inline-flex">Try Veo 3</Link>
        <div className="grid md:grid-cols-3 gap-5 text-left">
          {WHO_FOR.map((u) => (
            <div key={u.title} className="card overflow-hidden">
              <div className="h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.img} alt={u.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-sm mb-2">{u.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-8 lg:px-16 py-20 border-t border-white/8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-3">Try Veo 3</h2>
            <p className="text-white/50 text-sm mb-6">Write a prompt or upload references, and Veo 3 brings your creative vision to life in seconds.</p>
            <Link href="/generate/video?model=veo3" className="btn-blue">Start Free</Link>
          </div>
          <div className="rounded-2xl overflow-hidden h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&q=80" alt="Veo 3 result" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-8 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded bg-[#1a73e8] flex items-center justify-center text-xs font-black">D</div>
            DAVINCI
          </div>
          <p className="text-sm text-white/30">© 2026 AI Studio</p>
        </div>
      </footer>
    </div>
  );
}
