"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MENU_ITEMS, MenuItem } from "@/data/menuData";
import { useFoodDiscovery } from "@/lib/useFoodDiscovery";
import DishDetailModal from "@/components/ui/DishDetailModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BEST_SELLER_IDS = [
  "kosha-mangsho",
  "shorshe-ilish",
  "luchi-chholar-dal",
  "kathi-roll",
  "basanti-pulao",
  "mishti-doi",
];

export default function AnandBestSellers() {
  const { isFavorite, toggleFavorite, addRecentlyViewed } = useFoodDiscovery();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");

  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const bestSellerItems = MENU_ITEMS.filter((item) =>
    BEST_SELLER_IDS.includes(item.id)
  );

  const filteredItems = bestSellerItems.filter((item) => {
    if (dietaryFilter === "veg") return item.dietary === "veg";
    if (dietaryFilter === "non-veg") return item.dietary === "non-veg";
    return true;
  });

  const handleOpenDish = (dish: MenuItem) => {
    addRecentlyViewed(dish.id);
    setSelectedDish(dish);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = carouselRef.current?.querySelectorAll(".bestseller-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [dietaryFilter]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#FFFDF8] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>Customer Favourites • সেরা রসনা</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Best-Selling Delicacies.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-xl">
              Anand Sweets-style curated product gallery of our most celebrated dishes—handcrafted strictly according to time-honoured heritage methods.
            </p>
          </div>

          {/* Controls: Filter Pills & Desktop Carousel Navigation Arrows */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#F5EFE4] p-1 border border-[#E6D8C3]">
              <button
                onClick={() => setDietaryFilter("all")}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === "all"
                    ? "bg-[#7A382B] text-[#FFFDF8] shadow-sm"
                    : "text-[#29251F] hover:text-[#7A382B]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter("veg")}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === "veg"
                    ? "bg-[#34483A] text-[#FFFDF8] shadow-sm"
                    : "text-[#29251F] hover:text-[#34483A]"
                }`}
              >
                Veg
              </button>
              <button
                onClick={() => setDietaryFilter("non-veg")}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === "non-veg"
                    ? "bg-[#7A382B] text-[#FFFDF8] shadow-sm"
                    : "text-[#29251F] hover:text-[#7A382B]"
                }`}
              >
                Non-Veg
              </button>
            </div>

            {/* Desktop Carousel Arrows */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-2 border border-[#E6D8C3] bg-[#F5EFE4] hover:bg-[#7A382B] hover:text-[#FFFDF8] hover:border-[#7A382B] transition-colors"
                aria-label="Previous best sellers"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-2 border border-[#E6D8C3] bg-[#F5EFE4] hover:bg-[#7A382B] hover:text-[#FFFDF8] hover:border-[#7A382B] transition-colors"
                aria-label="Next best sellers"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Anand Sweets Style Horizontally Navigable Product Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filteredItems.map((dish) => {
            const favorite = isFavorite(dish.id);

            return (
              <div
                key={dish.id}
                className="bestseller-card group flex-shrink-0 w-[80vw] sm:w-[320px] lg:w-[360px] bg-[#F5EFE4] border border-[#E6D8C3] flex flex-col justify-between shadow-sm hover:border-[#7A382B] hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Food Photography Container */}
                  <div
                    onClick={() => handleOpenDish(dish)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6D8C3] cursor-pointer"
                  >
                    {dish.image && (
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 640px) 80vw, 360px"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                    {/* Standard Indian Dietary Indicator */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <div
                        className={`w-4 h-4 rounded-none border p-0.5 flex items-center justify-center bg-[#FFFDF8]/90 backdrop-blur-sm ${
                          dish.dietary === "veg"
                            ? "border-[#34483A]"
                            : "border-[#7A382B]"
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
                  <div className="p-5 space-y-2 bg-[#FFFDF8]">
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

                    <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>

                    {dish.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dish.tags.slice(0, 2).map((tag) => (
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
                <div className="p-5 pt-0 border-t border-[#E6D8C3]/60 bg-[#FFFDF8] flex items-center justify-between gap-3">
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

        {/* View All Repertoire Link */}
        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 bg-[#29251F] hover:bg-[#7A382B] text-[#FFFDF8] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all shadow-md"
          >
            <span>Explore Complete Culinary Repertoire</span>
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
