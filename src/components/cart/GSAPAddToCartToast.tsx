"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, X } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { useCart } from "@/context/CartContext";

export default function GSAPAddToCartToast() {
  const { lastAddedDish, dismissToast, openCart, totalCount } = useCart();
  const toastRef = useRef<HTMLDivElement>(null);

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
        flyer.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
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
  }, [lastAddedDish]);

  const handleDismiss = () => {
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
  };

  if (!lastAddedDish) return null;

  return (
    <div
      ref={toastRef}
      className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#651217] text-[#FFF1DF] border-2 border-[#C49A55] p-4 shadow-2xl overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        {lastAddedDish.image && (
          <div className="relative w-12 h-12 flex-shrink-0 bg-[#292321] border border-[#C49A55]/40 overflow-hidden rounded-xs">
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
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#C49A55] font-semibold">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span>Added to Feast ({totalCount})</span>
          </div>
          <p className="font-serif text-sm font-normal text-[#FFF1DF] truncate">
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
            className="bg-[#C49A55] hover:bg-[#b08745] text-[#292321] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <span>View</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          <button
            onClick={handleDismiss}
            className="p-1 text-[#FFF1DF]/70 hover:text-[#FFF1DF] transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
