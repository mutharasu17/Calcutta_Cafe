"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronRight, UtensilsCrossed } from "lucide-react";

interface CuisinePillar {
  id: string;
  categorySlug: string;
  number: string;
  title: string;
  bengaliTitle: string;
  themeColor: string;
  accentBg: string;
  image: string;
  tagline: string;
  story: string;
  keyDishes: string[];
  signatureSpice: string;
}

const CUISINE_PILLARS: CuisinePillar[] = [
  {
    id: "vegetarian",
    categorySlug: "vegetarian",
    number: "01",
    title: "Bengali Vegetarian",
    bengaliTitle: "নিরামিষের বৈচিত্র্য",
    themeColor: "#D4AF37",
    accentBg: "rgba(212, 175, 55, 0.08)",
    image: "/images/luchi-chholar-dal.jpg",
    tagline: "The overlooked genius of Bengal's plant-based heritage.",
    story: "Widely misunderstood as purely fish-centric, authentic Bengali cooking houses one of the world's most sophisticated vegetarian repertoires. Built on the medicinal wisdom of Ayurveda, dishes transition from bitter Shukto and steamed poppy paste (Aloo Posto) to lentil cakes (Dhokar Dalna) and spiced Chholar Dal with puffed luchis.",
    keyDishes: [
      "Traditional Shukto (Bitter-sweet restorative)",
      "Luchi with Chholar Dal (Puffed wheat & coconut dal)",
      "Dhokar Dalna (Spiced chana dal lentil cakes)",
      "Aloo Posto (Potatoes in velvety poppy seed paste)",
    ],
    signatureSpice: "Radhuni & Paanch Phoron",
  },
  {
    id: "fish-seafood",
    categorySlug: "fish-seafood",
    number: "02",
    title: "Fish & River Delicacies",
    bengaliTitle: "মাছ ও সামুদ্রিক স্বাদ",
    themeColor: "#4A90E2",
    accentBg: "rgba(23, 43, 80, 0.4)",
    image: "/images/shorshe-ilish.jpg",
    tagline: "The lifeblood of Bengal's sacred river delta.",
    story: "Rivers are the arteries of Bengal's culture. From the queen of river fish—Padma and Rupnarayan Hilsa steeped in pungent freshly ground yellow and black mustard paste—to Kolkata Bhetki Paturi wrapped and steamed in smoked banana leaves, every preparation honors the pure natural texture of the catch.",
    keyDishes: [
      "Shorshe Ilish (Monsoon Hilsa in mustard & green chili)",
      "Bhetki Macher Paturi (Barramundi in banana leaf parcel)",
      "Chingri Malai Curry (Tiger prawns in fragrant coconut gravy)",
      "Rui Macher Kalia (Rich caramelized onion gravy)",
    ],
    signatureSpice: "Fresh Stone-Ground Mustard & Green Chillies",
  },
  {
    id: "chicken-mutton",
    categorySlug: "chicken-mutton",
    number: "03",
    title: "Chicken & Mutton",
    bengaliTitle: "মাংসের ঘরোয়া তৃপ্তি",
    themeColor: "#8B1725",
    accentBg: "rgba(139, 23, 37, 0.2)",
    image: "/images/kosha-mangsho.jpg",
    tagline: "The sacred Sunday ritual of patient, slow braising.",
    story: "In Bengali households, Sunday is incomplete without the rhythmic clang of the ladle against the cast-iron wok. Kosha Mangsho is not a curry; it is a slow-caramelization discipline where goat meat is roasted in pure mustard oil, crushed ginger, and whole spices until the gravy darkens to a gleaming mahogany.",
    keyDishes: [
      "Slow-Cooked Kosha Mangsho (Braised rich goat curry)",
      "Kolkata Chicken Chaap (Slow-roasted Awadhi poppy gravy)",
      "Robibarer Murgir Jhol (Comforting Sunday chicken with potatoes)",
      "Mutton Dakbungalow (Colonial heritage spiced curry)",
    ],
    signatureSpice: "Whole Garam Masala & Kachi Ghani Mustard Oil",
  },
  {
    id: "snacks-street",
    categorySlug: "snacks-street",
    number: "04",
    title: "Street Food & Snacks",
    bengaliTitle: "কলকাতার স্ট্রিট ফুড",
    themeColor: "#E07A5F",
    accentBg: "rgba(224, 122, 95, 0.15)",
    image: "/images/kathi-roll.jpg",
    tagline: "Legendary flavours born on Kolkata's historic lanes.",
    story: "From Nizam's legendary invention of the Kathi Roll to the heritage coffee house telebhaja and crumb-coated Fish Kabiraji, Kolkata's street food is an emotion. Crispy, spicy, and layered with pungent mustard kasundi and lime, each bite carries the vibrant pulse of College Street and Park Street.",
    keyDishes: [
      "Authentic Kolkata Kathi Rolls (Flaky paratha wrap)",
      "Fish Fry & Kabiraji (Crispy crumbed bhetki cutlet)",
      "Mughlai Paratha (Egg and minced meat stuffed bread)",
      "Posto & Dimer Devil (Spiced boiled egg cutlet)",
    ],
    signatureSpice: "Kasundi Mustard & Black Rock Salt",
  },
  {
    id: "rice-meals",
    categorySlug: "rice-meals",
    number: "05",
    title: "Rice & Complete Feasts",
    bengaliTitle: "ভাত ও পঞ্চব্যঞ্জন",
    themeColor: "#D9A52E",
    accentBg: "rgba(217, 165, 46, 0.15)",
    image: "/images/hero-bengali-bhoj.jpg",
    tagline: "The golden grains that anchor every celebration.",
    story: "Bengal is a rice civilization. Indigenous aromatic grains like short-grain Gobindobhog are simmered with saffron, ghee, and golden raisins into sweet Basanti Pulao. And Kolkata Biryani—arriving with the exiled Awadhi nawabs in Metiabruz—evolved into its own sublime perfection featuring tender potato and fragrant kewra water.",
    keyDishes: [
      "Basanti Pulao (Sweet saffron fragrant Gobindobhog rice)",
      "Royal Kolkata Biryani (With spiced melt-in-mouth potato)",
      "Bhoj Thali Experience (Multi-course traditional spread)",
      "Ghee Bhaat (Warm fragrant rice with pure cow ghee)",
    ],
    signatureSpice: "Gobindobhog Rice, Saffron & Pure Ghee",
  },
  {
    id: "sweets-desserts",
    categorySlug: "sweets-desserts",
    number: "06",
    title: "Sweets & Claypot Mishti",
    bengaliTitle: "বাংলার সেরা মিষ্টি",
    themeColor: "#F4EEE2",
    accentBg: "rgba(244, 238, 226, 0.12)",
    image: "/images/mishti-doi.jpg",
    tagline: "A centuries-old craft of fresh chhana and terracotta.",
    story: "Bengal elevated confectionary to an architectural science. The creation of Mishti Doi in unglazed porous earthen pots allows moisture to evaporate naturally, concentrating the caramelized milk into silky richness. Paired with spongy Rosogolla and delicate Sandesh, it is the crowning glory of Bengal's culture.",
    keyDishes: [
      "Authentic Terracotta Mishti Doi (Earthen claypot curd)",
      "Warm Rosogolla (Spongy chhana in light sugar syrup)",
      "Kacha Golla & Nolen Gur Sandesh (Artisanal cottage cheese)",
      "Payesh (Slow-simmered rice pudding with date jaggery)",
    ],
    signatureSpice: "Nolen Gur (Date Palm Jaggery) & Cardamom",
  },
];

export default function CuisineExplorerSection() {
  const [selectedPillar, setSelectedPillar] = useState<CuisinePillar>(CUISINE_PILLARS[0]);

  return (
    <section className="relative py-24 lg:py-36 bg-[#090C12] text-[#FAF6F0] overflow-hidden border-t border-white/5">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-[#172B50]/30 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#8B1725]/15 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Top Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#172B50]/50 px-4 py-1 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-4">
            <span className="font-bengali text-xs">খাদ্য বৈচিত্র্য</span>
            <span className="h-1 w-1 rounded-full bg-[#8B1725]" />
            <span className="text-white/70 font-mono text-[10px]">CHAPTER 03 • THE CUISINE</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAF6F0] leading-[1.08]">
            Explore the Six Worlds of{" "}
            <span className="block text-gold-gradient italic font-normal">
              Bengali Gastronomy.
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
            Each category represents a distinct regional tradition, cooking vessel, and flavor spectrum. Select a culinary world below to immerse yourself in its history and signature preparations.
          </p>
        </div>

        {/* Interactive Horizontal Documentary Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/10 mb-10">
          {CUISINE_PILLARS.map((pillar) => {
            const isSelected = selectedPillar.id === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar)}
                className={`group flex items-center gap-3 px-5 py-3 rounded-xl whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#8B1725] to-[#5E0D17] text-white shadow-xl shadow-[#8B1725]/30 border border-[#D4AF37]/40 scale-105"
                    : "bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-transparent"
                }`}
              >
                <span className="font-mono text-xs opacity-70">{pillar.number}</span>
                <span>{pillar.title}</span>
                <span className="font-bengali text-xs opacity-80">{pillar.bengaliTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Editorial Presentation — Asymmetrical Full Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center rounded-3xl border border-white/10 bg-[#0F141F]/60 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl">
          {/* Left Column: Visual Story Canvas (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src={selectedPillar.image}
                alt={`${selectedPillar.title} — ${selectedPillar.tagline}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090C12]/70 via-transparent to-transparent" />

              {/* Badges Over Image */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                  PILLAR {selectedPillar.number}
                </span>
                <span className="font-bengali rounded-full bg-[#8B1725]/80 backdrop-blur-md px-3 py-1 text-xs text-white">
                  {selectedPillar.bengaliTitle}
                </span>
              </div>

              {/* Bottom Quote Banner */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-lg sm:text-2xl font-bold text-white drop-shadow-md">
                  {selectedPillar.tagline}
                </p>
                <p className="text-xs text-[#D4AF37] font-mono mt-1">
                  Key Accent: {selectedPillar.signatureSpice}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Monograph & Signature Dishes (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-3xl font-extrabold text-white">
                    {selectedPillar.title}
                  </h3>
                  <p className="font-bengali text-sm text-[#D4AF37] mt-0.5">
                    {selectedPillar.bengaliTitle}
                  </p>
                </div>
                <span className="font-mono text-2xl font-bold text-white/20">
                  {selectedPillar.number}
                </span>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
                {selectedPillar.story}
              </p>

              {/* Featured Curated Dishes */}
              <div className="mb-8">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] block mb-3">
                  Signature Preparations in Our Kitchen
                </span>
                <ul className="space-y-2.5">
                  {selectedPillar.keyDishes.map((dish, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B1725]" />
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Category Route to Menu */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <Link
                href={`/menu?category=${selectedPillar.categorySlug}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3CF5F] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#141110] shadow-lg shadow-[#D4AF37]/20 transition-all hover:scale-105"
              >
                <UtensilsCrossed className="h-3.5 w-3.5" />
                <span>Explore {selectedPillar.title} on Menu</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/order"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <span>Order for Bangalore Delivery</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
