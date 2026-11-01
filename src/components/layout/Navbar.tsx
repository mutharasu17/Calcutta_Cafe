"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "../ui/BrandLogo";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route transition
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          PRIMARY UNIFIED HEADER (WARM IVORY & SANDSTONE)
      ────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F5EFE4]/95 backdrop-blur-md shadow-sm border-b border-[#E6D8C3] py-3.5"
            : "bg-[#F5EFE4] border-b border-[#E6D8C3]/60 py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Brand Logo on Left */}
          <div className="flex items-center">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links (Center) */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10"
            aria-label="Desktop Primary Navigation"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`editorial-link text-xs tracking-[0.2em] uppercase font-medium transition-colors ${
                    isActive
                      ? "text-[#7A382B] font-semibold"
                      : "text-[#29251F]/80 hover:text-[#7A382B]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Primary CTA (Right) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/order"
              className="group inline-flex items-center gap-2 bg-[#7A382B] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F5EFE4] transition-all duration-300 hover:bg-[#5E2B21] shadow-sm"
            >
              <span>Order Online</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#F5EFE4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Right Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/order"
              className="inline-flex items-center gap-1.5 bg-[#7A382B] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#F5EFE4]"
            >
              <span>Order</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-[#29251F] hover:text-[#7A382B] transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          CLEAN MOBILE NAVIGATION OVERLAY (WARM IVORY)
      ────────────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 bg-[#F5EFE4] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex flex-col h-full justify-between p-6 sm:p-10 overflow-y-auto">
          {/* Top Bar with Logo and Close */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E6D8C3]">
            <BrandLogo size="md" />

            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 p-2 text-[#29251F] hover:text-[#7A382B] transition-colors"
              aria-label="Close Navigation Menu"
            >
              <span className="text-xs uppercase tracking-wider font-mono text-[#6B6357]">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Items (Large Cormorant Garamond Editorial Links) */}
          <nav className="py-10 space-y-5" aria-label="Mobile Nav Items">
            {NAV_LINKS.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <div key={item.label} className="border-b border-[#E6D8C3]/50 pb-3">
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-baseline justify-between group"
                  >
                    <span
                      className={`font-serif text-3xl font-normal tracking-tight transition-colors ${
                        isActive
                          ? "text-[#7A382B] font-medium"
                          : "text-[#29251F] group-hover:text-[#7A382B]"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-[#6B6357]">
                      0{idx + 1}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Mobile Footer Area with Order Button & Attribution */}
          <div className="pt-6 border-t border-[#E6D8C3] space-y-4">
            <Link
              href="/order"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#7A382B] py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5EFE4] hover:bg-[#5E2B21] transition-colors w-full"
            >
              <span>Order Online via Swiggy / Zomato</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <div className="text-center">
              <p className="text-xs text-[#6B6357]">
                Bangalore Central Hub Active • Estd. 2019
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
