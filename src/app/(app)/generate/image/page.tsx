"use client";
import { useState } from "react";
import { Download, Loader2, Wand2, ChevronDown } from "lucide-react";

const STYLES = ["None", "Photorealistic", "Anime", "Digital Art", "Oil Painting", "Sketch", "Cinematic", "3D Render"];
const RATIOS = [{ label: "Square 1:1", value: "1:1" }, { label: "Landscape 16:9", value: "16:9" }, { label: "Portrait 9:16", value: "9:16" }, { label: "Standard 4:3", value: "4:3" }];
const MODELS = [
  { id: "flux-pro", label: "FLUX 1.1 Pro", credits: 2 },
  { id: "flux-schnell", label: "FLUX Schnell", credits: 1 },
  { id: "sd35", label: "Stable Diffusion 3.5", credits: 1 },
  { id: "ideogram", label: "Ideogram 2.0", credits: 2 },
];

export default function ImageGeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("None");
  const [ratio, setRatio] = useState("1:1");
  const [model, setModel] = useState("flux-schnell");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const selectedModel = MODELS.find((m) => m.id === model)!;

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, ratio, model }),
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
            <h1 className="text-xl font-bold text-white">AI Image Generator</h1>
            <p className="text-white/40 text-sm mt-0.5">Generate images from text using the world's best AI models</p>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-6">
            {/* Output */}
            <div className="border border-white/8 rounded-2xl overflow-hidden bg-[#0a0a0a] flex items-center justify-center min-h-[500px]">
              {loading ? (
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1a73e8] mx-auto mb-3" />
                  <p className="text-white/40 text-sm">Generating your image…</p>
                  <p className="text-white/20 text-xs mt-1">Usually 10–20 seconds</p>
                </div>
              ) : result ? (
                <div className="relative w-full h-full min-h-[500px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result} alt="Generated" className="w-full h-full object-contain" />
                  <a href={result} download="ai-studio-image.png"
                    className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 border border-white/20 backdrop-blur px-3 py-2 rounded-lg text-sm font-medium hover:bg-black/90 transition-all">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              ) : (
                <div className="text-center px-8">
                  <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="w-6 h-6 text-white/30" />
                  </div>
                  <p className="text-white/30 text-sm">Your image will appear here</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Model */}
              <div className="border border-white/8 rounded-xl bg-[#0a0a0a] p-4">
                <label className="text-xs text-white/40 uppercase tracking-wider mb-3 block">Model</label>
                <div className="relative">
                  <select value={model} onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm appearance-none focus:outline-none focus:border-[#1a73e8]/60 pr-8">
                    {MODELS.map((m) => (
                      <option key={m.id} value={m.id}>{m.label} — {m.credits} cr</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* Prompt */}
              <div className="border border-white/8 rounded-xl bg-[#0a0a0a] p-4">
                <label className="text-xs text-white/40 uppercase tracking-wider mb-3 block">Prompt</label>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4}
                  placeholder="A futuristic city at sunset, neon lights reflecting on wet streets, ultra-detailed cinematic shot…"
                  className="w-full bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none resize-none" />
              </div>

              {/* Style */}
              <div className="border border-white/8 rounded-xl bg-[#0a0a0a] p-4">
                <label className="text-xs text-white/40 uppercase tracking-wider mb-3 block">Style</label>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <button key={s} onClick={() => setStyle(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${style === s ? "bg-[#1a73e8] text-white" : "bg-white/5 text-white/50 hover:text-white"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ratio */}
              <div className="border border-white/8 rounded-xl bg-[#0a0a0a] p-4">
                <label className="text-xs text-white/40 uppercase tracking-wider mb-3 block">Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-2">
                  {RATIOS.map((r) => (
                    <button key={r.value} onClick={() => setRatio(r.value)}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${ratio === r.value ? "bg-[#1a73e8] text-white" : "bg-white/5 text-white/50 hover:text-white"}`}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
              )}

              <button onClick={handleGenerate} disabled={loading || !prompt.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-40 py-3 rounded-xl font-semibold text-sm transition-all">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Wand2 className="w-4 h-4" /> Generate · {selectedModel.credits} credit{selectedModel.credits > 1 ? "s" : ""}</>}
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
