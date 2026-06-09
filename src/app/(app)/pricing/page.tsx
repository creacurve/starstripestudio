"use client";
import { useState } from "react";
import { Check, Zap, Sparkles, Loader2 } from "lucide-react";

const PLANS = [
  { name: "Starter",  credits: 100,  price: 9,   per: "$0.09/credit", popular: false },
  { name: "Creator",  credits: 500,  price: 39,  per: "$0.08/credit", popular: true  },
  { name: "Pro",      credits: 1500, price: 99,  per: "$0.07/credit", popular: false },
  { name: "Studio",   credits: 5000, price: 279, per: "$0.06/credit", popular: false },
];

const USAGE = [
  { model: "FLUX Schnell",           type: "Image", cost: 1,  time: "~5s"  },
  { model: "FLUX 1.1 Pro",           type: "Image", cost: 2,  time: "~15s" },
  { model: "Stable Diffusion 3.5",   type: "Image", cost: 1,  time: "~10s" },
  { model: "Kling 1.6 (3s)",         type: "Video", cost: 5,  time: "~60s" },
  { model: "Runway Gen-4 (5s)",      type: "Video", cost: 10, time: "~90s" },
  { model: "Google Veo 3 (5s)",      type: "Video", cost: 15, time: "~2min"},
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleBuy(planName: string) {
    setLoading(planName);
    setError("");
    try {
      const res = await fetch("/api/credits/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create checkout");
      window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-white mb-2">Buy Credits</h1>
        <p className="text-white/40 text-sm">Pay once, use anytime. Credits never expire.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6 text-center">
          {error}
        </div>
      )}

      {/* Plans */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {PLANS.map((plan) => (
          <div key={plan.name}
            className={`relative flex flex-col rounded-2xl border p-5 transition-all ${
              plan.popular ? "border-[#1a73e8]/50 bg-[#1a73e8]/5" : "border-white/8 bg-[#0d0d0d] hover:border-white/15"
            }`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a73e8] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-2.5 h-2.5" /> Most Popular
              </div>
            )}

            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">{plan.name}</p>
            <div className="mb-1">
              <span className="text-3xl font-bold text-white">${plan.price}</span>
            </div>
            <p className="text-white/30 text-xs mb-4">{plan.per}</p>

            <div className="flex items-center gap-1.5 bg-[#1a73e8]/10 border border-[#1a73e8]/20 rounded-lg px-3 py-2 mb-5">
              <Zap className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span className="text-[#1a73e8] text-sm font-bold">{plan.credits.toLocaleString()} credits</span>
            </div>

            <ul className="space-y-2 mb-5 flex-1">
              {["Image generation", "Video generation", "HD downloads", "Never expires", "All AI models"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                  <Check className="w-3.5 h-3.5 text-[#1a73e8] flex-shrink-0" />{f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleBuy(plan.name)}
              disabled={loading !== null}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${
                plan.popular
                  ? "bg-[#1a73e8] hover:bg-[#1557b0] text-white"
                  : "border border-white/10 hover:border-white/25 hover:bg-white/5 text-white"
              }`}>
              {loading === plan.name ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Redirecting…</>
              ) : "Buy now"}
            </button>
          </div>
        ))}
      </div>

      {/* Usage table */}
      <div className="border border-white/8 rounded-2xl bg-[#0d0d0d] overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-white/8">
          <h2 className="text-sm font-semibold text-white">Credit usage per model</h2>
          <p className="text-white/35 text-xs mt-0.5">How many credits each generation costs</p>
        </div>
        <div className="divide-y divide-white/5">
          {USAGE.map((item) => (
            <div key={item.model} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  item.type === "Video"
                    ? "bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/20"
                    : "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                }`}>{item.type}</span>
                <span className="text-sm text-white/80">{item.model}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-white/35 text-xs">{item.time}</span>
                <div className="flex items-center gap-1 min-w-[72px] justify-end">
                  <Zap className="w-3 h-3 text-[#1a73e8]" />
                  <span className="text-white text-sm font-semibold">{item.cost}</span>
                  <span className="text-white/35 text-xs">credit{item.cost > 1 ? "s" : ""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free note */}
      <div className="border border-[#1a73e8]/20 bg-[#1a73e8]/5 rounded-2xl px-5 py-4 flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-[#1a73e8] flex-shrink-0" />
        <p className="text-sm text-white/70">
          New accounts get <span className="text-white font-semibold">10 free credits</span> on signup — no credit card required.
        </p>
      </div>
    </div>
  );
}
