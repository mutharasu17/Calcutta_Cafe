import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showSubtitle?: boolean;
}

export default function BrandLogo({
  className = "",
  size = "md",
  variant = "light",
  showSubtitle = true,
}: BrandLogoProps) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  const dimensionClass = isLarge
    ? "w-12 h-12"
    : isSmall
    ? "w-8 h-8"
    : "w-10 h-10";

  const pixelSize = isLarge ? 48 : isSmall ? 32 : 40;

  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-95 ${className}`}
      aria-label="The Calcutta Cafe — Home"
    >
      {/* Official Circular Medallion Starburst Logo */}
      <div
        className={`relative ${dimensionClass} rounded-full overflow-hidden border-2 border-[#FFB834] shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-105 bg-[#5B1B8A]`}
      >
        <Image
          src="/images/brand/logo.jpeg"
          alt="The Calcutta Cafe Official Logo"
          width={pixelSize}
          height={pixelSize}
          className="w-full h-full object-cover"
          priority={isLarge}
        />
      </div>

      {/* Typography Wordmark & Dual-Script Bengali Subtitle */}
      <div className="flex flex-col">
        <span
          className={`font-serif tracking-tight font-semibold leading-none transition-colors duration-200 ${
            isDark ? "text-[#FFF8ED]" : "text-[#2D231E] group-hover:text-[#5B1B8A]"
          } ${isLarge ? "text-xl sm:text-2xl" : isSmall ? "text-sm" : "text-base sm:text-lg"}`}
        >
          THE CALCUTTA CAFE
        </span>

        {showSubtitle && (
          <span
            className={`font-bengali tracking-wider mt-1 font-medium transition-colors duration-200 ${
              isDark ? "text-[#FFB834]" : "text-[#5B1B8A]"
            } ${isLarge ? "text-xs" : isSmall ? "text-[8.5px]" : "text-[10px]"}`}
          >
            দ্য ক্যালকাটা ক্যাফে • Online Delivery
          </span>
        )}
      </div>
    </Link>
  );
}
