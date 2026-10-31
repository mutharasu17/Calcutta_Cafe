"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory, MenuItem } from "@/data/menuData";
import { Search, ArrowUpRight } from "lucide-react";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("category") as MenuCategory) || "all";

  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">(initialCat);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBengali = item.bengaliName?.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBengali && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="relative pt-32 pb-28 bg-[#171615] text-[#FAF9F6]">
      {/* Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#B79A65] block mb-4">
            The Culinary Repertoire
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            Authentic Bengal.
            <span className="block italic text-[#D8D0C3] font-normal">
              Course by course.
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-[#D8D0C3]/90 font-light leading-relaxed max-w-2xl">
            A comprehensive journey through Bengal&apos;s culinary heritage, from bitter Shukto palate awakeners to slow-braised meats and earthen sweets.
          </p>
        </div>
      </section>

      {/* Category Navigation & Search */}
      <section className="px-6 sm:px-10 lg:px-16 py-10 border-b border-white/[0.06] sticky top-20 z-30 bg-[#171615]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                activeCategory === "all"
                  ? "border-b-2 border-[#B79A65] text-[#FAF9F6] font-medium"
                  : "text-[#D8D0C3]/60 hover:text-[#FAF9F6]"
              }`}
            >
              All Courses
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "border-b-2 border-[#B79A65] text-[#FAF9F6] font-medium"
                    : "text-[#D8D0C3]/60 hover:text-[#FAF9F6]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#B79A65]" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 px-9 py-2 text-xs text-[#FAF9F6] placeholder-[#D8D0C3]/40 focus:outline-none focus:border-[#B79A65] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Dishes Editorial List */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group border-b border-white/[0.08] pb-8 flex flex-col justify-between space-y-4"
              >
                {item.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#292725] border border-white/[0.06]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-light text-[#FAF9F6] group-hover:text-[#B79A65] transition-colors">
                        {item.name}
                      </h3>
                      {item.bengaliName && (
                        <p className="font-bengali text-xs text-[#B79A65] mt-0.5">
                          {item.bengaliName}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8D0C3]/60 px-2 py-0.5 border border-white/10">
                      {item.dietary === "veg" ? "Vegetarian" : "Non-Veg"}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-[#D8D0C3]/80 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link
                    href="/order"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B79A65] hover:text-[#FAF9F6] transition-colors"
                  >
                    <span>Order in Bangalore</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-neutral-400 font-light">
              No dishes found matching your query.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#171615] pt-36 text-center text-sm text-neutral-400">Loading Repertoire...</div>}>
      <MenuContent />
    </Suspense>
  );
}
