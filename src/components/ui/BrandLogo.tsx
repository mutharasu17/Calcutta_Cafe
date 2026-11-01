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
      {/* Heritage Architectural Emblem */}
      <div
        className={`relative flex items-center justify-center border border-[#C7AC83]/35 bg-[#090909] transition-colors duration-300 group-hover:border-[#C7AC83] ${
          isLarge ? "h-11 w-11" : isSmall ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className={`${isLarge ? "h-6 w-6" : isSmall ? "h-4.5 w-4.5" : "h-5 w-5"} text-[#C7AC83]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Frame */}
          <rect x="14" y="14" width="72" height="72" stroke="#C7AC83" strokeWidth="1.2" opacity="0.35" />
          
          {/* Heritage Archway / Howrah Truss Geometry */}
          <path
            d="M26 72 L26 46 Q50 24 74 46 L74 72"
            stroke="#C7AC83"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Inner Traditional Flame Motif */}
          <path
            d="M50 36 C55 45 54 52 50 56 C46 52 45 45 50 36 Z"
            fill="#C7AC83"
          />
          <circle cx="50" cy="48" r="2.5" fill="#651F2B" />
          
          {/* Architectural Pedestal Lines */}
          <line x1="22" y1="72" x2="78" y2="72" stroke="#C7AC83" strokeWidth="2" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-serif tracking-tight text-[#F5F0E8] font-medium leading-none ${
            isLarge ? "text-xl" : isSmall ? "text-sm" : "text-base sm:text-lg"
          }`}
        >
          THE CALCUTTA CAFE
        </span>
        <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#C7AC83] mt-1 font-medium">
          Bengal Culinary Repertoire
        </span>
      </div>
    </Link>
  );
}
