"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HensslerRestaurantStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textColRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: textColRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageColRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: imageColRef.current,
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
      className="bg-[#FFF1DF] text-[#292321] py-16 sm:py-24 lg:py-32 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Restaurant Story and Founder"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative (HENSSLER Restaurant Storytelling) */}
          <div ref={textColRef} className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
                <Heart className="h-3.5 w-3.5 text-[#8E171D]" />
                The Story • শিকড়ের সন্ধান
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#292321] leading-[1.1]">
                A Vision Born in Calcutta, Crafted in Bangalore.
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#796A60] font-sans leading-relaxed">
              <p>
                With nearly a decade in customer experience leadership, founder Akash Santra
                launched The Calcutta Cafe in 2019 around a quiet, unshakeable conviction:
                that the multifaceted, layered culinary culture of Bengal deserves to be
                experienced in its true depth across India.
              </p>
              <p>
                Too often, regional cuisines outside their home state get diluted into generic
                gravies and commercial shortcuts. At The Calcutta Cafe, we reject that compromise.
                We preserve the unhurried methods of Bengal’s home kitchens—fresh mustard grinding,
                authentic panch phoron tempering, and honest small-batch daily cooking.
              </p>
            </div>

            {/* Approved Founder Monograph Quote */}
            <div className="p-6 sm:p-8 bg-[#F4E8D7] border-l-4 border-[#8E171D] relative shadow-sm">
              <Quote className="h-8 w-8 text-[#8E171D]/20 absolute top-4 right-4" />
              <blockquote className="font-serif text-xl sm:text-2xl text-[#292321] font-normal leading-snug">
                “For us, The Calcutta Cafe is not just a business. It is a vision to take the
                taste of Bengal beyond borders.”
              </blockquote>
              <div className="pt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8E171D] text-[#FFF1DF] flex items-center justify-center font-serif text-sm font-bold">
                  AS
                </div>
                <div>
                  <cite className="block text-sm font-semibold text-[#292321] not-italic">
                    Akash Santra
                  </cite>
                  <span className="block text-xs font-mono uppercase tracking-wider text-[#796A60]">
                    Founder, The Calcutta Cafe
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8E171D] hover:text-[#651217] transition-colors border-b border-[#8E171D]/40 pb-1"
              >
                <span>Read Full Brand Monograph</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Authentic Founder / Heritage Portrait */}
          <div ref={imageColRef} className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-[#8E171D]/30 shadow-2xl group bg-[#F4E8D7]">
              <Image
                src="/images/akash-santra-founder.jpg"
                alt="Akash Santra, Founder of The Calcutta Cafe, established 2019"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292321]/90 via-transparent to-transparent pointer-events-none" />

              {/* Founder Plaque */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#FFF1DF]/95 backdrop-blur-md border border-[#8E171D]/30">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E171D] font-bold block">
                  Founding Philosophy • 2019
                </span>
                <p className="font-serif text-base text-[#292321] font-medium">
                  Akash Santra • Founder &amp; Steward
                </p>
                <p className="text-[11px] text-[#796A60] font-sans pt-0.5">
                  Championing authentic Bengali gastronomy in Bangalore.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

