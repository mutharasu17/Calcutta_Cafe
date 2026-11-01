"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroVideo from "./HeroVideo";

export default function CinematicHero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-end pb-20 sm:pb-28 lg:pb-32 pt-28 sm:pt-40 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#090909]">
      {/* ──────────────────────────────────────────────────────────
          GENUINE CINEMATIC HERO VIDEO WITH STATIC POSTER FALLBACK
      ────────────────────────────────────────────────────────── */}
      <HeroVideo
        videoSrc="/videos/hero-food-film.mp4"
        poster="/images/hero-bengali-bhoj.jpg"
      />

      {/* ──────────────────────────────────────────────────────────
          LEFT-ALIGNED EDITORIAL HEADLINE & ACTION COMPOSITION
      ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl w-full">
        <div className="space-y-5 sm:space-y-8">
          {/* Subtle Champagne Marker */}
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-[#C7AC83]" />
            <span className="font-mono text-[10px] sm:text-xs font-medium tracking-[0.26em] uppercase text-[#C7AC83]">
              Estd. 2019 • Bangalore Hub
            </span>
          </div>

          {/* Responsive Fluid Display Headline */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] font-light text-[#F5F0E8] tracking-tight leading-[1.04] sm:leading-[1.02]">
              THE TASTE OF BENGAL.
            </h1>
            <p className="font-serif italic text-[clamp(1.25rem,4vw,2.25rem)] text-[#C7AC83]/90 font-light">
              &ldquo;An extraordinary culinary experience.&rdquo;
            </p>
          </div>

          {/* Minimal Supporting Statement (concise, 2 lines max) */}
          <p className="max-w-lg text-xs sm:text-base text-[#A9A19A] font-light leading-relaxed">
            Discover the rich flavors and timeless traditions of authentic regional Bengali gastronomy with The Calcutta Cafe.
          </p>

          {/* Dual Action Controls (Restrained Champagne CTA) */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6">
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-3 border border-[#C7AC83] bg-[#C7AC83] px-7 py-3.5 sm:px-8 sm:py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#090909] transition-all duration-300 hover:bg-transparent hover:text-[#F5F0E8] focus:outline-none shadow-lg shadow-black/40 min-h-[48px]"
            >
              <span>Explore the Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-[#090909] group-hover:text-[#F5F0E8]" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#A9A19A] transition-colors hover:text-[#F5F0E8] border-b border-white/20 hover:border-[#C7AC83] self-center sm:self-auto min-h-[44px]"
            >
              <span>Discover Our Story</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SUBTLE INTERACTIVE SCROLL CUE (DESKTOP)
      ────────────────────────────────────────────────────────── */}
      <div className="absolute right-8 sm:right-12 bottom-12 hidden md:flex flex-col items-center gap-3 text-[10px] font-mono tracking-[0.26em] uppercase text-[#A9A19A]/50">
        <span className="[writing-mode:vertical-lr]">Scroll</span>
        <span className="h-12 w-[1px] bg-gradient-to-b from-[#C7AC83]/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
