"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MenuCategory {
  id: string;
  number: string;
  title: string;
  bengali: string;
  image: string;
  description: string;
  highlights: string[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "vegetarian",
    number: "01",
    title: "Vegetarian Delicacies",
    bengali: "নিরামিষের বৈচিত্র্য",
    image: "/images/luchi-chholar-dal.jpg",
    description: "From bitter-sweet restorative Shukto to spiced Chholar Dal with puffed golden luchis and fragrant poppy seed preparations.",
    highlights: ["Traditional Shukto", "Luchi & Chholar Dal", "Dhokar Dalna"],
  },
  {
    id: "fish-seafood",
    number: "02",
    title: "Fish & River Seafood",
    bengali: "মাছ ও সামুদ্রিক স্বাদ",
    image: "/images/shorshe-ilish.jpg",
    description: "The soul of Bengal's waterways—Hilsa simmered in traditional mustard paste, wrapped Bhetki Paturi steamed in banana leaves, and jumbo prawns in tender coconut cream.",
    highlights: ["Shorshe Ilish", "Bhetki Macher Paturi", "Daab Chingri Malai Curry"],
  },
  {
    id: "chicken-mutton",
    number: "03",
    title: "Chicken & Mutton",
    bengali: "মাংসের ঘরোয়া তৃপ্তি",
    image: "/images/kosha-mangsho.jpg",
    description: "Traditional slow-cooked Sunday mutton curries, velvety koshano gravies, and Awadhi-inspired Calcutta chicken preparations.",
    highlights: ["Traditional Kosha Mangsho", "Calcutta Chicken Chaap", "Sunday Murgir Jhol"],
  },
  {
    id: "snacks-street",
    number: "04",
    title: "Street Food & Snacks",
    bengali: "কলকাতার স্ট্রিট ফুড",
    image: "/images/kathi-roll.jpg",
    description: "Crispy Kathi Rolls wrapped in flaky layered parathas, crumb-fried Kolkata fish chops, and spicy evening savories.",
    highlights: ["Signature Kathi Rolls", "Kolkata Fish Fry", "Mughlai Paratha"],
  },
  {
    id: "rice-meals",
    number: "05",
    title: "Rice & Complete Feasts",
    bengali: "ভাত ও পঞ্চব্যঞ্জন",
    image: "/images/hero-bengali-bhoj.jpg",
    description: "Fragrant sweet Basanti Pulao with Gobindobhog grains and royal Kolkata Biryani with tender potato that absorbs the aroma.",
    highlights: ["Basanti Pulao", "Kolkata Biryani", "Traditional Bhoj Meals"],
  },
  {
    id: "sweets-desserts",
    number: "06",
    title: "Sweets & Desserts",
    bengali: "বাংলার সেরা মিষ্টি",
    image: "/images/mishti-doi.jpg",
    description: "Centuries of confectionary craft—earthen claypot Mishti Doi, spongy warm Rosogolla, and artisanal Sandesh.",
    highlights: ["Claypot Mishti Doi", "Warm Rosogolla", "Artisanal Sandesh"],
  },
];

export default function ImmersiveGallery() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MENU_CATEGORIES[0]);

  return (
    <section className="relative py-20 sm:py-28 bg-[#F5EFE4] px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold block mb-2">
              Menu Discovery • বাংলার রসনা
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Explore the Menu.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed">
            Bengal&apos;s culinary repertoire organized by course and tradition—from royal Awadhi legacies to river fish and earthen sweets.
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────
            CATEGORY SELECTOR TABS (HORIZONTAL SWIPEABLE ON MOBILE)
        ────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar scroll-smooth -mx-6 px-6 sm:mx-0 sm:px-0">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2.5 text-xs uppercase tracking-wider font-medium transition-all duration-300 border min-h-[42px] ${
                  isSelected
                    ? "border-[#7A382B] bg-[#7A382B] text-[#F5EFE4] shadow-sm"
                    : "border-[#E6D8C3] bg-[#FFFFFF] text-[#29251F] hover:border-[#7A382B]/60"
                }`}
              >
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* ──────────────────────────────────────────────────────────
            EDITORIAL CATEGORY STAGE
        ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Visual Stage (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#E6D8C3] shadow-xl border border-[#E6D8C3]">
              <Image
                src={activeCategory.image}
                alt={activeCategory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-all duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#F5EFE4]/95 backdrop-blur-sm px-3.5 py-1.5 border border-[#E6D8C3] text-[11px] font-mono text-[#7A382B] font-semibold">
                {activeCategory.number} • {activeCategory.bengali}
              </div>
            </div>
          </div>

          {/* Category Detail Panel (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFFFF] p-6 sm:p-8 lg:p-10 border border-[#E6D8C3] shadow-lg space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#7A382B] font-semibold block mb-1.5">
                  Category {activeCategory.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#29251F] font-normal">
                  {activeCategory.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed">
                {activeCategory.description}
              </p>

              <div className="pt-2 border-t border-[#E6D8C3] space-y-2.5">
                <span className="font-mono text-xs uppercase tracking-widest text-[#7A382B] font-semibold block">
                  Signature Selections
                </span>
                <ul className="space-y-1.5 text-xs text-[#29251F] font-normal">
                  {activeCategory.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7A382B]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href={`/menu?category=${activeCategory.id}`}
                  className="group inline-flex items-center gap-2 bg-[#7A382B] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5EFE4] hover:bg-[#5E2B21] transition-all shadow-sm"
                >
                  <span>Explore {activeCategory.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
