"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Clock, User, ImageIcon, Video, LayoutTemplate, Sparkles, PenTool } from "lucide-react";
import { LogoFull } from "./Logo";
import { cn } from "@/lib/utils";

const MAIN_NAV = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/gallery", label: "History", icon: Clock },
  { href: "/settings", label: "Profile", icon: User },
];

const TOOLS_NAV = [
  { href: "/generate/image", label: "Image Generator", icon: ImageIcon },
  { href: "/generate/video", label: "Video Generator", icon: Video },
  { href: "/templates", label: "Templates", icon: LayoutTemplate, badge: "New" },
  { href: "/spotlight", label: "Spotlight", icon: Sparkles, badge: "New" },
  { href: "/editor", label: "Image Editor", icon: PenTool },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[185px] min-h-screen flex flex-col border-r border-white/8 bg-black flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8">
        <Link href="/dashboard">
          <LogoFull size={24} />
        </Link>
        <button className="text-white/25 hover:text-white/60 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        </button>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {MAIN_NAV.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
              pathname === href ? "bg-white/10 text-white font-medium" : "text-white/50 hover:text-white hover:bg-white/5"
            )}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}

        <div className="pt-4 pb-1 px-3">
          <p className="text-[11px] text-white/25 font-medium uppercase tracking-wider">AI Tools</p>
        </div>

        {TOOLS_NAV.map(({ href, label, icon: Icon, badge }) => (
          <Link key={href} href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
              pathname === href ? "bg-white/10 text-white font-medium" : "text-white/50 hover:text-white hover:bg-white/5"
            )}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="text-[10px] bg-[#1a73e8]/20 text-[#1a73e8] px-1.5 py-0.5 rounded-full font-semibold">{badge}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
