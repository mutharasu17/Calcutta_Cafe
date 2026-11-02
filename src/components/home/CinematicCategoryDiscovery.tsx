"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";

// Distinct orbital parameters for each category card
const RING_CONFIGS = [
  { duration: 22, size: 260, strokeWidth: 1.5, dashArray: "6 8", dotSize: 5 },
  { duration: 28, size: 270, strokeWidth: 1.5, dashArray: "8 6", dotSize: 6 },
  { duration: 20, size: 250, strokeWidth: 1.5, dashArray: "4 6", dotSize: 4.5 },
  { duration: 25, size: 265, strokeWidth: 1.5, dashArray: "7 7", dotSize: 5.5 },
  { duration: 24, size: 275, strokeWidth: 1.5, dashArray: "5 7", dotSize: 5 },
  { duration: 21, size: 255, strokeWidth: 1.5, dashArray: "6 6", dotSize: 4.5 },
];

export default function CinematicCategoryDiscovery() {
  const categories = MENU_CATEGORIES.filter((c) => c.id !== "drinks");

  return (
    <section
      id="menu-categories"
      className="bg-[#F4E8D7] text-[#292321] py-20 sm:py-28 lg:py-36 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Food Category Discovery with Ring Motion"
    >
      {/* Decorative architectural background line */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between max-w-7xl mx-auto px-4 sm:px-8">
        <div className="w-[1px] h-full bg-[#8E171D]" />
        <div className="w-[1px] h-full bg-[#8E171D]" />
      </div>

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
            <span>View Complete Menu</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 6 Category Cards with Individual Ring Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {categories.map((cat, idx) => {
            const count = MENU_ITEMS.filter((item) => item.category === cat.id).length;
            const ring = RING_CONFIGS[idx % RING_CONFIGS.length];

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative bg-[#FFF1DF] border border-[#E6D8C3] hover:border-[#8E171D] transition-all duration-500 overflow-hidden shadow-md hover:shadow-2xl flex flex-col justify-between"
              >
                {/* ──────────────────────────────────────────────────────────
                    IMAGE CONTAINER WITH INDIVIDUAL ORBITING RING ANIMATION
                ────────────────────────────────────────────────────────── */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6D8C3] flex items-center justify-center p-6">
                  
                  {/* Dedicated Orbital SVG Ring Instance */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: ring.duration,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-full h-full max-w-[280px] max-h-[280px] group-hover:scale-105 transition-transform duration-500"
                      viewBox="0 0 300 300"
                    >
                      {/* Outer delicate ring track */}
                      <circle
                        cx="150"
                        cy="150"
                        r={ring.size / 2}
                        fill="none"
                        stroke="#C49A55"
                        strokeWidth={ring.strokeWidth}
                        strokeDasharray={ring.dashArray}
                        opacity="0.6"
                      />
                      {/* Orbiting Gold Highlight Marker */}
                      <circle
                        cx={150 + (ring.size / 2) * Math.cos(idx * 1.2)}
                        cy={150 + (ring.size / 2) * Math.sin(idx * 1.2)}
                        r={ring.dotSize}
                        fill="#8E171D"
                        stroke="#C49A55"
                        strokeWidth="1.5"
                      />
                    </motion.svg>
                  </div>

                  {/* Circular/Architectural Masked Food Photograph */}
                  <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#C49A55] shadow-xl group-hover:scale-105 transition-transform duration-700 ease-out z-0">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 160px, 180px"
                      className="object-cover"
                    />
                  </div>

                  {/* Category Pill Tag */}
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
                      <span>Explore Collection</span>
                      <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

