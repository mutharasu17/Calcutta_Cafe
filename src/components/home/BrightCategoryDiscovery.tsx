"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { MENU_ITEMS, MenuCategory } from "@/data/menuData";

interface CategoryCardData {
  id: MenuCategory;
  number: string;
  name: string;
  bengali: string;
  description: string;
  image: string;
  count: number;
  highlight?: string;
}

const CATEGORIES_DATA: CategoryCardData[] = [
  {
    id: "fish-seafood",
    number: "01",
    name: "Fish & Seafood",
    bengali: "মাছ ও সামুদ্রিক স্বাদ",
    description: "The soul of Bengal waterways—fresh Hilsa in pungent mustard emulsion, Bhetki steamed in banana leaves, and coconut jumbo prawns.",
    image: "/images/shorshe-ilish.jpg",
    count: MENU_ITEMS.filter((i) => i.category === "fish-seafood").length,
    highlight: "Daily Fresh Catch",
  },
  {
    id: "chicken-mutton",
    number: "02",
    name: "Slow-Cooked Meats",
    bengali: "মাংসের ঘরোয়া তৃপ্তি",
    description: "Legendary 4-hour slow-braised Kosha Mangsho, royal Mughlai chicken chaap, and comforting Sunday homestyle broth.",
    image: "/images/kosha-mangsho.jpg",
    count: MENU_ITEMS.filter((i) => i.category === "chicken-mutton").length,
    highlight: "Sunday Ritual",
  },
  {
    id: "vegetarian",
    number: "03",
    name: "Bengal Vegetarian",
    bengali: "নিরামিষের বৈচিত্র্য",
    description: "The overlooked genius of satvik Bengali cooking—delicate Shukto, puffy Luchi with spiced Chholar Dal, and steamed lentil dhoka.",
    image: "/images/luchi-chholar-dal.jpg",
    count: MENU_ITEMS.filter((i) => i.category === "vegetarian").length,
    highlight: "Satvik Heritage",
  },
  {
    id: "snacks-street",
    number: "04",
    name: "Street Savouries",
    bengali: "কলকাতার স্ট্রিট ফুড",
    description: "New Market Nizam-style flaky layered Kathi Rolls, crumb-fried Kolkata cabin chops, and colonial spiced egg devils.",
    image: "/images/kathi-roll.jpg",
    count: MENU_ITEMS.filter((i) => i.category === "snacks-street").length,
    highlight: "Iconic Street Food",
  },
  {
    id: "rice-meals",
    number: "05",
    name: "Rice & Grand Thalis",
    bengali: "ভাত ও পঞ্চব্যঞ্জন",
    description: "Fragrant saffron Gobindobhog Basanti Pulao, royal Calcutta dum biryani with potato, and multi-course grand feasts.",
    image: "/images/hero-bengali-bhoj.jpg",
    count: MENU_ITEMS.filter((i) => i.category === "rice-meals").length,
    highlight: "Ceremonial Feasts",
  },
  {
    id: "sweets-desserts",
    number: "06",
    name: "Artisanal Mithai",
    bengali: "বাংলার সেরা মিষ্টি",
    description: "Centuries of confectionary art—silky caramelized Mishti Doi set in porous clay pots, baked rosogolla, and winter date-palm sandesh.",
    image: "/images/mishti-doi.jpg",
    count: MENU_ITEMS.filter((i) => i.category === "sweets-desserts").length,
    highlight: "Claypot Aged",
  },
];

export default function BrightCategoryDiscovery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // 1. Gentle staggered entrance when section enters viewport
      if (cardsGridRef.current?.children) {
        gsap.fromTo(
          Array.from(cardsGridRef.current.children),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 85%",
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
      id="explore-categories"
      className="bg-white text-[#292321] py-16 sm:py-24 lg:py-32 border-b-2 border-[#8E171D]/20 relative overflow-hidden"
      aria-label="Explore Food Categories"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-5">
          <div className="space-y-2.5 max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
              <Compass className="h-3.5 w-3.5 text-[#C49A55]" />
              Six Culinary Pillars • ছয় স্বাদের সম্ভার
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#292321] leading-[1.1]">
              Explore Food Categories.
            </h2>
            <p className="text-sm sm:text-base text-[#5C524B] font-sans leading-relaxed">
              From the freshwater rivers of Bengal to royal Awadhi-influenced kitchens and colonial confectioners,
              browse our six traditional culinary pillars.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#A9272D] transition-colors pb-1 border-b border-[#8E171D]/40 self-start md:self-end"
          >
            <span>View Full Menu Repertoire</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ──────────────────────────────────────────────────────────
            RESPONSIVE CATEGORY GRID (1 COL ON NARROW, 2 COL TABLET, 3 COL DESKTOP)
            Gentle hover elevation, no continuous spinning or orbital loops
        ────────────────────────────────────────────────────────── */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 items-stretch"
        >
          {CATEGORIES_DATA.map((cat, idx) => {
            const isPillar = idx === 0 || idx === 1;

            return (
              <div
                key={cat.id}
                className={`group bg-[#FFFCF7] border border-[#E6D8C3] hover:border-[#8E171D] transition-all duration-300 rounded-xs overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between p-5 sm:p-6 relative focus-within:ring-2 focus-within:ring-[#8E171D] focus-within:ring-offset-2 ${
                  isPillar ? "ring-1 ring-[#C49A55]/30" : ""
                }`}
              >
                {/* Top Badge: Number and Dish Count */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#E6D8C3]/70 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#8E171D]">
                      {cat.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#C49A55]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C524B]">
                      {cat.count} Dishes
                    </span>
                  </div>

                  {cat.highlight && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#FFF8ED] text-[#8E171D] border border-[#C49A55]/40 font-semibold rounded-xs">
                      {cat.highlight}
                    </span>
                  )}
                </div>

                {/* Central Imagery with Refined Static Border & Zoom on Hover */}
                <div className="relative my-3 flex items-center justify-center">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 border border-[#C49A55]/40 group-hover:border-[#8E171D] transition-colors duration-300">
                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner bg-[#E6D8C3]">
                      <Image
                        src={cat.image}
                        alt={`${cat.name} — ${cat.bengali}`}
                        fill
                        sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 200px"
                        className="object-cover transform group-hover:scale-106 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Information & Action */}
                <div className="space-y-2.5 pt-2 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="font-bengali text-xs text-[#8E171D] font-medium block">
                      {cat.bengali}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#292321] group-hover:text-[#8E171D] transition-colors leading-snug">
                      <Link
                        href={`/menu?category=${cat.id}`}
                        className="focus:outline-none"
                      >
                        {cat.name}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C524B] leading-relaxed line-clamp-2 mt-1">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6D8C3]/60 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#C49A55] font-semibold">
                      Authentic Recipe
                    </span>

                    {/* Explore Dishes Link with direct category parameter */}
                    <Link
                      href={`/menu?category=${cat.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF8ED] text-xs font-semibold uppercase tracking-wider transition-colors duration-200 shadow-2xs hover:shadow-xs rounded-xs active:scale-95"
                      aria-label={`Explore ${cat.name} dishes`}
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="h-3 w-3 text-[#C49A55]" />
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
