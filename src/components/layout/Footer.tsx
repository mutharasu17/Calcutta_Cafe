import Link from "next/link";
import BrandLogo from "../ui/BrandLogo";
import { BRAND_DATA } from "@/data/brandInfo";
import { InstagramIcon, XIcon } from "../ui/SocialIcons";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#171615] text-[#D8D0C3] pt-32 sm:pt-44 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.08]">
      {/* Background Subtle Grain */}
      <div className="absolute inset-0 editorial-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ──────────────────────────────────────────────────────────
            SECTION 01: THE BENGAL SIGNATURE — EDITORIAL HEADER
        ────────────────────────────────────────────────────────── */}
        <div className="pb-16 sm:pb-24 border-b border-white/[0.08]">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-6 bg-[#B79A65]" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#B79A65]">
                The Bengal Signature
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#FAF9F6] tracking-tight leading-[1.1]">
              A Taste of Bengal.{" "}
              <span className="italic text-[#F4F0E8] font-normal block sm:inline">
                Beyond Boundaries.
              </span>
            </h2>

            <p className="font-serif italic text-base sm:text-xl text-[#B79A65]/90 max-w-2xl font-light">
              &ldquo;{BRAND_DATA.closingStatement}&rdquo;
            </p>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            SECTION 02: ARCHITECTURAL EXPLORATION GRID
        ────────────────────────────────────────────────────────── */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-white/[0.08]">
          {/* Brand Legal & Identity (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo size="md" />

            <p className="text-xs sm:text-sm text-[#D8D0C3]/75 font-light leading-relaxed max-w-md">
              A quiet luxury culinary brand dedicated to presenting the authentic, layered culinary heritage of Bengal. Founded in 2019 by Akash Santra, focused on uncompromising regional integrity and disciplined cloud kitchen operations.
            </p>

            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#B79A65] block mb-3">
                Official Channels
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={BRAND_DATA.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 hover:border-[#B79A65] px-3 py-2 text-xs text-[#D8D0C3] hover:text-[#FAF9F6] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4 text-[#B79A65]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BRAND_DATA.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 hover:border-[#B79A65] px-3 py-2 text-xs text-[#D8D0C3] hover:text-[#FAF9F6] transition-colors"
                  aria-label="X (formerly Twitter)"
                >
                  <XIcon className="h-3.5 w-3.5 text-[#B79A65]" />
                  <span>X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Minimal Navigation Links (Col 3) */}
          <div className="lg:col-span-3 space-y-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#B79A65] block">
              Exploration
            </span>
            <ul className="space-y-3.5 text-xs uppercase tracking-[0.18em] font-medium">
              <li>
                <Link href="/" className="hover:text-[#FAF9F6] hover:translate-x-1 inline-block transition-transform duration-200">
                  Discover
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FAF9F6] hover:translate-x-1 inline-block transition-transform duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#FAF9F6] hover:translate-x-1 inline-block transition-transform duration-200">
                  The Menu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FAF9F6] hover:translate-x-1 inline-block transition-transform duration-200">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FAF9F6] hover:translate-x-1 inline-block transition-transform duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Presence & Instant Fulfillment (Col 4) */}
          <div className="lg:col-span-4 space-y-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#B79A65] block">
              Presence & Ordering
            </span>

            <div className="space-y-4">
              <div className="border border-[#B79A65]/30 bg-white/[0.02] p-5 space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider">
                      Bangalore Central Hub
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <p className="font-mono text-[11px] text-[#B79A65] mt-1">
                    Active • Delivering via Swiggy & Zomato
                  </p>
                </div>

                <Link
                  href="/order"
                  className="group inline-flex items-center gap-2 border border-[#B79A65] bg-[#641F2B] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF9F6] hover:bg-[#7D2736] transition-colors w-full justify-center"
                >
                  <span>Order Online Now</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#B79A65] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="border border-white/[0.06] bg-white/[0.01] p-4">
                <span className="text-[#D8D0C3]/80 text-xs block font-medium">
                  Delhi NCR & Metropolitan Expansion
                </span>
                <span className="font-mono text-[10px] text-[#D8D0C3]/50 mt-0.5 block tracking-wider uppercase">
                  Planned Expansion Horizon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            SECTION 03: OVERSIZED LUXURY BRAND WORDMARK
        ────────────────────────────────────────────────────────── */}
        <div className="py-12 sm:py-16 lg:py-20 select-none overflow-hidden text-center pointer-events-none flex justify-center items-center w-full">
          <p className="font-serif text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light uppercase tracking-[0.08em] sm:tracking-[0.14em] text-white/[0.07] leading-none whitespace-nowrap">
            THE CALCUTTA CAFE
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────
            SECTION 04: LEGAL & BRAND ATTRIBUTION
        ────────────────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8D0C3]/60 font-light">
          <p>© 2026 {BRAND_DATA.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-[#D8D0C3]/50">
            <span>The Calcutta Cafe — Black Label</span>
            <span>•</span>
            <span>Bangalore, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
