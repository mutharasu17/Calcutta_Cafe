"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Quote } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";

export default function BrightRestaurantStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#FFF8ED] text-[#2D231E] py-20 sm:py-28 lg:py-36 border-b border-[#E6D8C3] relative overflow-hidden"
      aria-label="Restaurant and Heritage Story"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Narrative & Monograph (7 cols) */}
          <div ref={textRef} className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#5B1B8A] font-bold">
                <BookOpen className="h-3.5 w-3.5 text-[#FFB834]" />
                Brand Monograph • প্রতিষ্ঠার ইতিহাস
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#2D231E] leading-[1.08]">
                A Decade of Homesickness, Distilled into a Simmering Degchi.
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#5C524B] font-sans leading-relaxed">
              <p>
                In 2019, engineer-turned-restaurateur Akash Santra launched The Calcutta Cafe in
                Bangalore out of a deep personal void: an inability to find Kolkata food that
                tasted like home. Commercial renditions relied on excessive food coloring,
                overpowering cream, and generic curry bases that completely erased Bengal&apos;s
                delicate flavor profile.
              </p>
              <p>
                Akash spent months traveling between Kolkata old cabins, family kitchens in
                Shyambazar, and spice merchants in Posta. The mandate was uncompromising:
                use only cold-pressed mustard oil, roast garam masalas in-house every 48 hours,
                and never rush a dish that requires slow fire.
              </p>
            </div>

            {/* Quote Card on Warm Cream */}
            <div className="p-6 sm:p-7 bg-[#FAF6F0] border-l-4 border-[#5B1B8A] border-t border-r border-b border-[#E6D8C3] shadow-xs space-y-3 rounded-sm">
              <div className="flex items-center gap-2 text-[#5B1B8A]">
                <Quote className="h-4 w-4 text-[#FFB834]" />
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  Akash Santra, Founder
                </span>
              </div>
              <p className="font-serif italic text-lg sm:text-xl text-[#2D231E] leading-snug">
                &ldquo;Bengali food cannot be rushed on high heat. If you try to speed up a Kosha Mangsho or cut corners on the mustard emulsion for Katla Kalia, the soul vanishes.&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#5B1B8A] hover:text-[#4B1473] transition-colors pb-1 border-b border-[#5B1B8A]/40"
              >
                <span>Read Full Monograph &amp; Kitchen Pillars</span>
                <ArrowRight className="h-4 w-4 text-[#FFB834]" />
              </Link>
            </div>
          </div>

          {/* Right: Heritage Photography (5 cols) */}
          <div ref={imageRef} className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-[#D2B48C] shadow-md group bg-[#FAF6F0] rounded-sm">
              <Image
                src="/images/brand/founder-akash-santra.jpeg"
                alt="Akash Santra - Founder of The Calcutta Cafe holding official branded mug"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#FFF8ED]/95 backdrop-blur-xs border-l-4 border-[#5B1B8A] shadow-sm rounded-xs">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5B1B8A] font-bold block">
                  Bangalore Kitchen Origins
                </span>
                <p className="font-serif text-sm sm:text-base text-[#2D231E] font-medium mt-0.5">
                  Serving Koramangala, Indiranagar, Whitefield &amp; HSR since 2019.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
