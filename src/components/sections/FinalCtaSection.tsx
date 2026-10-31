import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, UtensilsCrossed, Sparkles, MapPin, ExternalLink } from "lucide-react";
import { OUTLETS_DATA } from "@/data/outletsData";

export default function FinalCtaSection() {
  const activeHub = OUTLETS_DATA.find((o) => o.status === "active");

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-[#090C12] text-[#FAF6F0] border-t border-white/5">
      {/* Background High-Impact Food Photography Canvas */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="A Taste of Bengal, Wherever You Are — The Calcutta Cafe"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25 scale-105"
        />
        {/* Layered Color Curtains: Deep Bengal Red & Indigo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/90 to-[#090C12]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,23,37,0.35)_0%,transparent_75%)]" />
        <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Chapter 07 Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#172B50]/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-8 shadow-2xl backdrop-blur-md">
          <span className="font-bengali text-xs">চূড়ান্ত অধ্যায়</span>
          <span className="h-1 w-1 rounded-full bg-[#8B1725]" />
          <span className="text-white/80 font-mono text-[10px]">CHAPTER 07 • THE DESTINATION</span>
        </div>

        {/* Closing Master Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#FAF6F0] leading-[1.06] tracking-tight">
          A Taste of Bengal,{" "}
          <span className="block text-gold-gradient font-normal italic mt-2">
            Wherever You Are.
          </span>
        </h2>

        {/* Narrative Copy */}
        <p className="mt-8 text-lg sm:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
          Explore our menu and discover your favourite Bengali flavours. From slow-simmered Kosha Mangsho to earthen Mishti Doi, authentic culinary Bengal is ready for your table.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CF5F] to-[#D4AF37] px-9 py-4 text-sm font-bold uppercase tracking-wider text-[#141110] shadow-2xl shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 hover:shadow-[#D4AF37]/40"
          >
            <UtensilsCrossed className="h-4 w-4 text-[#141110]" />
            <span>Explore Menu</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/order"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-[#8B1725] hover:bg-[#8B1725]/40 hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
            <span>Order Online</span>
            <span className="text-[10px] text-neutral-400">Swiggy & Zomato</span>
          </Link>
        </div>

        {/* Active Hub Quick Dispatch Card */}
        {activeHub && (
          <div className="mt-16 mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#0F141F]/80 p-6 backdrop-blur-xl shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Active Dispatch Hub
                </span>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                {activeHub.timing}
              </span>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-base font-bold text-white">
                  {activeHub.name}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Delivering across: {activeHub.coverageAreas.slice(0, 4).join(", ")} & more
                </p>
              </div>

              <div className="flex items-center gap-2">
                {activeHub.swiggyUrl && (
                  <a
                    href={activeHub.swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#FC8019] px-3.5 py-1.5 text-xs font-bold text-white shadow hover:opacity-90 transition-opacity"
                  >
                    <span>Swiggy</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {activeHub.zomatoUrl && (
                  <a
                    href={activeHub.zomatoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#E23744] px-3.5 py-1.5 text-xs font-bold text-white shadow hover:opacity-90 transition-opacity"
                  >
                    <span>Zomato</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
