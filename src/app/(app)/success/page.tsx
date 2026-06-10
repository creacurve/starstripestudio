"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Zap, ArrowRight, Sparkles, Loader2 } from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-400" />
      </div>

      <h1 className="text-3xl font-black text-white mb-2">Payment successful!</h1>
      <p className="text-white/50 mb-8 max-w-sm mx-auto">
        Your credits have been added to your account. Start creating right now!
      </p>

      <div className="inline-flex items-center gap-2 bg-[#1a73e8]/15 border border-[#1a73e8]/30 text-[#1a73e8] px-5 py-2.5 rounded-full text-base font-bold mb-8">
        <Zap className="w-4 h-4" />
        Credits added to your account
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/generate/image"
          className="flex items-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-3 rounded-xl font-semibold transition-all">
          <Sparkles className="w-4 h-4" /> Generate Image
        </Link>
        <Link href="/generate/video"
          className="flex items-center gap-2 border border-white/15 hover:bg-white/5 text-white px-6 py-3 rounded-xl font-semibold transition-all">
          Generate Video <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <Link href="/dashboard" className="block mt-6 text-sm text-white/30 hover:text-white transition-colors">
        Go to dashboard
      </Link>

      {sessionId && (
        <p className="mt-4 text-xs text-white/20">Ref: {sessionId.slice(-12)}</p>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <Suspense fallback={
        <div className="flex items-center gap-2 text-white/40">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading…
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
