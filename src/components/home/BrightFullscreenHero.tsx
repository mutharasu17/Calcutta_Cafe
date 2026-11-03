"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BrightFullscreenHero() {
  return (
    <section
      className="relative w-full h-[100svh] min-h-[580px] sm:min-h-[640px] flex items-center overflow-hidden bg-white text-[#292321] border-b border-[#8E171D]/20"
      aria-label="The Calcutta Cafe Culinary Hero"
    >
      {/* ──────────────────────────────────────────────────────────
          STABLE, HIGH-PERFORMANCE PHOTOGRAPHY CANVAS
          No parallax scale-in, preventing layout shifts (CLS: 0)
      ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="Authentic grand Bengali Bhoj banquet with Kosha Mangsho, Luchi, Shorshe Ilish, and fragrant Basanti Pulao"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] sm:object-center brightness-[1.03] contrast-[1.02]"
        />

        {/* 
          Bright White & Red Editorial Gradient Overlay:
          Ensures text is 100% crisp and readable across all screen sizes
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/90 to-transparent sm:w-[68%] w-full z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/40 sm:to-transparent z-1" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          HERO EDITORIAL CONTENT & TYPOGRAPHY
          Stable cinematic layout without distracting entrance delay
      ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 w-full pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          
          {/* Eyebrow Label with Ornamental Accents */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-white/95 backdrop-blur-md border border-[#8E171D]/30 text-[#8E171D] text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.25em] font-semibold shadow-xs">
              <Sparkles className="h-3 w-3 text-[#C49A55] flex-shrink-0" />
              <span>THE CALCUTTA CAFE · ESTD. 2019</span>
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-normal text-[#292321] leading-[1.08] sm:leading-[1.06] tracking-tight">
            <span className="block">
              A Taste of Bengal.
            </span>
            <span className="block italic text-[#8E171D] font-light mt-0.5 sm:mt-1">
              A Story on Every Plate.
            </span>
          </h1>

          {/* Bengali Subtitle */}
          <p className="font-bengali text-sm sm:text-lg lg:text-xl text-[#8E171D] font-medium leading-relaxed tracking-wide">
            বাংলার খাঁটি স্বাদ, ঐতিহ্যের নতুন অনুভূতি।
          </p>

          {/* Static SVG Decorative Accent Line */}
          <div className="relative w-40 sm:w-56 h-3 flex items-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 240 10"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="5"
                x2="240"
                y2="5"
                stroke="#C49A55"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="120" cy="5" r="3" fill="#8E171D" />
            </svg>
          </div>

          {/* Supporting Narrative Copy */}
          <p className="text-xs sm:text-base lg:text-lg text-[#5C524B] font-sans leading-relaxed max-w-xl">
            Discover the rich flavours of Bengal through a thoughtful celebration of its culinary traditions.
            Slow-braised Sunday Kosha Mangsho, cloud-soft Luchis, and fresh river catch — cooked daily with century-old family recipes and pure mustard oil.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            {/* Primary Button: Explore Menu */}
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2.5 bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF8ED] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg border border-[#C49A55]/40 text-center active:scale-[0.99]"
            >
              <span>Explore Menu</span>
              <ArrowRight className="h-4 w-4 text-[#C49A55]" />
            </Link>

            {/* Secondary Button: Order Online */}
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#FFF8ED] text-[#292321] hover:text-[#8E171D] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-all duration-300 shadow-xs hover:shadow-md border border-[#8E171D]/40 text-center active:scale-[0.99]"
            >
              <span>Order Online</span>
              <span className="font-mono text-[10px] text-[#8E171D] font-bold">Bangalore</span>
            </Link>
          </div>

          {/* Quality Assurance Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#5C524B]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E171D]" />
              Small-Batch Cooking
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A55]" />
              Pure Kacchi Ghani Mustard Oil
            </span>
          </div>

        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          STATIC SUBTLE GOLD ACCENT COMPASS MEDALLION (DESKTOP)
          No infinite orbiting or spinning motion
      ────────────────────────────────────────────────────────── */}
      <div className="hidden xl:block absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none z-10 w-64 h-64 opacity-50" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#C49A55"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            stroke="#8E171D"
            strokeWidth="0.75"
            strokeOpacity="0.6"
          />
          <circle cx="100" cy="20" r="3" fill="#8E171D" />
          <circle cx="100" cy="180" r="3" fill="#8E171D" />
          <circle cx="20" cy="100" r="3" fill="#8E171D" />
          <circle cx="180" cy="100" r="3" fill="#8E171D" />
        </svg>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SUBTLE STATIC SCROLL HINT AT BOTTOM
      ────────────────────────────────────────────────────────── */}
      <div className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5C524B]/80 font-medium">
          Scroll to Discover
        </span>
        <div className="w-4 h-7 border border-[#8E171D]/40 rounded-full flex justify-center p-1 bg-white/80">
          <div className="w-1 h-1.5 bg-[#8E171D] rounded-full" />
        </div>
      </div>
    </section>
  );
}
