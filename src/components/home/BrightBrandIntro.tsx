"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";

export default function BrightBrandIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
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
      className="bg-[#FFF8ED] text-[#292321] py-16 sm:py-24 lg:py-32 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Brand Introduction"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Editorial Image Composition */}
          <div ref={imageRef} className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#E6D8C3] shadow-md group bg-[#F4E8D7]">
              <Image
                src="/images/shorshe-ilish.jpg"
                alt="Shorshe Ilish - Signature fresh Hilsa simmered in mustard paste with green chillies"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#FFFCF7]/95 backdrop-blur-xs border-l-3 border-[#8E171D] shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E171D] font-bold block">
                  Revered River Catch
                </span>
                <p className="font-serif text-sm sm:text-base text-[#292321] font-medium mt-0.5">
                  Shorshe Ilish in stone-ground cold-pressed mustard emulsion.
                </p>
              </div>
            </div>

            {/* Accent stamp / detail */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 p-4 bg-[#8E171D] text-[#FFF8ED] shadow-md border border-[#C49A55]/40 max-w-[200px]">
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#C49A55] font-semibold">
                Culinary Monograph
              </span>
              <p className="font-bengali text-xs text-[#FFF8ED]/95 pt-1 leading-relaxed">
                ঐতিহ্যবাহী মশলা ও খাঁটি রান্নার একনিষ্ঠ সমর্পণ।
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div ref={contentRef} className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
                <Compass className="h-3.5 w-3.5 text-[#C49A55]" />
                The Repertoire • বাঙালিয়ানার অভিজ্ঞান
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292321] leading-[1.12]">
                Centuries of River Delta Cooking, Reimagined for the Modern Table.
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#5C524B] font-sans leading-relaxed">
              <p>
                Founded in 2019 by Akash Santra in Bangalore, The Calcutta Cafe was born from a
                deliberate conviction: that the authentic, multifaceted culinary culture of Bengal
                cannot be compressed into clichéd stereotypes.
              </p>
              <p>
                From the pungent complexity of cold-pressed mustard oil to the bitter-sweet harmony
                of afternoon Shukto, our kitchen cooks in small batches every morning. We source
                authentic Kolaghat Hilsa, hand-ground spices, and traditional date-palm jaggery to
                serve you dining that feels both deeply rooted and modern.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#8E171D] hover:text-[#A9272D] transition-colors pb-1 border-b border-[#8E171D]"
              >
                <span>Read Founder Akash Santra&apos;s Story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <span className="text-xs font-mono text-[#5C524B]/80 uppercase tracking-widest">
                Koramangala • Indiranagar • Whitefield • HSR
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

