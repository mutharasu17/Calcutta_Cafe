"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnandCategoryGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const displayCategories = MENU_CATEGORIES.filter((c) => c.id !== "drinks");

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".category-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#FFFDF8] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-2">
              Category Repertoire • রসনার সম্ভার
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Shop Our Range.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-xl">
              Organized by course and culinary discipline—from river fish to slow-cooked mutton, vegetarian treasures, street savouries, and earthen confections.
            </p>
          </div>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>View Complete Menu</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Varied Proportions Category Grid (Anand Sweets & A1 Gallery Style) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {displayCategories.map((cat, idx) => {
            const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
            // Varied aspect ratio / composition for visual hierarchy
            const isWide = idx === 0 || idx === 3;

            return (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                className={`category-card group relative bg-[#F5EFE4] border border-[#E6D8C3] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#7A382B] hover:shadow-md transition-all duration-300 ${
                  isWide ? "lg:col-span-1" : ""
                }`}
              >
                {/* Visual Category Photography */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6D8C3]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Bengali Subtitle Badge */}
                  <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-sm px-3 py-1 border border-[#E6D8C3] text-[11px] font-bengali text-[#7A382B] font-medium">
                    {cat.bengaliSubtitle}
                  </div>

                  {/* Preparation Count */}
                  <div className="absolute bottom-3 right-3 bg-[#29251F]/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#FFFDF8]">
                    {count} Delicacies
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 sm:p-6 space-y-2 bg-[#FFFDF8] flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6D8C3]/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#7A382B]">
                    <span>Explore Collection</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
