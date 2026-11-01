"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CinematicHero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-end pb-20 sm:pb-28 lg:pb-32 pt-32 sm:pt-40 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#090909]">
      {/* ──────────────────────────────────────────────────────────
          FULL-SCREEN CINEMATIC FOOD FILM / ATMOSPHERIC VISUAL
          Composed toward right side with deep obsidian negative space on left
      ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="The Taste of Bengal — Authentic Bengali Cuisine"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center filter brightness-[0.78] contrast-105 scale-[1.03] transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Vignette & Negative Space Gradients (Obsidian Fade) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/75 to-[#090909]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent sm:via-[#090909]/60" />
        
        {/* Subtle Specular Atmospheric Sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,172,131,0.08),transparent_60%)]" />
        <div className="absolute inset-0 editorial-grain opacity-35 pointer-events-none" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          LEFT-ALIGNED EDITORIAL HEADLINE & ACTION COMPOSITION
      ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl w-full">
        <div className="space-y-6 sm:space-y-8">
          {/* Subtle Champagne Marker */}
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-[#C7AC83]" />
            <span className="font-mono text-[10px] sm:text-xs font-medium tracking-[0.26em] uppercase text-[#C7AC83]">
              Estd. 2019 • Bangalore Hub
            </span>
          </div>

          {/* Left-Aligned Master Display Headline */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-[#F5F0E8] tracking-tight leading-[1.04] sm:leading-[1.02]">
              THE TASTE OF BENGAL.
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#C7AC83]/90 font-light">
              &ldquo;An extraordinary culinary experience.&rdquo;
            </p>
          </div>

          {/* Minimal Supporting Statement */}
          <p className="max-w-lg text-sm sm:text-base text-[#A9A19A] font-light leading-relaxed">
            Discover the flavours and traditions of authentic regional Bengali cuisine with The Calcutta Cafe.
          </p>

          {/* Dual Action Controls (Restrained Champagne CTA) */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-3 border border-[#C7AC83] bg-[#C7AC83] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#090909] transition-all duration-300 hover:bg-transparent hover:text-[#F5F0E8] focus:outline-none shadow-lg shadow-black/40"
            >
              <span>Explore the Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-[#090909] group-hover:text-[#F5F0E8]" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#A9A19A] transition-colors hover:text-[#F5F0E8] border-b border-white/20 hover:border-[#C7AC83] self-center sm:self-auto"
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
