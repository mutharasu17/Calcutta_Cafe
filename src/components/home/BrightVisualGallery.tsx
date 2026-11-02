"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

const GALLERY_PHOTOS = [
  {
    src: "/images/hero-bengali-bhoj.jpg",
    title: "Grand Ceremonial Mahabhoj",
    bengali: "মহভোজ থালি",
    subtitle: "Basanti Pulao, Kosha Mangsho & Shukto",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/kathi-roll.jpg",
    title: "Nizam-Style Egg Chicken Roll",
    bengali: "কলকাতা কাঠি রোল",
    subtitle: "Flaky pan-griddled paratha & charcoal boti",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/shorshe-ilish.jpg",
    title: "Monsoon Hilsa in Mustard Emulsion",
    bengali: "সর্ষে ইলিশ",
    subtitle: "Stone-ground mustard & slit chillies",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/mishti-doi.jpg",
    title: "Haringhata Claypot Mishti Doi",
    bengali: "মাটির ভাঁড়ের মিষ্টি দই",
    subtitle: "Slowly baked with date-palm jaggery",
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
      className="bg-[#FFF8ED] text-[#292321] py-20 sm:py-28 lg:py-36 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Food and Culinary Gallery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
            <Camera className="h-3.5 w-3.5 text-[#C49A55]" />
            Visual Anthology • চিত্রশালা
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#292321] leading-[1.08]">
            A Visual Journey Through Bengal.
          </h2>
          <p className="text-sm sm:text-base text-[#5C524B] font-sans leading-relaxed">
            The vibrant yellow of turmeric-infused Basanti Pulao, the earthy terracotta pots of
            Mishti Doi, and the golden crust of deep-fried Bhetki.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <div
              key={photo.title}
              className={`gallery-item group relative overflow-hidden bg-[#FFFCF7] border border-[#E6D8C3] shadow-xs hover:shadow-md hover:border-[#8E171D] transition-all duration-300 ${photo.aspect}`}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-bengali text-xs text-[#C49A55] block">
                  {photo.bengali}
                </span>
                <h3 className="font-serif text-lg text-white font-medium leading-snug">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5 font-sans">
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

