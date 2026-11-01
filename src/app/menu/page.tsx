"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategory } from "@/data/menuData";
import { Search, ArrowUpRight } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";

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
    <div className="relative pt-32 pb-28 bg-[#090909] text-[#F5F0E8] min-h-screen">
      {/* Header */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="mx-auto max-w-5xl">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-4">
            The Culinary Repertoire
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04]">
            Authentic Bengal.
            <span className="block italic text-[#C7AC83] font-light mt-1">
              Course by course.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#A9A19A] font-light leading-relaxed max-w-2xl">
            A comprehensive journey through Bengal&apos;s culinary heritage, from bitter Shukto palate awakeners to slow-braised meats, river seafood, and earthen sweets.
          </p>
        </div>
      </section>

      {/* Category Navigation & Search */}
      <section className="px-6 sm:px-10 lg:px-16 py-6 border-b border-white/[0.08] sticky top-16 z-30 bg-[#090909]/90 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                activeCategory === "all"
                  ? "border border-[#C7AC83] bg-white/[0.08] text-[#F5F0E8]"
                  : "border border-transparent text-[#A9A19A] hover:text-[#F5F0E8]"
              }`}
            >
              All Courses
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "border border-[#C7AC83] bg-white/[0.08] text-[#F5F0E8]"
                    : "border border-transparent text-[#A9A19A] hover:text-[#F5F0E8]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#C7AC83]" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 px-9 py-2 text-xs text-[#F5F0E8] placeholder-[#A9A19A]/50 focus:outline-none focus:border-[#C7AC83] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Dishes Editorial Glass Cards */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredItems.map((item) => (
              <GlassPanel
                key={item.id}
                variant="subtle"
                hoverEffect
                className="p-6 flex flex-col justify-between space-y-6"
              >
                <div>
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#151313] border border-white/[0.08] mb-5">
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
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F5F0E8]">
                        {item.name}
                      </h3>
                      {item.bengaliName && (
                        <p className="font-bengali text-xs text-[#C7AC83] mt-0.5">
                          {item.bengaliName}
                        </p>
                      )}
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#A9A19A] px-2 py-0.5 border border-white/10">
                      {item.dietary === "veg" ? "Veg" : "Non-Veg"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#C7AC83]">
                    Bangalore Delivery
                  </span>

                  <Link
                    href="/order"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#F5F0E8] hover:text-[#C7AC83] transition-colors"
                  >
                    <span>Order Online</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#C7AC83]" />
                  </Link>
                </div>
              </GlassPanel>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-[#A9A19A] font-light">
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
    <Suspense fallback={<div className="min-h-screen bg-[#090909] pt-36 text-center text-sm text-[#A9A19A]">Loading Repertoire...</div>}>
      <MenuContent />
    </Suspense>
  );
}
