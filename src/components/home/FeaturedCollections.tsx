"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COLLECTIONS = [
  {
    id: "awadhi-calcutta",
    title: "The Awadhi Calcutta Legacy",
    bengali: "কলকাতার মোঘলাই ঐতিহ্য",
    image: "/images/kathi-roll.jpg",
    description: "Royal Awadhi heritage adapted into iconic Park Street Kathi Rolls, fragrant Biryani with tender potato, and slow-simmered Chaap.",
    href: "/menu?category=snacks-street",
    badge: "Royal Legacy",
  },
  {
    id: "vegetarian-genius",
    title: "Vegetarian Culinary Genius",
    bengali: "নিরামিষের অপার বৈচিত্র্য",
    image: "/images/luchi-chholar-dal.jpg",
    description: "The zero-waste botanical repertoire—from bitter restorative Shukto to spiced Chholar Dal with puffed luchis and Dhokar Dalna.",
    href: "/menu?category=vegetarian",
    badge: "Heritage Craft",
  },
  {
    id: "earthen-sweets",
    title: "Earthen Claypot Mithai",
    bengali: "মাটির ভাঁড়ের সেরা মিষ্টি",
    image: "/images/mishti-doi.jpg",
    description: "Centuries of confectionary craft—earthen claypot Mishti Doi caramelized in unglazed handis, spongy warm Rosogolla, and Sandesh.",
    href: "/menu?category=sweets-desserts",
    badge: "Confectionary Art",
  },
];

export default function FeaturedCollections() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".featured-collection-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#FFFDF8] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>Signature Anthologies • সংকলন</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Featured Bengali Collections.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-xl">
              Curated dining anthologies exploring regional historical traditions from Awadhi influences to botanical vegetarian marvels.
            </p>
          </div>

          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Collection Card Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={col.href}
              className="featured-collection-card group bg-[#F5EFE4] border border-[#E6D8C3] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#7A382B] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3]">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#7A382B] text-[#FFFDF8] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {col.badge}
                  </div>
                </div>

                <div className="p-6 space-y-2 bg-[#FFFDF8]">
                  <span className="font-bengali text-xs text-[#7A382B] block">
                    {col.bengali}
                  </span>
                  <h3 className="font-serif text-2xl text-[#29251F] font-normal group-hover:text-[#7A382B] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed line-clamp-3 mt-1">
                    {col.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E6D8C3]/60 bg-[#FFFDF8] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#7A382B]">
                <span>Explore Anthology</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
