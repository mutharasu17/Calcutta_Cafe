"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ShoppingBag, Clock, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerOrderOnline() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: cardRef.current,
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
      id="order-online"
      className="bg-[#8E171D] text-[#FFF1DF] py-16 sm:py-24 lg:py-32 border-b border-[#651217] relative overflow-hidden"
      aria-label="Order Online for Delivery"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between max-w-7xl mx-auto px-4 sm:px-8">
        <div className="w-[1px] h-full bg-[#FFF1DF]" />
        <div className="w-[1px] h-full bg-[#FFF1DF]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12 relative z-10">
        <div
          ref={cardRef}
          className="bg-[#651217] border-2 border-[#C49A55]/40 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
        >
          {/* Top Decorative Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#8E171D] border border-[#C49A55]/40 text-[#C49A55] text-xs font-mono uppercase tracking-[0.25em] font-semibold">
              <ShoppingBag className="h-3.5 w-3.5" />
              Direct Delivery • অনলাইন অর্ডার
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FFF1DF] leading-[1.1]">
              Savour Authentic Bengal at Your Table.
            </h2>

            <p className="font-bengali text-base sm:text-lg text-[#C49A55] font-medium">
              তাজা ও গরম রান্না আপনার ঘরে পৌঁছে দেওয়ার নির্ভরযোগ্য ব্যবস্থা
            </p>

            <p className="text-sm sm:text-base text-[#FFF1DF]/80 font-sans leading-relaxed">
              Order your favourite Bengali delicacies freshly prepared from our dedicated
              Bangalore cloud kitchen hubs via our verified Swiggy and Zomato partners.
            </p>
          </div>

          {/* Ordering Action Buttons */}
          <div className="mt-10 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Swiggy Button */}
            <a
              href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-5 bg-[#FFF1DF] hover:bg-[#F4E8D7] text-[#292321] border border-[#C49A55] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#796A60] block">
                  Official Delivery Partner
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#FC8019] block">
                  Swiggy
                </span>
                <span className="text-xs text-[#292321] font-medium">
                  Order from Bangalore Hubs
                </span>
              </div>
              <ArrowUpRight className="h-6 w-6 text-[#292321] group-hover:text-[#FC8019] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>

            {/* Zomato Button */}
            <a
              href="https://www.zomato.com/bangalore/the-calcutta-cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-5 bg-[#FFF1DF] hover:bg-[#F4E8D7] text-[#292321] border border-[#C49A55] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#796A60] block">
                  Official Delivery Partner
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#E23744] block">
                  Zomato
                </span>
                <span className="text-xs text-[#292321] font-medium">
                  Live Menus &amp; Specials
                </span>
              </div>
              <ArrowUpRight className="h-6 w-6 text-[#292321] group-hover:text-[#E23744] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>

          </div>

          {/* Hubs & Service Operational Info */}
          <div className="mt-12 pt-8 border-t border-[#FFF1DF]/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#C49A55] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#C49A55] block">
                  Bangalore Hubs
                </span>
                <span className="text-xs text-[#FFF1DF]/90 font-medium">
                  Koramangala • Indiranagar • Whitefield • HSR
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-[#C49A55] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#C49A55] block">
                  Kitchen Hours
                </span>
                <span className="text-xs text-[#FFF1DF]/90 font-medium">
                  11:30 AM – 11:00 PM Daily
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#C49A55] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#C49A55] block">
                  Preparation Standard
                </span>
                <span className="text-xs text-[#FFF1DF]/90 font-medium">
                  100% Small-Batch Daily Cooking
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

