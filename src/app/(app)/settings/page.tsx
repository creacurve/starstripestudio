"use client";
import { useState, useEffect } from "react";
import { User, CreditCard, Trash2, Save, Shield, Bell, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [credits, setCredits] = useState<number | null>(null);
  const [initials, setInitials] = useState("?");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);
      const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "";
      setDisplayName(name);
      setEmail(user.email || "");
      setInitials(name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "?");

      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();

      setCredits(profile?.credits ?? 0);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { full_name: displayName } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-white/30" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-white/40 text-sm">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <section className="border border-white/8 rounded-2xl bg-[#0d0d0d] p-6 mb-5">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-4 h-4 text-[#1a73e8]" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Profile</h2>
        </div>

        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1a73e8]/20 border border-[#1a73e8]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-[#1a73e8] text-xl font-bold">{initials}</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-1">Profile Picture</p>
            <p className="text-white/40 text-xs mb-3">PNG, JPG up to 2MB</p>
            <button className="text-xs text-[#1a73e8] border border-[#1a73e8]/30 hover:border-[#1a73e8] px-3 py-1.5 rounded-lg transition-colors">
              Upload Photo
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs mb-1.5">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#1a73e8]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/50 text-xs mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-white/50 text-sm outline-none cursor-not-allowed"
            />
            <p className="text-white/30 text-xs mt-1.5">Email cannot be changed after registration</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            saved ? "bg-green-600 text-white" : "bg-[#1a73e8] hover:bg-[#1557b0] text-white"
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </section>

      {/* Account / Credits Section */}
      <section className="border border-white/8 rounded-2xl bg-[#0d0d0d] p-6 mb-5">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-4 h-4 text-[#1a73e8]" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Account</h2>
        </div>

        <div className="flex items-center justify-between mb-5 pb-5 border-b border-white/8">
          <div>
            <p className="text-white text-sm font-medium mb-0.5">Credits Remaining</p>
            <p className="text-white/40 text-xs">One-time credit balance</p>
          </div>
          <div className="text-right">
            <p className="text-white text-2xl font-bold">{credits?.toLocaleString()}</p>
            <p className="text-white/40 text-xs">credits</p>
          </div>
        </div>

        <Link href="/pricing" className="block w-full text-center bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
          Buy more credits
        </Link>
      </section>

      {/* Notifications */}
      <section className="border border-white/8 rounded-2xl bg-[#0d0d0d] p-6 mb-5">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-4 h-4 text-[#1a73e8]" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Notifications</h2>
        </div>
        {[
          { label: "Generation complete", desc: "Notify when your creation finishes", on: true },
          { label: "Product updates", desc: "New features and model releases", on: true },
          { label: "Weekly digest", desc: "Summary of your activity", on: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div>
              <p className="text-white text-sm">{item.label}</p>
              <p className="text-white/40 text-xs">{item.desc}</p>
            </div>
            <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${item.on ? "bg-[#1a73e8]" : "bg-white/10"}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.on ? "left-5" : "left-1"}`} />
            </div>
          </div>
        ))}
      </section>

      {/* Danger Zone */}
      <section className="border border-red-500/20 rounded-2xl bg-[#0d0d0d] p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-4 h-4 text-red-400" />
          <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Danger Zone</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium mb-0.5">Delete Account</p>
            <p className="text-white/40 text-xs">Permanently delete your account and all data. This cannot be undone.</p>
          </div>
          <button className="ml-6 flex-shrink-0 flex items-center gap-2 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-red-300 text-sm font-medium px-4 py-2 rounded-xl transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
