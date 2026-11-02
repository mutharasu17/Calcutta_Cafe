"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check, Eye, Heart } from "lucide-react";
import { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

interface BrightFoodCardProps {
  dish: MenuItem;
  onOpenDetails?: (dish: MenuItem) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function BrightFoodCard({
  dish,
  onOpenDetails,
  isFavorite = false,
  onToggleFavorite,
}: BrightFoodCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const isVeg = dish.dietary === "veg";

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(dish);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group bg-[#FFFCF7] border border-[#E6D8C3] hover:border-[#8E171D] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden">
      {/* ──────────────────────────────────────────────────────────
          FOOD PHOTOGRAPHY (CONSISTENT ASPECT RATIO & HOVER ZOOM)
      ────────────────────────────────────────────────────────── */}
      <div
        onClick={() => onOpenDetails?.(dish)}
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4E8D7] cursor-pointer"
      >
        {dish.image ? (
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#5C524B]">
            Calcutta Culinary Repertoire
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            {/* Dietary Marker Badge */}
            <div
              className={`w-4 h-4 bg-[#FFFCF7]/95 backdrop-blur-xs border flex items-center justify-center p-0.5 ${
                isVeg ? "border-emerald-600" : "border-[#8E171D]"
              }`}
              title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isVeg ? "bg-emerald-600" : "bg-[#8E171D]"
                }`}
              />
            </div>

            {dish.isChefSpecial && (
              <span className="bg-[#8E171D] text-[#FFF8ED] px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-semibold shadow-xs">
                Chef Special
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(dish.id);
                }}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isFavorite
                    ? "bg-[#8E171D] text-[#FFF8ED]"
                    : "bg-[#FFFCF7]/90 text-[#292321] hover:text-[#8E171D]"
                }`}
                aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
              >
                <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            )}

            <span className="bg-[#FFF8ED]/95 backdrop-blur-xs text-[#292321] border border-[#C49A55]/30 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-medium">
              {dish.spiceLevel}
            </span>
          </div>
        </div>

        {/* Quick View Button on Hover */}
        {onOpenDetails && (
          <button
            onClick={() => onOpenDetails(dish)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25 backdrop-blur-[1px] z-10 cursor-pointer"
            aria-label={`View full details of ${dish.name}`}
          >
            <span className="inline-flex items-center gap-1.5 bg-[#FFF8ED] text-[#292321] hover:bg-[#8E171D] hover:text-[#FFF8ED] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-md transition-colors">
              <Eye className="h-3.5 w-3.5" />
              <span>Details</span>
            </span>
          </button>
        )}
      </div>

      {/* ──────────────────────────────────────────────────────────
          DISH INFORMATION & TYPOGRAPHY
      ────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {dish.bengaliName && (
            <span className="font-bengali text-xs text-[#8E171D] font-medium block">
              {dish.bengaliName}
            </span>
          )}
          <h3
            onClick={() => onOpenDetails?.(dish)}
            className="font-serif text-xl sm:text-2xl text-[#292321] group-hover:text-[#8E171D] transition-colors leading-snug cursor-pointer font-medium"
          >
            {dish.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#5C524B] leading-relaxed line-clamp-2">
            {dish.description}
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────
            VERIFIED PRICE & ADD TO FEAST ACTION BAR
        ────────────────────────────────────────────────────────── */}
        <div className="pt-3.5 border-t border-[#E6D8C3]/70 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C524B]/80 leading-none">
              Portion
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-[#8E171D] mt-0.5">
              ₹{dish.price}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF8ED]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 text-[#C49A55]" />
                <span>Add to Feast</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

