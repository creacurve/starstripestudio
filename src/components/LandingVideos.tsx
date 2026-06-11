"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Video } from "lucide-react";

const STATIC = [
  { output_url: "", prompt: "Drone flying over snowy mountains at golden hour" },
  { output_url: "", prompt: "Woman walking through neon-lit city streets at night" },
  { output_url: "", prompt: "Ocean waves crashing against rocky cliffs, cinematic 4K" },
  { output_url: "", prompt: "Timelapse of clouds moving over desert dunes" },
  { output_url: "", prompt: "Close-up of flower blooming in slow motion" },
  { output_url: "", prompt: "Futuristic city car chase, high speed, cinematic" },
];

const STATIC_IMGS = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
  "https://images.unsplash.com/photo-1490750967868-88df5691cc7b?w=600&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
];

function VideoCard({ url, prompt, fallbackImg }: { url: string; prompt: string; fallbackImg: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-white/20 transition-all">
      <div className="relative aspect-video overflow-hidden bg-black">
        {url ? (
          <>
            <video
              ref={ref}
              src={url}
              className="w-full h-full object-cover"
              loop muted playsInline preload="metadata"
              onMouseEnter={() => ref.current?.play()}
              onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:opacity-0 transition-opacity pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fallbackImg} alt={prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-white/60 leading-relaxed line-clamp-2">"{prompt}"</p>
        {url && <span className="inline-block mt-2 text-[10px] bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full font-semibold">AI Generated</span>}
      </div>
    </div>
  );
}

export default function LandingVideos() {
  const [videos, setVideos] = useState<{ output_url: string; prompt: string }[]>([]);

  useEffect(() => {
    fetch("/api/public/videos")
      .then(r => r.json())
      .then(d => { if (d.videos?.length) setVideos(d.videos); })
      .catch(() => {});
  }, []);

  const items = videos.length > 0 ? videos : STATIC;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((v, i) => (
          <VideoCard key={i} url={v.output_url} prompt={v.prompt} fallbackImg={STATIC_IMGS[i % STATIC_IMGS.length]} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/generate/video" className="btn-blue px-8 py-3 rounded-full inline-flex items-center gap-2">
          <Video className="w-4 h-4" /> Generate your video
        </Link>
      </div>
    </>
  );
}
