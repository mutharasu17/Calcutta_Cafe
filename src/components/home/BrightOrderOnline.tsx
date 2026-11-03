"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowUpRight, Clock, ShieldCheck, Box, ChevronRight, Eye } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { trackOrderClick } from "@/lib/analytics";

export default function BrightOrderOnline() {
  const containerRef = useRef<HTMLElement>(null);
  const [showDiecutModal, setShowDiecutModal] = useState(false);

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
      className="bg-[#FFF8ED] text-[#2D231E] py-16 sm:py-24 lg:py-32 border-y border-[#E6D8C3] relative overflow-hidden"
      aria-label="Order Online Delivery & Packaging"
    >
      {/* Decorative Subtle Kraft & Gold Watermark Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-[#FFB834]/20 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-[#5B1B8A]/10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Content Card: Warm Cream & Kraft-Paper Border */}
        <div className="order-content bg-[#FAF6F0] text-[#2D231E] border border-[#D2B48C] shadow-lg rounded-sm overflow-hidden p-6 sm:p-10 lg:p-14">
          
          {/* Top Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#5B1B8A] font-bold">
              <ShoppingBag className="h-4 w-4 text-[#FFB834]" />
              Authentic Flavors • Kolkata Soul • অনলাইন অর্ডার
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#2D231E] leading-[1.15] mt-3">
              Kolkata Soul, Delivered to Your Doorstep.
            </h2>
            <p className="text-base sm:text-lg text-[#5C524B] font-sans leading-relaxed mt-3">
              Crafted in small batches using slow-fire Bengali rituals. Delivered piping hot across Bangalore in our custom-designed kraft paper packaging and spill-proof 5-compartment meal trays.
            </p>
          </div>

          {/* Two-Column Grid: Left Narrative & Controls | Right Visual Packaging Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Delivery Details & Actions (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Packaging Pillars Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 bg-[#FFF8ED] border border-[#E6D8C3] rounded-sm space-y-1">
                  <div className="flex items-center gap-2 text-[#5B1B8A] font-medium text-xs">
                    <Box className="h-4 w-4 text-[#FFB834]" />
                    <span className="font-semibold uppercase tracking-wider text-[11px]">5-Compartment Tray</span>
                  </div>
                  <p className="text-xs text-[#5C524B] leading-relaxed">
                    Spill-proof meal plates keep rich jhol, yellow dal, steamed rice, and crispy bhaja crisp and isolated.
                  </p>
                </div>

                <div className="p-4 bg-[#FFF8ED] border border-[#E6D8C3] rounded-sm space-y-1">
                  <div className="flex items-center gap-2 text-[#5B1B8A] font-medium text-xs">
                    <ShieldCheck className="h-4 w-4 text-[#FFB834]" />
                    <span className="font-semibold uppercase tracking-wider text-[11px]">Kraft Paper Bags</span>
                  </div>
                  <p className="text-xs text-[#5C524B] leading-relaxed">
                    Eco-friendly heavy-duty kraft bags with purple rope handles and tamper-proof safety seals.
                  </p>
                </div>
              </div>

              {/* Verified Bangalore Hubs */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#5B1B8A] font-bold">
                  <span>Bangalore Kitchen Hubs</span>
                  <span className="text-[#5C524B] font-normal lowercase">cloud kitchens</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { name: "Koramangala", code: "Hub 01" },
                    { name: "Indiranagar", code: "Hub 02" },
                    { name: "Whitefield", code: "Hub 03" },
                    { name: "HSR Layout", code: "Hub 04" },
                  ].map((hub) => (
                    <div
                      key={hub.name}
                      className="p-2.5 bg-[#FFF8ED] border border-[#E6D8C3] text-center rounded-sm"
                    >
                      <span className="text-[9.5px] font-mono text-[#5B1B8A] uppercase tracking-wider block font-bold">
                        {hub.code}
                      </span>
                      <span className="font-serif text-sm font-medium text-[#2D231E] block mt-0.5">
                        {hub.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Timings & Assurance */}
              <div className="p-4 bg-[#FFF8ED] border border-[#D2B48C]/60 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-[#5B1B8A] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#2D231E] block">Daily Service Hours</span>
                    <span className="text-[#5C524B]">Lunch: 11:30 AM – 3:45 PM • Dinner: 6:30 PM – 11:15 PM</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDiecutModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#5B1B8A] hover:text-[#4B1473] font-sans font-medium underline underline-offset-4 cursor-pointer flex-shrink-0"
                >
                  <Eye className="h-3.5 w-3.5 text-[#FFB834]" />
                  <span>View Box Artwork</span>
                </button>
              </div>

              {/* Delivery Action Buttons: Swiggy & Zomato */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <a
                  href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOrderClick("swiggy", "Homepage Bright Order Online")}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FC8019] hover:bg-[#e06f10] text-white py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-sm hover:shadow-md text-center rounded-sm"
                >
                  <span>Order on Swiggy</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href="https://www.zomato.com/bangalore/the-calcutta-cafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOrderClick("zomato", "Homepage Bright Order Online")}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#CB202D] hover:bg-[#b01b26] text-white py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-sm hover:shadow-md text-center rounded-sm"
                >
                  <span>Order on Zomato</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Visual Packaging Photography Showcase (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Primary Studio Shot: Kraft Bag, Cold Cups & Meal Box */}
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border-2 border-[#D2B48C] shadow-md group">
                <Image
                  src="/images/brand/packaging-studio.jpeg"
                  alt="The Calcutta Cafe Official Branded Kraft Packaging Suite"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
                  <div>
                    <span className="font-mono text-[10px] text-[#FFB834] uppercase tracking-widest font-bold block">
                      Authentic Packaging Suite
                    </span>
                    <p className="font-serif text-white text-base sm:text-xl font-normal">
                      Signature kraft bag, thermal containers &amp; branded cups
                    </p>
                  </div>
                </div>
              </div>

              {/* Secondary Infographic Strip: 5-Compartment Meal Plate & Takeaway Bag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#D2B48C] shadow-xs group">
                  <Image
                    src="/images/brand/packaging-range.jpeg"
                    alt="5-Compartment Meal Plate & Takeaway Bag"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                    <span className="text-[11px] font-sans text-white font-medium">
                      5-Compartment Thali Plate
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setShowDiecutModal(true)}
                  className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#D2B48C] shadow-xs group cursor-pointer"
                >
                  <Image
                    src="/images/brand/packaging-box-diecut.jpeg"
                    alt="Kolkata Heritage Box Die-cut Illustration"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5B1B8A]/80 via-black/40 to-transparent flex items-end justify-between p-3">
                    <span className="text-[11px] font-sans text-white font-medium">
                      Kolkata Box Artwork
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#FFB834] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Modal: Die-cut Box Artwork Full View */}
      {showDiecutModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowDiecutModal(false)}
        >
          <div
            className="relative bg-[#FFF8ED] max-w-2xl w-full p-4 sm:p-6 rounded-sm border-2 border-[#D2B48C] shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E6D8C3] mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#5B1B8A] uppercase tracking-wider font-bold block">
                  Official Delivery Box Design
                </span>
                <h3 className="font-serif text-xl text-[#2D231E]">
                  &ldquo;A little love from Kolkata! Khub bhalo khete thakun!&rdquo;
                </h3>
              </div>
              <button
                onClick={() => setShowDiecutModal(false)}
                className="text-[#5C524B] hover:text-[#5B1B8A] text-sm font-mono p-1 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-[#D2B48C]">
              <Image
                src="/images/brand/packaging-box-diecut.jpeg"
                alt="Delivery Box Die-cut graphic with Howrah Bridge and Kolkata Tram"
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className="object-contain bg-[#FFF8ED]"
              />
            </div>

            <p className="text-xs text-[#5C524B] mt-3 font-sans leading-relaxed text-center">
              Illustrated with Kolkata&apos;s iconic Howrah Bridge, Tram No. 36, hand-pulled rickshaw, and authentic Bengali blessings on durable kraft cardboard.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
