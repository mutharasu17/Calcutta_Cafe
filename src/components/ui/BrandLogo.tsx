import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
}

export default function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 ${className}`}
      aria-label="The Calcutta Cafe - Return to Homepage"
    >
      {/* Handcrafted Architectural Emblem SVG */}
      <div className="relative flex items-center justify-center">
        <div
          className={`relative rounded-xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#1E1412] to-[#0E1522] shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-105 ${
            isLarge ? "h-14 w-14" : isSmall ? "h-9 w-9" : "h-11 w-11"
          } flex items-center justify-center`}
        >
          {/* Bengali Cultural Terracotta Arched Emblem */}
          <svg
            viewBox="0 0 100 100"
            className={`${isLarge ? "h-9 w-9" : isSmall ? "h-6 w-6" : "h-7 w-7"} text-[#D4AF37]`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Decorative Circle */}
            <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            
            {/* Heritage Archway / Howrah Bridge Subtle Truss Contour */}
            <path
              d="M20 74 L20 48 Q50 20 80 48 L80 74"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Inner Arch Accent */}
            <path
              d="M30 74 L30 52 Q50 32 70 52 L70 74"
              stroke="#8B1E1E"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Bengali Earthen Lamp / Flame Accent */}
            <path
              d="M50 36 Q56 46 50 56 Q44 46 50 36 Z"
              fill="#D4AF37"
            />
            <circle cx="50" cy="48" r="3" fill="#8B1E1E" />
            
            {/* Base Pedestal Line */}
            <line x1="14" y1="74" x2="86" y2="74" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="79" x2="78" y2="79" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col">
        <span
          className={`font-serif tracking-wider text-[#FAF6F0] font-semibold uppercase leading-tight ${
            isLarge ? "text-2xl" : isSmall ? "text-base" : "text-lg"
          }`}
          style={{ fontFamily: "var(--font-serif, serif)" }}
        >
          THE CALCUTTA <span className="text-[#D4AF37]">CAFE</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-widest text-[#D4AF37]/90 font-medium">
            দি ক্যালকাটা ক্যাফে
          </span>
          <span className="h-1 w-1 rounded-full bg-[#8B1E1E]" />
          <span className="text-[9px] uppercase tracking-wider text-neutral-400">
            ESTD 2019
          </span>
        </div>
      </div>
    </Link>
  );
}
