import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Sparkles, BookOpen } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
      {/* Cinematic Full-Bleed Food Photography Canvas with Multi-Layer Shadowing */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="Authentic Royal Bengali Bhoj Feast with Basanti Pulao, Kosha Mangsho, and Shorshe Ilish"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered Cinematic Overlays: Rich Indigo and Bengal Charcoal */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C12]/95 via-[#090C12]/80 to-[#090C12]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(139,23,37,0.3)_0%,transparent_65%)]" />
        <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />
        <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
      </div>

      {/* Main Narrative Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Chapter 01 Eyebrow & Bengali Typography */}
          <div className="inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/35 bg-[#172B50]/60 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#D4AF37] uppercase backdrop-blur-md shadow-2xl mb-8">
            <span className="font-bengali text-sm text-[#F5F0E7]">দি ক্যালকাটা ক্যাফে</span>
            <span className="h-1 w-1 rounded-full bg-[#8B1725]" />
            <span className="text-white/80 font-mono tracking-wider text-[11px]">CHAPTER 01 • PROLOGUE</span>
          </div>

          {/* Primary Cinematic Headline — Editorial Typography */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#FAF6F0] leading-[1.04]">
            The Taste of Bengal,{" "}
            <span className="block text-gold-gradient font-normal italic mt-1 sm:mt-2">
              Beyond Boundaries.
            </span>
          </h1>

          {/* Documentary Narrative Copy */}
          <p className="mt-8 text-lg sm:text-2xl leading-relaxed text-[#FAF6F0]/85 font-light max-w-2xl">
            Discover the flavours, traditions and stories of Bengali cuisine with The Calcutta Cafe. A culinary journey bringing authentic regional dishes from heritage kitchens to cities across India.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CF5F] to-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#141110] shadow-2xl shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 hover:shadow-[#D4AF37]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[#FAF6F0] backdrop-blur-md transition-all duration-300 hover:border-[#8B1725] hover:bg-[#8B1725]/30 hover:scale-105"
            >
              <BookOpen className="h-4 w-4 text-[#D4AF37]" />
              <span>Our Story</span>
            </Link>

            <Link
              href="/order"
              className="group inline-flex items-center gap-2 rounded-full border border-[#8B1725]/50 bg-[#8B1725]/20 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] backdrop-blur-md transition-all duration-300 hover:bg-[#8B1725]/40"
            >
              <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
              <span>Order via Swiggy / Zomato</span>
            </Link>
          </div>

          {/* Verified Documentary Metadata Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <p className="font-serif text-lg font-bold text-[#D4AF37]">2019</p>
              <p className="mt-0.5 text-neutral-400 font-sans">Idea & Inception</p>
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#D4AF37]">Bangalore</p>
              <p className="mt-0.5 text-neutral-400 font-sans">Active Central Hub</p>
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#D4AF37]">100%</p>
              <p className="mt-0.5 text-neutral-400 font-sans">Stone-Ground Spices</p>
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#D4AF37]">National</p>
              <p className="mt-0.5 text-neutral-400 font-sans">Delhi NCR Expansion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Bottom Ambient Fade to Chapter 02 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#090C12] to-transparent pointer-events-none" />
    </section>
  );
}
