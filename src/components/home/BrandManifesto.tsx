"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-20 bg-[#F5EFE4] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3] overflow-hidden text-center"
    >
      <div ref={textRef} className="mx-auto max-w-4xl space-y-4 sm:space-y-5">
        <span className="text-[11px] font-mono tracking-[0.26em] uppercase text-[#7A382B] font-semibold block">
          Culinary Reverence • রসনা দর্শন
        </span>

        <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] leading-snug tracking-tight">
          &ldquo;We preserve Bengal&apos;s sacred culinary rituals without shortcut or compromise—from the slow-braised <span className="italic text-[#7A382B]">koshano</span> of Sunday curries to the fragile sweetness of earthen curd.&rdquo;
        </blockquote>

        <p className="text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-2xl mx-auto pt-1">
          Authentic cold-pressed mustard oil, radhuni seed temperings, and heirloom Gobindobhog grains—honouring the culinary dignity of Bengal in every preparation.
        </p>
      </div>
    </section>
  );
}
