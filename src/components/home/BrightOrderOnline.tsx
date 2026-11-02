"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowUpRight, Clock, MapPin, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export default function BrightOrderOnline() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".order-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      id="order-online"
      className="bg-[#F4E8D7] text-[#292321] py-20 sm:py-28 lg:py-36 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Order Online Delivery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        <div className="order-content bg-[#FFFCF7] border border-[#E6D8C3] shadow-md p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
                  <ShoppingBag className="h-3.5 w-3.5 text-[#C49A55]" />
                  Direct Doorstep Delivery • অনলাইন অর্ডার
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#292321] leading-[1.1]">
                  Steaming Feasts, Delivered Across Bangalore.
                </h2>
                <p className="text-base sm:text-lg text-[#5C524B] font-sans leading-relaxed">
                  Cooked to order in small batches. Delivered hot in spill-proof earthen and
                  microwave-safe containers across Bangalore.
                </p>
              </div>

              {/* Hub Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { name: "Koramangala", code: "Hub 01" },
                  { name: "Indiranagar", code: "Hub 02" },
                  { name: "Whitefield", code: "Hub 03" },
                  { name: "HSR Layout", code: "Hub 04" },
                ].map((hub) => (
                  <div
                    key={hub.name}
                    className="p-3 bg-[#FFF8ED] border border-[#E6D8C3] text-center"
                  >
                    <span className="text-[10px] font-mono text-[#8E171D] uppercase tracking-wider block font-bold">
                      {hub.code}
                    </span>
                    <span className="font-serif text-sm font-medium text-[#292321] block mt-0.5">
                      {hub.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Actions */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FC8019] hover:bg-[#e06f10] text-white py-4 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-lg text-center"
                >
                  <span>Order on Swiggy</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href="https://www.zomato.com/bangalore/the-calcutta-cafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#CB202D] hover:bg-[#b01b26] text-white py-4 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-lg text-center"
                >
                  <span>Order on Zomato</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Side: Timing & Kitchen Assurance (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FFF8ED] border border-[#E6D8C3] space-y-6">
              <div className="space-y-2">
                <span className="font-bengali text-xs text-[#8E171D] font-bold block">
                  রান্নাঘরের সময়সূচী
                </span>
                <h3 className="font-serif text-2xl text-[#292321] font-normal">
                  Kitchen Hours &amp; Hygiene
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono text-[#5C524B]">
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-[#8E171D] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#292321] block">Lunch Service</span>
                    <span>11:30 AM — 03:45 PM Daily</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-[#8E171D] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#292321] block">Dinner Service</span>
                    <span>06:30 PM — 11:15 PM Daily</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="h-4 w-4 text-[#C49A55] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#292321] block">Sanitization &amp; Packaging</span>
                    <span>Tamper-evident, temperature-retaining sealed packaging.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
