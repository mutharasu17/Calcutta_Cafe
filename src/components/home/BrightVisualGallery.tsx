"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";

const GALLERY_PHOTOS = [
  {
    src: "/images/brand/restaurant-ambiance.jpeg",
    title: "Candlelit Evening Service",
    bengali: "সন্ধ্যার উষ্ণ আবহাওয়া",
    subtitle: "Warm dining ambiance with handcrafted brass and terracotta",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/brand/packaging-studio.jpeg",
    title: "Official Kraft Packaging Suite",
    bengali: "খাঁটি ক্রাফট প্যাকেজিং",
    subtitle: "Eco-friendly takeaway bags, meal trays & beverage cups",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/dishes/katla-kalia-bhaat.jpeg",
    title: "Katla Kalia on Terracotta Platter",
    bengali: "কাতলা কালিয়া ও ভাত",
    subtitle: "Prime river carp steak slow-braised in onion-raisin gravy",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/dishes/murgir-jhol-bhaat.jpeg",
    title: "Robibarer Murgir Jhol",
    bengali: "রবিবারের মুরগির পাতলা ঝোল",
    subtitle: "Sunday light chicken broth with fried potato chunks & steamed rice",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/dishes/luchi-chholar-dal.jpeg",
    title: "Puffed Luchi & Narkel Chholar Dal",
    bengali: "লুচি ও নারকেল দিয়ে ছোলার ডাল",
    subtitle: "Golden puffed luchis with coconut-tempered Bengal gram",
    aspect: "aspect-[4/3]",
  },
];

export default function BrightVisualGallery() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
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

  return (
    <section
      ref={containerRef}
      id="visual-gallery"
      className="bg-[#FFF8ED] text-[#2D231E] py-12 sm:py-20 lg:py-28 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Food and Culinary Gallery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#5B1B8A] font-bold">
            <Camera className="h-3.5 w-3.5 text-[#FFB834]" />
            Visual Anthology • চিত্রশালা
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#2D231E] leading-[1.08]">
            A Visual Journey Through Bengal.
          </h2>
          <p className="text-sm sm:text-base text-[#5C524B] font-sans leading-relaxed">
            The rich terracotta tones of earthen thalis, the aromatic steam rising from slow-braised kalia, and our custom kraft delivery boxes traveling across Bangalore.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.title}
              className={`gallery-item group relative overflow-hidden bg-[#FAF6F0] border border-[#E6D8C3] shadow-xs hover:shadow-lg hover:border-[#5B1B8A] transition-all duration-300 rounded-sm ${photo.aspect}`}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white space-y-1">
                <span className="font-bengali text-xs text-[#FFB834] font-semibold block">
                  {photo.bengali}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug">
                  {photo.title}
                </h3>
                <p className="text-[11px] font-sans text-[#FFF8ED]/85 line-clamp-1">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
