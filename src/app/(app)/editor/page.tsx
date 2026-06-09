"use client";
import { useState, useRef } from "react";
import {
  MousePointer2,
  Crop,
  Eraser,
  Wand2,
  Expand,
  Upload,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  MoveUpRight,
  Smile,
} from "lucide-react";

const TOOLS = [
  { id: "select", icon: MousePointer2, label: "Select" },
  { id: "crop", icon: Crop, label: "Crop" },
  { id: "erase", icon: Eraser, label: "Erase" },
  { id: "inpaint", icon: Wand2, label: "Inpaint" },
  { id: "expand", icon: Expand, label: "Expand" },
];

const AI_TOOLS = [
  { icon: Sparkles, label: "Remove Background" },
  { icon: ZoomIn, label: "Upscale 4x" },
  { icon: Smile, label: "Fix Face" },
  { icon: MoveUpRight, label: "Expand Canvas" },
];

export default function EditorPage() {
  const [activeTool, setActiveTool] = useState("select");
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [hasImage, setHasImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setHasImage(true);
  }

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Left Toolbar */}
      <div className="w-14 border-r border-white/8 bg-[#0a0a0a] flex flex-col items-center py-4 gap-1">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              title={tool.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeTool === tool.id
                  ? "bg-[#1a73e8] text-white"
                  : "text-white/40 hover:text-white hover:bg-white/8"
              }`}
            >
              <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            </button>
          );
        })}

        <div className="flex-1" />

        <button
          title="Zoom In"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
        >
          <ZoomIn style={{ width: 18, height: 18 }} />
        </button>
        <button
          title="Zoom Out"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
        >
          <ZoomOut style={{ width: 18, height: 18 }} />
        </button>
        <button
          title="Reset"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
        >
          <RotateCcw style={{ width: 18, height: 18 }} />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-[#080808] flex items-center justify-center relative overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff18 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {!hasImage ? (
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center mb-5">
              <Upload className="w-8 h-8 text-white/30" />
            </div>
            <p className="text-white/60 text-sm font-medium mb-1">Upload an image to start editing</p>
            <p className="text-white/30 text-xs mb-6">PNG, JPG, WEBP up to 20MB</p>
            <button
              onClick={() => fileRef.current?.click()}
              className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Choose Image
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
        ) : (
          <div className="relative z-10 max-w-2xl max-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl!}
              alt="Editing"
              className="max-w-full max-h-[calc(100vh-100px)] rounded-xl border border-white/10 shadow-2xl"
              style={{
                filter: `brightness(${brightness / 50}) contrast(${contrast / 50}) saturate(${saturation / 50})`,
              }}
            />
            {/* Tool label */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-lg border border-white/10">
              {TOOLS.find((t) => t.id === activeTool)?.label} Mode
            </div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-64 border-l border-white/8 bg-[#0a0a0a] flex flex-col overflow-y-auto">
        {/* Adjustments */}
        <div className="p-4 border-b border-white/8">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Adjustments</p>
          {[
            { label: "Brightness", value: brightness, set: setBrightness },
            { label: "Contrast", value: contrast, set: setContrast },
            { label: "Saturation", value: saturation, set: setSaturation },
          ].map(({ label, value, set }) => (
            <div key={label} className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-xs">{label}</span>
                <span className="text-white/40 text-xs">{value}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full h-1 appearance-none bg-white/10 rounded-full outline-none cursor-pointer accent-[#1a73e8]"
              />
            </div>
          ))}
        </div>

        {/* AI Tools */}
        <div className="p-4">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">AI Tools</p>
          <div className="space-y-2">
            {AI_TOOLS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 bg-white/5 hover:bg-[#1a73e8]/10 border border-white/8 hover:border-[#1a73e8]/30 text-white/70 hover:text-white text-sm px-3.5 py-2.5 rounded-xl transition-all text-left"
              >
                <Icon className="w-4 h-4 text-[#1a73e8]" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 mt-auto border-t border-white/8">
          <button className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
            Export Image
          </button>
        </div>
      </div>
    </div>
  );
}
