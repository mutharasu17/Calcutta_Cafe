"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, X } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { useCart } from "@/context/CartContext";

export default function GSAPAddToCartToast() {
  const { lastAddedDish, dismissToast, openCart, totalCount } = useCart();
  const toastRef = useRef<HTMLDivElement>(null);

  const handleDismiss = useCallback(() => {
    if (toastRef.current) {
      gsap.to(toastRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: dismissToast,
      });
    } else {
      dismissToast();
    }
  }, [dismissToast]);

  useEffect(() => {
    if (lastAddedDish && toastRef.current) {
      // 1. Toast entrance animation
      gsap.fromTo(
        toastRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }
      );

      // 2. Fly-to-Cart thumbnail animation toward header cart button
      const cartBtn = document.getElementById("header-cart-btn");
      if (cartBtn && lastAddedDish.image) {
        const cartRect = cartBtn.getBoundingClientRect();
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight * 0.7;

        const flyer = document.createElement("div");
        flyer.style.position = "fixed";
        flyer.style.zIndex = "9999";
        flyer.style.width = "40px";
        flyer.style.height = "40px";
        flyer.style.borderRadius = "50%";
        flyer.style.border = "2px solid #C49A55";
        flyer.style.boxShadow = "0 8px 24px rgba(142,23,29,0.3)";
        flyer.style.backgroundImage = `url(${lastAddedDish.image})`;
        flyer.style.backgroundSize = "cover";
        flyer.style.backgroundPosition = "center";
        flyer.style.pointerEvents = "none";
        flyer.style.left = `${startX}px`;
        flyer.style.top = `${startY}px`;
        document.body.appendChild(flyer);

        gsap.to(flyer, {
          x: cartRect.left - startX + 10,
          y: cartRect.top - startY + 10,
          scale: 0.35,
          opacity: 0.2,
          duration: 0.75,
          ease: "power2.in",
          onComplete: () => {
            flyer.remove();
            // Pulse the cart icon
            gsap.fromTo(
              cartBtn,
              { scale: 1.25 },
              { scale: 1, duration: 0.35, ease: "bounce.out" }
            );
          },
        });
      }

      // Auto dismiss
      const timer = setTimeout(() => {
        handleDismiss();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [lastAddedDish, handleDismiss]);

  if (!lastAddedDish) return null;

  return (
    <div
      ref={toastRef}
      className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#FFF8ED] text-[#292321] border border-[#8E171D] p-4 shadow-xl overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        {lastAddedDish.image && (
          <div className="relative w-12 h-12 flex-shrink-0 bg-[#F4E8D7] border border-[#C49A55]/40 overflow-hidden">
            <Image
              src={lastAddedDish.image}
              alt={lastAddedDish.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#8E171D] font-bold">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>Added to Feast ({totalCount})</span>
          </div>
          <p className="font-serif text-sm font-medium text-[#292321] truncate mt-0.5">
            {lastAddedDish.name}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleDismiss();
              openCart();
            }}
            className="bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF8ED] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <span>View</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          <button
            onClick={handleDismiss}
            className="p-1 text-[#5C524B] hover:text-[#8E171D] transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
