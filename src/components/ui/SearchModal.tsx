"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { MENU_ITEMS, MenuItem, MENU_CATEGORIES } from "@/data/menuData";
import { Search, X, ArrowRight, ExternalLink } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dish: MenuItem) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectDish,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(q);
      const matchesBengali = item.bengaliName?.toLowerCase().includes(q);
      const matchesDesc = item.description.toLowerCase().includes(q);
      const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
      return matchesName || matchesBengali || matchesDesc || matchesTags;
    });
  }, [query, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Search The Calcutta Cafe Menu"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-white border-2 border-[#8E171D]/25 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#8E171D]/15 bg-[#FFF8ED] flex items-center gap-3">
          <Search className="h-5 w-5 text-[#8E171D] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Bengali dishes, ingredients, or spices..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg text-[#29251F] placeholder-[#6B6357]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs font-mono text-[#6B6357] hover:text-[#7A382B] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E6D8C3] text-[#29251F] transition-colors"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#FFFDF8] border-b border-[#E6D8C3] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-[#7A382B] text-[#FFFDF8]"
                : "bg-[#F5EFE4] text-[#29251F] hover:text-[#7A382B]"
            }`}
          >
            All Courses
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[#7A382B] text-[#FFFDF8]"
                  : "bg-[#F5EFE4] text-[#29251F] hover:text-[#7A382B]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 sm:p-6 divide-y divide-[#E6D8C3]/60">
          <div className="text-xs font-mono uppercase tracking-wider text-[#6B6357] mb-3">
            Showing {searchResults.length} {searchResults.length === 1 ? "dish" : "dishes"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {searchResults.map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  onSelectDish(dish);
                  onClose();
                }}
                className="group p-3 bg-[#F5EFE4] border border-[#E6D8C3] hover:border-[#7A382B] transition-all cursor-pointer flex gap-3.5 items-start"
              >
                {dish.image && (
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 bg-[#E6D8C3] flex-shrink-0 overflow-hidden border border-[#E6D8C3]">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-none border p-0.5 flex items-center justify-center ${
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
                      <span className="font-bengali text-[11px] text-[#7A382B] truncate">
                        {dish.bengaliName}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-base text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors truncate">
                    {dish.name}
                  </h4>

                  <p className="text-xs text-[#6B6357] line-clamp-1 mt-0.5">
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#7A382B]">
                    <span>View Details</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {searchResults.length === 0 && (
            <div className="py-12 text-center text-[#6B6357] text-sm">
              No dishes found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

