"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

export default function StreetFoodShowcase() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#F5EFE4] px-4 sm:px-8 lg:px-12 border-b border-[#E6D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] uppercase text-[#7A382B] font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#B68A52]" />
              <span>Evening Adda • কলকাতার স্ট্রিট ফুড</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#29251F] tracking-tight leading-[1.08]">
              Street Savouries &amp; Snacks.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B6357] font-normal leading-relaxed max-w-xl">
              From Park Street rolls to College Street telebhaja—Kolkata&apos;s evening snacks are legendary cultural institutions.
            </p>
          </div>

          <Link
            href="/menu?category=snacks-street"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A382B] hover:text-[#29251F] transition-colors border-b border-[#7A382B]/30 pb-1 self-start md:self-auto"
          >
            <span>View All Street Delights</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Feature Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF8] border border-[#E6D8C3] p-6 sm:p-10 shadow-sm">
          {/* Street Food Visual (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E6D8C3] border border-[#E6D8C3]">
              <Image
                src="/images/kathi-roll.jpg"
                alt="Signature Kolkata Kathi Rolls"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-sm px-3 py-1 border border-[#E6D8C3] text-[11px] font-mono uppercase tracking-wider text-[#7A382B] font-semibold">
                Park Street Icon • রোল ও কাটলেট
              </div>
            </div>
          </div>

          {/* Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7A382B] font-semibold block mb-1">
                Freshly Rolled to Order
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#29251F] font-normal leading-tight">
                Authentic Kolkata Kathi Rolls
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed">
              Golden layered paratha fried crisp on iron tawas, lined with fluffy egg, filled with succulent grilled spiced chicken or paneer, and wrapped with crisp red onions, fresh lime, and roasted chaat masala.
            </p>

            <div className="space-y-2 pt-2 border-t border-[#E6D8C3]">
              <div className="flex items-center gap-2 text-xs text-[#29251F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7A382B]" />
                <span>Double-Egg Double-Chicken Rolls</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#29251F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7A382B]" />
                <span>Crispy Crumb-Fried Kolkata Fish Fry</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#29251F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7A382B]" />
                <span>Mughlai Paratha with Potato Kasha</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/menu?category=snacks-street"
                className="group/btn inline-flex items-center gap-2 bg-[#7A382B] text-[#FFFDF8] px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#5E2B21] transition-all shadow-sm"
              >
                <span>Order Evening Snacks</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

