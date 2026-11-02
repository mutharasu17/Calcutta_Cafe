"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandStorySpread() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageColRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        textColRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
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
      className="relative py-16 sm:py-24 bg-[#F5EFE4] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Column: Akash Santra Founder Portrait (6 Cols) */}
          <div ref={imageColRef} className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3] shadow-lg">
              <Image
                src="/images/akash-santra-founder.jpg"
                alt="Akash Santra, Founder of The Calcutta Cafe"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter brightness-[0.98] contrast-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-[#7A382B] text-[#FFFDF8] px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold shadow-sm">
                Estd. 2019 • Bangalore Hubs
              </div>
            </div>

            {/* Micro Badge */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 bg-[#FFFDF8] p-4 border border-[#E6D8C3] shadow-md max-w-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A382B] font-bold block mb-1">
                Sacred Culinary Discipline
              </span>
              <p className="text-xs text-[#29251F] font-serif leading-relaxed">
                Cold-pressed Kachi Ghani mustard oil, heirloom Gobindobhog rice, and wild Radhuni seed.
              </p>
            </div>
          </div>

          {/* Editorial Column (6 Cols) */}
          <div ref={textColRef} className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
                <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
                <span>Our Heritage &amp; Mission • আমাদের গল্প</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
                Bringing the Taste of Bengal Closer to Everyone.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#6B6357] font-normal leading-relaxed">
              Founded in 2019 by Akash Santra, The Calcutta Cafe began as an unapologetic cloud-kitchen journey in Bangalore. Frustrated by generic compromises that watered down Bengal&apos;s culinary heritage, we set out to build an authentic dining sanctuary where centuries-old family recipes and royal Awadhi legacies are cooked strictly to heritage standards.
            </p>

            {/* Approved Founder Pull Quote */}
            <div className="border-l-2 border-[#7A382B] pl-5 py-2.5 bg-[#FFFDF8] pr-4 border border-[#E6D8C3]">
              <blockquote className="font-serif italic text-base sm:text-lg text-[#29251F] leading-snug">
                &ldquo;Bengali cooking is not an invention to be rushed. It is a slow, respectful dialogue between fire, cold-pressed mustard oil, and time.&rdquo;
              </blockquote>
              <span className="font-mono text-xs text-[#7A382B] uppercase tracking-wider block mt-2 font-semibold">
                — Akash Santra, Founder
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 bg-[#7A382B] hover:bg-[#5E2B21] text-[#FFFDF8] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
