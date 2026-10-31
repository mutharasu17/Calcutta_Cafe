import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRAND_DATA } from "@/data/brandInfo";
import {
  Heart,
  Award,
  Sparkles,
  Compass,
  Target,
  ArrowRight,
  ShieldCheck,
  Utensils,
  History,
} from "lucide-react";

export const metadata = {
  title: "Our Story & Philosophy | The Calcutta Cafe",
  description:
    "The story of The Calcutta Cafe, founded by Akash Santra in 2019. Bringing the authentic culinary diversity of Bengal across India with pure ingredients and customer experience excellence.",
};

export default function AboutPage() {
  return (
    <div className="relative pt-28 pb-20 bg-[#0A0E17]">
      {/* Editorial Header */}
      <section className="relative py-16 lg:py-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/kolkata-heritage-story.jpg"
            alt="Kolkata Heritage Architecture"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/80 to-[#0A0E17]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#161D2B]/90 px-4 py-1 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>আমাদের ইতিবৃত্ত • Estd. 2019</span>
          </div>

          <h1
            className="font-serif text-4xl sm:text-6xl font-extrabold text-[#FAF6F0] leading-tight"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            The Soul of Bengal,{" "}
            <span className="text-gold-gradient italic font-normal">
              Crafted with Purpose.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Founded by Akash Santra, The Calcutta Cafe was born to represent the full
            breadth of Bengal&apos;s culinary heritage—bringing authentic flavors, honest
            preparation, and dependable food experiences to tables across India.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        {/* Why The Calcutta Cafe */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow="The Genesis"
              bengaliEyebrow="কেন ক্যালকাটা ক্যাফে"
              title="Why The"
              highlightedWord="Calcutta Cafe?"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-300">
              <p>
                In 2019, when the foundational idea of The Calcutta Cafe took root,
                Bengali cuisine in metropolitan India was largely constrained to festive pop-ups
                or high-cost colonial clubs.
              </p>
              <p>
                Akash Santra recognized that people craving the daily comfort of authentic
                Bengali food—be it a fragrant Chholar Dal on a quiet morning, a restorative
                Shukto, or a hearty Sunday Mutton curry—lacked a reliable, high-standard brand
                they could count on.
              </p>
              <p>
                We set out not to create another generic multi-cuisine eatery, but an ambitious,
                revered culinary destination dedicated solely to Bengal&apos;s culinary depth.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[4/5]">
              <Image
                src="/images/hero-bengali-bhoj.jpg"
                alt="The Calcutta Cafe Culinary Foundation"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* More Than Just a Few Dishes & The Thought Behind Our Recipes */}
        <section className="rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#121622] via-[#0E121B] to-[#161014] p-8 sm:p-12 lg:p-16 shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#8B1E1E]/30 px-3.5 py-1 text-xs font-semibold text-[#D4AF37] border border-[#8B1E1E]/50 mb-4">
              <Utensils className="h-3.5 w-3.5" />
              <span>Culinary Depth</span>
            </div>

            <h2
              className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-serif, serif)" }}
            >
              More Than Just a Few{" "}
              <span className="text-gold-gradient italic font-normal">
                Bengali Dishes.
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
              Bengal&apos;s cuisine is a dialogue between land and water, sweet and bitter,
              refined Mughlai influences and sacred Vedic ayurveda.
            </p>

            <div className="mt-8 space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              <p>
                <strong>The Thought Behind Our Recipes:</strong> We believe in zero-shortcut
                kitchens. Authentic mustard oil cannot be diluted with cheaper oils. Saffron
                Basanti Pulao requires genuine Gobindobhog grains from Bengal&apos;s paddy
                fields. Sunday Kosha Mangsho demands patient, continuous reduction over medium
                heat in heavy cookware.
              </p>
              <p>
                We do not alter traditional flavor profiles to suit generic trends. Our food is
                unapologetically authentic, allowing diners outside Bengal to experience the real
                depth of Kolkata&apos;s kitchens.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story with Full Integrity */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl aspect-[4/5]">
              <Image
                src={BRAND_DATA.founder.image}
                alt="Akash Santra — Founder, The Calcutta Cafe"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#141A26] px-3.5 py-1 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">
              <Award className="h-4 w-4" />
              <span>Founder Leadership</span>
            </div>

            <h2
              className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-serif, serif)" }}
            >
              A Message from{" "}
              <span className="text-gold-gradient italic font-normal">
                Akash Santra
              </span>
            </h2>

            <p className="mt-2 text-xs text-[#D4AF37] font-medium">
              Founder, The Calcutta Cafe • 8–9 Years Customer Experience Background
            </p>

            <blockquote className="mt-6 border-l-2 border-[#D4AF37] pl-6 font-serif text-lg text-[#FAF6F0] italic leading-relaxed">
              &ldquo;{BRAND_DATA.founder.message}&rdquo;
            </blockquote>

            <p className="mt-6 text-sm text-neutral-300 leading-relaxed">
              {BRAND_DATA.founder.bio}
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/10">
          <div className="rounded-2xl border border-white/10 bg-[#121620] p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B1E1E]/20 text-[#D4AF37] mb-4">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              {BRAND_DATA.mission}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121620] p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] mb-4">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              {BRAND_DATA.vision}
            </p>
          </div>
        </section>

        {/* CTA to Menu */}
        <div className="text-center pt-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CF5F] to-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#14100C] shadow-xl shadow-[#D4AF37]/25 transition-all hover:scale-105"
          >
            <span>Explore The Bengal Menu</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
