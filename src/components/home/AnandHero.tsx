"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Utensils, Sparkles, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnandHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          textRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          imageRef.current,
          {
            scale: 0.96,
            opacity: 0,
            duration: 1.0,
          },
          "-=0.7"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FFFDF8] border-b border-[#E6D8C3] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-8 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Editorial Column (Left on Desktop: 5 Cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-[#F5EFE4] px-3.5 py-1.5 border border-[#E6D8C3] text-[11px] font-mono uppercase tracking-[0.22em] text-[#7A382B] font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>Estd. 2019 • Culinary Repertoire</span>
            </div>

            <h1
              ref={headlineRef}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.06]"
            >
              THE TASTE OF BENGAL,{" "}
              <span className="italic font-light text-[#7A382B] block sm:inline">
                BEYOND BOUNDARIES.
              </span>
            </h1>

            <p
              ref={textRef}
              className="text-xs sm:text-sm lg:text-base text-[#6B6357] font-normal leading-relaxed max-w-lg"
            >
              From slow-braised Kosha Mangsho to wild river Hilsa, golden puffed
              luchis, and earthen claypot sweets—an unapologetic celebration of
              Bengal&apos;s culinary soul, handcrafted fresh daily in Bangalore.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
            >
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 bg-[#7A382B] hover:bg-[#5E2B21] text-[#FFFDF8] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Explore The Repertoire</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/order"
                className="inline-flex items-center gap-2 bg-[#F5EFE4] hover:bg-[#E6D8C3] text-[#29251F] border border-[#E6D8C3] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Utensils className="h-3.5 w-3.5 text-[#7A382B]" />
                <span>Order Online</span>
              </Link>
            </div>

            {/* Bangalore Hubs Micro-Badge */}
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#6B6357]">
              <MapPin className="h-3.5 w-3.5 text-[#7A382B]" />
              <span>Bangalore Delivery: Indiranagar • Koramangala • Whitefield</span>
            </div>
          </div>

          {/* Visual Photography Column (Right on Desktop: 7 Cols) */}
          <div
            ref={imageRef}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3] shadow-md group">
              <Image
                src="/images/hero-bengali-bhoj.jpg"
                alt="The Calcutta Cafe — Traditional Bengali Bhoj Feast"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center filter brightness-[0.98] contrast-[1.03] group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Floating Anand-style Editorial Tag */}
              <div className="absolute top-4 left-4 bg-[#FFFDF8]/95 backdrop-blur-sm px-3.5 py-1.5 border border-[#E6D8C3] text-[11px] font-mono text-[#7A382B] font-semibold">
                TRADITIONAL BENGALI BHOJ • পঞ্চব্যঞ্জন
              </div>

              {/* Bottom Subtle Pill */}
              <div className="absolute bottom-4 right-4 bg-[#29251F]/85 backdrop-blur-sm px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#FFFDF8]">
                Small-Batch Daily Cooking
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
