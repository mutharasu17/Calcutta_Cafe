"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/data/menuData";
import { X, Heart, Share2, ExternalLink, Check, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function DishDetailModal({
  dish,
  onClose,
  isFavorite,
  onToggleFavorite,
}: DishDetailModalProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (dish) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dish, onClose]);

  if (!dish) return null;

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/menu?dish=${dish.id}` : "";
    const shareData = {
      title: `${dish.name} — The Calcutta Cafe`,
      text: dish.description,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to clipboard if share cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const handleAddDish = () => {
    addToCart(dish);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-detail-title"
    >
      {/* Background Click to Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card: Warm Ivory with Bengali Purple & Gold Accents */}
      <div className="relative z-10 w-full max-w-2xl bg-[#FFF8ED] border-2 border-[#D2B48C] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto rounded-sm">
        {/* Top Image Container */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#FAF6F0] flex-shrink-0">
          {dish.image ? (
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover object-center"
              priority
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-[#5C524B] text-sm font-mono">
              The Calcutta Cafe Repertoire
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-xs border border-[#5B1B8A]/30 flex items-center justify-center text-[#2D231E] hover:bg-[#5B1B8A] hover:text-[#FFF8ED] transition-colors cursor-pointer shadow-xs"
            aria-label="Close dish details modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Dietary Tag */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span
              className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold border backdrop-blur-xs rounded-xs ${
                dish.dietary === "veg"
                  ? "bg-emerald-700/95 text-white border-emerald-600"
                  : "bg-[#5B1B8A]/95 text-[#FFF8ED] border-[#FFB834]/50"
              }`}
            >
              {dish.dietary === "veg" ? "Pure Vegetarian" : "Authentic Non-Veg"}
            </span>

            {dish.isChefSpecial && (
              <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#FFB834] text-[#2D231E] border border-[#FFB834] backdrop-blur-xs rounded-xs">
                Signature Repertoire
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#FFF8ED]">
          {/* Title & Bengali Script */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="dish-detail-title"
                className="font-serif text-2xl sm:text-4xl text-[#2D231E] font-medium leading-tight"
              >
                {dish.name}
              </h2>
              {dish.bengaliName && (
                <p className="font-bengali text-base sm:text-lg text-[#5B1B8A] mt-1 font-semibold">
                  {dish.bengaliName}
                </p>
              )}
            </div>

            {/* Quick Actions (Favorite & Share) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onToggleFavorite(dish.id)}
                className={`p-2.5 border transition-colors cursor-pointer rounded-sm ${
                  isFavorite
                    ? "bg-[#5B1B8A] text-[#FFB834] border-[#FFB834]"
                    : "bg-[#FAF6F0] text-[#2D231E] border-[#E6D8C3] hover:border-[#5B1B8A]"
                }`}
                title={isFavorite ? "Remove from favourites" : "Save to favourites"}
                aria-label={isFavorite ? "Remove from favourites" : "Save to favourites"}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 bg-[#FAF6F0] text-[#2D231E] border border-[#E6D8C3] hover:border-[#5B1B8A] transition-colors relative cursor-pointer rounded-sm"
                title="Share this dish"
                aria-label="Share this dish"
              >
                {copySuccess ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Copy Toast Alert */}
          {copySuccess && (
            <div className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 flex items-center gap-2 rounded-xs">
              <Check className="h-3.5 w-3.5" />
              <span>Link copied to clipboard! Share with friends.</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm sm:text-base text-[#5C524B] font-normal leading-relaxed">
            {dish.description}
          </p>

          {/* Tags */}
          {dish.tags && dish.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono text-[#5C524B] uppercase tracking-wider">
                Culinary Notes:
              </span>
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-[#FAF6F0] border border-[#E6D8C3] text-[#2D231E] rounded-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Price & Add to Feast Action */}
          <div className="pt-4 border-t border-[#E6D8C3] flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C524B] block">
                Serving Price
              </span>
              <span className="font-serif text-3xl font-bold text-[#5B1B8A]">
                ₹{dish.price}
              </span>
            </div>

            <button
              onClick={handleAddDish}
              className={`flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-xs cursor-pointer rounded-sm border ${
                isAdded
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : "bg-[#5B1B8A] hover:bg-[#4B1473] text-[#FFF8ED] border-[#FFB834]/50"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added to Feast</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 text-[#FFB834]" />
                  <span>Add to Feast</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Delivery Hubs */}
          <div className="pt-4 border-t border-[#E6D8C3] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-mono text-xs uppercase tracking-wider text-[#5B1B8A] font-bold">
                Bangalore Hub Direct Delivery
              </span>
              <span className="text-xs text-[#5C524B]">
                Koramangala • Indiranagar • Whitefield • HSR
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#FC8019] text-white py-3.5 px-4 min-h-[44px] text-xs font-semibold uppercase tracking-wider hover:bg-[#e06f10] transition-colors shadow-xs rounded-sm"
              >
                <span>Order on Swiggy</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://www.zomato.com/bangalore/the-calcutta-cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#CB202D] text-white py-3.5 px-4 min-h-[44px] text-xs font-semibold uppercase tracking-wider hover:bg-[#b01b26] transition-colors shadow-xs rounded-sm"
              >
                <span>Order on Zomato</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
