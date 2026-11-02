"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerSignatureExperience() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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
        gridRef.current?.children ? Array.from(gridRef.current.children) : [],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: gridRef.current,
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
      className="bg-[#8E171D] text-[#FFF1DF] py-16 sm:py-24 lg:py-32 relative overflow-hidden border-b border-[#651217]"
      aria-label="Signature Food Experience"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C49A55] font-semibold">
            <Flame className="h-3.5 w-3.5 text-[#C49A55]" />
            Signature Craft • বিশেষ পদ সম্ভার
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FFF1DF] leading-[1.1]">
            An Unhurried Philosophy of Flame &amp; Clay.
          </h2>
          <p className="text-base sm:text-lg text-[#FFF1DF]/80 font-sans leading-relaxed">
            Every signature preparation at The Calcutta Cafe honors centuries-old kitchen techniques:
            earthen vessels that breathe, low-flame bhuna reduction that deepens spices, and
            unadulterated cold-pressed mustard oil.
          </p>
        </div>

        {/* Asymmetric Photography Grid (HENSSLER Signature Style) */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Main Large Featured Hero Card (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#651217] border border-[#C49A55]/30 overflow-hidden shadow-2xl group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/11] w-full overflow-hidden">
              <Image
                src="/images/kosha-mangsho.jpg"
                alt="Kosha Mangsho - Slow-cooked Bengal mutton in rich caramelized onion gravy"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#651217] via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4 bg-[#8E171D]/90 border border-[#C49A55]/40 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#C49A55]">
                Pillar 01 • Slow Braise
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bengali text-sm text-[#C49A55] font-medium">
                  কষা মাংস ও গোলবাড়ি ঐতিহ্য
                </span>
                <span className="text-[11px] font-mono text-[#FFF1DF]/60 uppercase tracking-widest">
                  4-Hour Bhuna
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF1DF] font-normal">
                The Legendary Kosha Mangsho
              </h3>
              <p className="text-sm sm:text-base text-[#FFF1DF]/80 leading-relaxed font-sans">
                Tender bone-in mutton slow-seared for four hours in stone-ground ginger, garlic,
                whole dried red chillies, and mustard oil until the gravy turns deeply dark, glossy,
                and clinging to the meat.
              </p>
              <div className="pt-2">
                <Link
                  href="/menu?category=chicken-mutton"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C49A55] hover:text-[#FFF1DF] transition-colors"
                >
                  <span>Explore Meat Delicacies</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Two Stacked Supporting Food Images (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between">
            
            {/* Supporting Card 1: Luchi & Chholar Dal */}
            <div className="bg-[#651217] border border-[#C49A55]/30 overflow-hidden shadow-xl group flex flex-col sm:flex-row lg:flex-col">
              <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/8] w-full sm:w-1/2 lg:w-full overflow-hidden">
                <Image
                  src="/images/luchi-chholar-dal.jpg"
                  alt="Luchi & Chholar Dal - Puffed golden bread with coconut tempered Bengal gram lentils"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-[#8E171D]/90 border border-[#C49A55]/40 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#C49A55]">
                  Pillar 02 • Vegetarian Heritage
                </div>
              </div>
              <div className="p-5 sm:p-6 sm:w-1/2 lg:w-full space-y-2">
                <span className="font-bengali text-xs text-[#C49A55] font-medium block">
                  ফুলকো লুচি ও নারকেল দেওয়া ছোলার ডাল
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#FFF1DF] font-normal">
                  Puffed Luchi &amp; Chholar Dal
                </h4>
                <p className="text-xs sm:text-sm text-[#FFF1DF]/75 leading-relaxed">
                  Deep-fried golden flour breads paired with Bengal gram lentils tempered with fresh
                  coconut shavings, asafoetida, and whole sweet spices.
                </p>
              </div>
            </div>

            {/* Supporting Card 2: Mishti Doi */}
            <div className="bg-[#651217] border border-[#C49A55]/30 overflow-hidden shadow-xl group flex flex-col sm:flex-row lg:flex-col">
              <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/8] w-full sm:w-1/2 lg:w-full overflow-hidden">
                <Image
                  src="/images/mishti-doi.jpg"
                  alt="Handcrafted Mishti Doi set in authentic earthen clay pots"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-[#8E171D]/90 border border-[#C49A55]/40 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#C49A55]">
                  Pillar 03 • Claypot Mithai
                </div>
              </div>
              <div className="p-5 sm:p-6 sm:w-1/2 lg:w-full space-y-2">
                <span className="font-bengali text-xs text-[#C49A55] font-medium block">
                  মাটির ভাঁড়ে পাতা খাঁটি মিষ্টি দই
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#FFF1DF] font-normal">
                  Artisanal Earthen Mishti Doi
                </h4>
                <p className="text-xs sm:text-sm text-[#FFF1DF]/75 leading-relaxed">
                  Caramelized whole milk fermented inside porous terracotta pots, absorbing excess
                  moisture to create an impossibly thick, silky, velvety dessert.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 pt-8 border-t border-[#FFF1DF]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[#FFF1DF]/80 font-mono tracking-wide">
            Prepared fresh in small batches daily across Bangalore.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-3 bg-[#C49A55] hover:bg-[#b08745] text-[#292321] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md"
          >
            <Sparkles className="h-4 w-4" />
            <span>Discover The Entire Menu</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

