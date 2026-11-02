"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Utensils, Sparkles, MapPin } from "lucide-react";
import gsap from "gsap";

export default function HensslerHero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1, clearProps: "all" }
      )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "all" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "all" },
          "-=0.5"
        )
        .fromTo(
          imageWrapperRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.1, clearProps: "all" },
          "-=0.9"
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, clearProps: "all" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#8E171D] text-[#FFF1DF] overflow-hidden border-b border-[#651217]"
      aria-label="Restaurant Hero"
    >
      {/* Subtle atmospheric backdrop vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#8E171D]/40 to-[#651217] pointer-events-none" />

      {/* Decorative architectural grid lines (HENSSLER editorial style) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between max-w-7xl mx-auto px-4 sm:px-8">
        <div className="w-[1px] h-full bg-[#FFF1DF]" />
        <div className="w-[1px] h-full bg-[#FFF1DF] hidden md:block" />
        <div className="w-[1px] h-full bg-[#FFF1DF]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 pt-12 pb-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Typographic Statement (HENSSLER inspired) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 z-10">
            {/* Editorial Eyebrow */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#651217] border border-[#C49A55]/40 text-[#C49A55] text-xs font-mono uppercase tracking-[0.25em] font-semibold">
                <Sparkles className="h-3 w-3" />
                Bengal Culinary Heritage • Estd. 2019
              </span>
              <span className="text-xs text-[#FFF1DF]/70 font-mono tracking-wider hidden sm:inline-block">
                Bangalore Hubs
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#FFF1DF] leading-[1.08]"
            >
              The Architecture of{" "}
              <span className="italic font-light text-[#C49A55]">Bengali</span>{" "}
              Gastronomy.
            </h1>

            {/* Bengali Subheading */}
            <div className="border-l-2 border-[#C49A55] pl-4 py-1">
              <p className="font-bengali text-lg sm:text-xl text-[#FFF1DF]/90 font-medium tracking-wide">
                বাংলার খাঁটি স্বাদ, মাটির হাঁড়ির ঐতিহ্য ও রন্ধনশিল্পের মেলবন্ধন
              </p>
            </div>

            {/* Short Introduction */}
            <p
              ref={textRef}
              className="text-base sm:text-lg text-[#FFF1DF]/85 leading-relaxed max-w-xl font-normal font-sans"
            >
              From the slow-simmered earthen pots of North Kolkata to the pungent, mustard-steeped
              river fish of the Padma delta. An unapologetic dedication to authentic spices,
              time-honoured home recipes, and small-batch daily preparation.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
            >
              <a
                href="#order-online"
                className="inline-flex items-center justify-center gap-3 bg-[#C49A55] hover:bg-[#b08745] text-[#292321] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Order Online</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-3 border border-[#FFF1DF]/40 hover:border-[#FFF1DF] hover:bg-[#FFF1DF]/10 text-[#FFF1DF] px-8 py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300"
              >
                <Utensils className="h-4 w-4 text-[#C49A55]" />
                <span>Explore Menu</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 border-t border-[#FFF1DF]/15 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#C49A55]">
                  100%
                </span>
                <span className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#FFF1DF]/70">
                  Authentic Recipes
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#C49A55]">
                  Small-Batch
                </span>
                <span className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#FFF1DF]/70">
                  Daily Fresh Cooking
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#C49A55]">
                  4 Hubs
                </span>
                <span className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#FFF1DF]/70">
                  Bangalore Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (HENSSLER photography style) */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageWrapperRef}
              className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] w-full overflow-hidden border border-[#C49A55]/30 shadow-2xl group bg-[#651217]"
            >
              <Image
                src="/images/hero-bengali-bhoj.jpg"
                alt="The Calcutta Cafe Grand Bengali Bhoj Thali featuring authentic fish curry, kosha mangsho, luchi, and basanti pulao"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Refined gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#651217]/90 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#292321]/90 backdrop-blur-md border border-[#C49A55]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C49A55] block">
                    Featured Masterpiece
                  </span>
                  <p className="font-serif text-base sm:text-lg text-[#FFF1DF] font-normal">
                    The Grand Bengali Bhoj
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFF1DF]/70 block">
                    Fresh Daily
                  </span>
                  <span className="text-xs font-semibold text-[#C49A55]">
                    Chef Special
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Editorial Badge (HENSSLER aesthetic) */}
            <div
              ref={badgeRef}
              className="hidden sm:flex absolute -top-5 -left-5 bg-[#651217] border border-[#C49A55]/60 text-[#FFF1DF] p-3.5 shadow-xl items-center gap-3 z-20"
            >
              <div className="w-9 h-9 rounded-full bg-[#8E171D] border border-[#C49A55] flex items-center justify-center text-[#C49A55]">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C49A55] block">
                  Cloud Kitchen Model
                </span>
                <span className="text-xs font-medium text-[#FFF1DF]">
                  Koramangala • Indiranagar • Whitefield
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

