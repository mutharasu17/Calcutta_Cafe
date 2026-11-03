import Link from "next/link";
import BrandLogo from "../ui/BrandLogo";
import { BRAND_DATA } from "@/data/brandInfo";
import { InstagramIcon, XIcon } from "../ui/SocialIcons";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#E6D8C3] text-[#29251F] pt-20 sm:pt-24 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-[#D8C7B0]">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* ──────────────────────────────────────────────────────────
            TOP: BRAND STATEMENT & CALL TO BENGAL
        ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#D8C7B0]">
          <div className="space-y-4 max-w-xl">
            <BrandLogo size="lg" />
            <p className="font-serif italic text-2xl sm:text-3xl text-[#29251F] font-normal leading-snug">
              &ldquo;{BRAND_DATA.campaignHeadline}&rdquo;
            </p>
            <p className="text-sm text-[#6B6357] font-normal leading-relaxed">
              {BRAND_DATA.tagline} Dedicated to presenting the authentic, multi-course culinary world of Bengal with unwavering regional integrity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-[#5B1B8A] text-[#F5EFE4] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#4B1473] transition-all shadow-sm"
            >
              <span>Order via Swiggy / Zomato</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/menu"
              className="editorial-link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#29251F] hover:text-[#5B1B8A] px-3 py-3"
            >
              <span>Explore The Menu</span>
            </Link>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            MIDDLE: EDITORIAL LINK MATRIX
        ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
          {/* Col 1: Exploration */}
          <div className="space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#5B1B8A] font-semibold block">
              Exploration
            </span>
            <ul className="space-y-2.5 uppercase tracking-wider text-[#29251F] font-medium">
              <li>
                <Link href="/" className="hover:text-[#5B1B8A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#5B1B8A] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#5B1B8A] transition-colors">
                  The Menu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#5B1B8A] transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#5B1B8A] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#5B1B8A] font-semibold block">
              Culinary Repertoire
            </span>
            <ul className="space-y-2.5 text-[#6B6357]">
              <li>
                <Link href="/menu?category=vegetarian" className="hover:text-[#29251F] transition-colors">
                  Vegetarian & Shukto
                </Link>
              </li>
              <li>
                <Link href="/menu?category=fish-seafood" className="hover:text-[#29251F] transition-colors">
                  Fish & River Seafood
                </Link>
              </li>
              <li>
                <Link href="/menu?category=chicken-mutton" className="hover:text-[#29251F] transition-colors">
                  Kosha Mangsho & Curries
                </Link>
              </li>
              <li>
                <Link href="/menu?category=snacks-street" className="hover:text-[#29251F] transition-colors">
                  Kolkata Kathi Rolls
                </Link>
              </li>
              <li>
                <Link href="/menu?category=sweets-desserts" className="hover:text-[#29251F] transition-colors">
                  Claypot Mishti Doi & Sweets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operational Footprint */}
          <div className="space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#5B1B8A] font-semibold block">
              Operations
            </span>
            <div className="space-y-2 text-[#6B6357] leading-relaxed">
              <p className="font-medium text-[#29251F]">
                Bangalore Central Kitchen
              </p>
              <p>
                Delivering across central and eastern Bangalore hubs via Swiggy and Zomato.
              </p>
              <p className="text-[11px] font-mono text-[#5B1B8A] pt-1">
                Expansion: Delhi NCR Planned
              </p>
            </div>
          </div>

          {/* Col 4: Official Channels */}
          <div className="space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#5B1B8A] font-semibold block">
              Official Channels
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={BRAND_DATA.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#29251F] hover:text-[#5B1B8A] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4 text-[#5B1B8A]" />
                <span>Instagram (@thecalcutta_cafe)</span>
              </a>
              <a
                href={BRAND_DATA.socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#29251F] hover:text-[#5B1B8A] transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <XIcon className="h-3.5 w-3.5 text-[#5B1B8A]" />
                <span>X / Twitter (@calcutta_cafe)</span>
              </a>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            BOTTOM: LEGAL ENTITY & ATTRIBUTION
        ────────────────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-[#D8C7B0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6357]">
          <p>© 2026 {BRAND_DATA.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Founded in 2019 by Akash Santra</span>
            <span>•</span>
            <span>Bangalore, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
