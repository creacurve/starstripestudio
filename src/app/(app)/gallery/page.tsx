"use client";
import { useState } from "react";
import { ImageIcon, Video, Sparkles, Film } from "lucide-react";
import Link from "next/link";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">My History</h1>
        <p className="text-white/40 text-sm">All your generated creations in one place</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab("images")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "images"
              ? "bg-[#1a73e8] text-white"
              : "text-white/50 hover:text-white"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Images
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "videos"
              ? "bg-[#1a73e8] text-white"
              : "text-white/50 hover:text-white"
          }`}
        >
          <Video className="w-4 h-4" />
          Videos
        </button>
      </div>

      {/* Images empty state */}
      {activeTab === "images" && (
        <div className="border border-white/8 rounded-2xl bg-[#0d0d0d] flex flex-col items-center justify-center py-24 px-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#1a73e8]/10 border border-[#1a73e8]/20 flex items-center justify-center mb-6">
            <Sparkles className="w-9 h-9 text-[#1a73e8]" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No images yet</h2>
          <p className="text-white/40 text-sm max-w-sm mb-8">
            Your generated images will appear here. Start creating to build your personal gallery.
          </p>
          <Link
            href="/generate/image"
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Generate an Image
          </Link>
        </div>
      )}

      {/* Videos empty state */}
      {activeTab === "videos" && (
        <div className="border border-white/8 rounded-2xl bg-[#0d0d0d] flex flex-col items-center justify-center py-24 px-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#1a73e8]/10 border border-[#1a73e8]/20 flex items-center justify-center mb-6">
            <Film className="w-9 h-9 text-[#1a73e8]" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No videos yet</h2>
          <p className="text-white/40 text-sm max-w-sm mb-8">
            Your generated videos will appear here. Bring your ideas to life with AI-powered video generation.
          </p>
          <Link
            href="/generate/video"
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Generate a Video
          </Link>
        </div>
      )}
    </div>
  );
}
