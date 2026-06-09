"use client";
import { useState } from "react";
import { Download, Loader2, Video, ChevronDown } from "lucide-react";

const VIDEO_MODELS = [
  { id: "veo3", label: "Google Veo 3", credits: 15, desc: "Best cinematic quality" },
  { id: "kling", label: "Kling 1.6 Pro", credits: 10, desc: "Fast & creative" },
  { id: "runway", label: "Runway Gen-4", credits: 10, desc: "Visual storytelling" },
  { id: "minimax", label: "MiniMax Video-01", credits: 5, desc: "Smooth & fast" },
];

const DURATIONS = [{ label: "3 seconds", value: "3s", multiplier: 0.5 }, { label: "5 seconds", value: "5s", multiplier: 1 }, { label: "10 seconds", value: "10s", multiplier: 2 }];

export default function VideoGeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("5s");
  const [model, setModel] = useState("kling");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const selectedModel = VIDEO_MODELS.find((m) => m.id === model)!;
  const selectedDur = DURATIONS.find((d) => d.value === duration)!;
  const cost = Math.round(selectedModel.credits * selectedDur.multiplier);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, duration, model }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white">AI Video Generator</h1>
            <p className="text-white/40 text-sm mt-0.5">Create cinematic videos from text using Veo 3, Kling, Runway, and more</p>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-6">
            {/* Output */}
            <div className="border border-white/8 rounded-2xl overflow-hidden bg-[#0a0a0a] flex items-center justify-center min-h-[500px]">
              {loading ? (
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1a73e8] mx-auto mb-3" />
                  <p className="text-white/40 text-sm">Generating your video…</p>
                  <p className="text-white/20 text-xs mt-1">This takes 1–3 minutes</p>
                </div>
              ) : result ? (
                <div className="relative w-full h-full min-h-[500px]">
                  <video src={result} controls className="w-full h-full object-contain" />
                  <a href={result} download="ai-studio-video.mp4"
                    className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 border border-white/20 backdrop-blur px-3 py-2 rounded-lg text-sm font-medium hover:bg-black/90 transition-all">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              ) : (
                <div className="text-center px-8">
                  <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Video className="w-6 h-6 text-white/30" />
                  </div>
                  <p className="text-white/30 text-sm">Your video will appear here</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Model picker */}
              <div className="border border-white/8 rounded-xl bg-[#0a0a0a] p-4">
                <label className="text-xs text-white/40 uppercase tracking-wider mb-3 block">AI Model</label>
                <div className="space-y-2">
                  {VIDEO_MODELS.map((m) => (
                    <button key={m.id} onClick={() => setModel(m.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all text-sm ${model === m.id ? "bg-[#1a73e8]/15 border border-[#1a73e8]/40 text-white" : "bg-white/3 border border-white/5 text-white/60 hover:text-white hover:border-white/15"}`}>
                      <div>
                        <p className="font-medium">{m.label}</p>
                        <p className="text-xs opacity-60">{m.desc}</p>
                      </div>
                      <span className="text-xs opacity-60">{m.credits} cr/5s</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div className="border border-white/8 rounded-xl bg-[#0a0a0a] p-4">
                <label className="text-xs text-white/40 uppercase tracking-wider mb-3 block">Prompt</label>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4}
                  placeholder="A drone flying over a snowy mountain range at golden hour, cinematic 4K, smooth motion…"
                  className="w-full bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none resize-none" />
              </div>

              {/* Duration */}
              <div className="border border-white/8 rounded-xl bg-[#0a0a0a] p-4">
                <label className="text-xs text-white/40 uppercase tracking-wider mb-3 block">Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {DURATIONS.map((d) => (
                    <button key={d.value} onClick={() => setDuration(d.value)}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${duration === d.value ? "bg-[#1a73e8] text-white" : "bg-white/5 text-white/50 hover:text-white"}`}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>}

              <button onClick={handleGenerate} disabled={loading || !prompt.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-40 py-3 rounded-xl font-semibold text-sm transition-all">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Video className="w-4 h-4" /> Generate · {cost} credits</>}
              </button>
              <p className="text-xs text-white/25 text-center">Video generation typically takes 1–3 minutes</p>
            </div>
          </div>
        </div>
    </div>
  );
}
