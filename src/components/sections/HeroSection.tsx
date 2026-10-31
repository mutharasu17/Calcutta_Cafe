import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Sparkles, UtensilsCrossed } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 lg:py-32">
      {/* Background Cinematic Food Photo with Dark Multi-Layer Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bengali-bhoj.jpg"
          alt="Authentic Royal Bengali Bhoj Feast with Basanti Pulao, Kosha Mangsho, and Shorshe Ilish"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered Lighting Gradients (NVIDIA/Apple depth) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B12]/95 via-[#0A0E17]/85 to-[#070B12]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,30,30,0.25)_0%,transparent_60%)]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Bengali Cultural Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#161D2B]/90 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase backdrop-blur-md shadow-xl mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>দি ক্যালকাটা ক্যাফে</span>
            <span className="h-1 w-1 rounded-full bg-[#8B1E1E]" />
            <span className="text-white/90">Authentic Bengali Gastronomy</span>
          </div>

          {/* Primary Cinematic Headline */}
          <h1
            className="font-serif text-4xl font-extrabold tracking-tight text-[#FAF6F0] sm:text-6xl lg:text-7xl leading-[1.08]"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            The Taste of Bengal,{" "}
            <span className="text-gold-gradient block sm:inline font-normal italic">
              Beyond Boundaries.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-neutral-300 font-normal max-w-2xl">
            Bringing the rich diversity of Bengali cuisine closer to everyone. Discover
            traditional meals, river fish delicacies, slow-braised mutton, regional
            vegetarian secrets, and authentic artisanal sweets.
          </p>

          {/* Call-to-Action Group */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CF5F] to-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#14100C] shadow-xl shadow-[#D4AF37]/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/40"
            >
              <UtensilsCrossed className="h-4 w-4 text-[#14100C]" />
              <span>Explore Our Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/order"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-[#8B1E1E] hover:bg-[#8B1E1E]/30 hover:scale-105"
            >
              <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
              <span>Order Online</span>
              <span className="text-[10px] text-neutral-400">Swiggy & Zomato</span>
            </Link>
          </div>

          {/* Cultural Heritage Badges (Subtle Trust Indicators) */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-neutral-400">
            <div>
              <p className="font-serif text-lg font-bold text-[#D4AF37]">2019</p>
              <p className="mt-0.5 text-neutral-400">Founded in Bangalore</p>
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[#D4AF37]">100%</p>
              <p className="mt-0.5 text-neutral-400">Authentic Stone-Ground Spices</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-serif text-lg font-bold text-[#D4AF37]">National Vision</p>
              <p className="mt-0.5 text-neutral-400">Delhi NCR & Metros Planned</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
