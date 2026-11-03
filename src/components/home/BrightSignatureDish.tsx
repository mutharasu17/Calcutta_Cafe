"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Plus, Check, ArrowRight, Clock } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { MENU_ITEMS } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

export default function BrightSignatureDish() {
  const containerRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const signatureDish = MENU_ITEMS.find((d) => d.id === "kosha-mangsho") || MENU_ITEMS[0];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sig-dish-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  const handleAdd = () => {
    addToCart(signatureDish);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-b from-[#5B1B8A] via-[#4B1473] to-[#390F58] text-white py-20 sm:py-28 lg:py-36 relative overflow-hidden border-b-4 border-[#FFB834]"
      aria-label="Featured Signature Dish"
    >
      {/* Decorative Purple & Gold Heritage Motif Background Watermark */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-[#FFB834]/20 pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border border-[#FFB834]/15 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="sig-dish-content max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#FFB834] font-bold">
            <Flame className="h-3.5 w-3.5 text-[#FFB834]" />
            Signature Dish Spotlight • বিশেষ নিবেদন
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.08]">
            An Unhurried Philosophy of Flame &amp; Clay.
          </h2>
          <p className="text-base sm:text-lg text-[#FFF8ED]/90 font-sans leading-relaxed">
            Every signature preparation at The Calcutta Cafe honors centuries-old kitchen techniques:
            earthen vessels that breathe, low-flame bhuna reduction that deepens spices, and
            unadulterated cold-pressed mustard oil.
          </p>
        </div>

        {/* Featured Dish Editorial Split Container: Warm Ivory Card on Bengali Purple */}
        <div className="sig-dish-content bg-[#FAF6F0] border-2 border-[#FFB834]/60 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch rounded-sm">
          
          {/* Left: Large Food Image (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto w-full min-h-[320px] lg:min-h-[460px] bg-[#E6D8C3] overflow-hidden group">
            <Image
              src="/images/kosha-mangsho.jpg"
              alt="The Legendary Kosha Mangsho - Slow-cooked Bengal mutton in rich caramelized onion gravy"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 left-4 bg-[#5B1B8A] text-[#FFF8ED] px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-semibold shadow-xs rounded-xs border border-[#FFB834]/50">
              Chef Signature • 4-Hour Bhuna
            </div>
          </div>

          {/* Right: Narrative & Direct Action (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-[#FAF6F0] text-[#2D231E]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bengali text-sm text-[#5B1B8A] font-bold">
                  কষা মাংস ও গোলবাড়ি ঐতিহ্য
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#5C524B] uppercase tracking-wider">
                  <Clock className="h-3 w-3 text-[#FFB834]" />
                  Slow Braise
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#2D231E] font-medium leading-tight">
                Traditional Kosha Mangsho
              </h3>

              <p className="text-sm sm:text-base text-[#5C524B] leading-relaxed font-sans">
                Tender bone-in mutton slow-seared for four hours in stone-ground ginger, garlic,
                whole dried red chillies, and mustard oil until the gravy turns deeply dark, glossy,
                and clinging to the meat. Served traditionally with hot puffed Luchis or Basanti Pulao.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#5C524B]">
                <span className="px-2.5 py-1 bg-[#FFF8ED] border border-[#5B1B8A]/30 font-semibold text-[#5B1B8A] rounded-xs">
                  Non-Vegetarian
                </span>
                <span className="px-2.5 py-1 bg-[#FFF8ED] border border-[#E6D8C3] text-[#5C524B] rounded-xs">
                  Medium-High Spice
                </span>
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="pt-6 border-t border-[#E6D8C3] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C524B] block">
                  Price
                </span>
                <span className="font-serif text-3xl font-bold text-[#5B1B8A]">
                  ₹{signatureDish.price}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-xs cursor-pointer rounded-sm border ${
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

                <Link
                  href="/menu?category=chicken-mutton"
                  className="p-3 text-[#5B1B8A] hover:text-[#FFF8ED] hover:bg-[#5B1B8A] border border-[#5B1B8A]/30 transition-colors bg-[#FFF8ED] rounded-sm"
                  aria-label="Explore more meat dishes"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
