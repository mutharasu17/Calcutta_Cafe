"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory } from "@/data/menuData";
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
    <div className="relative pb-28 bg-[#F5EFE4] text-[#29251F] min-h-screen">
      {/* Editorial Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 sm:py-20 border-b border-[#E6D8C3]">
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

      {/* Category Navigation & Search */}
      <section className="px-6 sm:px-10 lg:px-16 py-5 border-b border-[#E6D8C3] sticky top-20 z-30 bg-[#F5EFE4]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all border min-h-[40px] ${
                activeCategory === "all"
                  ? "border-[#7A382B] bg-[#7A382B] text-[#F5EFE4] shadow-sm"
                  : "border-[#E6D8C3] bg-[#FFFFFF] text-[#29251F] hover:border-[#7A382B]/60"
              }`}
            >
              All Courses
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap font-medium transition-all border min-h-[40px] ${
                  activeCategory === cat.id
                    ? "border-[#7A382B] bg-[#7A382B] text-[#F5EFE4] shadow-sm"
                    : "border-[#E6D8C3] bg-[#FFFFFF] text-[#29251F] hover:border-[#7A382B]/60"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7A382B]" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E6D8C3] px-9 py-2 text-xs text-[#29251F] placeholder-[#6B6357]/60 focus:outline-none focus:border-[#7A382B] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Dishes Editorial Grid */}
      <section className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FFFFFF] border border-[#E6D8C3] p-6 flex flex-col justify-between space-y-6 shadow-sm hover:border-[#7A382B]/50 transition-all duration-300"
              >
                <div>
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3] mb-5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#29251F] group-hover:text-[#7A382B] transition-colors">
                        {item.name}
                      </h3>
                      {item.bengaliName && (
                        <p className="font-bengali text-xs text-[#7A382B] mt-0.5 font-medium">
                          {item.bengaliName}
                        </p>
                      )}
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                      item.dietary === "veg"
                        ? "text-[#34483A] border-[#34483A]/30 bg-[#34483A]/5"
                        : "text-[#7A382B] border-[#7A382B]/30 bg-[#7A382B]/5"
                    }`}>
                      {item.dietary === "veg" ? "Veg" : "Non-Veg"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6D8C3] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#7A382B] font-semibold">
                    Bangalore Delivery
                  </span>

                  <Link
                    href="/order"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#29251F] hover:text-[#7A382B] font-semibold transition-colors"
                  >
                    <span>Order Online</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#7A382B]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-[#6B6357] font-normal">
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
    <Suspense fallback={<div className="min-h-screen bg-[#F5EFE4] pt-36 text-center text-sm text-[#6B6357]">Loading Repertoire...</div>}>
      <MenuContent />
    </Suspense>
  );
}
