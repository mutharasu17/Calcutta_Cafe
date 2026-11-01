import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";

export default function BrandClosingCTA() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 sm:px-10 lg:px-16 py-32 overflow-hidden bg-[#090909] border-t border-white/[0.08]">
      {/* Full-Bleed Atmospheric Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/kolkata-heritage-story.jpg"
          alt="The Taste of Bengal, Beyond Boundaries — The Calcutta Cafe"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.32] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/75 to-[#090909]" />
        <div className="absolute inset-0 editorial-grain opacity-35 pointer-events-none" />
      </div>

      {/* Centered Editorial Impact Frame */}
      <div className="relative z-10 max-w-4xl text-center mx-auto space-y-8">
        <div className="inline-flex items-center gap-3">
          <span className="h-[1px] w-6 bg-[#C7AC83]" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#C7AC83]">
            The Journey Continues
          </span>
          <span className="h-[1px] w-6 bg-[#C7AC83]" />
        </div>

        <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-[#F5F0E8] tracking-tight leading-[1.04]">
          THE TASTE OF BENGAL.
          <span className="block italic text-[#C7AC83] font-light mt-2">
            BEYOND BOUNDARIES.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#A9A19A] font-light leading-relaxed">
          From slow-braised Kosha Mangsho to artisanal claypot Mishti Doi, authentic culinary Bengal is prepared with discipline and delivered to your doorstep.
        </p>

        {/* Dual Actions */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 border border-[#C7AC83] bg-[#C7AC83] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#090909] transition-all duration-300 hover:bg-transparent hover:text-[#F5F0E8]"
          >
            <span>Explore Our Menu</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/order"
            className="group inline-flex items-center gap-2.5 border border-white/20 bg-white/[0.05] backdrop-blur-md px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[#F5F0E8] transition-all duration-300 hover:border-[#C7AC83] hover:bg-[#651F2B]"
          >
            <span>Order Online</span>
            <ArrowUpRight className="h-4 w-4 text-[#C7AC83]" />
          </Link>
        </div>

        {/* Floating Glass Hub Attribution */}
        <div className="pt-8 max-w-md mx-auto">
          <GlassPanel variant="subtle" className="px-5 py-3">
            <p className="text-[11px] font-mono text-[#A9A19A] tracking-wider">
              Bangalore Hub Active • Fulfilled via verified Swiggy & Zomato channels
            </p>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}

