import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import { BRAND_DATA } from "@/data/brandInfo";
import { ArrowRight, Quote, Award, Sparkles } from "lucide-react";

export default function StoryPhilosophySection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#080B12] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section 5: The Story Behind the Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Founder Image Frame */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl shadow-black/80 aspect-[4/5]">
                <Image
                  src={BRAND_DATA.founder.image}
                  alt="Akash Santra — Founder, The Calcutta Cafe"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-80" />
              </div>

              {/* Founder Credential Card */}
              <div className="absolute -bottom-6 -right-2 sm:right-4 max-w-xs rounded-2xl glass-panel p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B1E1E] text-[#D4AF37]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white">Akash Santra</h4>
                    <p className="text-[11px] text-neutral-400">Founder, The Calcutta Cafe</p>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-neutral-300">
                  {BRAND_DATA.founder.experience}
                </p>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="The Story Behind The Brand"
              bengaliEyebrow="আমাদের সূচনা"
              title="A Vision That Began"
              highlightedWord="in 2019."
              description="Founded on the belief that Bengal's culinary greatness should be celebrated with uncompromising pride, consistency, and widespread reach across India."
            />

            <div className="mt-6 space-y-4 text-neutral-300 leading-relaxed text-base">
              <p>
                In 2019, founder <strong className="text-white">Akash Santra</strong> noticed a
                persistent paradox in India’s vibrant dining scene: while people everywhere
                loved Bengali flavors, true homestyle Bengali meals were almost impossible to
                find outside a handful of niche restaurants.
              </p>
              <p>
                Drawing upon 8–9 years of customer experience industry experience, Akash
                understood that great food requires more than just recipes—it demands
                dependable service quality, consistent ingredient sourcing, and honest culinary
                integrity.
              </p>
              <p>
                The journey began in Bangalore through a cloud-kitchen-led model, engineered to
                deliver piping-hot, uncompromising Bengali meals directly to homes and
                workplaces. Today, with eyes set on Delhi NCR and other major cities, that 2019
                vision remains crystal clear.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#141A26] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] transition-all hover:bg-[#8B1E1E] hover:text-white"
              >
                <span>Read Full About Story</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section 6: Our Food Philosophy Banner */}
        <div className="mt-28 relative rounded-3xl overflow-hidden border border-[#D4AF37]/20 bg-gradient-to-br from-[#121824] via-[#0E131F] to-[#181116] p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle Bengali Arch Silhouette in Background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none">
            <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
              <path
                d="M50 400 L50 200 Q200 50 350 200 L350 400"
                stroke="#D4AF37"
                strokeWidth="8"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#8B1E1E]/30 px-3.5 py-1 text-xs font-semibold text-[#D4AF37] border border-[#8B1E1E]/50 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Food Philosophy</span>
            </div>

            <h3
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-serif, serif)" }}
            >
              More Than Just a Few{" "}
              <span className="text-gold-gradient italic font-normal">
                Bengali Dishes.
              </span>
            </h3>

            <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
              &ldquo;{BRAND_DATA.philosophy}&rdquo;
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-xs">
              <div>
                <span className="text-sm font-semibold text-[#D4AF37] block">Purity of Ingredients</span>
                <p className="mt-1 text-neutral-400">
                  Real cold-pressed mustard oil, aromatic Gobindobhog grains, and freshly ground panch phoron.
                </p>
              </div>
              <div>
                <span className="text-sm font-semibold text-[#D4AF37] block">Seasonal Wisdom</span>
                <p className="mt-1 text-neutral-400">
                  Adhering to traditional Bengali seasonal food rituals and balanced Ayurvedic pairings.
                </p>
              </div>
              <div>
                <span className="text-sm font-semibold text-[#D4AF37] block">Customer Respect</span>
                <p className="mt-1 text-neutral-400">
                  Founded on nearly a decade of customer care background, prioritizing unswerving consistency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
