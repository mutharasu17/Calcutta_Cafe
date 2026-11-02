"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Flame, MapPin, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "100% Traditional Recipes",
    bengali: "নিখুঁত পারিবারিক প্রণালী",
    description: "Centuries-old regional techniques preserved without commercial shortcuts or artificial additives.",
  },
  {
    icon: Flame,
    title: "Artisanal Small-Batch Daily",
    bengali: "প্রতিদিনের তাজা রান্না",
    description: "Prepared fresh every morning with cold-pressed mustard oil, radhuni, and whole roasted spices.",
  },
  {
    icon: MapPin,
    title: "Bangalore Express Hubs",
    bengali: "বেঙ্গালুরু ডেলিভারি",
    description: "Direct doorstep delivery across Bangalore from Indiranagar, Koramangala & Whitefield.",
  },
  {
    icon: Award,
    title: "Estd. 2019 by Akash Santra",
    bengali: "২০১৯ সালে প্রতিষ্ঠিত",
    description: "Founded to bring the authentic taste and culture of Bengal closer to everyone.",
  },
];

export default function BrandBenefitsStrip() {
  const stripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = stripRef.current?.querySelectorAll(".benefit-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: stripRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }
    }, stripRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stripRef}
      className="bg-[#F5EFE4] py-10 sm:py-14 border-b border-[#E6D8C3] px-4 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="benefit-item flex items-start gap-4 p-4 sm:p-5 bg-[#FFFDF8] border border-[#E6D8C3] shadow-sm hover:border-[#7A382B]/60 transition-colors"
              >
                <div className="h-10 w-10 bg-[#7A382B]/10 border border-[#7A382B]/20 flex items-center justify-center flex-shrink-0 text-[#7A382B]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-serif text-base text-[#29251F] font-semibold">
                      {benefit.title}
                    </h4>
                  </div>
                  <span className="font-bengali text-[11px] text-[#7A382B] block">
                    {benefit.bengali}
                  </span>
                  <p className="text-xs text-[#6B6357] font-normal leading-relaxed pt-0.5">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
