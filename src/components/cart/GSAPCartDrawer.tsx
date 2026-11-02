"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowUpRight, Sparkles, ChefHat } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { useCart } from "@/context/CartContext";

export default function GSAPCartDrawer() {
  const { items, totalCount, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => sum + (item.dish.price || 0) * item.quantity, 0);
  const freeDeliveryThreshold = 499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  // GSAP Drawer Open & Close Animation
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";

      if (backdropRef.current && drawerRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(
          drawerRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.45, ease: "power3.out" }
        );
      }

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeCart();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isCartOpen, closeCart]);

  const handleClose = () => {
    if (backdropRef.current && drawerRef.current) {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.35,
        ease: "power3.in",
        onComplete: closeCart,
      });
    } else {
      closeCart();
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-xs cursor-pointer"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-white text-[#292321] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#8E171D]/30 overflow-hidden"
        role="dialog"
        aria-label="Curated Feast Selection"
      >
        {/* Header */}
        <div className="p-6 bg-[#8E171D] text-white border-b border-[#C49A55]/40 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#651217] border border-[#C49A55] flex items-center justify-center text-[#C49A55]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Your Curated Feast
              </h2>
              <span className="font-bengali text-xs text-[#C49A55] block">
                আপনার পছন্দের পদসমূহ • {totalCount} {totalCount === 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-white/80 hover:text-white hover:bg-[#651217] rounded-full transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Delivery Threshold Bar */}
        <div className="px-6 py-2.5 bg-[#FFF8ED] border-b border-[#8E171D]/15 text-xs font-mono">
          <div className="flex items-center justify-between text-[#5C524B] mb-1">
            <span>
              {subtotal >= freeDeliveryThreshold
                ? "Eligible for Free Direct Delivery!"
                : `Add ₹${freeDeliveryThreshold - subtotal} more for Free Delivery`}
            </span>
            <span className="font-bold text-[#8E171D]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#E6D8C3] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#8E171D] h-full transition-all duration-400"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Body / Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#E6D8C3]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F4E8D7] border border-[#C49A55]/40 flex items-center justify-center text-[#8E171D]">
                <ChefHat className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#292321]">Your Feast is Empty</h3>
              <p className="text-sm text-[#5C524B] max-w-xs font-sans leading-relaxed">
                Explore our signature river delicacies, slow-braised mutton, and claypot sweets
                to curate your table.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-3 bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF8ED] text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              <div className="pt-1 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5C524B]">
                <span>Selected Delicacies</span>
                <button
                  onClick={clearCart}
                  className="text-[#8E171D] hover:underline font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {items.map(({ dish, quantity }) => (
                <div
                  key={dish.id}
                  className="pt-4 first:pt-2 flex items-start gap-4 group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-[#E6D8C3] border border-[#C49A55]/40 overflow-hidden">
                    {dish.image && (
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex-1 min-w-0 space-y-1">
                    {dish.bengaliName && (
                      <span className="font-bengali text-xs text-[#8E171D] font-medium block truncate">
                        {dish.bengaliName}
                      </span>
                    )}
                    <h4 className="font-serif text-base sm:text-lg text-[#292321] font-medium leading-tight truncate">
                      {dish.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#5C524B]">
                      <span className="font-bold text-[#8E171D]">₹{dish.price}</span>
                      <span>•</span>
                      <span className="uppercase">{dish.dietary}</span>
                    </div>

                    {/* Controls & Line Total */}
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#C49A55]/60 bg-[#FFFCF7]">
                        <button
                          onClick={() => updateQuantity(dish.id, -1)}
                          className="p-1.5 hover:bg-[#8E171D] hover:text-[#FFF8ED] transition-colors cursor-pointer"
                          aria-label={`Decrease quantity of ${dish.name}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-semibold min-w-[28px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(dish.id, 1)}
                          className="p-1.5 hover:bg-[#8E171D] hover:text-[#FFF8ED] transition-colors cursor-pointer"
                          aria-label={`Increase quantity of ${dish.name}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-serif text-sm font-semibold text-[#292321]">
                          ₹{dish.price * quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(dish.id)}
                          className="p-1.5 text-[#5C524B] hover:text-[#8E171D] transition-colors cursor-pointer"
                          aria-label={`Remove ${dish.name} from feast`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer / Ordering Actions */}
        {items.length > 0 && (
          <div className="p-6 bg-[#F4E8D7] border-t border-[#C49A55]/30 space-y-4">
            
            {/* Subtotal summary */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E6D8C3]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#5C524B]">
                Estimated Subtotal
              </span>
              <span className="font-serif text-2xl font-bold text-[#8E171D]">
                ₹{subtotal}
              </span>
            </div>

            {/* Summary Banner */}
            <div className="bg-[#FFFCF7] p-3.5 border border-[#C49A55]/40 text-xs text-[#5C524B] leading-relaxed shadow-2xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#8E171D] mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Small-Batch Kitchen Preparation</span>
              </div>
              Prepared fresh to order in Bangalore. Complete your order on Swiggy or Zomato for prompt doorstep delivery.
            </div>

            {/* Dispatch Partner Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#FC8019] hover:bg-[#e06f10] text-white py-3.5 px-3 text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg text-center"
              >
                <span>Order on Swiggy</span>
                <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0" />
              </a>

              <a
                href="https://www.zomato.com/bangalore/the-calcutta-cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#CB202D] hover:bg-[#b01b26] text-white py-3.5 px-3 text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg text-center"
              >
                <span>Order on Zomato</span>
                <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0" />
              </a>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
