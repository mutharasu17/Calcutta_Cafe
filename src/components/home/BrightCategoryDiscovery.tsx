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
    description: "The soul of Bengal waterways—Katla kalia in rich onion-raisin gravy, Hilsa in mustard emulsion, and banana-leaf steamed Bhetki.",
    image: "/images/dishes/katla-kalia-bhaat.jpeg",
    count: MENU_ITEMS.filter((i) => i.category === "fish-seafood").length,
    highlight: "Daily Fresh Catch",
  },
  {
    id: "chicken-mutton",
    number: "02",
    name: "Slow-Cooked Meats",
    bengali: "মাংসের ঘরোয়া তৃপ্তি",
    description: "Legendary 4-hour slow-braised Kosha Mangsho, homestyle Sunday Murgir Jhol with potatoes, and Kolkata Dimer Dalna.",
    image: "/images/dishes/murgir-jhol-bhaat.jpeg",
    count: MENU_ITEMS.filter((i) => i.category === "chicken-mutton").length,
    highlight: "Sunday Ritual",
  },
  {
    id: "vegetarian",
    number: "03",
    name: "Bengal Vegetarian",
    bengali: "নিরামিষের বৈচিত্র্য",
    description: "Satvik culinary heritage—puffy golden Luchis with coconut Chholar Dal, multi-layered Lachha Parathas, and seasonal Labra.",
    image: "/images/dishes/luchi-chholar-dal.jpeg",
    count: MENU_ITEMS.filter((i) => i.category === "vegetarian").length,
    highlight: "Satvik Heritage",
  },
  {
    id: "snacks-street",
    number: "04",
    name: "Street Savouries",
    bengali: "কলকাতার স্ট্রিট ফুড",
    description: "Kolkata Tangra-style Hakka Chowmein, double masala street omelettes, New Market Kathi Rolls, and College Street Maggi.",
    image: "/images/dishes/kolkata-chicken-chowmein.jpeg",
    count: MENU_ITEMS.filter((i) => i.category === "snacks-street").length,
    highlight: "Kolkata Street Soul",
  },
  {
    id: "rice-meals",
    number: "05",
    name: "Rice & Grand Thalis",
    bengali: "ভাত ও রাজকীয় থালি",
    description: "Complete ceremonial Bhoj thalis, fragrant Gobindobhog steamed rice, wok-tossed Tangra fried rice, and comforting daily meals.",
    image: "/images/dishes/bengali-veg-thali.jpeg",
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
  {
    id: "drinks",
    number: "07",
    name: "Beverages & Coolers",
    bengali: "পানীয় ও শরবত",
    description: "Fragrant Gondhoraj lime refreshers, street-style spiced Lebu Cha, and traditional afternoon ghol buttermilk coolers.",
    image: "/images/brand/restaurant-ambiance.jpeg",
    count: MENU_ITEMS.filter((i) => i.category === "drinks").length,
    highlight: "Gondhoraj Coolers",
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
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 85%",
              once: true,
            },
            clearProps: "transform,opacity",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="py-10 sm:py-20 lg:py-28 bg-[#FFF8ED] text-[#2D231E] border-b border-[#E6D8C3] relative"
      aria-label="Explore Food Categories"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-16">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#FFB834]" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#5B1B8A] font-bold">
                Cuisine Archetypes • খাদ্য বিভাগ
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#2D231E] leading-[1.12]">
              Explore Food Categories.
            </h2>
            <p className="text-xs sm:text-base text-[#5C524B] font-sans leading-relaxed">
              Every dish at The Calcutta Cafe belongs to an unbroken culinary lineage. Explore our seven defining gastronomic repertoires.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5B1B8A] font-semibold hover:text-[#4B1473] group py-1"
            >
              <span>View Complete Menu ({MENU_ITEMS.length} Dishes)</span>
              <ArrowUpRight className="h-4 w-4 text-[#FFB834] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Mobile Swipe Notice */}
        <div className="flex sm:hidden items-center justify-between text-xs font-mono text-[#5B1B8A] mb-3 px-1">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB834] animate-pulse" />
            Swipe to explore 7 culinary traditions
          </span>
          <span className="text-xs text-[#5C524B]">→</span>
        </div>

        {/* ──────────────────────────────────────────────────────────
            RESPONSIVE CATEGORY PRESENTATION
            Horizontal snap carousel on mobile; clean 3-col grid on desktop
        ────────────────────────────────────────────────────────── */}
        <div
          ref={cardsGridRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 items-stretch no-scrollbar touch-pan-x"
        >
          {CATEGORIES_DATA.map((cat, idx) => {
            const isPillar = idx === 0 || idx === 1;

            return (
              <div
                key={cat.id}
                className={`group bg-[#FAF6F0] border border-[#E6D8C3] hover:border-[#5B1B8A] transition-all duration-300 rounded-sm overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between p-5 sm:p-6 relative focus-within:ring-2 focus-within:ring-[#5B1B8A] focus-within:ring-offset-2 w-[82vw] max-w-[310px] flex-shrink-0 snap-center sm:w-auto sm:max-w-none ${
                  isPillar ? "ring-1 ring-[#FFB834]/40" : ""
                }`}
              >
                {/* Top Badge: Number and Dish Count */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#E6D8C3]/70 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#5B1B8A]">
                      {cat.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#FFB834]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C524B]">
                      {cat.count} Dishes
                    </span>
                  </div>

                  {cat.highlight && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#FFF8ED] text-[#5B1B8A] border border-[#FFB834]/50 font-semibold rounded-xs">
                      {cat.highlight}
                    </span>
                  )}
                </div>

                {/* Central Imagery with Refined Static Border & Zoom on Hover */}
                <div className="relative my-3 flex items-center justify-center">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 border border-[#FFB834]/50 group-hover:border-[#5B1B8A] transition-colors duration-300">
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
                    <span className="font-bengali text-xs text-[#5B1B8A] font-semibold block">
                      {cat.bengali}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#2D231E] group-hover:text-[#5B1B8A] transition-colors leading-snug">
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
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#FFB834] font-bold">
                      Authentic Recipe
                    </span>

                    {/* Explore Dishes Link with direct category parameter */}
                    <Link
                      href={`/menu?category=${cat.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] bg-[#5B1B8A] hover:bg-[#4B1473] text-[#FFF8ED] text-xs font-semibold uppercase tracking-wider transition-colors duration-200 shadow-2xs hover:shadow-xs rounded-sm active:scale-95 border border-[#FFB834]/40"
                      aria-label={`Explore ${cat.name} dishes`}
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#FFB834]" />
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
