"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BrandLogo from "../ui/BrandLogo";
import { ArrowUpRight, X } from "lucide-react";

interface NavLinkItem {
  id: string;
  number: string;
  label: string;
  href: string;
  previewImage: string;
  tagline: string;
}

const PRIMARY_NAV = [
  { label: "Discover", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "The Menu", href: "/menu" },
  { label: "Journal", href: "/blog" },
];

const FULL_NAV_ITEMS: NavLinkItem[] = [
  {
    id: "discover",
    number: "01",
    label: "Discover",
    href: "/",
    previewImage: "/images/hero-bengali-bhoj.jpg",
    tagline: "The Royal Bhoj & Bengali Gastronomy",
  },
  {
    id: "about",
    number: "02",
    label: "Our Story",
    href: "/about",
    previewImage: "/images/kolkata-heritage-story.jpg",
    tagline: "Estd. 2019 • Akash Santra's Vision",
  },
  {
    id: "menu",
    number: "03",
    label: "The Menu",
    href: "/menu",
    previewImage: "/images/kosha-mangsho.jpg",
    tagline: "Authentic Regional Repertoire",
  },
  {
    id: "journal",
    number: "04",
    label: "Journal",
    href: "/blog",
    previewImage: "/images/luchi-chholar-dal.jpg",
    tagline: "Essays on Culinary Heritage",
  },
  {
    id: "contact",
    number: "05",
    label: "Contact",
    href: "/contact",
    previewImage: "/images/shorshe-ilish.jpg",
    tagline: "Bangalore Hub & Direct Inquiries",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<NavLinkItem>(FULL_NAV_ITEMS[0]);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Direction-aware intelligent scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header on scroll-down, reveal on scroll-up. Always visible at the top.
      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false); // scrolling down
      } else if (currentScrollY < lastScrollY.current - 5) {
        setIsVisible(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close full-screen menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll and listen for Escape key when menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          FLOATING SIGNATURE GLASS NAVIGATION (DESKTOP & MOBILE)
      ────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#090909]/82 backdrop-blur-2xl border-b border-white/[0.10] py-3.5 shadow-2xl shadow-black/80"
            : "bg-transparent py-6 lg:py-8"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Left: Official Brand Logo Lockup */}
          <div className="flex items-center">
            <BrandLogo size="md" />
          </div>

          {/* Right-Aligned Desktop Navigation & Actions */}
          <div className="flex items-center gap-6 lg:gap-10">
            {/* Primary Navigation Links */}
            <nav
              className="hidden md:flex items-center gap-8 lg:gap-10"
              aria-label="Desktop Primary Navigation"
            >
              {PRIMARY_NAV.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`link-roll text-xs tracking-[0.22em] uppercase font-medium transition-colors ${
                      isActive
                        ? "text-[#F5F0E8]"
                        : "text-[#A9A19A] hover:text-[#F5F0E8]"
                    }`}
                  >
                    <span className="link-roll-inner">
                      <span>{item.label}</span>
                      <span className="text-[#C7AC83]">{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Restrained Champagne Accent CTA */}
            <Link
              href="/order"
              className="group relative hidden sm:inline-flex items-center gap-2 border border-[#C7AC83]/60 bg-[#651F2B]/90 backdrop-blur-md px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F5F0E8] transition-all duration-300 hover:bg-[#7D2736] hover:border-[#C7AC83]"
            >
              <span>Order Online</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#C7AC83] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Animated Menu Icon Control */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-3 border border-white/10 bg-white/[0.04] hover:border-[#C7AC83]/50 px-3.5 py-2 transition-all duration-300 focus:outline-none"
              aria-label="Open Full-Screen Navigation Menu"
              aria-expanded={isMenuOpen}
            >
              <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-[#F5F0E8] group-hover:text-[#C7AC83] transition-colors">
                Menu
              </span>
              <div className="w-5 flex flex-col items-end gap-1.5">
                <span className="block h-[1px] w-5 bg-[#F5F0E8] group-hover:bg-[#C7AC83] transition-all duration-300" />
                <span className="block h-[1px] w-3.5 bg-[#F5F0E8] group-hover:bg-[#C7AC83] group-hover:w-5 transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          FULL-SCREEN LUXURY GLASS NAVIGATION EXPERIENCE
      ────────────────────────────────────────────────────────── */}
      <div
        style={{ backgroundColor: "#090909" }}
        className={`fixed inset-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation Overlay"
      >
        {/* Dynamic Background Image Preview (Desktop Hover Moment) */}
        <div
          style={{ backgroundColor: "#090909" }}
          className="absolute inset-0 z-0 hidden lg:block overflow-hidden"
        >
          <Image
            src={hoveredItem.previewImage}
            alt={hoveredItem.label}
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.24] contrast-110 transition-all duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/85 to-[#090909]/60" />
          <div className="absolute inset-0 editorial-grain opacity-40 pointer-events-none" />
        </div>

        {/* Mobile/Tablet Solid Canvas Background */}
        <div
          style={{ backgroundColor: "#090909" }}
          className="absolute inset-0 z-0 lg:hidden"
        />

        {/* Top Control Bar with Brand Wordmark & Close Button */}
        <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16 pt-7 pb-6 border-b border-white/[0.08]">
          <BrandLogo size="md" />

          <button
            onClick={() => setIsMenuOpen(false)}
            className="group flex items-center gap-2.5 border border-white/20 hover:border-[#C7AC83] px-4 py-2 transition-all duration-300 focus:outline-none bg-white/[0.02]"
            aria-label="Close Navigation Menu"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#F5F0E8] group-hover:text-[#C7AC83] transition-colors">
              Close
            </span>
            <X className="h-4 w-4 text-[#C7AC83] transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Navigation Content Matrix */}
        <div className="relative z-10 mx-auto max-w-7xl h-[calc(100vh-100px)] flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-10 lg:py-14 overflow-y-auto">
          {/* Main Links List (Oversized Editorial Serif) */}
          <nav className="space-y-4 lg:space-y-6" aria-label="Full-Screen Navigation Links">
            {FULL_NAV_ITEMS.map((item) => {
              const isCurrent = pathname === item.href;
              const isHovered = hoveredItem.id === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item)}
                  className="group block"
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-baseline gap-4 sm:gap-6 transition-all duration-300"
                  >
                    <span className="font-mono text-xs sm:text-sm text-[#C7AC83]/70 tracking-widest">
                      {item.number}
                    </span>
                    <span
                      className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight transition-all duration-300 ${
                        isCurrent || isHovered
                          ? "text-[#F5F0E8] italic translate-x-2"
                          : "text-[#A9A19A]/70 group-hover:text-[#F5F0E8]"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="hidden sm:inline-block font-mono text-xs text-[#A9A19A]/50 tracking-wider font-light opacity-0 group-hover:opacity-100 transition-opacity">
                      — {item.tagline}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Bottom Information Glass Grid */}
          <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Quick Ordering Action */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block mb-2">
                Immediate Fulfillment
              </span>
              <Link
                href="/order"
                className="inline-flex items-center gap-2 border border-[#C7AC83] bg-[#651F2B] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F0E8] hover:bg-[#7D2736] transition-colors"
              >
                <span>Order via Swiggy / Zomato</span>
                <ArrowUpRight className="h-4 w-4 text-[#C7AC83]" />
              </Link>
            </div>

            {/* Operational Location Attribution */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block mb-1">
                Operational Presence
              </span>
              <p className="text-xs text-[#F5F0E8] font-light">
                Bangalore Hub Operational
              </p>
              <p className="text-[11px] text-[#A9A19A]/70 font-light mt-0.5">
                Delhi NCR & Metros Planned
              </p>
            </div>

            {/* Social & Legal Reference */}
            <div className="md:text-right">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C7AC83] block mb-1">
                Official Channels
              </span>
              <div className="flex md:justify-end items-center gap-4 text-xs text-[#A9A19A]">
                <a
                  href="https://www.instagram.com/thecalcutta_cafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F0E8] transition-colors"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://x.com/calcutta_cafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F0E8] transition-colors"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
