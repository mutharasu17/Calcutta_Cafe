"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Filter } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { MENU_ITEMS, MenuItem, MenuCategory } from "@/data/menuData";
import BrightFoodCard from "@/components/ui/BrightFoodCard";
import DishDetailModal from "@/components/ui/DishDetailModal";

const ALL_CATEGORY_TABS: { id: "all" | MenuCategory; label: string; bengali: string }[] = [
  { id: "all", label: "All Dishes", bengali: "সকল পদ" },
  { id: "fish-seafood", label: "Fish & Seafood", bengali: "মাছ" },
  { id: "chicken-mutton", label: "Chicken & Mutton", bengali: "মাংস" },
  { id: "vegetarian", label: "Vegetarian Delicacies", bengali: "নিরামিষ" },
  { id: "snacks-street", label: "Snacks & Street", bengali: "স্ট্রিট ফুড" },
  { id: "rice-meals", label: "Rice & Complete Meals", bengali: "ভাত ও থালি" },
  { id: "sweets-desserts", label: "Sweets & Desserts", bengali: "মিষ্টি" },
];

export default function BrightMenuPreview() {
  const [activeCategory, setActiveCategory] = useState<"all" | MenuCategory>("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModalDish, setSelectedModalDish] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const gridRef = useRef<HTMLDivElement>(null);

  // Directly filter the master MENU_ITEMS dataset
  const visibleDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category match
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // 2. Dietary match
      if (dietaryFilter === "veg" && item.dietary !== "veg") {
        return false;
      }
      if (dietaryFilter === "non-veg" && item.dietary !== "non-veg") {
        return false;
      }
      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBengali = item.bengaliName?.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBengali && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  // GSAP animation when category or dietary filter changes
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.04, ease: "power2.out" }
      );
    }
  }, [activeCategory, dietaryFilter, searchQuery]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <section
        id="signature-menu"
        className="bg-[#FFF8ED] text-[#292321] py-20 sm:py-28 lg:py-36 border-b border-[#E6D8C3] relative overflow-hidden"
        aria-label="Filterable Menu and Dish Selection"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
                <Sparkles className="h-3.5 w-3.5 text-[#C49A55]" />
                Curated Menu • সম্পূর্ণ পদ তালিকা
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#292321] leading-[1.08]">
                Select Dishes for Your Feast.
              </h2>
              <p className="text-sm sm:text-base text-[#5C524B] font-sans leading-relaxed max-w-xl">
                Browse our complete culinary repertoire. Select dishes to build your feast and
                order freshly prepared food from our Bangalore cloud kitchen hubs.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#A9272D] transition-colors pb-1 border-b border-[#8E171D]/40"
            >
              <span>Full Restaurant Menu Page</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Category Tabs & Dietary Filter Toolbar */}
          <div className="space-y-4 mb-10 sm:mb-14">
            
            {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 no-scrollbar">
              {ALL_CATEGORY_TABS.map((tab) => {
                const isSelected = activeCategory === tab.id;
                const count =
                  tab.id === "all"
                    ? MENU_ITEMS.length
                    : MENU_ITEMS.filter((i) => i.category === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`relative px-4 sm:px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 rounded-full flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-[#8E171D] text-[#FFF8ED] font-bold shadow-md border border-[#8E171D]"
                        : "bg-[#FFFCF7] text-[#292321] hover:text-[#8E171D] hover:bg-[#F4E8D7] border border-[#E6D8C3]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#FFF8ED] text-[#8E171D] font-bold"
                          : "bg-[#F4E8D7] text-[#5C524B]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub-toolbar: Dietary Filters & Live Counter */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-3 border-t border-[#E6D8C3]/70">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5 text-[#8E171D]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#5C524B]">
                    Dietary:
                  </span>
                </div>
                <div className="inline-flex rounded-md border border-[#E6D8C3] bg-[#FFFCF7] p-0.5 shadow-2xs">
                  <button
                    onClick={() => setDietaryFilter("all")}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                      dietaryFilter === "all"
                        ? "bg-[#8E171D] text-[#FFF8ED]"
                        : "text-[#5C524B] hover:text-[#292321]"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietaryFilter("veg")}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                      dietaryFilter === "veg"
                        ? "bg-emerald-600 text-white"
                        : "text-[#5C524B] hover:text-[#292321]"
                    }`}
                  >
                    Veg Only
                  </button>
                  <button
                    onClick={() => setDietaryFilter("non-veg")}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                      dietaryFilter === "non-veg"
                        ? "bg-[#8E171D] text-[#FFF8ED]"
                        : "text-[#5C524B] hover:text-[#292321]"
                    }`}
                  >
                    Non-Veg
                  </button>
                </div>
              </div>

              {/* Live Count Indicator */}
              <div className="text-xs font-mono text-[#5C524B]">
                Displaying <span className="text-[#8E171D] font-bold">{visibleDishes.length}</span>{" "}
                authentic {visibleDishes.length === 1 ? "dish" : "dishes"}
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────
              FOOD CARDS GRID WITH GSAP STAGGER (SOFT WHITE SURFACES)
          ────────────────────────────────────────────────────────── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {visibleDishes.map((dish) => (
              <BrightFoodCard
                key={dish.id}
                dish={dish}
                onOpenDetails={(d) => setSelectedModalDish(d)}
                isFavorite={favorites.includes(dish.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* Empty state safeguard */}
          {visibleDishes.length === 0 && (
            <div className="text-center py-16 bg-[#FFFCF7] border border-[#E6D8C3] p-8 space-y-3 shadow-xs">
              <p className="font-serif text-2xl text-[#292321]">No dishes match this selection.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setDietaryFilter("all");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-[#8E171D] text-[#FFF8ED] text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-xs hover:bg-[#A9272D]"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Dish Detail Modal for Full View */}
      <DishDetailModal
        dish={selectedModalDish}
        onClose={() => setSelectedModalDish(null)}
        isFavorite={selectedModalDish ? favorites.includes(selectedModalDish.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}

