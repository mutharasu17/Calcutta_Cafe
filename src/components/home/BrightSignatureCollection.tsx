"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Plus, Check } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { MENU_ITEMS } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function BrightSignatureCollection() {
  const containerRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const collectionDishes = [
    MENU_ITEMS.find((d) => d.id === "bhetki-paturi") || MENU_ITEMS[1],
    MENU_ITEMS.find((d) => d.id === "basanti-pulao") || MENU_ITEMS[14],
    MENU_ITEMS.find((d) => d.id === "traditional-mishti-doi") || MENU_ITEMS[17],
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collection-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAdd = (dish: typeof collectionDishes[0]) => {
    addToCart(dish);
    setAddedIds((prev) => [...prev, dish.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== dish.id));
    }, 2000);
  };

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-b from-[#8E171D] via-[#7D1318] to-[#651217] text-white py-20 sm:py-28 lg:py-36 border-b-4 border-[#C49A55] relative overflow-hidden"
      aria-label="Signature Food Collection"
    >
      {/* Decorative Red & Gold Geometric Motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-[#C49A55]/15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full border border-[#C49A55]/10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C49A55] font-bold">
              <Award className="h-3.5 w-3.5 text-[#C49A55]" />
              The Connoisseur Selection • বিশিষ্ট সম্ভার
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.08]">
              Signature Food Collection.
            </h2>
            <p className="text-sm sm:text-base text-[#FFF8ED]/90 font-sans leading-relaxed max-w-xl">
              Hand-picked culinary masterpieces that embody our commitment to time-honored
              Bengal kitchen craft.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#FFF8ED] hover:text-[#C49A55] transition-colors pb-1 border-b border-white/60"
          >
            <span>Explore All 22 Menu Dishes</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3 Horizontal / Distinctive Editorial Collection Cards: Crisp White on Deep Red */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {collectionDishes.map((dish, idx) => {
            const isAdded = addedIds.includes(dish.id);

            return (
              <div
                key={dish.id}
                className="collection-item group bg-white border border-[#C49A55]/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#FFF8ED]">
                    {dish.image && (
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute top-3 left-3 bg-[#8E171D] text-white border border-[#C49A55]/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest font-semibold shadow-xs">
                      Curated 0{idx + 1}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="font-bengali text-xs text-[#8E171D] font-medium block">
                      {dish.bengaliName}
                    </span>
                    <h3 className="font-serif text-2xl text-[#292321] group-hover:text-[#8E171D] transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C524B] leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Price & Add to Feast */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#E6D8C3]/70 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#5C524B] block">
                        Serving
                      </span>
                      <span className="font-serif text-xl font-bold text-[#8E171D]">
                        ₹{dish.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(dish)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[#8E171D] hover:bg-[#A9272D] text-white"
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
          })}
        </div>

      </div>
    </section>
  );
}

