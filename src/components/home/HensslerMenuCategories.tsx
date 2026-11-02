"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Grid } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerMenuCategories() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Filter out any auxiliary categories like drinks if not primary, keeping the top 6 core categories
  const displayCategories = MENU_CATEGORIES.filter((c) => c.id !== "drinks");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="menu-categories"
      className="bg-[#F4E8D7] text-[#292321] py-16 sm:py-24 lg:py-32 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Explore Our Menu Categories"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        {/* Section Title (Anand Sweets Inspired Category Discovery) */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
              <Grid className="h-3.5 w-3.5 text-[#8E171D]" />
              Menu Architecture • আমাদের পদসম্ভার
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292321]">
              Explore Our Menu by Culinary Tradition.
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#651217] transition-colors pb-1 border-b border-[#8E171D]/40"
          >
            <span>View Complete Menu</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Responsive Category Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayCategories.map((cat, idx) => {
            const count = MENU_ITEMS.filter((item) => item.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                className="group relative bg-[#FFF1DF] border border-[#E6D8C3] hover:border-[#8E171D] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6D8C3]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292321]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="bg-[#8E171D] text-[#FFF1DF] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="bg-[#FFF1DF]/90 backdrop-blur-xs text-[#292321] px-2.5 py-1 text-[10px] font-mono tracking-wider font-medium">
                      {count} {count === 1 ? "Dish" : "Dishes"}
                    </span>
                  </div>

                  {/* Bengali Subtitle Pill */}
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <span className="font-bengali text-xs text-[#FFF1DF] font-medium drop-shadow-md">
                      {cat.bengaliSubtitle}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#292321] group-hover:text-[#8E171D] transition-colors font-normal">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#796A60] leading-relaxed mt-2 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E6D8C3] flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#8E171D]">
                    <span>Discover Category</span>
                    <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

