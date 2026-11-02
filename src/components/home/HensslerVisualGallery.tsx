"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerVisualGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    {
      id: "shorshe-ilish",
      title: "Shorshe Ilish in Pure Mustard Emulsion",
      bengali: "সর্ষে ইলিশ",
      category: "River Heritage",
      image: "/images/shorshe-ilish.jpg",
      span: "lg:col-span-8",
      aspect: "aspect-[16/10]",
    },
    {
      id: "kathi-roll",
      title: "Original Park Street Style Kathi Roll",
      bengali: "পার্ক স্ট্রিট কাঠি রোল",
      category: "Street Savouries",
      image: "/images/kathi-roll.jpg",
      span: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
    {
      id: "luchi-dal",
      title: "Golden Luchi & Coconut Chholar Dal",
      bengali: "ফুলকো লুচি ও ছোলার ডাল",
      category: "Vegetarian Genius",
      image: "/images/luchi-chholar-dal.jpg",
      span: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
    {
      id: "heritage-culture",
      title: "The Architectural Soul of Bengal",
      bengali: "কলকাতার ঐতিহ্য ও স্মৃতি",
      category: "Heritage Archives",
      image: "/images/kolkata-heritage-story.jpg",
      span: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
    {
      id: "mishti-doi",
      title: "Slow-Caramelized Earthen Mishti Doi",
      bengali: "মাটির ভাঁড়ের মিষ্টি দই",
      category: "Claypot Confections",
      image: "/images/mishti-doi.jpg",
      span: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        galleryRef.current?.children ? Array.from(galleryRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
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
      className="bg-[#F4E8D7] text-[#292321] py-16 sm:py-24 lg:py-32 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Food and Restaurant Visual Gallery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
              <Camera className="h-3.5 w-3.5 text-[#8E171D]" />
              Visual Anthology • দৃশ্যপট ও অনুভূতি
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292321]">
              A Visual Celebration of Bengal’s Table.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#796A60] font-mono uppercase tracking-wider max-w-xs">
            Textural intimacy, authentic ingredients, and unadorned craftsmanship.
          </p>
        </div>

        {/* Editorial Photo Grid (A1 Gallery / HENSSLER Style) */}
        <div
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8"
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`${item.span} group relative bg-[#292321] border border-[#E6D8C3] overflow-hidden shadow-lg`}
            >
              <div className={`relative ${item.aspect} w-full overflow-hidden`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292321]/90 via-[#292321]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="bg-[#8E171D] text-[#FFF1DF] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="font-bengali text-xs text-[#C49A55] font-medium block">
                    {item.bengali}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#FFF1DF] font-normal leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Trigger */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#651217] transition-colors border-b border-[#8E171D]/40 pb-1"
          >
            <span>View All Menu Preparations</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

