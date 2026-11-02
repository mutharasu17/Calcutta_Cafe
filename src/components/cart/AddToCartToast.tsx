"use client";

import { useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";

export default function AddToCartToast() {
  const { lastAddedDish, dismissToast, openCart, totalCount } = useCart();

  useEffect(() => {
    if (lastAddedDish) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [lastAddedDish, dismissToast]);

  return (
    <AnimatePresence>
      {lastAddedDish && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#651217] text-[#FFF1DF] border-2 border-[#C49A55] p-4 shadow-2xl overflow-hidden"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            {/* Thumbnail */}
            {lastAddedDish.image && (
              <div className="relative w-12 h-12 flex-shrink-0 bg-[#292321] border border-[#C49A55]/40 overflow-hidden">
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
                  dismissToast();
                  openCart();
                }}
                className="bg-[#C49A55] hover:bg-[#b08745] text-[#292321] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>View</span>
                <ArrowRight className="h-3 w-3" />
              </button>

              <button
                onClick={dismissToast}
                className="p-1 text-[#FFF1DF]/70 hover:text-[#FFF1DF] transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
