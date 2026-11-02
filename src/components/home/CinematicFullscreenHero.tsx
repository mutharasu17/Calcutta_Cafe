"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Utensils, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function CinematicFullscreenHero() {
  return (
    <section
      className="relative w-full h-[100svh] min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#292321] text-[#FFF1DF]"
      aria-label="The Calcutta Cafe — Fullscreen Cinematic Hero"
    >
      {/* ──────────────────────────────────────────────────────────
          1. FULL-BLEED BACKGROUND FOOD PHOTOGRAPHY WITH REVEAL
      ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="The Calcutta Cafe Grand Bengali Feast featuring authentic River Fish, Kosha Mangsho, Luchi, and Basanti Pulao"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Cinematographic multi-layered gradient overlays for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85 pointer-events-none" />
      </motion.div>

      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex justify-between max-w-7xl mx-auto px-4 sm:px-8">
        <div className="w-[1px] h-full bg-[#FFF1DF]" />
        <div className="w-[1px] h-full bg-[#FFF1DF] hidden md:block" />
        <div className="w-[1px] h-full bg-[#FFF1DF]" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. DESIGNED TEXT LAYERED DIRECTLY OVER THE IMAGE
      ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 lg:px-12 text-center flex flex-col items-center justify-center pt-16 sm:pt-20">
        
        {/* Small Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#651217]/80 backdrop-blur-md border border-[#C49A55]/50 text-[#C49A55] text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] font-semibold">
            <Sparkles className="h-3 w-3 text-[#C49A55]" />
            THE CALCUTTA CAFE · BENGALI CULINARY HERITAGE
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#FFF1DF] leading-[1.04] drop-shadow-lg"
        >
          A Taste of Bengal.
          <span className="block italic font-light text-[#C49A55] mt-1 sm:mt-2">
            A Story on Every Plate.
          </span>
        </motion.h1>

        {/* Bengali Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-4 sm:mt-5"
        >
          <p className="font-bengali text-lg sm:text-2xl text-[#FFF1DF]/95 font-medium tracking-wide drop-shadow-md">
            বাংলার খাঁটি স্বাদ, ঐতিহ্যের নতুন অনুভূতি।
          </p>
        </motion.div>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#FFF1DF]/85 font-sans leading-relaxed max-w-2xl drop-shadow-sm"
        >
          Discover the rich flavours and culinary traditions of Bengal, thoughtfully presented for
          the modern table. Small-batch daily cooking, unadulterated mustard oils, and timeless recipes.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Link
            href="#menu-categories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C49A55] hover:bg-[#b08745] text-[#292321] px-8 sm:px-10 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-2xl hover:shadow-xl hover:-translate-y-0.5"
          >
            <Utensils className="h-4 w-4 text-[#292321]" />
            <span>Explore Our Menu</span>
          </Link>

          {/* Secondary CTA */}
          <a
            href="#order-online"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#8E171D]/90 hover:bg-[#8E171D] border border-[#C49A55]/60 text-[#FFF1DF] px-8 sm:px-10 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-xl backdrop-blur-sm hover:-translate-y-0.5"
          >
            <span>Order Online</span>
            <ArrowUpRight className="h-4 w-4 text-[#C49A55]" />
          </a>
        </motion.div>

      </div>

      {/* ──────────────────────────────────────────────────────────
          3. REFINED SCROLL INDICATOR (HENSSLER / MOTION STYLE)
      ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C49A55] font-semibold">
          SCROLL TO DISCOVER
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-[#C49A55]/50 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-[#C49A55] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

