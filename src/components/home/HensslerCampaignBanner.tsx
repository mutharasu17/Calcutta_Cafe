"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerCampaignBanner() {
  const bannerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative bg-[#651217] text-[#FFF1DF] py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-[#8E171D]"
      aria-label="Editorial Campaign Banner"
    >
      {/* Background Photography with Deep Cinematic Grading */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/kosha-mangsho.jpg"
          alt="The Sunday Kosha Mangsho Ritual - Bengal's beloved weekend slow-cooked mutton feast"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#651217] via-[#651217]/90 to-[#651217]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#651217]/40 to-[#651217]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div ref={contentRef} className="max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#8E171D] border border-[#C49A55]/40 text-[#C49A55] text-xs font-mono uppercase tracking-[0.25em] font-semibold">
              <Flame className="h-3 w-3" />
              Bengal Heritage Ritual • রবিবার ও মাংস-ভাত
            </span>
          </div>

          {/* Oversized Headline */}
          <div className="space-y-2">
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#FFF1DF] leading-[1.05] tracking-tight">
              The Sunday <span className="italic font-light text-[#C49A55]">Kosha Mangsho</span> Ritual.
            </h2>
            <p className="font-bengali text-lg sm:text-xl text-[#C49A55] font-normal">
              ধীর আঁচে চার ঘণ্টার কষা মাংস ও গরম সুগন্ধি ভাত
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#FFF1DF]/85 leading-relaxed font-sans max-w-2xl">
            In every Bengali home, Sunday afternoon belongs to the patient rhythm of the kitchen.
            Four unhurried hours of searing bone-in mutton in unadulterated cold-pressed mustard oil,
            caramelizing onions to deep bronze, and balancing whole spices until the aroma fills
            the entire home.
          </p>

          {/* Verified Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2 border-t border-[#FFF1DF]/20 max-w-xl">
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-[#C49A55]">
                Technique
              </span>
              <span className="font-serif text-lg sm:text-xl text-[#FFF1DF]">
                Slow Earthen Bhuna
              </span>
            </div>
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-[#C49A55]">
                Base Oil
              </span>
              <span className="font-serif text-lg sm:text-xl text-[#FFF1DF]">
                Pure Kachi Ghani Mustard
              </span>
            </div>
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-[#C49A55]">
                Availability
              </span>
              <span className="font-serif text-lg sm:text-xl text-[#FFF1DF]">
                Fresh Daily Preparation
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#order-online"
              className="inline-flex items-center justify-center gap-3 bg-[#C49A55] hover:bg-[#b08745] text-[#292321] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all shadow-xl"
            >
              <span>Order The Sunday Feast</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/menu?category=chicken-mutton"
              className="inline-flex items-center justify-center gap-3 border border-[#FFF1DF]/40 hover:border-[#FFF1DF] hover:bg-[#FFF1DF]/10 text-[#FFF1DF] px-8 py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] transition-all"
            >
              <span>View Meat Specialities</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

