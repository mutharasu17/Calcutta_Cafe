"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SpecialityShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const feat1Ref = useRef<HTMLDivElement>(null);
  const feat2Ref = useRef<HTMLDivElement>(null);
  const feat3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      [feat1Ref.current, feat2Ref.current, feat3Ref.current].forEach((feat) => {
        if (feat) {
          gsap.fromTo(
            feat,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              clearProps: "all",
              scrollTrigger: {
                trigger: feat,
                start: "top 92%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-[#F5EFE4] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>Culinary Craft • রান্নার কারুকার্য</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Signature Specialities.
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed">
            The defining culinary cornerstones of Bengal&apos;s heritage—crafted with alternating visual compositions inspired by A1 Gallery art direction.
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────
            COMPOSITION 1: Image Left, Text Right (Kosha Mangsho)
        ────────────────────────────────────────────────────────── */}
        <div
          ref={feat1Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FFFDF8] border border-[#E6D8C3] p-6 sm:p-10 mb-10 shadow-sm"
        >
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3]">
              <Image
                src="/images/kosha-mangsho.jpg"
                alt="Traditional Kosha Mangsho in heavy iron handi"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter brightness-[0.98] contrast-[1.03]"
              />
              <div className="absolute top-3 left-3 bg-[#7A382B] text-[#FFFDF8] px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold">
                Speciality 01 • কষা মাংস
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7A382B] font-semibold block">
              Slow-Cooking Heritage
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#29251F] font-normal leading-tight">
              The Sacred Art of Koshano.
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed">
              &lsquo;Koshano&rsquo; is the defining technique of Bengal&apos;s meat cookery—hours of continuous gentle sautéing until onion paste, ginger, and roasted spices meld into a deep mahogany glaze that clings lovingly to tender mutton cuts.
            </p>

            <div className="pt-2 border-t border-[#E6D8C3] flex items-center justify-between">
              <span className="font-mono text-xs text-[#7A382B] font-semibold">
                Slow-Braised Daily in Bangalore
              </span>
              <Link
                href="/menu?category=chicken-mutton"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#29251F] hover:text-[#7A382B] transition-colors"
              >
                <span>Explore Curries</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            COMPOSITION 2: Text Left, Image Right (Earthen Mishti Doi)
        ────────────────────────────────────────────────────────── */}
        <div
          ref={feat2Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FFFDF8] border border-[#E6D8C3] p-6 sm:p-10 mb-10 shadow-sm"
        >
          <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7A382B] font-semibold block">
              Earthen Fermentation
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#29251F] font-normal leading-tight">
              Claypot Caramelized Mishti Doi.
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed">
              Full-cream milk is gently simmered until reduced to half and caramelized, then poured into unglazed porous earthenware handis. The clay naturally breathes and absorbs excess whey, yielding a velvety, firm set without gelatin or starch.
            </p>

            <div className="pt-2 border-t border-[#E6D8C3] flex items-center justify-between">
              <span className="font-mono text-xs text-[#7A382B] font-semibold">
                100% Earthen Pot Setting
              </span>
              <Link
                href="/menu?category=sweets-desserts"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#29251F] hover:text-[#7A382B] transition-colors"
              >
                <span>Explore Sweets</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3]">
              <Image
                src="/images/mishti-doi.jpg"
                alt="Claypot Mishti Doi and Spongy Rosogolla"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter brightness-[0.98] contrast-[1.03]"
              />
              <div className="absolute top-3 left-3 bg-[#7A382B] text-[#FFFDF8] px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold">
                Speciality 02 • মিষ্টি দই ও রসগোল্লা
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            COMPOSITION 3: Full-Width Asymmetric Feature (Basanti Pulao)
        ────────────────────────────────────────────────────────── */}
        <div
          ref={feat3Ref}
          className="bg-[#FFFDF8] border border-[#E6D8C3] p-6 sm:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3]">
                <Image
                  src="/images/hero-bengali-bhoj.jpg"
                  alt="Heirloom Gobindobhog Basanti Pulao"
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-[#7A382B] text-[#FFFDF8] px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold">
                  Speciality 03 • বাসন্তী পোলাও
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7A382B] font-semibold block">
                Heirloom Rice Craft
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#29251F] font-normal leading-tight">
                Fragrant Saffron Gobindobhog Pulao
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed">
                Short-grain heirloom Gobindobhog rice scented with saffron strands, whole green cardamom, fried cashews, and golden raisins—the royal companion to Sunday Kosha Mangsho.
              </p>

              <div className="pt-2">
                <Link
                  href="/menu?category=rice-meals"
                  className="inline-flex items-center gap-2 bg-[#7A382B] hover:bg-[#5E2B21] text-[#FFFDF8] px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                >
                  <span>Explore Rice Delights</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
