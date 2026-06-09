"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ImageIcon, Video, Images, CreditCard, Settings, LogOut, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate/image", label: "AI Image", icon: ImageIcon },
  { href: "/generate/video", label: "AI Video", icon: Video },
  { href: "/gallery", label: "My Gallery", icon: Images },
  { href: "/pricing", label: "Buy Credits", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ credits = 0 }: { credits?: number }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <aside className="w-56 min-h-screen border-r border-white/8 flex flex-col py-5 px-3 bg-[#0a0a0a]">
      <Link href="/" className="flex items-center gap-2 px-3 mb-6">
        <div className="w-7 h-7 rounded bg-[#1a73e8] flex items-center justify-center text-xs font-black text-white">D</div>
        <span className="font-bold text-sm tracking-wide">DAVINCI</span>
      </Link>

      <nav className="flex-1 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
              pathname === href
                ? "bg-white/8 text-white font-medium"
                : "text-white/45 hover:text-white hover:bg-white/5"
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-4 space-y-2 px-1">
        <div className="border border-white/8 rounded-xl px-3 py-3 bg-white/3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span className="text-xs text-white/50">Credits</span>
            </div>
            <Link href="/pricing" className="text-xs text-[#1a73e8] hover:underline">Buy</Link>
          </div>
          <span className="text-xl font-bold text-white">{credits}</span>
          <div className="mt-2 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1a73e8] rounded-full transition-all"
              style={{ width: `${Math.min((credits / 100) * 100, 100)}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/30 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
