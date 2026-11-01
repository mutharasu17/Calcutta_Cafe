import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3.5 transition-opacity duration-200 hover:opacity-90 ${className}`}
      aria-label="The Calcutta Cafe — Home"
    >
      {/* Architectural Heritage Emblem */}
      <div
        className={`relative flex items-center justify-center border border-[#B79A65]/40 bg-[#171615] transition-colors duration-300 group-hover:border-[#B79A65] ${
          isLarge ? "h-12 w-12" : isSmall ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className={`${isLarge ? "h-7 w-7" : isSmall ? "h-5 w-5" : "h-6 w-6"} text-[#B79A65]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Frame */}
          <rect x="12" y="12" width="76" height="76" stroke="#B79A65" strokeWidth="1.2" opacity="0.4" />
          
          {/* Heritage Archway / Howrah Truss Geometry */}
          <path
            d="M26 72 L26 46 Q50 24 74 46 L74 72"
            stroke="#B79A65"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Inner Traditional Flame Motif */}
          <path
            d="M50 36 C55 45 54 52 50 56 C46 52 45 45 50 36 Z"
            fill="#B79A65"
          />
          <circle cx="50" cy="48" r="2.5" fill="#641F2B" />
          
          {/* Architectural Pedestal Lines */}
          <line x1="20" y1="72" x2="80" y2="72" stroke="#B79A65" strokeWidth="2" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-serif tracking-tight text-[#FAF9F6] font-semibold leading-none ${
            isLarge ? "text-xl" : isSmall ? "text-sm" : "text-base sm:text-lg"
          }`}
        >
          THE CALCUTTA CAFE
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#B79A65] mt-1 font-normal">
          Black Label
        </span>
      </div>
    </Link>
  );
}
