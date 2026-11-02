"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Eye, Sparkles, ArrowUpRight, Filter } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem, MenuCategory } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import DishDetailModal from "@/components/ui/DishDetailModal";

const ALL_CATEGORY_TABS: { id: "all" | MenuCategory; label: string; bengali: string }[] = [
  { id: "all", label: "All Delicacies", bengali: "সকল পদ" },
  { id: "fish-seafood", label: "Fish & Seafood", bengali: "মাছ" },
  { id: "chicken-mutton", label: "Chicken & Mutton", bengali: "মাংস" },
  { id: "vegetarian", label: "Vegetarian", bengali: "নিরামিষ" },
  { id: "snacks-street", label: "Street Savouries", bengali: "স্ট্রিট ফুড" },
  { id: "rice-meals", label: "Rice & Thalis", bengali: "ভাত ও থালি" },
  { id: "sweets-desserts", label: "Mithai", bengali: "মিষ্টি" },
];

export default function GSAPFilteredMenu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<"all" | MenuCategory>("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const [selectedModalDish, setSelectedModalDish] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const gridRef = useRef<HTMLDivElement>(null);

  // Directly filter the master MENU_ITEMS dataset - guaranteed 100% data integrity
  const visibleDishes = MENU_ITEMS.filter((item) => {
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
    return true;
  });

  // GSAP animation when category or dietary filter changes
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [activeCategory, dietaryFilter]);

  const handleAddToCart = (dish: MenuItem, e: React.MouseEvent) => {
    addToCart(dish);
    setAddedItemIds((prev) => [...prev, dish.id]);

    // Animate clicked button
    const target = e.currentTarget;
    gsap.fromTo(
      target,
      { scale: 0.92 },
      { scale: 1, duration: 0.35, ease: "back.out(2)" }
    );

    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== dish.id));
    }, 1800);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <section
        id="signature-menu"
        className="bg-[#8E171D] text-[#FFF1DF] py-20 sm:py-28 lg:py-36 border-b border-[#651217] relative overflow-hidden"
        aria-label="Filterable Menu and Dish Selection"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C49A55] font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-[#C49A55]" />
                Curated Menu • সম্পূর্ণ পদ তালিকা
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FFF1DF] leading-[1.08]">
                Select Dishes for Your Feast.
              </h2>
              <p className="text-sm sm:text-base text-[#FFF1DF]/80 font-sans leading-relaxed max-w-xl">
                Browse our complete culinary repertoire. Select dishes to build your feast and
                order freshly prepared food from our Bangalore cloud kitchen hubs.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C49A55] hover:text-[#FFF1DF] transition-colors pb-1 border-b border-[#C49A55]/40"
            >
              <span>Full Restaurant Menu Page</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Category Tabs & Dietary Filter Toolbar */}
          <div className="space-y-4 mb-10 sm:mb-14">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
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
                        ? "bg-[#C49A55] text-[#292321] font-bold shadow-lg"
                        : "bg-[#651217]/80 text-[#FFF1DF]/85 hover:text-[#FFF1DF] hover:bg-[#651217] border border-[#C49A55]/30"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#8E171D] text-[#FFF1DF]"
                          : "bg-[#8E171D]/60 text-[#C49A55]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dietary Sub-filter */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-[#FFF1DF]/15">
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-[#C49A55]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#C49A55]">
                  Dietary Preference:
                </span>
                <div className="inline-flex rounded-md border border-[#C49A55]/40 bg-[#651217]/60 p-0.5">
                  <button
                    onClick={() => setDietaryFilter("all")}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                      dietaryFilter === "all"
                        ? "bg-[#C49A55] text-[#292321]"
                        : "text-[#FFF1DF]/70 hover:text-[#FFF1DF]"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDietaryFilter("veg")}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                      dietaryFilter === "veg"
                        ? "bg-emerald-600 text-[#FFF1DF]"
                        : "text-[#FFF1DF]/70 hover:text-[#FFF1DF]"
                    }`}
                  >
                    Veg Only
                  </button>
                  <button
                    onClick={() => setDietaryFilter("non-veg")}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                      dietaryFilter === "non-veg"
                        ? "bg-[#8E171D] text-[#FFF1DF]"
                        : "text-[#FFF1DF]/70 hover:text-[#FFF1DF]"
                    }`}
                  >
                    Non-Veg
                  </button>
                </div>
              </div>

              {/* Live Count Indicator */}
              <div className="text-xs font-mono text-[#FFF1DF]/70">
                Displaying <span className="text-[#C49A55] font-bold">{visibleDishes.length}</span>{" "}
                authentic {visibleDishes.length === 1 ? "delicacy" : "delicacies"}
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────
              FOOD CARDS GRID WITH GSAP STAGGER & RELIABLE VISIBILITY
          ────────────────────────────────────────────────────────── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {visibleDishes.map((dish) => {
              const isVeg = dish.dietary === "veg";
              const isRecentlyAdded = addedItemIds.includes(dish.id);

              return (
                <div
                  key={dish.id}
                  className="dish-card group bg-[#651217] border border-[#C49A55]/30 hover:border-[#C49A55] transition-all duration-500 overflow-hidden shadow-xl flex flex-col justify-between"
                >
                  {/* Photo Container with Hover Zoom & Badges */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#651217] via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
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

                    {/* Quick View Trigger for Modal */}
                    <button
                      onClick={() => setSelectedModalDish(dish)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/45 backdrop-blur-[2px] z-10 cursor-pointer"
                      aria-label={`View details of ${dish.name}`}
                    >
                      <span className="inline-flex items-center gap-2 bg-[#FFF1DF] text-[#292321] px-4 py-2 text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-[#C49A55] transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                        <span>View Details</span>
                      </span>
                    </button>
                  </div>

                  {/* Dish Details & Add to Cart Action */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      {dish.bengaliName && (
                        <span className="font-bengali text-xs text-[#C49A55] font-medium block">
                          {dish.bengaliName}
                        </span>
                      )}
                      <h3 className="font-serif text-2xl text-[#FFF1DF] font-normal group-hover:text-[#C49A55] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FFF1DF]/75 leading-relaxed line-clamp-2">
                        {dish.description}
                      </p>
                    </div>

                    {/* Interactive Add to Cart Bar */}
                    <div className="pt-4 border-t border-[#FFF1DF]/15 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C49A55]">
                        Fresh Daily
                      </span>

                      <button
                        onClick={(e) => handleAddToCart(dish, e)}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer ${
                          isRecentlyAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-[#C49A55] hover:bg-[#b08745] text-[#292321]"
                        }`}
                      >
                        {isRecentlyAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add to Feast</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state safeguard */}
          {visibleDishes.length === 0 && (
            <div className="text-center py-16 bg-[#651217]/50 border border-[#C49A55]/30 p-8 space-y-3">
              <p className="font-serif text-2xl text-[#FFF1DF]">No dishes match this selection.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setDietaryFilter("all");
                }}
                className="px-6 py-2.5 bg-[#C49A55] text-[#292321] text-xs font-semibold uppercase tracking-wider cursor-pointer"
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

