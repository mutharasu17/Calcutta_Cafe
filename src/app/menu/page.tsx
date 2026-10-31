"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory, MenuItem } from "@/data/menuData";
import {
  ShoppingBag,
  Sparkles,
  Search,
  Filter,
  Check,
  Flame,
  Info,
  UtensilsCrossed,
} from "lucide-react";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("category") as MenuCategory) || "all";

  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">(initialCat);
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== "all" && item.dietary !== dietaryFilter) {
        return false;
      }
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
  }, [activeCategory, dietaryFilter, searchQuery]);

  return (
    <div className="relative pt-28 pb-24 bg-[#0A0E17]">
      {/* Header Banner */}
      <section className="relative py-14 sm:py-20 border-b border-white/10 bg-[#080C14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#161D2B]/90 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>আমাদের খাদ্যতালিকা • The Culinary Repertoire</span>
          </div>

          <h1
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF6F0]"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            The Menu of{" "}
            <span className="text-gold-gradient italic font-normal">
              Authentic Bengal
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-neutral-300">
            From the subtle Ayurvedic nuances of morning Shukto to ceremonial slow-braised Kosha
            Mangsho and earthen Mishti Doi. Every dish prepared to traditional regional recipes.
          </p>

          {/* Pricing & Ordering Guidance Notice */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-neutral-400">
            <Info className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
            <span>
              Prices & daily live availability are updated directly on our official Swiggy & Zomato
              outlets.
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Category Navigation Bar */}
      <div className="sticky top-20 z-30 border-b border-white/10 glass-panel py-4 shadow-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills (Horizontal Scroll on Mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveCategory("all")}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === "all"
                    ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                    : "border border-white/10 text-neutral-300 hover:border-white/30 hover:bg-white/5"
                }`}
              >
                All Dishes ({MENU_ITEMS.length})
              </button>
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#8B1E1E] text-white border border-[#D4AF37]/40 shadow-lg shadow-[#8B1E1E]/30"
                      : "border border-white/10 text-neutral-300 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search and Dietary Switcher */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Dietary Toggle */}
              <div className="flex rounded-full border border-white/10 bg-black/40 p-1 text-xs">
                <button
                  onClick={() => setDietaryFilter("all")}
                  className={`rounded-full px-3 py-1 font-medium transition-colors ${
                    dietaryFilter === "all"
                      ? "bg-white/15 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter("veg")}
                  className={`rounded-full px-3 py-1 font-medium transition-colors ${
                    dietaryFilter === "veg"
                      ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/40"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Veg
                </button>
                <button
                  onClick={() => setDietaryFilter("non-veg")}
                  className={`rounded-full px-3 py-1 font-medium transition-colors ${
                    dietaryFilter === "non-veg"
                      ? "bg-rose-900/40 text-rose-300 border border-rose-700/40"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Non-Veg
                </button>
              </div>

              {/* Search Box */}
              <div className="relative flex-1 md:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dishes or spices..."
                  className="w-full rounded-full border border-white/15 bg-white/5 py-1.5 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center">
            <UtensilsCrossed className="mx-auto h-12 w-12 text-[#D4AF37] opacity-60" />
            <h3 className="mt-4 font-serif text-xl font-bold text-white">No Dishes Found</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Try adjusting your search keywords or dietary filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setDietaryFilter("all");
                setSearchQuery("");
              }}
              className="mt-6 rounded-full border border-[#D4AF37] px-6 py-2 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#121622] shadow-lg transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#8B1E1E]/20"
              >
                <div>
                  {/* Item Image with Fallback Placeholder */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-[#0E1522] text-neutral-600">
                        <UtensilsCrossed className="h-10 w-10 text-[#D4AF37]/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent" />

                    {/* Dietary Indicator Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-[11px] font-semibold">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          item.dietary === "veg" ? "bg-emerald-400" : "bg-rose-500"
                        }`}
                      />
                      <span className={item.dietary === "veg" ? "text-emerald-300" : "text-rose-300"}>
                        {item.dietary === "veg" ? "Vegetarian" : "Non-Veg"}
                      </span>
                    </div>

                    {/* Chef Special Ribbon */}
                    {item.isChefSpecial && (
                      <div className="absolute top-4 right-4 rounded-full bg-[#8B1E1E] border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                        Speciality
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors"
                        style={{ fontFamily: "var(--font-serif, serif)" }}
                      >
                        {item.name}
                      </h3>
                    </div>

                    {item.bengaliName && (
                      <p className="mt-1 text-xs font-medium text-[#D4AF37]/90 tracking-wide">
                        {item.bengaliName}
                      </p>
                    )}

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-300">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[10px] text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-[11px] text-neutral-400">
                      Authentic Recipe
                    </span>
                    <Link
                      href="/order"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#1A2030] px-3.5 py-1.5 text-xs font-semibold text-[#D4AF37] transition-all hover:bg-[#8B1E1E] hover:text-white"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Order in Outlet</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-[#D4AF37] pt-28">
          Loading Menu...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
