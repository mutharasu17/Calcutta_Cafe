import Link from "next/link";
import BrandLogo from "../ui/BrandLogo";
import { BRAND_DATA } from "@/data/brandInfo";
import { InstagramIcon, XIcon } from "../ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#171615] text-[#D8D0C3] py-20 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/[0.06]">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo size="md" />
            <p className="font-serif text-lg text-[#FAF9F6] italic max-w-sm">
              &ldquo;{BRAND_DATA.closingStatement}&rdquo;
            </p>
            <p className="text-xs text-[#D8D0C3]/70 font-light leading-relaxed max-w-md">
              A quiet luxury expression of Bengal&apos;s culinary heritage. Founded in 2019 by Akash Santra, dedicated to making authentic regional flavors accessible across India through disciplined cloud kitchens.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={BRAND_DATA.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/10 hover:border-[#B79A65] text-[#B79A65] hover:text-[#FAF9F6] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={BRAND_DATA.socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/10 hover:border-[#B79A65] text-[#B79A65] hover:text-[#FAF9F6] transition-colors"
                aria-label="X"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65] block">
              Exploration
            </span>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-medium">
              <li>
                <Link href="/" className="hover:text-[#FAF9F6] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FAF9F6] transition-colors">
                  Our Story & Founder
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#FAF9F6] transition-colors">
                  Culinary Repertoire
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FAF9F6] transition-colors">
                  Heritage Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FAF9F6] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations & Delivery (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B79A65] block">
              Presence & Ordering
            </span>
            <div className="space-y-3 text-xs text-[#D8D0C3]/80 font-light">
              <div className="border border-white/[0.08] p-4 bg-white/[0.02]">
                <span className="text-[#FAF9F6] font-medium block">Bangalore Central Hub</span>
                <span className="text-[11px] text-[#B79A65] font-mono mt-0.5 block">
                  Active • Delivering via Swiggy & Zomato
                </span>
              </div>
              <div className="border border-white/[0.06] p-4 bg-white/[0.01]">
                <span className="text-[#D8D0C3] block">Delhi NCR & Metros</span>
                <span className="text-[11px] text-[#D8D0C3]/60 font-mono mt-0.5 block">
                  Planned Expansion Horizon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8D0C3]/60 font-light">
          <p>© 2026 {BRAND_DATA.legalName}. All rights reserved.</p>
          <p className="font-mono text-[11px]">The Calcutta Cafe — Signature Edition</p>
        </div>
      </div>
    </footer>
  );
}
