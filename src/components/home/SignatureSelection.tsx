"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Share2, Sparkles, ExternalLink } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "@/data/menuData";
import { useFoodDiscovery } from "@/lib/useFoodDiscovery";
import DishDetailModal from "@/components/ui/DishDetailModal";

// Anand Sweets inspired Best-Selling / Signature Repertoire
const SIGNATURE_IDS = [
  "kosha-mangsho",
  "shorshe-ilish",
  "luchi-chholar-dal",
  "kathi-roll",
  "basanti-pulao",
  "mishti-doi",
];

export default function SignatureSelection() {
  const { isFavorite, toggleFavorite, addRecentlyViewed } = useFoodDiscovery();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "veg" | "non-veg">("all");

  const signatureItems = MENU_ITEMS.filter((item) => SIGNATURE_IDS.includes(item.id));

  const displayedItems = signatureItems.filter((item) => {
    if (activeTab === "veg") return item.dietary === "veg";
    if (activeTab === "non-veg") return item.dietary === "non-veg";
    return true;
  });

  const handleOpenDish = (dish: MenuItem) => {
    addRecentlyViewed(dish.id);
    setSelectedDish(dish);
  };

  return (
    <section className="relative py-20 sm:py-28 bg-[#F5EFE4] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>Curated Best-Sellers • কালজয়ী স্বাক্ষর</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Signature Delicacies.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-xl">
              Hand-picked iconic preparations that define Bengal&apos;s culinary soul—prepared strictly according to heritage family methods.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-[#E6D8C3]/50 p-1 border border-[#E6D8C3]">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "all"
                  ? "bg-[#7A382B] text-[#FFFDF8] shadow-sm"
                  : "text-[#29251F] hover:text-[#7A382B]"
              }`}
            >
              All Signatures
            </button>
            <button
              onClick={() => setActiveTab("veg")}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "veg"
                  ? "bg-[#34483A] text-[#FFFDF8] shadow-sm"
                  : "text-[#29251F] hover:text-[#34483A]"
              }`}
            >
              Vegetarian
            </button>
            <button
              onClick={() => setActiveTab("non-veg")}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "non-veg"
                  ? "bg-[#7A382B] text-[#FFFDF8] shadow-sm"
                  : "text-[#29251F] hover:text-[#7A382B]"
              }`}
            >
              Non-Veg
            </button>
          </div>
        </div>

        {/* Anand Sweets Style Product Grid (2 cols mobile/tablet, 3 cols desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedItems.map((dish) => {
            const favorite = isFavorite(dish.id);

            return (
              <div
                key={dish.id}
                className="group relative bg-[#FFFDF8] border border-[#E6D8C3] flex flex-col justify-between shadow-sm hover:border-[#7A382B] hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Photography Container */}
                  <div
                    onClick={() => handleOpenDish(dish)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6D8C3] cursor-pointer"
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

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                    {/* Dietary Marker Dot (Traditional Indian Food Merchandising) */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <div
                        className={`w-4 h-4 rounded-none border p-0.5 flex items-center justify-center bg-[#FFFDF8]/90 backdrop-blur-sm ${
                          dish.dietary === "veg" ? "border-[#34483A]" : "border-[#7A382B]"
                        }`}
                        title={dish.dietary === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            dish.dietary === "veg" ? "bg-[#34483A]" : "bg-[#7A382B]"
                          }`}
                        />
                      </div>

                      {dish.isChefSpecial && (
                        <span className="bg-[#B68A52] text-[#FFFDF8] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 font-semibold">
                          Signature
                        </span>
                      )}
                    </div>

                    {/* Quick Favorite Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(dish.id);
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

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          onClick={() => handleOpenDish(dish)}
                          className="font-serif text-xl sm:text-2xl text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        {dish.bengaliName && (
                          <p className="font-bengali text-xs text-[#7A382B] mt-0.5 font-medium">
                            {dish.bengaliName}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Culinary tags */}
                    {dish.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dish.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#E6D8C3]/50 text-[#29251F] border border-[#E6D8C3]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#E6D8C3]/60 mt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenDish(dish)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#7A382B] hover:text-[#29251F] transition-colors py-2"
                  >
                    View Details
                  </button>

                  <a
                    href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#7A382B] hover:bg-[#5E2B21] text-[#FFFDF8] px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Order</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 bg-[#29251F] hover:bg-[#7A382B] text-[#FFFDF8] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all shadow-md"
          >
            <span>Explore All 35+ Bengali Delicacies</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
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

