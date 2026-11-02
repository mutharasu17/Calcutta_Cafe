"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";

export default function BrightFullscreenHero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const bengaliSubtitleRef = useRef<HTMLParagraphElement>(null);
  const supportingTextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const svgDecorativeLineRef = useRef<SVGLineElement>(null);
  const orbitAccentRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Image gentle scale-in & reveal
      tl.fromTo(
        imageContainerRef.current,
        { scale: 1.08, opacity: 0.8 },
        { scale: 1.0, opacity: 1, duration: 1.4, ease: "power2.out" }
      )
        // 2. Eyebrow badge entrance
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=1.0"
        )
        // 3. Headline line by line entrance
        .fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
          "-=0.7"
        )
        // 4. Bengali Subtitle & Supporting text fade upward
        .fromTo(
          [bengaliSubtitleRef.current, supportingTextRef.current],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.5"
        )
        // 5. CTA Buttons stagger
        .fromTo(
          ctaGroupRef.current?.children ? Array.from(ctaGroupRef.current.children) : [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.4"
        );

      // 6. SVG Decorative Stroke Drawing with DrawSVGPlugin
      if (svgDecorativeLineRef.current) {
        gsap.fromTo(
          svgDecorativeLineRef.current,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.2, ease: "power2.out", delay: 0.4 }
        );
      }

      // 7. Small accent moves along circular path with MotionPathPlugin
      if (orbitAccentRef.current) {
        gsap.to(orbitAccentRef.current, {
          motionPath: {
            path: "#hero-circle-track",
            align: "#hero-circle-track",
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          duration: 10,
          repeat: -1,
          ease: "none",
        });
      }

      // 8. Gentle looping scroll indicator
      gsap.to(".hero-scroll-dot", {
        y: 8,
        opacity: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 1.3,
        ease: "power1.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[100svh] flex items-center overflow-hidden bg-[#FFF8ED] text-[#292321]"
      aria-label="The Calcutta Cafe Culinary Hero"
    >
      {/* ──────────────────────────────────────────────────────────
          BRIGHT FOOD PHOTOGRAPHY LAYER (NATURAL LIGHT & WARMTH)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      >
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="Authentic grand Bengali Bhoj banquet with Kosha Mangsho, Luchi, Shorshe Ilish, and fragrant Basanti Pulao"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right] sm:object-center brightness-[1.03] contrast-[1.02]"
        />

        {/* 
          Bright Warm Editorial Gradient Overlay:
          Ensures text is 100% crisp and readable while keeping the photography luminous and inviting.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8ED] via-[#FFF8ED]/85 to-transparent sm:w-[65%] w-full z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8ED] via-transparent to-[#FFF8ED]/40 z-1" />
      </div>

      {/* ──────────────────────────────────────────────────────────
          HERO EDITORIAL CONTENT & TYPOGRAPHY
      ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 w-full pt-16 sm:pt-20">
        <div className="max-w-2xl space-y-6 sm:space-y-7">
          
          {/* Eyebrow Label with Ornamental Accents */}
          <div ref={eyebrowRef} className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF8ED]/95 backdrop-blur-md border border-[#C49A55]/40 text-[#8E171D] text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] font-semibold shadow-xs">
              <Sparkles className="h-3 w-3 text-[#C49A55]" />
              THE CALCUTTA CAFE · BENGALIAN CULINARY HERITAGE
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#292321] leading-[1.06] tracking-tight">
            <span ref={headlineLine1Ref} className="block">
              A Taste of Bengal.
            </span>
            <span
              ref={headlineLine2Ref}
              className="block italic text-[#8E171D] font-light mt-1"
            >
              A Story on Every Plate.
            </span>
          </h1>

          {/* Bengali Subtitle */}
          <p
            ref={bengaliSubtitleRef}
            className="font-bengali text-base sm:text-xl text-[#8E171D] font-medium leading-relaxed tracking-wide"
          >
            বাংলার খাঁটি স্বাদ, ঐতিহ্যের নতুন অনুভূতি।
          </p>

          {/* SVG Animated Decorative Line */}
          <div className="relative w-48 sm:w-64 h-3 flex items-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 240 10"
              fill="none"
            >
              <line
                ref={svgDecorativeLineRef}
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
          <p
            ref={supportingTextRef}
            className="text-base sm:text-lg text-[#5C524B] font-sans leading-relaxed max-w-xl"
          >
            Discover the rich flavours of Bengal through a thoughtful celebration of its culinary traditions.
            Slow-braised Sunday Kosha Mangsho, cloud-soft Luchis, and fresh river catch — cooked daily with century-old family recipes and pure mustard oil.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2"
          >
            {/* Primary Button: Explore Menu */}
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-3 bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF8ED] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#C49A55]/40"
            >
              <span>Explore Menu</span>
              <ArrowRight className="h-4 w-4 text-[#C49A55]" />
            </Link>

            {/* Secondary Button: Order Online */}
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-3 bg-[#FFF8ED]/90 hover:bg-[#FFF8ED] text-[#292321] hover:text-[#8E171D] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 border border-[#C49A55]/50"
            >
              <span>Order Online</span>
              <span className="font-mono text-[10px] text-[#8E171D] font-bold">Bangalore</span>
            </Link>
          </div>

          {/* Quality Assurance Badges */}
          <div className="pt-2 flex items-center gap-6 text-[11px] font-mono uppercase tracking-wider text-[#5C524B]">
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
          SVG THIN GOLD CIRCULAR GRAPHIC WITH MOTIONPATH ORBIT
      ────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none z-10 w-72 h-72">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
          <circle
            id="hero-circle-track"
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#C49A55"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.4"
          />
          <circle
            ref={orbitAccentRef}
            cx="100"
            cy="20"
            r="4"
            fill="#8E171D"
            stroke="#C49A55"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SCROLL DOWN INDICATOR AT BOTTOM
      ────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5C524B] font-medium">
          Scroll to Discover
        </span>
        <div className="w-5 h-8 border border-[#C49A55]/60 rounded-full flex justify-center p-1 bg-[#FFF8ED]/80 backdrop-blur-xs">
          <div className="hero-scroll-dot w-1.5 h-2 bg-[#8E171D] rounded-full" />
        </div>
      </div>
    </section>
  );
}

