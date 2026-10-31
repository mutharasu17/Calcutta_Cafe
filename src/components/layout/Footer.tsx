"use client";

import Link from "next/link";
import BrandLogo from "../ui/BrandLogo";
import { BRAND_DATA } from "@/data/brandInfo";
import { MapPin, Sparkles, Heart } from "lucide-react";
import { InstagramIcon, XIcon } from "../ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#D4AF37]/15 bg-[#080C14] text-neutral-300">
      {/* Subtle top gold accent glow */}
      <div className="absolute top-0 left-1/2 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2">
            <BrandLogo size="lg" />
            <p className="mt-4 font-serif text-base text-[#D4AF37] italic">
              &ldquo;The Calcutta Cafe – A Taste of Bengal, Wherever You Are.&rdquo;
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-neutral-400">
              {BRAND_DATA.tagline}
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-neutral-500">
              Founded in 2019 by Akash Santra. Bringing the comprehensive culinary diversity
              of Bengal—from traditional river delicacies and vegetarian gems to artisanal
              sweets—directly to food lovers across India through modern cloud kitchens.
            </p>

            {/* Official Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={BRAND_DATA.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#141B26] text-[#D4AF37] transition-all duration-200 hover:border-[#D4AF37] hover:bg-[#8B1E1E] hover:text-white"
                aria-label="Follow The Calcutta Cafe on Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={BRAND_DATA.socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#141B26] text-[#D4AF37] transition-all duration-200 hover:border-[#D4AF37] hover:bg-[#8B1E1E] hover:text-white"
                aria-label="Follow The Calcutta Cafe on X (formerly Twitter)"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story & Founder
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Full Menu Experience
                </Link>
              </li>
              <li>
                <Link href="/#journey" className="hover:text-white transition-colors">
                  Brand Journey
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Bengal Food Heritage Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              Cuisine
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/menu?category=fish-seafood" className="hover:text-white transition-colors">
                  Fish & Seafood
                </Link>
              </li>
              <li>
                <Link href="/menu?category=chicken-mutton" className="hover:text-white transition-colors">
                  Chicken & Mutton
                </Link>
              </li>
              <li>
                <Link href="/menu?category=vegetarian" className="hover:text-white transition-colors">
                  Vegetarian Delicacies
                </Link>
              </li>
              <li>
                <Link href="/menu?category=snacks-street" className="hover:text-white transition-colors">
                  Snacks & Street Food
                </Link>
              </li>
              <li>
                <Link href="/menu?category=rice-meals" className="hover:text-white transition-colors">
                  Rice & Complete Bhoj
                </Link>
              </li>
              <li>
                <Link href="/menu?category=sweets-desserts" className="hover:text-white transition-colors">
                  Sweets & Desserts
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations & Delivery Notice */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              Outlets & Presence
            </h3>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-neutral-400">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Bangalore Central Hub (Live)</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-400">
                  Cloud Kitchen delivering through Swiggy & Zomato
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-medium">
                  <Sparkles className="h-3 w-3 text-[#D4AF37]" />
                  <span>Delhi NCR / Noida (Upcoming)</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-400">
                  Expansion in active planning phase
                </p>
              </div>

              <Link
                href="/order"
                className="mt-2 block rounded-lg border border-[#D4AF37]/40 bg-[#8B1E1E]/30 px-3 py-2 text-center text-xs font-semibold text-[#D4AF37] transition-colors hover:bg-[#8B1E1E]"
              >
                View Delivery Outlets →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Disclaimers */}
        <div className="mt-16 border-t border-white/10 pt-8 text-xs text-neutral-500">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>
              © 2026 The Calcutta Cafe Foods Pvt Ltd. All rights reserved. Founded by Akash Santra.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-neutral-400">
              <Link href="/contact" className="hover:text-white transition-colors">
                Corporate Inquiries
              </Link>
              <span>•</span>
              <span className="text-neutral-500">
                Online orders fulfilled directly via official delivery partners
              </span>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-neutral-600 text-center md:text-left">
            Disclaimer: The Calcutta Cafe follows a cloud-kitchen delivery model. Outlets in planned
            cities are currently in pipeline stages and will be formally announced upon launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
