"use client";
import { useState } from "react";
import Link from "next/link";
import { LogoFull } from "@/components/Logo";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          
          <span className="font-bold text-lg tracking-wide">StarStripe</span>
        </Link>

        <div className="border border-white/10 rounded-2xl p-8 bg-[#0d0d0d]">
          <h1 className="text-2xl font-bold mb-1">Sign in</h1>
          <p className="text-white/40 text-sm mb-6">Welcome back to StarStripe Studio</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#1a73e8]/60 transition-colors"
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block uppercase tracking-wider">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#1a73e8]/60 transition-colors"
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-50 py-2.5 rounded-xl font-semibold text-sm transition-all">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-white/30 mt-6">
            No account?{" "}
            <Link href="/signup" className="text-[#1a73e8] hover:underline">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
