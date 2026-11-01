"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroVideo from "./HeroVideo";

export default function CinematicHero() {
  return (
    <section className="relative bg-[#F5EFE4] px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ──────────────────────────────────────────────────────────
              LEFT: EDITORIAL HEADLINE & BRAND STATEMENT (5 COLS)
          ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Small Editorial Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-[1.5px] w-8 bg-[#7A382B]" />
              <span className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#7A382B]">
                Estd. 2019 • Bangalore Hub
              </span>
            </div>

            {/* Campaign Display Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-[clamp(2.75rem,7vw,5.25rem)] font-normal text-[#29251F] tracking-tight leading-[1.04]">
                THE TASTE OF BENGAL,{" "}
                <span className="italic block text-[#7A382B] font-light">
                  BEYOND BOUNDARIES.
                </span>
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-[#6B6357] font-normal">
                &ldquo;Bringing the soul, flavour, and stories of Bengal to life.&rdquo;
              </p>
            </div>

            {/* Concise Supporting Description */}
            <p className="max-w-md text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
              Discover the richness of authentic regional Bengali gastronomy—from slow-cooked kosha gravies to earthen claypot sweets, delivered fresh from our Bangalore central kitchen.
            </p>

            {/* Actions: Primary Terracotta CTA & Secondary Story Link */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/menu"
                className="group inline-flex items-center justify-center gap-3 bg-[#7A382B] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#F5EFE4] transition-all duration-300 hover:bg-[#5E2B21] shadow-md min-h-[48px]"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="editorial-link inline-flex items-center justify-center py-3 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#29251F] hover:text-[#7A382B] self-center sm:self-auto min-h-[44px]"
              >
                <span>Our Story</span>
              </Link>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              RIGHT: CINEMATIC FOOD VISUAL / VIDEO REEL (7 COLS)
              Dominant visual area occupying ~58% of desktop width
          ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] w-full">
              <HeroVideo
                videoSrc="/videos/hero-food-film.mp4"
                poster="/images/hero-bengali-bhoj.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
