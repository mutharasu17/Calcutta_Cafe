"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";

interface GalleryCategory {
  id: string;
  number: string;
  title: string;
  bengali: string;
  image: string;
  description: string;
  highlights: string[];
}

const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: "fish-seafood",
    number: "01",
    title: "Fish & River Seafood",
    bengali: "মাছ ও সামুদ্রিক স্বাদ",
    image: "/images/shorshe-ilish.jpg",
    description: "The soul of Bengal's waterways—Hilsa simmered in traditional mustard paste, wrapped Bhetki Paturi steamed in banana leaves, and jumbo prawns in tender coconut cream.",
    highlights: ["Shorshe Ilish", "Bhetki Macher Paturi", "Daab Chingri Malai Curry"],
  },
  {
    id: "chicken-mutton",
    number: "02",
    title: "Chicken & Mutton",
    bengali: "মাংসের ঘরোয়া তৃপ্তি",
    image: "/images/kosha-mangsho.jpg",
    description: "Traditional slow-cooked Sunday mutton curries, velvety koshano gravies, and Awadhi-inspired Calcutta chicken preparations.",
    highlights: ["Traditional Kosha Mangsho", "Calcutta Chicken Chaap", "Sunday Murgir Jhol"],
  },
  {
    id: "vegetarian",
    number: "03",
    title: "Vegetarian Delicacies",
    bengali: "নিরামিষের বৈচিত্র্য",
    image: "/images/luchi-chholar-dal.jpg",
    description: "From bitter-sweet restorative Shukto to spiced Chholar Dal with puffed golden luchis and fragrant poppy seed preparations.",
    highlights: ["Traditional Shukto", "Luchi & Chholar Dal", "Dhokar Dalna"],
  },
  {
    id: "snacks-street",
    number: "04",
    title: "Street Food & Rolls",
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
    title: "Sweets & Earthen Mishti",
    bengali: "বাংলার সেরা মিষ্টি",
    image: "/images/mishti-doi.jpg",
    description: "Centuries of confectionary craft—earthen claypot Mishti Doi, spongy warm Rosogolla, and artisanal Sandesh.",
    highlights: ["Claypot Mishti Doi", "Warm Rosogolla", "Artisanal Sandesh"],
  },
];

export default function ImmersiveGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>(GALLERY_CATEGORIES[0]);

  return (
    <section className="relative py-20 sm:py-28 lg:py-40 bg-[#090909] px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-16">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83] block mb-2 sm:mb-3">
              The Culinary Repertoire
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F5F0E8] tracking-tight leading-[1.08]">
              Six culinary realms.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
            Bengal&apos;s culinary heritage spans river fish delicacies, royal Awadhi legacies, complex vegetarian courses, and earthen confectionary.
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────
            CATEGORY SELECTOR GLASS TABS (MOBILE HORIZONTAL SWIPE)
        ────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 no-scrollbar scroll-smooth -mx-6 px-6 sm:mx-0 sm:px-0">
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-all duration-300 border min-h-[40px] ${
                  isSelected
                    ? "border-[#C7AC83] bg-white/[0.08] text-[#F5F0E8]"
                    : "border-white/[0.08] bg-white/[0.02] text-[#A9A19A] hover:border-white/20 hover:text-[#F5F0E8]"
                }`}
              >
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* ──────────────────────────────────────────────────────────
            IMMERSIVE EDITORIAL STAGE (DESKTOP & MOBILE RESPONSIVE)
        ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Main Visual Stage (7 Cols) — Dominant Food Presentation */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden border border-white/[0.12] bg-[#151313] shadow-2xl">
              <Image
                src={activeCategory.image}
                alt={activeCategory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter brightness-[0.9] contrast-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-60" />

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 font-mono text-[10px] sm:text-xs text-[#C7AC83] bg-[#090909]/85 backdrop-blur-md px-3 py-1 border border-white/10">
                {activeCategory.number} • {activeCategory.bengali}
              </div>
            </div>
          </div>

          {/* Floating Glass Detail Panel (5 Cols) */}
          <div className="lg:col-span-5">
            <GlassPanel variant="prominent" className="p-6 sm:p-8 lg:p-10 space-y-5 sm:space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block mb-1.5 sm:mb-2">
                  Featured Category
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] font-light">
                  {activeCategory.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#A9A19A] font-light leading-relaxed">
                {activeCategory.description}
              </p>

              <div className="pt-2 border-t border-white/[0.1] space-y-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C7AC83] block">
                  Signature Selections
                </span>
                <ul className="space-y-1 text-xs text-[#F5F0E8] font-light">
                  {activeCategory.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[#C7AC83]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 sm:pt-4">
                <Link
                  href={`/menu?category=${activeCategory.id}`}
                  className="group inline-flex items-center gap-2 border border-[#C7AC83] bg-[#C7AC83] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#090909] hover:bg-transparent hover:text-[#F5F0E8] transition-all min-h-[44px]"
                >
                  <span>Explore {activeCategory.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
