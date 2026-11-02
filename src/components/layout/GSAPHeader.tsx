"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsapConfig";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { name: "Home", href: "/", bengali: "প্রচ্ছদ" },
  { name: "Our Story", href: "/about", bengali: "আমাদের কথা" },
  { name: "Menu", href: "/menu", bengali: "মেনু" },
  { name: "Gallery", href: "/#visual-gallery", bengali: "চিত্রশালা" },
  { name: "Contact", href: "/contact", bengali: "যোগাযোগ" },
];

export default function GSAPHeader() {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const cartBadgeRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Initial Entrance Animation with GSAP
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, clearProps: "transform,opacity" }
      )
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          navContainerRef.current?.children ? Array.from(navContainerRef.current.children) : [],
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, clearProps: "all" },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  // Animate Cart Badge when items change
  useEffect(() => {
    if (totalCount > 0 && cartBadgeRef.current) {
      gsap.fromTo(
        cartBadgeRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.2)" }
      );
    }
  }, [totalCount]);

  // Monitor scroll for header background & height transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
        const links = mobileMenuRef.current.querySelectorAll(".mobile-nav-item");
        gsap.fromTo(
          links,
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.08 }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle GSAP SVG DrawSVG hover on nav links
  const handleNavMouseEnter = (index: number) => {
    const line = document.getElementById(`nav-underline-${index}`);
    if (line) {
      gsap.fromTo(
        line,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const handleNavMouseLeave = (index: number, isActive: boolean) => {
    const line = document.getElementById(`nav-underline-${index}`);
    if (line && !isActive) {
      gsap.to(line, { drawSVG: "0%", duration: 0.25, ease: "power2.in" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-out ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#8E171D]/20 shadow-sm"
            : "bg-white/95 backdrop-blur-sm py-4 sm:py-5 border-b border-[#8E171D]/15"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Left: Brand Emblem & Typography */}
          <Link
            ref={logoRef}
            href="/"
            className="group flex items-center gap-3 relative z-10"
            aria-label="The Calcutta Cafe Homepage"
          >
            <div className="w-10 h-10 rounded-full bg-[#8E171D] border border-[#C49A55] flex items-center justify-center text-[#FFF8ED] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-lg font-bold text-[#C49A55]">CC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-medium text-[#292321] tracking-tight leading-tight group-hover:text-[#8E171D] transition-colors">
                The Calcutta Cafe
              </span>
              <span className="font-bengali text-[10px] text-[#8E171D] font-medium tracking-wider leading-none mt-0.5">
                দ্য ক্যালকাটা ক্যাফে • Estd. 2019
              </span>
            </div>
          </Link>

          {/* Centre: Desktop Navigation with GSAP SVG DrawSVG Underline */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-2 xl:gap-4 relative z-10"
          >
            {NAV_LINKS.map((link, idx) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => handleNavMouseEnter(idx)}
                  onMouseLeave={() => handleNavMouseLeave(idx, isActive)}
                  className={`relative px-4 py-2 text-xs xl:text-sm uppercase tracking-[0.18em] font-medium transition-colors duration-300 flex flex-col items-center ${
                    isActive
                      ? "text-[#8E171D] font-semibold"
                      : "text-[#292321]/80 hover:text-[#8E171D]"
                  }`}
                >
                  <span>{link.name}</span>

                  {/* GSAP DrawSVG Animated Underline Stroke */}
                  <svg
                    className="w-full h-1 mt-1 overflow-visible"
                    viewBox="0 0 100 4"
                    preserveAspectRatio="none"
                  >
                    <line
                      id={`nav-underline-${idx}`}
                      x1="0"
                      y1="2"
                      x2="100"
                      y2="2"
                      stroke="#C49A55"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        strokeDashoffset: isActive ? "0%" : "100%",
                        strokeDasharray: "100%",
                      }}
                    />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* Right: Order Online CTA & Shopping Cart Bag */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            {/* Desktop Order Online CTA Button */}
            <Link
              ref={ctaRef}
              href="/order"
              className="hidden sm:inline-flex items-center gap-2 bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF8ED] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] border border-[#C49A55]/40 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Order Online</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#C49A55]" />
            </Link>

            {/* Shopping Cart Bag Button with GSAP Animated Counter Badge */}
            <button
              id="header-cart-btn"
              onClick={openCart}
              className="relative p-2.5 text-[#292321] hover:text-[#8E171D] transition-colors rounded-full hover:bg-[#F4E8D7] cursor-pointer"
              aria-label={`Open shopping feast. ${totalCount} items in cart.`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCount > 0 && (
                <span
                  ref={cartBadgeRef}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#8E171D] text-[#FFF8ED] border border-[#C49A55] text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#292321] hover:text-[#8E171D] focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          MOBILE FULL-SCREEN OVERLAY NAVIGATION (WARM IVORY)
      ────────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-30 bg-white flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 overflow-y-auto lg:hidden"
        >
          {/* Header row in mobile overlay */}
          <div className="flex flex-col space-y-6">
            <div className="pb-4 border-b border-[#C49A55]/20">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8E171D] font-bold">
                Navigating The Calcutta Cafe
              </span>
              <p className="font-bengali text-xs text-[#5C524B] mt-1">
                কলকাতার খাঁটি খাদ্য ঐতিহ্য ও সমসাময়িক অভিজ্ঞতা।
              </p>
            </div>

            {/* Navigation Links with Staggered GSAP Entrance */}
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-nav-item py-2.5 flex items-baseline justify-between border-b border-[#E6D8C3]/50 transition-colors ${
                      isActive ? "text-[#8E171D] font-bold" : "text-[#292321] hover:text-[#8E171D]"
                    }`}
                  >
                    <span className="font-serif text-2xl tracking-wide">
                      {link.name}
                    </span>
                    <span className="font-bengali text-xs text-[#C49A55] font-medium">
                      {link.bengali}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions: Online Delivery & Hub Details */}
          <div className="pt-6 border-t border-[#C49A55]/30 space-y-4">
            <Link
              href="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 bg-[#8E171D] text-[#FFF8ED] flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-md border border-[#C49A55]/40"
            >
              <span>Order on Swiggy / Zomato</span>
              <ArrowUpRight className="h-4 w-4 text-[#C49A55]" />
            </Link>

            <div className="text-center text-[11px] font-mono text-[#5C524B]">
              <span>Koramangala • Indiranagar • Whitefield • HSR</span>
              <p className="mt-1 text-[#8E171D]">Daily 11:30 AM — 11:00 PM</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
