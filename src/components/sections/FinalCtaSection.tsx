import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, UtensilsCrossed, Sparkles } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-[#070A10]">
      {/* Background Cinematic Food Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/kolkata-heritage-story.jpg"
          alt="Atmospheric Kolkata Heritage Street Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A10] via-[#070A10]/90 to-[#070A10]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,30,30,0.3)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#161D2B]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-6 shadow-xl backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>Experience Authentic Bengal Today</span>
        </div>

        <h2
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF6F0] leading-[1.15]"
          style={{ fontFamily: "var(--font-serif, serif)" }}
        >
          Bring the Taste of Bengal{" "}
          <span className="text-gold-gradient block sm:inline font-normal italic">
            to Your Table.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Discover the flavours, experience the variety and be a part of our journey.
          Order online via Swiggy and Zomato or explore our culinary repertoire.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CF5F] to-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#14100C] shadow-xl shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/40"
          >
            <UtensilsCrossed className="h-4 w-4 text-[#14100C]" />
            <span>Explore Menu</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/order"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-[#8B1E1E] hover:bg-[#8B1E1E]/40 hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
            <span>Order Online</span>
            <span className="text-[10px] text-neutral-400">Swiggy & Zomato</span>
          </Link>
        </div>

        <div className="mt-12 text-xs text-neutral-500">
          Currently serving across Bangalore Central • Delhi NCR in active preparation
        </div>
      </div>
    </section>
  );
}
