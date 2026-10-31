import Image from "next/image";
import Link from "next/link";
import { BRAND_DATA } from "@/data/brandInfo";
import { Quote, Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function FounderMessageSection() {
  return (
    <section className="relative py-24 lg:py-36 bg-[#090C12] text-[#FAF6F0] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-[#8B1725]/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#172B50]/20 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Top Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#172B50]/50 px-4 py-1 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-4">
            <span className="font-bengali text-xs">প্রতিষ্ঠাতার বার্তা</span>
            <span className="h-1 w-1 rounded-full bg-[#8B1725]" />
            <span className="text-white/70 font-mono text-[10px]">CHAPTER 06 • THE PEOPLE</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAF6F0] leading-[1.08]">
            A Vision{" "}
            <span className="text-gold-gradient italic font-normal">
              Beyond Boundaries.
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
            The story behind The Calcutta Cafe is grounded in a deep respect for Bengal&apos;s culinary dignity and a commitment to customer experience excellence.
          </p>
        </div>

        {/* Documentary Portrait & Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center rounded-3xl border border-white/10 bg-[#0F141F]/80 p-6 sm:p-10 lg:p-14 backdrop-blur-xl shadow-2xl">
          {/* Left Column: Founder Editorial Portrait (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[4/5] w-full max-w-sm rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl group">
              <Image
                src={BRAND_DATA.founder.image}
                alt="Akash Santra, Founder, The Calcutta Cafe"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block rounded-md bg-[#8B1725] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-1">
                  Brand Founder
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Akash Santra
                </h3>
                <p className="text-xs text-[#D4AF37] font-mono mt-0.5">
                  The Calcutta Cafe Foods Pvt Ltd
                </p>
              </div>
            </div>

            {/* Background pill */}
            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>8–9 Years Customer Experience Leadership</span>
            </div>
          </div>

          {/* Right Column: Narrative & Verbatim Quote (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Primary Approved Founder Quotation */}
            <div className="relative border-l-2 border-[#D4AF37] pl-6 sm:pl-8 mb-8">
              <Quote className="h-8 w-8 text-[#D4AF37]/30 mb-2 rotate-180" />
              <blockquote className="font-serif text-2xl sm:text-3xl text-white font-medium leading-snug italic">
                &ldquo;For us, The Calcutta Cafe is not just a business. It is a vision to take the taste of Bengal beyond borders.&rdquo;
              </blockquote>
              <div className="mt-4 text-xs font-mono text-[#D4AF37] tracking-wider uppercase">
                — Akash Santra, Founder, The Calcutta Cafe
              </div>
            </div>

            {/* Documentary Narrative Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              <p>
                The idea for The Calcutta Cafe took root in 2019. Akash Santra observed that across major Indian cities, Bengali cuisine was perpetually under-represented—frequently reduced to a narrow stereotype of sweets or standard fish curry.
              </p>
              <p>
                Bringing 8–9 years of customer experience leadership, he applied customer-centric discipline to the food sector. He realized that consistency, hygienic packaging, timely delivery, and uncompromising ingredient purity were the true foundation for building a nationally trusted brand.
              </p>
              <p>
                From launching the first cloud kitchen in Bangalore to laying the groundwork for Delhi NCR and other Indian metropolises, The Calcutta Cafe remains dedicated to making the entire culinary canvas of Bengal accessible to everyone.
              </p>
            </div>

            {/* Signature & Outlets Link */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-serif text-base font-bold text-white">Akash Santra</p>
                <p className="text-xs text-neutral-400">Founder, The Calcutta Cafe Foods Pvt Ltd</p>
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
              >
                <span>Read Full Brand Memoir</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
