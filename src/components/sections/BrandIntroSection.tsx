import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import { ArrowRight, Flame, HeartHandshake, Sparkles } from "lucide-react";

export default function BrandIntroSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#090D15] overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-[#8B1E1E]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Storytelling */}
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow="Our Culinary Vision"
              bengaliEyebrow="বাংলার আসল পরিচয়"
              title="A World of Bengal"
              highlightedWord="on Every Plate."
              description="To most of the country, Bengali food has often been reduced to a couple of sweet dishes or a standard fish curry. But true Bengali gastronomy is an ancient, sprawling tapestry."
            />

            <div className="mt-8 space-y-4 text-base leading-relaxed text-neutral-300">
              <p>
                From the sharp, pungent rush of mustard in river Hilsa to the delicate,
                aromatic sweetness of Gobindobhog rice tempered in pure ghee; from the bitter,
                herbal palate-cleanser of a morning Shukto to the velvety, slow-caramelized
                glaze of Sunday Kosha Mangsho—Bengali cuisine is extraordinarily layered.
              </p>
              <p>
                <strong className="text-white font-medium">The Calcutta Cafe</strong> was
                born from an ambition to dismantle geographical boundaries. Founded by Akash
                Santra in Bangalore, our journey started with a simple question: why shouldn't
                authentic, uncompromised Bengali cooking be accessible to food lovers in every
                corner of India?
              </p>
            </div>

            {/* Core Brand Pillars Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B1E1E]/20 text-[#D4AF37]">
                  <Flame className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-serif text-base font-semibold text-white">
                  Zero Shortcut Cooking
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                  Stone-ground spices, cold-pressed mustard oil, and time-honored slow braising.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-serif text-base font-semibold text-white">
                  Beyond The Obvious
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                  Championing Bengal&apos;s forgotten vegetarian recipes, cabin snacks, and seasonal sweets.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-white transition-colors"
              >
                <span>Read the complete story behind The Calcutta Cafe</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Composition with Food Artwork */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Golden Glow Border Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl shadow-black/80">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/kosha-mangsho.jpg"
                    alt="Authentic Slow Cooked Bengali Kosha Mangsho in Terracotta Handi"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Floating Caption Card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl glass-panel p-4 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                    Traditional Cooking Technique
                  </span>
                  <h4 className="font-serif text-base font-bold text-white">
                    The Sacred Art of &ldquo;Koshano&rdquo;
                  </h4>
                  <p className="mt-0.5 text-xs text-neutral-300">
                    Continuous slow caramelization in heavy iron pots with mustard oil and whole spices.
                  </p>
                </div>
              </div>

              {/* Decorative Secondary Floating Badge */}
              <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 rounded-2xl border border-[#D4AF37]/40 bg-[#0E1522] px-4 py-2.5 shadow-xl">
                <HeartHandshake className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-xs font-semibold text-white">Authentic Home Recipes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
