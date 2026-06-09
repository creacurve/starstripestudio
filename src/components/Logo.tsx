// StarStripeStudio logo — star + diagonal stripe SVG mark
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dark rounded square bg */}
      <rect width="32" height="32" rx="8" fill="#0a0a0a"/>
      {/* Diagonal stripe */}
      <path d="M6 26 L26 6" stroke="url(#stripe)" strokeWidth="4" strokeLinecap="round"/>
      {/* Star shape */}
      <path d="M16 4L17.8 10.2H24.2L19.2 14.1L21 20.3L16 16.4L11 20.3L12.8 14.1L7.8 10.2H14.2L16 4Z" fill="url(#star)"/>
      <defs>
        <linearGradient id="stripe" x1="6" y1="26" x2="26" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a73e8"/>
          <stop offset="1" stopColor="#60a5fa"/>
        </linearGradient>
        <linearGradient id="star" x1="7.8" y1="4" x2="24.2" y2="20.3" gradientUnits="userSpaceOnUse">
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
