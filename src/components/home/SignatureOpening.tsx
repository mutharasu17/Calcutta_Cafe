import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SignatureOpening() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-end pb-16 sm:pb-24 lg:pb-28 pt-32 sm:pt-36 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#171615]">
      {/* ──────────────────────────────────────────────────────────
          FULL-BLEED CINEMATIC CANVAS (ATMOSPHERIC PHOTOGRAPHY)
      ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="The Calcutta Cafe — The Soul of Bengal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
        />
        {/* Apple/NVIDIA Style Gradient Shadows (Obsidian Deep Fade) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-[#171615]/80 to-[#171615]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171615] via-[#171615]/75 to-transparent sm:via-[#171615]/60" />
        <div className="absolute inset-0 editorial-grain opacity-40 pointer-events-none" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          EDITORIAL ASYMMETRIC COMPOSITION
      ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl w-full">
        <div className="space-y-6 sm:space-y-8">
          {/* Subtle Editorial Marker */}
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-[#B79A65]" />
            <span className="font-mono text-[10px] sm:text-xs font-medium tracking-[0.26em] uppercase text-[#B79A65]">
              Estd. 2019 • Bangalore Hub
            </span>
          </div>

          {/* Master Display Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#FAF9F6] tracking-tight leading-[1.06] sm:leading-[1.02]">
            The soul of Bengal.
            <span className="block italic text-[#F4F0E8] font-normal mt-1 sm:mt-2">
              Served differently.
            </span>
          </h1>

          {/* Supporting Statement — Verified & Restrained Copy */}
          <p className="max-w-xl text-base sm:text-lg text-[#D8D0C3]/90 font-light leading-relaxed sm:leading-loose">
            Discover the flavours and traditions of Bengali cuisine with The Calcutta Cafe. An uncompromising culinary movement taking authentic regional dishes beyond boundaries.
          </p>

          {/* Action Ergonomics (Desktop & Mobile Optimized) */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-3 border border-[#B79A65] bg-[#B79A65] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#171615] transition-all duration-300 hover:bg-transparent hover:text-[#FAF9F6] focus:outline-none"
            >
              <span>Explore the Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-[#171615] group-hover:text-[#FAF9F6]" />
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#D8D0C3] transition-colors hover:text-[#FAF9F6] border-b border-white/20 hover:border-[#B79A65] pb-1.5 self-center sm:self-auto"
            >
              <span>Our Story & Founder</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SUBTLE INTERACTIVE CUE (DESKTOP)
      ────────────────────────────────────────────────────────── */}
      <div className="absolute right-8 sm:right-12 bottom-12 hidden md:flex flex-col items-center gap-3 text-[10px] font-mono tracking-[0.24em] uppercase text-[#D8D0C3]/40">
        <span className="[writing-mode:vertical-lr]">Scroll</span>
        <span className="h-12 w-[1px] bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
