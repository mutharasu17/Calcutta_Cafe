"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MENU_ITEMS, MenuItem, MenuCategory } from "@/data/menuData";
import { Search, Heart, Sparkles, X, Filter } from "lucide-react";
import { useFoodDiscovery } from "@/lib/useFoodDiscovery";
import DishDetailModal from "@/components/ui/DishDetailModal";
import BrightFoodCard from "@/components/ui/BrightFoodCard";
import { gsap } from "@/lib/gsapConfig";

type FilterTab = MenuCategory | "all" | "favorites";

const MENU_TABS: { id: FilterTab; label: string; bengali: string }[] = [
  { id: "all", label: "All Dishes", bengali: "সকল পদ" },
  { id: "fish-seafood", label: "Fish & Seafood", bengali: "মাছ" },
  { id: "chicken-mutton", label: "Chicken & Mutton", bengali: "মাংস" },
  { id: "vegetarian", label: "Vegetarian Delicacies", bengali: "নিরামিষ" },
  { id: "snacks-street", label: "Snacks & Street Food", bengali: "স্ট্রিট ফুড" },
  { id: "rice-meals", label: "Rice & Grand Thalis", bengali: "ভাত ও থালি" },
  { id: "sweets-desserts", label: "Sweets & Desserts", bengali: "মিষ্টি" },
  { id: "drinks", label: "Beverages & Refreshers", bengali: "পানীয় ও শরবত" },
];

/**
 * Isolated component to read useSearchParams inside its own tiny Suspense boundary.
 * This guarantees the main MenuClient and all dishes remain statically prerendered
 * and visible to search engine web crawlers in the initial HTML document.
 */
function SearchParamsHandler({
  onCategorySync,
  onDishSync,
}: {
  onCategorySync: (cat: FilterTab) => void;
  onDishSync: (dishId: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category") as FilterTab;
    if (cat && MENU_TABS.some((t) => t.id === cat)) {
      onCategorySync(cat);
    }
    const dish = searchParams.get("dish");
    if (dish) {
      onDishSync(dish);
    }
  }, [searchParams, onCategorySync, onDishSync]);

  return null;
}

export default function MenuClient({
  initialItems = MENU_ITEMS,
}: {
  initialItems?: MenuItem[];
} = {}) {
  const items = initialItems;
  const { favorites, isFavorite, toggleFavorite, addRecentlyViewed } =
    useFoodDiscovery();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const svgLineRef = useRef<SVGLineElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  // SVG Line Animation on Header
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (svgLineRef.current) {
      gsap.fromTo(
        svgLineRef.current,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1.2, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  const handleCategorySync = (cat: FilterTab) => {
    setActiveTab(cat);
  };

  const handleDishSync = (dishId: string) => {
    const found = items.find((item) => item.id === dishId);
    if (found) {
      setSelectedDish(found);
      addRecentlyViewed(found.id);
    }
  };

  // Filter items based on tab, dietary preference, and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Tab filter
      if (activeTab === "favorites") {
        if (!favorites.includes(item.id)) return false;
      } else if (activeTab !== "all" && item.category !== activeTab) {
        return false;
      }

      // 2. Dietary filter
      if (dietaryFilter === "veg" && item.dietary !== "veg") return false;
      if (dietaryFilter === "non-veg" && item.dietary !== "non-veg") return false;

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
  }, [items, activeTab, dietaryFilter, searchQuery, favorites]);

  // GSAP animation when category or filter changes (skip initial SSR render to avoid flashes)
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (cardsGridRef.current) {
      gsap.fromTo(
        cardsGridRef.current.children,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.04, ease: "power2.out" }
      );
    }
  }, [activeTab, dietaryFilter, searchQuery]);

  return (
    <div className="relative pb-28 bg-[#FFF8ED] text-[#2D231E] min-h-screen">
      {/* Isolated URL param handler */}
      <Suspense fallback={null}>
        <SearchParamsHandler
          onCategorySync={handleCategorySync}
          onDishSync={handleDishSync}
        />
      </Suspense>

      {/* ──────────────────────────────────────────────────────────
          1. TOP: MENU INTRODUCTION (EDITORIAL PURPLE & GOLD HEADER)
      ────────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-16 pt-28 pb-10 sm:pb-14 border-b border-[#E6D8C3] bg-[#FAF6F0]">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#FFB834]" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#5B1B8A] font-bold">
              THE BENGAL CULINARY REPERTOIRE
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#2D231E] leading-[1.05]">
            Explore Our Menu.
          </h1>

          <p className="text-base sm:text-lg text-[#5C524B] font-sans leading-relaxed max-w-2xl">
            Discover the authentic flavours, regional traditions and signature terracotta preparations of Bengal.
            From slow-braised wedding banquet kalia to hand-rolled lachha parathas, comforting jhol, and earthen mishti doi.
          </p>

          {/* Small Decorative Animated SVG Line */}
          <div className="pt-2 w-48 sm:w-60 h-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 240 10">
              <line
                ref={svgLineRef}
                x1="0"
                y1="5"
                x2="240"
                y2="5"
                stroke="#FFB834"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="120" cy="5" r="3" fill="#5B1B8A" />
            </svg>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. SECOND: CLEAN, RESPONSIVE CATEGORY NAVIGATION BAR
      ────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 lg:px-12 py-3.5 border-b border-[#E6D8C3] sticky top-[64px] sm:top-[72px] lg:top-[78px] z-30 bg-[#FFF8ED]/98 backdrop-blur-md shadow-2xs">
        <div className="mx-auto max-w-7xl">
          {/* Row 1: Primary Category Tabs (Scrollable on Mobile, Wrap on Desktop) */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1.5 sm:pb-0 no-scrollbar touch-pan-x scroll-smooth">
            {MENU_TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              const count =
                tab.id === "all"
                  ? items.length
                  : items.filter((i) => i.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-300 rounded-full flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[#5B1B8A] text-[#FFF8ED] shadow-md border border-[#FFB834]/60"
                      : "bg-[#FAF6F0] text-[#2D231E] hover:text-[#5B1B8A] hover:bg-[#FFFFFF] border border-[#E6D8C3] shadow-2xs"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#FFB834] text-[#2D231E] font-bold"
                        : "bg-[#E6D8C3]/60 text-[#5B1B8A] font-semibold"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Favourites Tab */}
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-4 sm:px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-300 rounded-full flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                activeTab === "favorites"
                  ? "bg-[#5B1B8A] text-[#FFF8ED] shadow-md border border-[#FFB834]/60"
                  : "bg-[#FAF6F0] text-[#2D231E] hover:text-[#5B1B8A] hover:bg-[#FFFFFF] border border-[#E6D8C3] shadow-2xs"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${favorites.length > 0 ? "fill-current text-[#FFB834]" : ""}`} />
              <span>Favourites ({favorites.length})</span>
            </button>
          </div>

          {/* Row 2: Secondary Controls (Filters & Search in a Balanced Row) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-2 border-t border-[#E6D8C3]/70">
            {/* Dietary Switcher */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-[#5B1B8A]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#5C524B]">
                  Dietary:
                </span>
              </div>
              <div className="inline-flex rounded-md border border-[#E6D8C3] bg-[#FAF6F0] p-0.5 shadow-2xs">
                <button
                  onClick={() => setDietaryFilter("all")}
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                    dietaryFilter === "all"
                      ? "bg-[#5B1B8A] text-[#FFF8ED]"
                      : "text-[#5C524B] hover:text-[#2D231E]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter("veg")}
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                    dietaryFilter === "veg"
                      ? "bg-emerald-600 text-white"
                      : "text-[#5C524B] hover:text-[#2D231E]"
                  }`}
                >
                  Veg Only
                </button>
                <button
                  onClick={() => setDietaryFilter("non-veg")}
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                    dietaryFilter === "non-veg"
                      ? "bg-[#5B1B8A] text-[#FFF8ED]"
                      : "text-[#5C524B] hover:text-[#2D231E]"
                  }`}
                >
                  Non-Veg
                </button>
              </div>
            </div>

            {/* Search Input Bar with Clear Button */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5B1B8A]" />
              <input
                type="text"
                placeholder="Search dishes or Bengali spices..."
                aria-label="Search dishes or Bengali spices"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E6D8C3] pl-9 pr-8 py-2 text-xs text-[#2D231E] placeholder-[#5C524B]/60 focus:outline-none focus:border-[#5B1B8A] transition-colors rounded-xs shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C524B] hover:text-[#2D231E]"
                  aria-label="Clear search query"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. DISHES EDITORIAL GRID (WARM CREAM CARDS, 3 COLS DESKTOP)
      ────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 lg:px-12 py-10 lg:py-14" aria-label="Menu Items">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-3 border-b border-[#E6D8C3]/70">
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2D231E]">
              {activeTab === "all"
                ? "All Culinary Preparations"
                : activeTab === "favorites"
                ? "Saved Preparations"
                : MENU_TABS.find((t) => t.id === activeTab)?.label || "Culinary Preparations"}
            </h2>
            <span className="font-mono text-xs uppercase tracking-wider text-[#5C524B]">
              Showing <span className="text-[#5B1B8A] font-bold">{filteredItems.length}</span>{" "}
              {filteredItems.length === 1 ? "preparation" : "preparations"}
            </span>

            {activeTab === "favorites" && (
              <span className="font-mono text-xs text-[#5B1B8A]">
                Saved locally on your device
              </span>
            )}
          </div>

          {/* Cards Grid — Rendered on SSR and hydrated on client */}
          <div
            ref={cardsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredItems.map((dish) => (
              <BrightFoodCard
                key={dish.id}
                dish={dish}
                onOpenDetails={(d) => {
                  addRecentlyViewed(d.id);
                  setSelectedDish(d);
                }}
                isFavorite={isFavorite(dish.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-[#FAF6F0] border border-[#E6D8C3] p-8 space-y-4 shadow-xs mt-6 rounded-sm">
              <p className="font-serif text-2xl sm:text-3xl text-[#2D231E]">
                No dishes found matching your selection.
              </p>
              <p className="text-sm text-[#5C524B] max-w-md mx-auto">
                Try resetting your filters or search term to browse the complete Bengal repertoire.
              </p>
              <button
                onClick={() => {
                  setActiveTab("all");
                  setDietaryFilter("all");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-[#5B1B8A] text-[#FFF8ED] text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-xs hover:bg-[#4B1473] transition-colors rounded-sm border border-[#FFB834]/50"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        isFavorite={selectedDish ? isFavorite(selectedDish.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
