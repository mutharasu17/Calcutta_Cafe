"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Eye, Sparkles, ShoppingBag, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MENU_ITEMS, MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import DishDetailModal from "@/components/ui/DishDetailModal";

const FILTER_TABS = [
  { id: "all", label: "All Curations", bengali: "সকল পদ" },
  { id: "fish-seafood", label: "River Catch", bengali: "মাছ" },
  { id: "chicken-mutton", label: "Meat Specialities", bengali: "মাংস" },
  { id: "vegetarian", label: "Vegetarian", bengali: "নিরামিষ" },
  { id: "sweets-desserts", label: "Mithai", bengali: "মিষ্টি" },
];

export default function CinematicFeaturedMenu() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("all");
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const [selectedModalDish, setSelectedModalDish] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Select verified dishes across menu
  const allFeatured = MENU_ITEMS.filter((item) =>
    [
      "shorshe-ilish",
      "kosha-mangsho",
      "bhetki-paturi",
      "luchi-alur-dom",
      "kolkata-chicken-biryani",
      "mishti-doi",
      "kathi-roll",
      "chholar-dal",
    ].includes(item.id)
  );

  const displayedDishes =
    activeTab === "all"
      ? allFeatured
      : allFeatured.filter((item) => item.category === activeTab);

  const handleAdd = (dish: MenuItem) => {
    addToCart(dish);
    setAddedItemIds((prev) => [...prev, dish.id]);
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
        aria-label="Signature Dishes with Interactive Cart"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C49A55] font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-[#C49A55]" />
                Chef’s Table • বিশেষ নির্বাচন
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FFF1DF] leading-[1.08]">
                Signature Dishes of The Calcutta Cafe.
              </h2>
              <p className="text-sm sm:text-base text-[#FFF1DF]/80 font-sans leading-relaxed max-w-xl">
                Add your favourite regional preparations to your feast collection and order directly
                for Bangalore delivery.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C49A55] hover:text-[#FFF1DF] transition-colors pb-1 border-b border-[#C49A55]/40"
            >
              <span>Explore Complete Repertoire</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Interactive Filter Pills with Motion layout */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
            {FILTER_TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 rounded-full flex items-center gap-2 flex-shrink-0 ${
                    isSelected
                      ? "text-[#292321] font-semibold"
                      : "text-[#FFF1DF]/80 hover:text-[#FFF1DF] bg-[#651217]/60 border border-[#C49A55]/30"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-[#C49A55] rounded-full"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span className="relative z-10 font-bengali text-[11px] opacity-75">
                    {tab.bengali}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Redesigned Signature Food Cards Grid with Motion layout */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {displayedDishes.map((dish) => {
                const isVeg = dish.dietary === "veg";
                const isRecentlyAdded = addedItemIds.includes(dish.id);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={dish.id}
                    className="group bg-[#651217] border border-[#C49A55]/30 hover:border-[#C49A55] transition-all duration-500 overflow-hidden shadow-xl flex flex-col justify-between"
                  >
                    {/* Food Photo Container */}
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

                      {/* Hover Trigger for Modal */}
                      <button
                        onClick={() => setSelectedModalDish(dish)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] z-10"
                        aria-label={`View details of ${dish.name}`}
                      >
                        <span className="inline-flex items-center gap-2 bg-[#FFF1DF] text-[#292321] px-4 py-2 text-xs font-semibold uppercase tracking-wider shadow-lg">
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </span>
                      </button>
                    </div>

                    {/* Dish Content & Add to Cart */}
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
                          Bangalore Dispatch
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAdd(dish)}
                          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md ${
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
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

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
