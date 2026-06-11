"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, TrendingUp, Star, Heart, ImageIcon, Video, Sparkles } from "lucide-react";

const TABS = ["For You", "Trending", "Cinematic", "Portrait", "Fantasy", "Nature", "Abstract"];

const FEED = [
  { id: 1,  type: "image", photo: "photo-1531746020798-e6953c6e8e04", prompt: "Neon portrait, blue lighting", author: "ZaraK",    likes: 284, hot: true,  h: "tall" },
  { id: 2,  type: "video", photo: "photo-1519681393784-d120267933ba", prompt: "Drone over snowy mountains",  author: "MarcusL",  likes: 201, hot: true,  h: "short" },
  { id: 3,  type: "image", photo: "photo-1509316785289-025f5b846b35", prompt: "Desert dunes at golden hour", author: "PriyaS",   likes: 178, hot: false, h: "short" },
  { id: 4,  type: "image", photo: "photo-1448375240586-882707db888b", prompt: "Enchanted glowing forest",    author: "TomW",     likes: 155, hot: false, h: "tall" },
  { id: 5,  type: "video", photo: "photo-1477959858617-67f85cf4f1df", prompt: "Neon city at night",          author: "AikoN",    likes: 132, hot: true,  h: "short" },
  { id: 6,  type: "image", photo: "photo-1579683823499-769a93b9d3a0", prompt: "Abstract liquid chrome",       author: "LuisM",    likes: 119, hot: false, h: "short" },
  { id: 7,  type: "image", photo: "photo-1524504388940-b1c1722653e1", prompt: "Golden hour portrait",         author: "SofiaR",   likes: 98,  hot: false, h: "tall" },
  { id: 8,  type: "video", photo: "photo-1505118380757-91f5f5632de0", prompt: "Ocean waves slow motion",      author: "KimJ",     likes: 87,  hot: true,  h: "short" },
  { id: 9,  type: "image", photo: "photo-1529626455594-4ff0802cfb7e", prompt: "Haute couture fashion edit",   author: "NadiaN",   likes: 76,  hot: false, h: "short" },
  { id: 10, type: "image", photo: "photo-1518638150340-f706e86654de", prompt: "Ancient temple in jungle",     author: "OmarH",    likes: 65,  hot: false, h: "tall" },
  { id: 11, type: "video", photo: "photo-1493246507139-91e8fad9978e", prompt: "Rainy city reflections",       author: "YukiT",    likes: 54,  hot: false, h: "short" },
  { id: 12, type: "image", photo: "photo-1531366936337-7c912a4589a7", prompt: "Aurora borealis over lake",    author: "ElenaV",   likes: 48,  hot: true,  h: "short" },
];

const EFFECTS = [
  { id: "skyfall",    name: "Skyfall",        tag: "Hot",  photo: "photo-1506905925346-21bda4d32df4", prompt: "Person falling through clouds in slow motion, dramatic skyfall effect, cinematic" },
  { id: "neon-flow",  name: "Neon Flow",      tag: "Hot",  photo: "photo-1547658719-da2b51169166", prompt: "Neon light trails flowing around subject, cyberpunk effect, glowing particles" },
  { id: "petals",     name: "Petal Storm",    tag: "New",  photo: "photo-1490750967868-88df5691cc7b", prompt: "Cherry blossom petals swirling around subject in slow motion, dreamy cinematic" },
  { id: "fire",       name: "Fire Burst",     tag: "Hot",  photo: "photo-1562155618-e1a8bc2eb04f", prompt: "Dramatic fire and embers erupting behind subject, epic cinematic effect" },
  { id: "matrix",     name: "Matrix Rain",    tag: "New",  photo: "photo-1518709268805-4e9042af9f23", prompt: "Green digital rain code falling behind subject, Matrix movie effect, cinematic" },
  { id: "galaxy",     name: "Galaxy Spin",    tag: "Hot",  photo: "photo-1531366936337-7c912a4589a7", prompt: "Galaxy and stars spinning behind subject, cosmic zoom effect, cinematic 4K" },
];

export default function SpotlightPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("For You");
  const [liked, setLiked] = useState<number[]>([]);
  const [showEffects, setShowEffects] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState<typeof EFFECTS[0] | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  function toggleLike(id: number) {
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function handleEffectGenerate() {
    if (!selectedEffect) return;
    const prompt = uploadedImage
      ? `${selectedEffect.prompt} — apply this effect to the uploaded person/subject`
      : selectedEffect.prompt;
    router.push(`/generate/video?prompt=${encodeURIComponent(prompt)}`);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  // Split into 3 columns masonry-style
  const cols = [FEED.filter((_, i) => i % 3 === 0), FEED.filter((_, i) => i % 3 === 1), FEED.filter((_, i) => i % 3 === 2)];

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="px-6 pt-6 pb-0 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Explore</h1>
            <p className="text-white/40 text-xs mt-0.5">Community creations & trending content</p>
          </div>
          <button onClick={() => setShowEffects(true)}
            className="flex items-center gap-2 bg-[#1a73e8]/15 border border-[#1a73e8]/30 text-[#1a73e8] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a73e8]/25 transition-all">
            <Sparkles className="w-4 h-4" /> Effects
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-3 scrollbar-hide">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab ? "bg-[#1a73e8] text-white" : "bg-white/5 text-white/50 hover:text-white border border-white/8"
              }`}>
              {tab === "Trending" && <Flame className="w-3 h-3 inline mr-1 text-orange-400" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-3 gap-3 mt-3">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {col.map(item => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-white/20 transition-all cursor-pointer">
                  <div className={`relative overflow-hidden ${item.h === "tall" ? "aspect-[3/4]" : "aspect-video"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://images.unsplash.com/${item.photo}?w=400&q=80`} alt={item.prompt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {item.hot && (
                        <span className="flex items-center gap-0.5 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          <Flame className="w-2 h-2" /> Hot
                        </span>
                      )}
                      <span className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        item.type === "video" ? "bg-rose-500/80 text-white" : "bg-black/60 text-white/80"
                      }`}>
                        {item.type === "video" ? <Video className="w-2 h-2" /> : <ImageIcon className="w-2 h-2" />}
                        {item.type}
                      </span>
                    </div>

                    {/* Like button */}
                    <button onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur p-1.5 rounded-full">
                      <Heart className={`w-3.5 h-3.5 transition-colors ${liked.includes(item.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                    </button>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <p className="text-white text-xs font-medium truncate">{item.prompt}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-white/50 text-[10px]">@{item.author}</span>
                        <div className="flex items-center gap-1 text-white/50 text-[10px]">
                          <Heart className="w-2.5 h-2.5" />
                          {liked.includes(item.id) ? item.likes + 1 : item.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Effects Panel */}
      {showEffects && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-6">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/8">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#1a73e8]" />
                <h2 className="text-white font-bold text-lg">Video Effects</h2>
              </div>
              <button onClick={() => { setShowEffects(false); setSelectedEffect(null); setUploadedImage(null); }}
                className="text-white/40 hover:text-white text-xl transition-colors">✕</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Effect picker */}
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Select an effect</p>
                <div className="grid grid-cols-2 gap-3">
                  {EFFECTS.map(effect => (
                    <div key={effect.id} onClick={() => setSelectedEffect(effect)}
                      className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all ${
                        selectedEffect?.id === effect.id ? "border-[#1a73e8]" : "border-white/8 hover:border-white/20"
                      }`}>
                      <div className="aspect-video overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://images.unsplash.com/${effect.photo}?w=300&q=80`} alt={effect.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between">
                        <span className="text-white text-xs font-semibold">{effect.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          effect.tag === "Hot" ? "bg-orange-500 text-white" : "bg-[#1a73e8] text-white"
                        }`}>{effect.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload panel */}
              <div className="w-56 border-l border-white/8 p-4 flex flex-col">
                <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Upload photo (optional)</p>
                <label className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                  uploadedImage ? "border-[#1a73e8]/50" : "border-white/10 hover:border-white/20"
                }`}>
                  {uploadedImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={uploadedImage} alt="uploaded" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="w-8 h-8 text-white/20 mx-auto mb-2" />
                      <p className="text-white/40 text-xs">Upload your photo</p>
                      <p className="text-white/20 text-[10px] mt-1">JPG, PNG up to 10MB</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                {uploadedImage && (
                  <button onClick={() => setUploadedImage(null)} className="mt-2 text-white/40 hover:text-white text-xs transition-colors">
                    Remove photo
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/8">
              <button onClick={handleEffectGenerate} disabled={!selectedEffect}
                className="w-full flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all">
                <Sparkles className="w-4 h-4" />
                {selectedEffect ? `Generate "${selectedEffect.name}" effect` : "Select an effect first"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
