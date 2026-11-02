"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Eye, Flame } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "@/data/menuData";
import DishDetailModal from "@/components/ui/DishDetailModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerFeaturedDishes() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Select verified iconic dishes across categories
  const featuredIds = [
    "shorshe-ilish",
    "kosha-mangsho",
    "bhetki-paturi",
    "luchi-alur-dom",
    "kolkata-chicken-biryani",
    "mishti-doi",
  ];

  const featuredDishes = featuredIds
    .map((id) => MENU_ITEMS.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item));

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="bg-[#8E171D] text-[#FFF1DF] py-16 sm:py-24 lg:py-32 border-b border-[#651217] relative overflow-hidden"
        aria-label="Featured Signature Dishes"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          
          {/* Section Header */}
          <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C49A55] font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-[#C49A55]" />
                Iconic Creations • বিশিষ্ট রন্ধনশিল্প
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FFF1DF] leading-[1.1]">
                Signature Dishes of The Calcutta Cafe.
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C49A55] hover:text-[#FFF1DF] transition-colors pb-1 border-b border-[#C49A55]/40"
            >
              <span>Explore Complete Repertoire</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Photography-First Dish Gallery (HENSSLER Style) */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {featuredDishes.map((dish) => {
              const isVeg = dish.dietary === "veg";

              return (
                <div
                  key={dish.id}
                  onClick={() => setSelectedDish(dish)}
                  className="group bg-[#651217] border border-[#C49A55]/30 hover:border-[#C49A55] transition-all duration-500 overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#292321]">
                    {dish.image && (
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#651217] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Dietary Indicator */}
                        <div
                          className={`w-4 h-4 border flex items-center justify-center bg-[#FFF1DF] ${
                            isVeg ? "border-emerald-600" : "border-red-600"
                          }`}
                          title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isVeg ? "bg-emerald-600" : "bg-red-600"
                            }`}
                          />
                        </div>

                        {dish.isChefSpecial && (
                          <span className="bg-[#8E171D] text-[#C49A55] border border-[#C49A55]/40 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-semibold">
                            Chef Special
                          </span>
                        )}
                      </div>

                      <span className="bg-[#292321]/80 backdrop-blur-xs text-[#FFF1DF] px-2 py-0.5 text-[10px] font-mono tracking-wider">
                        {dish.spiceLevel.toUpperCase()}
                      </span>
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#292321]/40 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 bg-[#C49A55] text-[#292321] px-4 py-2 text-xs font-semibold uppercase tracking-wider shadow-lg">
                        <Eye className="h-3.5 w-3.5" />
                        <span>View Details</span>
                      </span>
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      {dish.bengaliName && (
                        <span className="font-bengali text-xs text-[#C49A55] font-medium block">
                          {dish.bengaliName}
                        </span>
                      )}
                      <h3 className="font-serif text-xl sm:text-2xl text-[#FFF1DF] font-normal group-hover:text-[#C49A55] transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FFF1DF]/75 leading-relaxed line-clamp-2">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Metadata & Action */}
                    <div className="pt-3 border-t border-[#FFF1DF]/15 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C49A55]">
                        Small-Batch Daily
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#FFF1DF] group-hover:text-[#C49A55] uppercase tracking-wider text-[11px]">
                        <span>Order Options</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Conversion Note */}
          <div className="mt-12 text-center">
            <p className="text-xs sm:text-sm text-[#FFF1DF]/70 font-mono tracking-wide max-w-xl mx-auto">
              Prepared to authentic regional specifications and dispatched immediately from our
              Bangalore cloud kitchen hubs via Swiggy and Zomato.
            </p>
          </div>

        </div>
      </section>

      {/* Interactive Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        isFavorite={selectedDish ? favorites.includes(selectedDish.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}

