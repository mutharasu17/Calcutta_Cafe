"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Utensils } from "lucide-react";

export default function RetailHeroBanner() {
  return (
    <section className="relative bg-[#FFFDF8] border-b border-[#E6D8C3] overflow-hidden">
      {/* ──────────────────────────────────────────────────────────
          HERO PROMOTIONAL BANNER (ANAND SWEETS RETAIL STYLE)
      ────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="relative overflow-hidden bg-[#F5EFE4] border border-[#E6D8C3] shadow-md">
          {/* Main Hero Visual Aspect Ratio Container */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] lg:aspect-[24/10] w-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px]">
            <Image
              src="/images/hero-bengali-bhoj.jpg"
              alt="The Calcutta Cafe — Royal Bengali Culinary Feast"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center filter brightness-[0.96] contrast-[1.04]"
            />

            {/* Subtle Gradient Vignette to ensure text readability while keeping food 100% visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:bg-gradient-to-r sm:from-black/75 sm:via-black/40 sm:to-transparent" />

            {/* Editorial Content Overlay (Carefully Positioned so Food Is Unobstructed) */}
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-16 flex flex-col justify-end sm:justify-center max-w-2xl text-[#FFFDF8] space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#7A382B]/90 backdrop-blur-sm px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-[#FFFDF8] self-start border border-[#7A382B]">
                <Sparkles className="h-3 w-3 text-[#B68A52]" />
                <span>The Bengal Culinary Repertoire • Estd. 2019</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.06] text-[#FFFDF8]">
                The Royal Heritage of Bengal,{" "}
                <span className="italic font-light text-[#E6D8C3] block sm:inline">
                  Delivered Fresh.
                </span>
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-[#FFFDF8]/90 font-normal leading-relaxed max-w-lg line-clamp-3 sm:line-clamp-none">
                Handcrafted regional masterpieces from slow-braised Kosha Mangsho to river Hilsa, golden puffed luchis, and earthen claypot sweets—prepared strictly to heritage methods in Bangalore.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="/menu"
                  className="group inline-flex items-center gap-2 bg-[#7A382B] hover:bg-[#5E2B21] text-[#FFFDF8] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Explore The Repertoire</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 bg-[#FFFDF8]/90 hover:bg-[#FFFDF8] text-[#29251F] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-md backdrop-blur-sm"
                >
                  <Utensils className="h-3.5 w-3.5 text-[#7A382B]" />
                  <span>Order Online</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

