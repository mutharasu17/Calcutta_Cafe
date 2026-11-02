"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Utensils, Sparkles } from "lucide-react";
import { gsap, DrawSVGPlugin } from "@/lib/gsapConfig";

export default function GSAPFullscreenHero() {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const bengaliTextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const decorativeSvgRef = useRef<SVGPathElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Image scale reveal
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }
      )
        // 2. Eyebrow
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=1.0"
        )
        // 3. Headline Line 1 & Line 2
        .fromTo(
          headlineLine1Ref.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          headlineLine2Ref.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.65"
        )
        // 4. DrawSVG on decorative accent line
        .fromTo(
          decorativeSvgRef.current,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.0, ease: "power2.inOut" },
          "-=0.6"
        )
        // 5. Bengali Supporting Text
        .fromTo(
          bengaliTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.6"
        )
        // 6. Description
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        // 7. CTAs
        .fromTo(
          ctaContainerRef.current?.children ? Array.from(ctaContainerRef.current.children) : [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.4"
        )
        // 8. Scroll indicator
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );

      // Looping scroll arrow bounce
      gsap.to(".scroll-dot", {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#292321] text-[#FFF1DF]"
      aria-label="The Calcutta Cafe — Fullscreen Cinematic Hero"
    >
      {/* ──────────────────────────────────────────────────────────
          1. FULL-BLEED BENGALI FOOD PHOTOGRAPHY WITH GSAP SCALE
      ────────────────────────────────────────────────────────── */}
      <div ref={bgImageRef} className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="The Calcutta Cafe Grand Bengali Bhoj featuring authentic river fish, kosha mangsho, luchi, and basanti pulao"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Cinematographic multi-layered gradient overlays for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85 pointer-events-none" />
      </div>

      {/* Decorative vertical architectural guidelines */}
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
        <div ref={eyebrowRef} className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#651217]/85 backdrop-blur-md border border-[#C49A55]/60 text-[#C49A55] text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] font-semibold shadow-lg">
            <Sparkles className="h-3 w-3 text-[#C49A55]" />
            THE CALCUTTA CAFE · BENGALIAN CULINARY HERITAGE
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#FFF1DF] leading-[1.04] drop-shadow-xl">
          <span ref={headlineLine1Ref} className="block">
            A Taste of Bengal.
          </span>
          <span
            ref={headlineLine2Ref}
            className="block italic font-light text-[#C49A55] mt-1 sm:mt-2"
          >
            A Story on Every Plate.
          </span>
        </h1>

        {/* Decorative DrawSVG Horizontal Line */}
        <div className="w-48 sm:w-64 my-3 sm:my-4">
          <svg viewBox="0 0 200 8" className="w-full h-2 overflow-visible">
            <path
              ref={decorativeSvgRef}
              d="M 10 4 L 90 4 L 100 1 L 110 4 L 190 4"
              fill="none"
              stroke="#C49A55"
              strokeWidth="1.5"
            />
            <circle cx="100" cy="4" r="2.5" fill="#8E171D" stroke="#C49A55" strokeWidth="1" />
          </svg>
        </div>

        {/* Bengali Supporting Text */}
        <p
          ref={bengaliTextRef}
          className="font-bengali text-lg sm:text-2xl text-[#FFF1DF]/95 font-medium tracking-wide drop-shadow-md"
        >
          বাংলার খাঁটি স্বাদ, ঐতিহ্যের নতুন অনুভূতি।
        </p>

        {/* Supporting Description */}
        <p
          ref={descriptionRef}
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#FFF1DF]/85 font-sans leading-relaxed max-w-2xl drop-shadow-sm"
        >
          Discover the rich flavours of Bengal through a thoughtful celebration of its culinary traditions.
          Prepared fresh daily in small batches across our Bangalore cloud kitchen hubs.
        </p>

        {/* Action Buttons */}
        <div
          ref={ctaContainerRef}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Link
            href="#menu-categories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C49A55] hover:bg-[#b08745] text-[#292321] px-8 sm:px-10 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-2xl hover:shadow-xl hover:-translate-y-0.5"
          >
            <Utensils className="h-4 w-4 text-[#292321]" />
            <span>Explore Menu</span>
          </Link>

          {/* Secondary CTA */}
          <a
            href="#order-online"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#8E171D]/90 hover:bg-[#8E171D] border border-[#C49A55]/60 text-[#FFF1DF] px-8 sm:px-10 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-xl backdrop-blur-sm hover:-translate-y-0.5"
          >
            <span>Order Online</span>
            <ArrowUpRight className="h-4 w-4 text-[#C49A55]" />
          </a>
        </div>

      </div>

      {/* ──────────────────────────────────────────────────────────
          3. REFINED SCROLL INDICATOR
      ────────────────────────────────────────────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C49A55] font-semibold">
          SCROLL TO DISCOVER
        </span>
        <div className="w-5 h-8 border border-[#C49A55]/50 rounded-full flex items-start justify-center p-1">
          <div className="scroll-dot w-1.5 h-2 bg-[#C49A55] rounded-full" />
        </div>
      </div>
    </section>
  );
}

