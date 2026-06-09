"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Zap } from "lucide-react";

const LABELS: Record<string, string> = {
  "/dashboard": "Home",
  "/explore": "Explore",
  "/gallery": "History",
  "/settings": "Profile",
  "/generate/image": "Image Generator",
  "/generate/video": "Video Generator",
  "/templates": "Templates",
  "/spotlight": "Spotlight",
  "/editor": "Image Editor",
  "/pricing": "Buy Credits",
};

export default function DashboardTopbar() {
  const pathname = usePathname();
  const label = LABELS[pathname] ?? "Dashboard";

  return (
    <header className="flex items-center justify-between px-6 h-12 border-b border-white/8 flex-shrink-0 bg-black">
      <p className="text-sm font-medium text-white/60">{label}</p>
      <div className="flex items-center gap-3">
        <Link href="/pricing" className="text-sm text-white/40 hover:text-white transition-colors">Pricing</Link>
        <Link href="/pricing" className="flex items-center gap-1.5 bg-[#1a73e8]/15 border border-[#1a73e8]/30 text-[#1a73e8] px-2.5 py-1 rounded-full text-xs font-semibold hover:bg-[#1a73e8]/25 transition-all">
          <Zap className="w-3 h-3" /> Credits
        </Link>
        <Link href="/pricing" className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all">Upgrade</Link>
      </div>
    </header>
  );
}
