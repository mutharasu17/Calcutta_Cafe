import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { OUTLETS_DATA } from "@/data/outletsData";

export default function FinalStatement() {
  const activeHub = OUTLETS_DATA.find((o) => o.status === "active");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 sm:px-10 lg:px-16 py-32 overflow-hidden bg-[#171615] border-t border-white/[0.06]">
      {/* Full-Bleed Atmospheric Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/kolkata-heritage-story.jpg"
          alt="The Taste of Bengal, Beyond Boundaries — The Calcutta Cafe"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.35] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171615] via-[#171615]/70 to-[#171615]" />
        <div className="absolute inset-0 editorial-grain opacity-40 pointer-events-none" />
      </div>

      {/* Centered Editorial Impact Frame */}
      <div className="relative z-10 max-w-4xl text-center mx-auto space-y-8">
        <div className="inline-flex items-center gap-2">
          <span className="h-[1px] w-6 bg-[#B79A65]" />
          <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#B79A65]">
            The Journey Continues
          </span>
          <span className="h-[1px] w-6 bg-[#B79A65]" />
        </div>

        <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-[#FAF9F6] tracking-tight leading-[1.04]">
          The Taste of Bengal.
          <span className="block italic text-[#F4F0E8] font-normal">
            Beyond Boundaries.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#D8D0C3]/90 font-light leading-relaxed">
          From slow-braised Kosha Mangsho to artisanal Mishti Doi, authentic culinary Bengal is prepared with care and delivered to your doorstep.
        </p>

        {/* Dual Signature CTAs */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 border border-[#B79A65] bg-[#B79A65] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171615] transition-all duration-300 hover:bg-transparent hover:text-[#FAF9F6]"
          >
            <span>Explore Our Menu</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/order"
            className="group inline-flex items-center gap-2.5 border border-white/20 bg-white/[0.05] backdrop-blur-md px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[#FAF9F6] transition-all duration-300 hover:border-[#B79A65] hover:bg-[#641F2B]"
          >
            <span>Order Online</span>
            <ArrowUpRight className="h-4 w-4 text-[#B79A65]" />
          </Link>
        </div>

        {/* Verified Hub Note */}
        {activeHub && (
          <p className="pt-8 text-xs font-mono text-[#D8D0C3]/60 tracking-wider">
            Bangalore Hub Operational • Fulfilled via verified Swiggy & Zomato channels
          </p>
        )}
      </div>
    </section>
  );
}
