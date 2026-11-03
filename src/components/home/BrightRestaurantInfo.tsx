"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";

export default function BrightRestaurantInfo() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-card",
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
      id="restaurant-info"
      className="bg-[#FFF8ED] text-[#2D231E] py-20 sm:py-28 lg:py-36 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Restaurant and Bangalore Hub Information"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#5B1B8A] font-bold">
            <MapPin className="h-3.5 w-3.5 text-[#FFB834]" />
            Kitchen Locations • আমাদের রান্নাঘর
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#2D231E] leading-[1.08]">
            Where We Cook &amp; Serve.
          </h2>
          <p className="text-sm sm:text-base text-[#5C524B] font-sans leading-relaxed">
            Our cloud kitchens in Bangalore operate seven days a week, serving central,
            eastern, and southern neighborhoods with authentic Kolkata flavours.
          </p>
        </div>

        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              hub: "Koramangala Hub",
              address: "80 Feet Road, 4th Block, Koramangala",
              service: "South Bangalore Delivery & Pickup",
              time: "11:30 AM — 11:00 PM",
            },
            {
              hub: "Indiranagar Hub",
              address: "100 Feet Road, HAL 2nd Stage, Indiranagar",
              service: "East Bangalore & CBD Delivery",
              time: "11:30 AM — 11:00 PM",
            },
            {
              hub: "Whitefield Hub",
              address: "ITPB Main Road, Whitefield",
              service: "Tech Corridor & Outer Ring Road",
              time: "11:30 AM — 11:00 PM",
            },
            {
              hub: "HSR Layout Hub",
              address: "27th Main Road, Sector 1, HSR Layout",
              service: "HSR, Bellandur & Sarjapur Road",
              time: "11:30 AM — 11:00 PM",
            },
          ].map((item) => (
            <div
              key={item.hub}
              className="info-card p-6 sm:p-7 bg-[#FAF6F0] border border-[#E6D8C3] hover:border-[#5B1B8A] shadow-2xs hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between rounded-sm"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B1B8A] font-bold block">
                  Kitchen Dispatch
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#2D231E] font-medium">
                  {item.hub}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524B] leading-relaxed">
                  {item.address}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6D8C3]/70 space-y-1 text-[11px] font-mono text-[#5C524B]">
                <p className="text-[#5B1B8A] font-semibold">{item.service}</p>
                <p>{item.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-[#FAF6F0] border border-[#E6D8C3] border-l-4 border-l-[#5B1B8A] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 rounded-sm">
          <div className="flex items-center gap-6 flex-wrap text-xs font-mono text-[#2D231E]">
            <a
              href="tel:+918045678900"
              className="inline-flex items-center gap-2 hover:text-[#5B1B8A] transition-colors"
            >
              <Phone className="h-4 w-4 text-[#5B1B8A]" />
              <span>+91 80 4567 8900</span>
            </a>
            <a
              href="mailto:contact@thecalcuttacafe.in"
              className="inline-flex items-center gap-2 hover:text-[#5B1B8A] transition-colors"
            >
              <Mail className="h-4 w-4 text-[#5B1B8A]" />
              <span>contact@thecalcuttacafe.in</span>
            </a>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5B1B8A] hover:text-[#4B1473] transition-colors pb-0.5 border-b border-[#5B1B8A]"
          >
            <span>Banquets &amp; Catering Enquiries</span>
            <ArrowRight className="h-4 w-4 text-[#FFB834]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
