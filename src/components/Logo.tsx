export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <circle cx="16" cy="16" r="14" stroke="url(#ring)" strokeWidth="2.5"/>
      {/* Inner S-curve spark */}
      <path
        d="M11 12 C11 9.5 13.5 8 16 9.5 C18.5 11 21 10 21 12.5 C21 15 18.5 16 16 17.5 C13.5 19 11 20 11 22.5 C11 25 14 26 16 24"
        stroke="url(#spark)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="ring" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a73e8"/>
          <stop offset="1" stopColor="#60a5fa"/>
        </linearGradient>
        <linearGradient id="spark" x1="11" y1="8" x2="21" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff"/>
          <stop offset="1" stopColor="#93c5fd"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoFull({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <div className="flex flex-col leading-none">
        <span className="font-black text-white tracking-tight" style={{ fontSize: size * 0.5 }}>StarStripe</span>
        <span className="font-medium text-white/50 tracking-widest uppercase" style={{ fontSize: size * 0.28 }}>Studio</span>
      </div>
    </div>
  );
}
