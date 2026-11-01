"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/data/menuData";
import { X, Heart, Share2, ExternalLink, Check } from "lucide-react";

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-detail-title"
    >
      {/* Background Click to Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl bg-[#FFFDF8] border border-[#E6D8C3] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto">
        {/* Top Image Container */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#E6D8C3] flex-shrink-0">
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
            <div className="h-full w-full flex items-center justify-center text-[#6B6357] text-sm">
              The Calcutta Cafe Repertoire
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-[#F5EFE4]/90 backdrop-blur-sm border border-[#E6D8C3] flex items-center justify-center text-[#29251F] hover:bg-[#7A382B] hover:text-[#F5EFE4] transition-colors"
            aria-label="Close dish details"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Dietary Tag */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span
              className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold border backdrop-blur-sm ${
                dish.dietary === "veg"
                  ? "bg-[#34483A]/90 text-[#FFFDF8] border-[#34483A]"
                  : "bg-[#7A382B]/90 text-[#FFFDF8] border-[#7A382B]"
              }`}
            >
              {dish.dietary === "veg" ? "Pure Vegetarian" : "Authentic Non-Veg"}
            </span>

            {dish.isChefSpecial && (
              <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#B68A52] text-[#FFFDF8] border border-[#B68A52] backdrop-blur-sm">
                Signature Repertoire
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Title & Bengali Script */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="dish-detail-title"
                className="font-serif text-2xl sm:text-4xl text-[#29251F] font-normal leading-tight"
              >
                {dish.name}
              </h2>
              {dish.bengaliName && (
                <p className="font-bengali text-base sm:text-lg text-[#7A382B] mt-1 font-medium">
                  {dish.bengaliName}
                </p>
              )}
            </div>

            {/* Quick Actions (Favorite & Share) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onToggleFavorite(dish.id)}
                className={`p-2.5 border transition-colors ${
                  isFavorite
                    ? "bg-[#7A382B] text-[#FFFDF8] border-[#7A382B]"
                    : "bg-[#F5EFE4] text-[#29251F] border-[#E6D8C3] hover:border-[#7A382B]"
                }`}
                title={isFavorite ? "Remove from favourites" : "Save to favourites"}
                aria-label={isFavorite ? "Remove from favourites" : "Save to favourites"}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 bg-[#F5EFE4] text-[#29251F] border border-[#E6D8C3] hover:border-[#7A382B] transition-colors relative"
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
            <div className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 flex items-center gap-2">
              <Check className="h-3.5 w-3.5" />
              <span>Link copied to clipboard! Share with friends.</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
            {dish.description}
          </p>

          {/* Tags */}
          {dish.tags && dish.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono text-[#6B6357] uppercase tracking-wider">
                Culinary Notes:
              </span>
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-[#F5EFE4] border border-[#E6D8C3] text-[#29251F]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Ordering Choices */}
          <div className="pt-4 border-t border-[#E6D8C3] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#7A382B] font-semibold">
                Bangalore Hub Direct Delivery
              </span>
              <span className="text-xs text-[#6B6357]">
                Fresh Daily Preparation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#7A382B] text-[#FFFDF8] py-3.5 px-4 text-xs font-semibold uppercase tracking-wider hover:bg-[#5E2B21] transition-colors shadow-sm min-h-[44px]"
              >
                <span>Order on Swiggy</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://www.zomato.com/bangalore/the-calcutta-cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#29251F] text-[#FFFDF8] py-3.5 px-4 text-xs font-semibold uppercase tracking-wider hover:bg-[#7A382B] transition-colors shadow-sm min-h-[44px]"
              >
                <span>Order on Zomato</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <p className="text-[11px] font-mono text-[#6B6357] text-center pt-1">
              Orders are fulfilled exclusively through official Swiggy & Zomato channels in Bangalore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

