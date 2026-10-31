import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignatureOpening() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 sm:pb-28 pt-36 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#171615]">
      {/* Full-Bleed Atmospheric Photography Canvas */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="The Calcutta Cafe — The Soul of Bengal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
        />
        {/* Apple/NVIDIA Style Gradient Shadows (Obsidian Fade) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-[#171615]/75 to-[#171615]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171615]/90 via-[#171615]/50 to-transparent" />
        <div className="absolute inset-0 editorial-grain opacity-50 pointer-events-none" />
      </div>

      {/* Asymmetric Content Composition */}
      <div className="relative z-10 max-w-5xl w-full">
        <div className="space-y-6">
          {/* Subtle Editorial Mark */}
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#B79A65]" />
            <span className="text-xs font-medium tracking-[0.22em] uppercase text-[#B79A65]">
              Estd. 2019 • Bangalore
            </span>
          </div>

          {/* Master Display Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-[#FAF9F6] tracking-tight leading-[1.04]">
            The soul of Bengal.
            <span className="block italic text-[#F4F0E8] font-normal">
              Served differently.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-xl text-base sm:text-lg text-[#D8D0C3]/90 font-light leading-relaxed">
            Discover the flavours and traditions of Bengali cuisine with The Calcutta Cafe. An uncompromising culinary movement taking authentic regional dishes beyond borders.
          </p>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-8">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 border border-[#B79A65] bg-[#B79A65] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171615] transition-all duration-300 hover:bg-transparent hover:text-[#FAF9F6]"
            >
              <span>Explore the Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#D8D0C3] transition-colors hover:text-[#FAF9F6] border-b border-white/20 pb-1"
            >
              <span>Discover Our Story</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="absolute right-8 bottom-12 hidden lg:flex flex-col items-center gap-3 text-[11px] font-mono tracking-widest uppercase text-[#D8D0C3]/40">
        <span className="[writing-mode:vertical-lr]">Scroll</span>
        <span className="h-10 w-[1px] bg-white/20 animate-pulse" />
      </div>
    </section>
  );
}
