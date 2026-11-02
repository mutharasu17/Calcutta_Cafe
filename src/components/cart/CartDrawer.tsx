"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowUpRight, Sparkles, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, totalCount, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart } =
    useCart();

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
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

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#FFF1DF] text-[#292321] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#C49A55]/30 overflow-hidden"
            role="dialog"
            aria-label="Curated Feast Selection"
          >
            {/* Header */}
            <div className="p-6 bg-[#651217] text-[#FFF1DF] border-b border-[#C49A55]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8E171D] border border-[#C49A55] flex items-center justify-center text-[#C49A55]">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#FFF1DF] font-normal">
                    Your Curated Feast
                  </h2>
                  <span className="font-bengali text-xs text-[#C49A55] block">
                    আপনার পছন্দের পদসমূহ • {totalCount} {totalCount === 1 ? "Item" : "Items"}
                  </span>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="p-2 text-[#FFF1DF]/80 hover:text-[#FFF1DF] hover:bg-[#8E171D] rounded-full transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body / Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#E6D8C3]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F4E8D7] border border-[#C49A55]/40 flex items-center justify-center text-[#8E171D]">
                    <ChefHat className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#292321]">Your Feast is Empty</h3>
                  <p className="text-sm text-[#796A60] max-w-xs font-sans leading-relaxed">
                    Explore our signature river delicacies, slow-braised mutton, and claypot sweets
                    to curate your table.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-6 py-3 bg-[#8E171D] hover:bg-[#651217] text-[#FFF1DF] text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="pt-1 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#796A60]">
                    <span>Selected Delicacies</span>
                    <button
                      onClick={clearCart}
                      className="text-[#8E171D] hover:underline font-semibold"
                    >
                      Clear All
                    </button>
                  </div>

                  {items.map(({ dish, quantity }) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
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
                        <h4 className="font-serif text-base sm:text-lg text-[#292321] font-normal leading-tight truncate">
                          {dish.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-[#796A60]">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              dish.dietary === "veg" ? "bg-emerald-600" : "bg-red-600"
                            }`}
                          />
                          <span className="uppercase">{dish.dietary}</span>
                          <span>•</span>
                          <span className="uppercase">{dish.spiceLevel} Spice</span>
                        </div>

                        {/* Controls */}
                        <div className="pt-2 flex items-center justify-between">
                          <div className="flex items-center border border-[#C49A55]/60 bg-[#F4E8D7]">
                            <button
                              onClick={() => updateQuantity(dish.id, -1)}
                              className="p-1.5 hover:bg-[#8E171D] hover:text-[#FFF1DF] transition-colors"
                              aria-label={`Decrease quantity of ${dish.name}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-mono font-semibold min-w-[28px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(dish.id, 1)}
                              className="p-1.5 hover:bg-[#8E171D] hover:text-[#FFF1DF] transition-colors"
                              aria-label={`Increase quantity of ${dish.name}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(dish.id)}
                            className="p-1.5 text-[#796A60] hover:text-[#8E171D] transition-colors"
                            aria-label={`Remove ${dish.name} from feast`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer / Ordering Actions */}
            {items.length > 0 && (
              <div className="p-6 bg-[#F4E8D7] border-t border-[#C49A55]/30 space-y-4">
                {/* Summary Banner */}
                <div className="bg-[#FFF1DF] p-3.5 border border-[#C49A55]/40 text-xs text-[#796A60] leading-relaxed">
                  <div className="flex items-center gap-1.5 font-semibold text-[#8E171D] mb-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Fresh Bangalore Preparation</span>
                  </div>
                  Items are prepared to order in small batches at our Bangalore cloud kitchen hubs.
                  Complete your order on Swiggy or Zomato for prompt delivery.
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
                    className="flex items-center justify-center gap-2 bg-[#E23744] hover:bg-[#c92e3a] text-white py-3.5 px-3 text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg text-center"
                  >
                    <span>Order on Zomato</span>
                    <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0" />
                  </a>
                </div>

                <button
                  onClick={closeCart}
                  className="w-full text-center py-2 text-xs font-mono uppercase tracking-widest text-[#796A60] hover:text-[#8E171D] transition-colors"
                >
                  Continue Exploring Menu
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
