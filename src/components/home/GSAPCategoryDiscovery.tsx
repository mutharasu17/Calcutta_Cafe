"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { gsap, DrawSVGPlugin, MotionPathPlugin, ScrollTrigger } from "@/lib/gsapConfig";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";

export default function GSAPCategoryDiscovery() {
  const containerRef = useRef<HTMLElement>(null);
  const categories = MENU_CATEGORIES.filter((c) => c.id !== "drinks");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      categories.forEach((cat, idx) => {
        const ring = document.getElementById(`cat-ring-path-${idx}`);
        const dot = document.getElementById(`cat-ring-dot-${idx}`);
        const card = document.getElementById(`cat-card-${idx}`);

        if (ring && card) {
          // 1. DrawSVG animation on scroll trigger
          gsap.fromTo(
            ring,
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );

          // 2. MotionPath animation for the orbiting gold marker
          if (dot) {
            gsap.to(dot, {
              motionPath: {
                path: `#cat-ring-path-${idx}`,
                align: `#cat-ring-path-${idx}`,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
              },
              duration: 14 + idx * 2.5,
              repeat: -1,
              ease: "linear",
            });
          }

          // 3. Hover interaction
          card.addEventListener("mouseenter", () => {
            gsap.to(ring, { scale: 1.05, stroke: "#8E171D", duration: 0.4, transformOrigin: "50% 50%" });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(ring, { scale: 1, stroke: "#C49A55", duration: 0.4, transformOrigin: "50% 50%" });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [categories]);

  return (
    <section
      ref={containerRef}
      id="menu-categories"
      className="bg-[#F4E8D7] text-[#292321] py-20 sm:py-28 lg:py-36 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Food Category Discovery with GSAP DrawSVG and MotionPath"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
              <Compass className="h-3.5 w-3.5 text-[#8E171D]" />
              The Culinary Spectrum • আমাদের পদসম্ভার
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#292321] leading-[1.08]">
              Explore by Culinary Tradition.
            </h2>
            <p className="text-sm sm:text-base text-[#796A60] font-sans leading-relaxed">
              From the pungent river fish of the delta to the slow-simmered earthen cauldrons of
              North Kolkata, discover Bengal’s authentic culinary repertoire.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#651217] transition-colors pb-1 border-b border-[#8E171D]/40"
          >
            <span>View Full Menu</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 6 Category Cards with GSAP DrawSVG and MotionPath Ring System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {categories.map((cat, idx) => {
            const count = MENU_ITEMS.filter((item) => item.category === cat.id).length;

            return (
              <div
                id={`cat-card-${idx}`}
                key={cat.id}
                className="group relative bg-[#FFF1DF] border border-[#E6D8C3] hover:border-[#8E171D] transition-all duration-500 overflow-hidden shadow-md hover:shadow-2xl flex flex-col justify-between"
              >
                {/* ──────────────────────────────────────────────────────────
                    IMAGE CONTAINER WITH GSAP DRAWSVG & MOTIONPATH RING
                ────────────────────────────────────────────────────────── */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6D8C3] flex items-center justify-center p-6">
                  
                  {/* Dedicated GSAP SVG Ring & MotionPath Element */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <svg
                      className="w-full h-full max-w-[280px] max-h-[280px] overflow-visible"
                      viewBox="0 0 300 300"
                    >
                      {/* Orbital Ring Track for DrawSVG */}
                      <path
                        id={`cat-ring-path-${idx}`}
                        d="M 150 20 A 130 130 0 1 1 149.9 20 Z"
                        fill="none"
                        stroke="#C49A55"
                        strokeWidth="1.8"
                        strokeDasharray="6 6"
                        opacity="0.85"
                      />
                      {/* Orbiting Gold Marker for MotionPath */}
                      <circle
                        id={`cat-ring-dot-${idx}`}
                        cx="0"
                        cy="0"
                        r="5.5"
                        fill="#8E171D"
                        stroke="#C49A55"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </div>

                  {/* Circular Masked Food Photograph */}
                  <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#C49A55] shadow-xl group-hover:scale-105 transition-transform duration-700 ease-out z-0">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 160px, 180px"
                      className="object-cover"
                    />
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="bg-[#8E171D] text-[#FFF1DF] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold shadow-sm">
                      0{idx + 1}
                    </span>
                    <span className="bg-[#FFF1DF]/90 backdrop-blur-xs text-[#292321] px-2.5 py-1 text-[10px] font-mono tracking-wider font-medium">
                      {count} Dishes
                    </span>
                  </div>

                  {/* Bengali Subtitle Pill */}
                  <div className="absolute bottom-3 left-4 right-4 z-20 text-center">
                    <span className="inline-block px-3 py-1 bg-[#651217]/85 backdrop-blur-xs text-[#C49A55] font-bengali text-xs font-medium rounded-full border border-[#C49A55]/40 shadow-sm">
                      {cat.bengaliSubtitle}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 bg-[#FFF1DF]">
                  <div>
                    <h3 className="font-serif text-2xl text-[#292321] group-hover:text-[#8E171D] transition-colors font-normal">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#796A60] leading-relaxed mt-2.5 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E6D8C3] flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#8E171D]">
                    <Link
                      href={`/menu?category=${cat.id}`}
                      className="inline-flex items-center gap-2 group-hover:text-[#651217] transition-colors"
                    >
                      <span>Explore Dishes</span>
                      <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
