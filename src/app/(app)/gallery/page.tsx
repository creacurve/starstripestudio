"use client";
import { useState, useEffect, useRef } from "react";
import { ImageIcon, Video, Sparkles, Film, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Generation = { id: string; output_url: string; prompt: string; created_at: string; credits_used: number };

function VideoCard({ g }: { g: Generation }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-white/20 transition-all">
      <div className="relative aspect-video bg-black overflow-hidden">
        <video ref={ref} src={g.output_url} className="w-full h-full object-cover" loop muted playsInline preload="metadata"
          onMouseEnter={() => ref.current?.play()}
          onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:opacity-0 transition-opacity pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <a href={g.output_url} download className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 border border-white/20 p-1.5 rounded-lg">
          <Download className="w-3.5 h-3.5 text-white" />
        </a>
      </div>
      <div className="p-3">
        <p className="text-xs text-white/60 line-clamp-2">"{g.prompt}"</p>
        <p className="text-[10px] text-white/25 mt-1">{new Date(g.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function ImageCard({ g }: { g: Generation }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-white/20 transition-all">
      <div className="relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={g.output_url} alt={g.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <a href={g.output_url} download className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 border border-white/20 p-1.5 rounded-lg">
          <Download className="w-3.5 h-3.5 text-white" />
        </a>
      </div>
      <div className="p-3">
        <p className="text-xs text-white/60 line-clamp-2">"{g.prompt}"</p>
        <p className="text-[10px] text-white/25 mt-1">{new Date(g.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");
  const [images, setImages] = useState<Generation[]>([]);
  const [videos, setVideos] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [imgRes, vidRes] = await Promise.all([
        supabase.from("generations").select("*").eq("user_id", user.id).eq("type", "image").order("created_at", { ascending: false }),
        supabase.from("generations").select("*").eq("user_id", user.id).eq("type", "video").order("created_at", { ascending: false }),
      ]);
      setImages(imgRes.data ?? []);
      setVideos(vidRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">My History</h1>
        <p className="text-white/40 text-sm">All your generated creations in one place</p>
      </div>

      <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
        <button onClick={() => setActiveTab("images")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "images" ? "bg-[#1a73e8] text-white" : "text-white/50 hover:text-white"}`}>
          <ImageIcon className="w-4 h-4" /> Images {images.length > 0 && <span className="bg-white/20 text-xs px-1.5 rounded-full">{images.length}</span>}
        </button>
        <button onClick={() => setActiveTab("videos")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "videos" ? "bg-[#1a73e8] text-white" : "text-white/50 hover:text-white"}`}>
          <Video className="w-4 h-4" /> Videos {videos.length > 0 && <span className="bg-white/20 text-xs px-1.5 rounded-full">{videos.length}</span>}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-6 h-6 animate-spin text-white/30" />
        </div>
      ) : activeTab === "images" ? (
        images.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map(g => <ImageCard key={g.id} g={g} />)}
          </div>
        ) : (
          <div className="border border-white/8 rounded-2xl bg-[#0d0d0d] flex flex-col items-center justify-center py-24 px-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#1a73e8]/10 border border-[#1a73e8]/20 flex items-center justify-center mb-6">
              <Sparkles className="w-9 h-9 text-[#1a73e8]" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No images yet</h2>
            <p className="text-white/40 text-sm max-w-sm mb-8">Your generated images will appear here.</p>
            <Link href="/generate/image" className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors">Generate an Image</Link>
          </div>
        )
      ) : (
        videos.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(g => <VideoCard key={g.id} g={g} />)}
          </div>
        ) : (
          <div className="border border-white/8 rounded-2xl bg-[#0d0d0d] flex flex-col items-center justify-center py-24 px-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#1a73e8]/10 border border-[#1a73e8]/20 flex items-center justify-center mb-6">
              <Film className="w-9 h-9 text-[#1a73e8]" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No videos yet</h2>
            <p className="text-white/40 text-sm max-w-sm mb-8">Your generated videos will appear here.</p>
            <Link href="/generate/video" className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors">Generate a Video</Link>
          </div>
        )
      )}
    </div>
  );
}
