"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryShowcase {
  id: string;
  number: string;
  title: string;
  bengali: string;
  image: string;
  summary: string;
  dishes: string[];
}

const CATEGORIES: CategoryShowcase[] = [
  {
    id: "vegetarian",
    number: "01",
    title: "Vegetarian Heritage",
    bengali: "নিরামিষ",
    image: "/images/luchi-chholar-dal.jpg",
    summary: "From bitter-sweet Shukto to fragrant Chholar Dal with puffed luchis and spiced poppy seed preparations.",
    dishes: ["Traditional Shukto", "Luchi & Chholar Dal", "Dhokar Dalna", "Aloo Posto"],
  },
  {
    id: "fish-seafood",
    number: "02",
    title: "River Fish & Seafood",
    bengali: "মাছের ঝোল ও ঝাল",
    image: "/images/shorshe-ilish.jpg",
    summary: "Monsoon Hilsa in stone-ground mustard paste, Kolkata Bhetki Paturi steamed in banana leaf, and jumbo prawns.",
    dishes: ["Shorshe Ilish", "Bhetki Macher Paturi", "Chingri Malai Curry", "Rui Kalia"],
  },
  {
    id: "chicken-mutton",
    number: "03",
    title: "Chicken & Mutton",
    bengali: "মাংসের পদ",
    image: "/images/kosha-mangsho.jpg",
    summary: "Legendary slow-braised Sunday Kosha Mangsho, Awadhi-inspired Kolkata chicken chaap, and comforting home curries.",
    dishes: ["Slow-Cooked Kosha Mangsho", "Kolkata Chicken Chaap", "Sunday Murgir Jhol"],
  },
  {
    id: "snacks-street",
    number: "04",
    title: "Street Food & Snacks",
    bengali: "কলকাতার স্ট্রিট ফুড",
    image: "/images/kathi-roll.jpg",
    summary: "Crispy Nizam-style Kathi Rolls wrapped in flaky parathas, crumb-fried chops, and spicy Kolkata cutlets.",
    dishes: ["Authentic Kathi Rolls", "Fish Fry & Kabiraji", "Mughlai Paratha"],
  },
  {
    id: "rice-meals",
    number: "05",
    title: "Rice & Complete Feasts",
    bengali: "ভাত ও ভোজ",
    image: "/images/hero-bengali-bhoj.jpg",
    summary: "Saffron-scented sweet Basanti Pulao with Gobindobhog grains and Kolkata Biryani with melt-in-mouth potato.",
    dishes: ["Basanti Pulao", "Royal Kolkata Biryani", "Traditional Bhoj Thalis"],
  },
  {
    id: "sweets-desserts",
    number: "06",
    title: "Sweets & Earthen Mishti",
    bengali: "বাংলার মিষ্টি",
    image: "/images/mishti-doi.jpg",
    summary: "Centuries of confectionary craft—porous terracotta claypot Mishti Doi, spongy Rosogolla, and artisanal Sandesh.",
    dishes: ["Claypot Mishti Doi", "Warm Rosogolla", "Artisanal Sandesh", "Payesh"],
  },
];

export default function CulinaryCollection() {
  const [activeCategory, setActiveCategory] = useState<CategoryShowcase>(CATEGORIES[0]);

  return (
    <section className="relative py-28 lg:py-40 bg-[#171615] px-6 sm:px-10 lg:px-16 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <span className="text-xs font-mono tracking-[0.22em] uppercase text-[#B79A65] block mb-3">
              The Culinary Repertoire
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#FAF9F6] tracking-tight leading-[1.08]">
              Six distinct worlds.
              <span className="block italic text-[#D8D0C3] font-normal">
                One authentic heritage.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#D8D0C3]/80 font-light leading-relaxed">
            Bengal&apos;s kitchen is not a single flavor profile. It spans delicate medicinal herbal broths, river delicacies, royal Awadhi legacies, and earthen confectionary.
          </p>
        </div>

        {/* Asymmetrical Editorial Collection Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Minimal Selector List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left p-5 transition-all duration-300 border-b ${
                    isSelected
                      ? "border-[#B79A65] bg-white/[0.03] pl-7"
                      : "border-white/[0.06] hover:border-white/20 pl-5 text-[#D8D0C3]/70 hover:text-[#FAF9F6]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#B79A65] tracking-widest">
                      {cat.number}
                    </span>
                    <span className="font-bengali text-xs text-[#B79A65]/80">
                      {cat.bengali}
                    </span>
                  </div>
                  <h3
                    className={`font-serif text-2xl mt-1.5 transition-colors ${
                      isSelected ? "text-[#FAF9F6] font-normal" : "text-[#D8D0C3]/70 font-light"
                    }`}
                  >
                    {cat.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right Column: Full-Bleed Photographic Stage (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden border border-white/[0.08] bg-[#292725]">
              <Image
                src={activeCategory.image}
                alt={activeCategory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-[#171615]/30 to-transparent" />

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-sm sm:text-base text-[#FAF9F6] font-light leading-relaxed max-w-lg mb-4">
                  {activeCategory.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#B79A65] font-mono">
                    {activeCategory.dishes.slice(0, 3).map((dish, i) => (
                      <span key={i}>• {dish}</span>
                    ))}
                  </div>

                  <Link
                    href={`/menu?category=${activeCategory.id}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FAF9F6] hover:text-[#B79A65] transition-colors"
                  >
                    <span>View Category</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
