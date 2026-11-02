"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerBrandIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 88%",
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
      className="bg-[#FFF1DF] text-[#292321] py-16 sm:py-24 lg:py-32 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Brand Introduction"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Editorial Image Composition */}
          <div ref={imageRef} className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-[#8E171D]/20 shadow-xl group bg-[#F4E8D7]">
              <Image
                src="/images/shorshe-ilish.jpg"
                alt="Shorshe Ilish - Signature fresh Hilsa simmered in mustard paste with green chillies"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292321]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#FFF1DF]/95 backdrop-blur-sm border-l-2 border-[#8E171D]">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E171D] font-bold block">
                  Revered River Catch
                </span>
                <p className="font-serif text-sm sm:text-base text-[#292321] font-medium">
                  Shorshe Ilish in stone-ground cold-pressed mustard emulsion.
                </p>
              </div>
            </div>

            {/* Accent stamp / detail */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 p-4 bg-[#8E171D] text-[#FFF1DF] shadow-lg border border-[#C49A55]/40 max-w-[190px]">
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#C49A55]">
                Philosophy
              </span>
              <p className="font-bengali text-xs text-[#FFF1DF]/90 pt-1 leading-relaxed">
                ঐতিহ্যবাহী মশলা ও খাঁটি রান্নার একনিষ্ঠ সমর্পণ।
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative (HENSSLER style typography) */}
          <div ref={contentRef} className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-semibold">
                <Compass className="h-3.5 w-3.5 text-[#C49A55]" />
                The Repertoire • বাঙালিয়ানার অভিজ্ঞান
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292321] leading-[1.15]">
                Centuries of River Delta Cooking, Reimagined for the Modern Table.
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#796A60] font-sans leading-relaxed">
              <p>
                Founded in 2019 by Akash Santra in Bangalore, The Calcutta Cafe was born from a
                deliberate conviction: that the authentic, multifaceted culinary culture of Bengal
                cannot be compressed into clichéd stereotypes.
              </p>
              <p>
                Bengal’s kitchen is a nuanced universe where pungent cold-pressed mustard oil
                meets bitter-sweet Shukto, where slow-seared Kosha Mangsho demands unhurried patience,
                and where fresh river Hilsa, Bhetki, and Rui are treated with reverent precision.
              </p>
            </div>

            {/* Editorial Highlight Quote */}
            <div className="p-5 sm:p-6 bg-[#F4E8D7] border-l-4 border-[#8E171D]">
              <blockquote className="font-serif text-lg sm:text-xl italic text-[#292321] leading-snug">
                “Food is never merely sustenance in Bengal. It is our memories, our familial
                rituals, our poetry, and our shared emotional anchor.”
              </blockquote>
              <cite className="block text-xs font-mono uppercase tracking-[0.2em] text-[#8E171D] font-semibold pt-2 not-italic">
                — Akash Santra, Founder
              </cite>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#651217] transition-colors border-b border-[#8E171D]/40 pb-1"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

