"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem, MenuCategory } from "@/data/menuData";
import { Search, Heart, Clock, ExternalLink, ArrowRight, Plus, Check } from "lucide-react";
import { useFoodDiscovery } from "@/lib/useFoodDiscovery";
import { useCart } from "@/context/CartContext";
import DishDetailModal from "@/components/ui/DishDetailModal";

type FilterTab = MenuCategory | "all" | "favorites" | "recent";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("category") as MenuCategory) || "all";
  const initialDishId = searchParams.get("dish");

  const { favorites, isFavorite, toggleFavorite, recentlyViewed, addRecentlyViewed } =
    useFoodDiscovery();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<FilterTab>(initialCat);
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Auto-open dish if ?dish=id is in URL
  useEffect(() => {
    if (initialDishId) {
      const found = MENU_ITEMS.find((item) => item.id === initialDishId);
      if (found) {
        setSelectedDish(found);
        addRecentlyViewed(found.id);
      }
    }
  }, [initialDishId, addRecentlyViewed]);

  // Synchronize category search param with activeTab
  useEffect(() => {
    const cat = searchParams.get("category") as MenuCategory;
    if (cat) {
      setActiveTab(cat);
    }
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Tab filter
      if (activeTab === "favorites") {
        if (!favorites.includes(item.id)) return false;
      } else if (activeTab === "recent") {
        if (!recentlyViewed.includes(item.id)) return false;
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
  }, [activeTab, dietaryFilter, searchQuery, favorites, recentlyViewed]);

  const handleOpenDish = (dish: MenuItem) => {
    addRecentlyViewed(dish.id);
    setSelectedDish(dish);
  };

  return (
    <div className="relative pb-28 bg-[#F5EFE4] text-[#29251F] min-h-screen">
      {/* Editorial Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 border-b border-[#E6D8C3] bg-[#FFFDF8]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-3">
            The Culinary Repertoire • বাংলার রসনা
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.04]">
            Authentic Bengal.
            <span className="block italic text-[#7A382B] font-light mt-1">
              Course by course.
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed max-w-2xl">
            A comprehensive journey through Bengal&apos;s culinary heritage, from bitter Shukto palate awakeners to slow-braised curries, river seafood, and earthen sweets.
          </p>
        </div>
      </section>

      {/* Category Navigation & Search Toolbar */}
      <section className="px-6 sm:px-10 lg:px-16 py-4 border-b border-[#E6D8C3] sticky top-[72px] sm:top-[76px] lg:top-[80px] z-30 bg-[#F5EFE4]/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs (Scrollable on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border min-h-[40px] ${
                activeTab === "all"
                  ? "border-[#7A382B] bg-[#7A382B] text-[#FFFDF8] shadow-sm"
                  : "border-[#E6D8C3] bg-[#FFFDF8] text-[#29251F] hover:border-[#7A382B]/60"
              }`}
            >
              All Courses
            </button>

            {/* Favourites Tab */}
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border min-h-[40px] flex items-center gap-1.5 ${
                activeTab === "favorites"
                  ? "border-[#7A382B] bg-[#7A382B] text-[#FFFDF8] shadow-sm"
                  : "border-[#E6D8C3] bg-[#FFFDF8] text-[#29251F] hover:border-[#7A382B]/60"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${favorites.length > 0 ? "fill-current text-rose-500" : ""}`} />
              <span>Favourites ({favorites.length})</span>
            </button>

            {/* Recently Viewed Tab */}
            {recentlyViewed.length > 0 && (
              <button
                onClick={() => setActiveTab("recent")}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border min-h-[40px] flex items-center gap-1.5 ${
                  activeTab === "recent"
                    ? "border-[#7A382B] bg-[#7A382B] text-[#FFFDF8] shadow-sm"
                    : "border-[#E6D8C3] bg-[#FFFDF8] text-[#29251F] hover:border-[#7A382B]/60"
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Recent ({recentlyViewed.length})</span>
              </button>
            )}

            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider whitespace-nowrap font-medium transition-all border min-h-[40px] ${
                  activeTab === cat.id
                    ? "border-[#7A382B] bg-[#7A382B] text-[#FFFDF8] shadow-sm"
                    : "border-[#E6D8C3] bg-[#FFFDF8] text-[#29251F] hover:border-[#7A382B]/60"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Toolbar: Search & Dietary Switch */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Dietary Filter */}
            <div className="flex items-center border border-[#E6D8C3] bg-[#FFFDF8] p-0.5 flex-shrink-0">
              <button
                onClick={() => setDietaryFilter("all")}
                className={`px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                  dietaryFilter === "all" ? "bg-[#29251F] text-[#FFFDF8]" : "text-[#6B6357]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter("veg")}
                className={`px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                  dietaryFilter === "veg" ? "bg-[#34483A] text-[#FFFDF8]" : "text-[#6B6357]"
                }`}
              >
                Veg
              </button>
              <button
                onClick={() => setDietaryFilter("non-veg")}
                className={`px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                  dietaryFilter === "non-veg" ? "bg-[#7A382B] text-[#FFFDF8]" : "text-[#6B6357]"
                }`}
              >
                Non-Veg
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7A382B]" />
              <input
                type="text"
                placeholder="Search dishes or spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFDF8] border border-[#E6D8C3] px-9 py-2 text-xs text-[#29251F] placeholder-[#6B6357]/60 focus:outline-none focus:border-[#7A382B] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dishes Editorial Grid */}
      <section className="px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-[#6B6357]">
              Showing {filteredItems.length} {filteredItems.length === 1 ? "preparation" : "preparations"}
            </span>

            {activeTab === "favorites" && (
              <span className="font-mono text-xs text-[#7A382B]">
                Saved locally on your device
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const favorite = isFavorite(item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-[#FFFDF8] border border-[#E6D8C3] flex flex-col justify-between shadow-sm hover:border-[#7A382B] hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Dish Photography */}
                    {item.image && (
                      <div
                        onClick={() => handleOpenDish(item)}
                        className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3] border-b border-[#E6D8C3] cursor-pointer"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Dietary Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <div
                            className={`w-4 h-4 rounded-none border p-0.5 flex items-center justify-center bg-[#FFFDF8]/90 backdrop-blur-sm ${
                              item.dietary === "veg" ? "border-[#34483A]" : "border-[#7A382B]"
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                item.dietary === "veg" ? "bg-[#34483A]" : "bg-[#7A382B]"
                              }`}
                            />
                          </div>
                          {item.isChefSpecial && (
                            <span className="bg-[#B68A52] text-[#FFFDF8] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 font-semibold">
                              Signature
                            </span>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                          className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                            favorite
                              ? "bg-[#7A382B] text-[#FFFDF8] shadow"
                              : "bg-[#FFFDF8]/90 text-[#29251F] hover:bg-[#7A382B] hover:text-[#FFFDF8]"
                          }`}
                          aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
                        >
                          <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <div>
                        <h3
                          onClick={() => handleOpenDish(item)}
                          className="font-serif text-xl sm:text-2xl font-normal text-[#29251F] group-hover:text-[#7A382B] transition-colors cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        {item.bengaliName && (
                          <p className="font-bengali text-xs text-[#7A382B] mt-0.5 font-medium">
                            {item.bengaliName}
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#F5EFE4] text-[#29251F] border border-[#E6D8C3]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Bar */}
                  <div className="p-6 pt-0 border-t border-[#E6D8C3]/60 flex items-center justify-between text-xs mt-3 gap-2">
                    <button
                      onClick={() => handleOpenDish(item)}
                      className="font-semibold uppercase tracking-wider text-[#7A382B] hover:text-[#29251F] transition-colors py-2 cursor-pointer"
                    >
                      Dish Details
                    </button>

                    <button
                      onClick={() => addToCart(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8E171D] hover:bg-[#651217] text-[#FFF1DF] text-[11px] font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add to Feast</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-24 bg-[#FFFDF8] border border-[#E6D8C3] p-8 space-y-3">
              <p className="font-serif text-2xl text-[#29251F]">
                {activeTab === "favorites"
                  ? "No favourites saved yet."
                  : activeTab === "recent"
                  ? "No recently viewed dishes."
                  : "No dishes found matching your query."}
              </p>
              <p className="text-xs text-[#6B6357] max-w-md mx-auto">
                {activeTab === "favorites"
                  ? "Tap the heart icon on any dish across our menu or homepage to save it to your favourites list."
                  : "Explore our menu to view dishes, ingredients and culinary details."}
              </p>
              <button
                onClick={() => {
                  setActiveTab("all");
                  setDietaryFilter("all");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-2 bg-[#7A382B] text-[#FFFDF8] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#5E2B21] transition-colors mt-2"
              >
                <span>View Full Menu</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Dish Detail Sheet Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        isFavorite={selectedDish ? isFavorite(selectedDish.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5EFE4] pt-36 text-center text-sm text-[#6B6357]">
          Loading Repertoire...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
