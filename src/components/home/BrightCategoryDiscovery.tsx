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
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header with ScrollTrigger
      gsap.fromTo(
        ".cat-section-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // 2. Animate Circular SVG Rings using DrawSVGPlugin
      CATEGORIES_DATA.forEach((_, idx) => {
        const ring = document.getElementById(`cat-ring-path-${idx}`);
        if (ring) {
          gsap.fromTo(
            ring,
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: `#cat-card-${idx}`,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        // 3. Orbit gold accent marker using MotionPathPlugin
        const marker = document.getElementById(`cat-ring-marker-${idx}`);
        if (marker) {
          gsap.to(marker, {
            motionPath: {
              path: "M 100, 8 A 92 92 0 1 1 100 192 A 92 92 0 1 1 100 8 Z",
              autoRotate: false,
            },
            duration: 8 + idx * 1.5,
            repeat: -1,
            ease: "none",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explore-categories"
      className="bg-[#F4E8D7] text-[#292321] py-20 sm:py-28 lg:py-36 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Explore Food Categories"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="cat-section-header flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
              <Compass className="h-3.5 w-3.5 text-[#C49A55]" />
              Six Culinary Pillars • ছয় স্বাদের সম্ভার
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#292321] leading-[1.08]">
              Explore Food Categories.
            </h2>
            <p className="text-sm sm:text-base text-[#5C524B] font-sans leading-relaxed max-w-xl">
              From the freshwater rivers of Bengal to royal Awadhi-influenced kitchens and colonial confectioners,
              browse our six traditional culinary pillars.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#A9272D] transition-colors pb-1 border-b border-[#8E171D]/40"
          >
            <span>View Full Menu Repertoire</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ──────────────────────────────────────────────────────────
            EDITORIAL ASYMMETRIC CATEGORY GRID WITH CIRCULAR RINGS
        ────────────────────────────────────────────────────────── */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {CATEGORIES_DATA.map((cat, idx) => {
            // Give cards 0 and 3 subtle distinct visual weights for varied editorial feel
            const isFeatured = idx === 0 || idx === 1;

            return (
              <div
                key={cat.id}
                id={`cat-card-${idx}`}
                className={`group bg-[#FFFCF7] border border-[#E6D8C3] hover:border-[#8E171D] transition-all duration-400 overflow-hidden shadow-xs hover:shadow-lg flex flex-col justify-between p-6 sm:p-7 relative ${
                  isFeatured ? "ring-1 ring-[#C49A55]/30" : ""
                }`}
              >
                {/* Top Badge: Number and Dish Count */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E6D8C3]/60 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#8E171D]">
                      {cat.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#C49A55]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C524B]">
                      {cat.count} Dishes
                    </span>
                  </div>

                  {cat.highlight && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#FFF8ED] text-[#8E171D] border border-[#C49A55]/40 font-semibold">
                      {cat.highlight}
                    </span>
                  )}
                </div>

                {/* Central Imagery with Animated GSAP SVG Ring */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52">
                    
                    {/* SVG Circular Orbital Track & Marker */}
                    <svg
                      className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
                      viewBox="0 0 200 200"
                    >
                      <path
                        id={`cat-ring-path-${idx}`}
                        d="M 100, 8 A 92 92 0 1 1 100 192 A 92 92 0 1 1 100 8 Z"
                        fill="none"
                        stroke="#C49A55"
                        strokeWidth="1.5"
                        strokeDasharray="4 6"
                        opacity="0.8"
                      />
                      <circle
                        id={`cat-ring-marker-${idx}`}
                        cx="0"
                        cy="0"
                        r="3.5"
                        fill="#8E171D"
                        stroke="#C49A55"
                        strokeWidth="1.5"
                      />
                    </svg>

                    {/* Circular Food Photograph */}
                    <div className="w-full h-full rounded-full overflow-hidden p-2.5">
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner bg-[#E6D8C3]">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 640px) 176px, 208px"
                          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Information & Explore Action */}
                <div className="space-y-3 pt-3">
                  <div>
                    <span className="font-bengali text-xs text-[#8E171D] font-medium block">
                      {cat.bengali}
                    </span>
                    <h3 className="font-serif text-2xl text-[#292321] group-hover:text-[#8E171D] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C524B] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="pt-3 border-t border-[#E6D8C3]/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#C49A55] font-semibold">
                      Authentic Recipe
                    </span>

                    {/* Explore Dishes Link with direct category parameter */}
                    <Link
                      href={`/menu?category=${cat.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF8ED] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-sm"
                    >
                      <span>Explore Dishes</span>
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

