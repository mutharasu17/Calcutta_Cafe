"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  Sparkles,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from "@/data/menuData";
import { useFoodDiscovery } from "@/lib/useFoodDiscovery";
import DishDetailModal from "@/components/ui/DishDetailModal";

export default function FoodDiscoverySection() {
  const { isFavorite, toggleFavorite, addRecentlyViewed } = useFoodDiscovery();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === "veg" && item.dietary !== "veg") return false;
      if (dietaryFilter === "non-veg" && item.dietary !== "non-veg") return false;

      // Search query
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
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const handleOpenDish = (dish: MenuItem) => {
    addRecentlyViewed(dish.id);
    setSelectedDish(dish);
  };

  return (
    <section className="relative py-16 sm:py-24 bg-[#FFFDF8] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>Interactive Exploration • মেনু আবিষ্কার</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Discover Our Menu.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-xl">
              Search dishes, filter by course or dietary preference, and explore the authentic preparation rituals of Bengal.
            </p>
          </div>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>Open Menu Directory</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Discovery Filter & Search Toolbar */}
        <div className="bg-[#F5EFE4] border border-[#E6D8C3] p-4 sm:p-5 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A382B]" />
              <input
                type="text"
                placeholder="Search dishes, mustard, spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFDF8] border border-[#E6D8C3] pl-10 pr-4 py-2.5 text-xs text-[#29251F] placeholder-[#6B6357]/60 focus:outline-none focus:border-[#7A382B] transition-colors"
              />
            </div>

            {/* Dietary Switch */}
            <div className="flex items-center gap-1 bg-[#FFFDF8] p-1 border border-[#E6D8C3] self-stretch md:self-auto justify-center">
              <button
                onClick={() => setDietaryFilter("all")}
                className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === "all"
                    ? "bg-[#29251F] text-[#FFFDF8]"
                    : "text-[#6B6357] hover:text-[#29251F]"
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietaryFilter("veg")}
                className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === "veg"
                    ? "bg-[#34483A] text-[#FFFDF8]"
                    : "text-[#6B6357] hover:text-[#34483A]"
                }`}
              >
                Pure Veg
              </button>
              <button
                onClick={() => setDietaryFilter("non-veg")}
                className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === "non-veg"
                    ? "bg-[#7A382B] text-[#FFFDF8]"
                    : "text-[#6B6357] hover:text-[#7A382B]"
                }`}
              >
                Non-Veg
              </button>
            </div>
          </div>

          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors border ${
                selectedCategory === "all"
                  ? "bg-[#7A382B] text-[#FFFDF8] border-[#7A382B]"
                  : "bg-[#FFFDF8] text-[#29251F] border-[#E6D8C3] hover:border-[#7A382B]/60"
              }`}
            >
              All Courses
            </button>
            {MENU_CATEGORIES.filter((c) => c.id !== "drinks").map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors border ${
                  selectedCategory === cat.id
                    ? "bg-[#7A382B] text-[#FFFDF8] border-[#7A382B]"
                    : "bg-[#FFFDF8] text-[#29251F] border-[#E6D8C3] hover:border-[#7A382B]/60"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Live Filtered Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.slice(0, 6).map((dish) => {
            const favorite = isFavorite(dish.id);

            return (
              <div
                key={dish.id}
                className="group bg-[#F5EFE4] border border-[#E6D8C3] flex flex-col justify-between shadow-sm hover:border-[#7A382B] hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div
                    onClick={() => handleOpenDish(dish)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3] cursor-pointer"
                  >
                    {dish.image && (
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <div
                        className={`w-3.5 h-3.5 border p-0.5 flex items-center justify-center bg-[#FFFDF8]/90 backdrop-blur-sm ${
                          dish.dietary === "veg" ? "border-[#34483A]" : "border-[#7A382B]"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            dish.dietary === "veg" ? "bg-[#34483A]" : "bg-[#7A382B]"
                          }`}
                        />
                      </div>
                      {dish.bengaliName && (
                        <span className="bg-[#FFFDF8]/90 backdrop-blur-sm px-2 py-0.5 font-bengali text-[10px] text-[#7A382B] border border-[#E6D8C3]">
                          {dish.bengaliName}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(dish.id);
                      }}
                      className={`absolute top-3 right-3 h-7 w-7 rounded-full flex items-center justify-center transition-all ${
                        favorite
                          ? "bg-[#7A382B] text-[#FFFDF8] shadow"
                          : "bg-[#FFFDF8]/90 text-[#29251F] hover:bg-[#7A382B] hover:text-[#FFFDF8]"
                      }`}
                      aria-label={favorite ? "Remove favorite" : "Add favorite"}
                    >
                      <Heart className={`h-3.5 w-3.5 ${favorite ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <div className="p-5 space-y-2 bg-[#FFFDF8]">
                    <h3
                      onClick={() => handleOpenDish(dish)}
                      className="font-serif text-xl text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors cursor-pointer"
                    >
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#6B6357] line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E6D8C3]/60 bg-[#FFFDF8] flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleOpenDish(dish)}
                    className="font-semibold uppercase tracking-wider text-[#7A382B] hover:text-[#29251F] transition-colors py-2"
                  >
                    View Details
                  </button>

                  <a
                    href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#29251F] hover:text-[#7A382B] font-semibold"
                  >
                    <span>Order Online</span>
                    <ExternalLink className="h-3 w-3 text-[#7A382B]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-14 bg-[#F5EFE4] border border-[#E6D8C3] p-6 text-sm text-[#6B6357]">
            No dishes found matching your search.
          </div>
        )}
      </div>

      {/* Dish Detail Sheet Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        isFavorite={selectedDish ? isFavorite(selectedDish.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </section>
  );
}
