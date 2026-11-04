"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight, Building2, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerRestaurantInfo() {
  const containerRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 88%",
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
      className="bg-[#F4E8D7] text-[#292321] py-16 sm:py-24 lg:py-32 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Restaurant Information and Hubs"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div ref={infoRef} className="space-y-12 sm:space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6D8C3] pb-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
                <Building2 className="h-3.5 w-3.5 text-[#8E171D]" />
                Kitchen Hubs &amp; Operations • কেন্দ্র ও যোগাযোগ
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292321]">
                Bangalore Hubs &amp; Culinary Operations.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#651217] transition-colors pb-1 border-b border-[#8E171D]/40"
            >
              <span>Full Contact &amp; Catering</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 3 Information Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1: Delivery Hubs */}
            <div className="bg-[#FFF1DF] p-6 sm:p-8 border border-[#E6D8C3] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#8E171D] text-[#FFF1DF] flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#292321] font-normal">
                Delivery Hubs
              </h3>
              <p className="text-xs sm:text-sm text-[#796A60] leading-relaxed">
                Operating high-standard culinary cloud kitchens across Bangalore for prompt,
                temperature-controlled doorstep dispatch.
              </p>
              <ul className="text-xs text-[#292321] space-y-2 pt-2 border-t border-[#E6D8C3] font-mono">
                <li>• Koramangala Hub (South Bangalore)</li>
                <li>• Indiranagar Hub (East Bangalore &amp; CBD)</li>
                <li>• Whitefield Hub (IT Corridor)</li>
                <li>• HSR Layout Hub (Outer Ring Road)</li>
              </ul>
            </div>

            {/* Pillar 2: Service Hours */}
            <div className="bg-[#FFF1DF] p-6 sm:p-8 border border-[#E6D8C3] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#8E171D] text-[#FFF1DF] flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#292321] font-normal">
                Hours &amp; Preparation
              </h3>
              <p className="text-xs sm:text-sm text-[#796A60] leading-relaxed">
                All food is cooked fresh in curated small batches daily to ensure uncompromising
                taste, texture, and authenticity.
              </p>
              <div className="pt-2 border-t border-[#E6D8C3] space-y-2 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-[#796A60]">Monday – Sunday:</span>
                  <span className="font-semibold text-[#292321]">11:30 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-[#796A60]">Special Sunday Bhoj:</span>
                  <span className="font-semibold text-[#8E171D]">From 12:00 PM</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-[#796A60]">Order Lead Time:</span>
                  <span className="font-semibold text-[#292321]">30–45 mins</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Corporate & Inquiries */}
            <div className="bg-[#FFF1DF] p-6 sm:p-8 border border-[#E6D8C3] shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#8E171D] text-[#FFF1DF] flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#292321] font-normal">
                Get in Touch
              </h3>
              <p className="text-xs sm:text-sm text-[#796A60] leading-relaxed">
                For bulk celebration orders, festival feast bookings, or culinary feedback,
                our stewardship team is always available.
              </p>
              <div className="pt-2 border-t border-[#E6D8C3] space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#5B1B8A]" />
                  <a href="mailto:social@thecalcuttacafe.com" className="hover:text-[#5B1B8A] transition-colors">
                    social@thecalcuttacafe.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#5B1B8A]" />
                  <a href="tel:+919625177650" className="hover:text-[#5B1B8A] transition-colors">
                    +91 96251 77650
                  </a>
                </div>
                <div className="text-[11px] text-[#796A60] pt-1">
                  The Calcutta Cafe Foods Pvt Ltd
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

