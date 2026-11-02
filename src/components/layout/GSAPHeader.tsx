"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { gsap, DrawSVGPlugin } from "@/lib/gsapConfig";
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

  const isHome = pathname === "/";
  const showSolidBackground = isScrolled || !isHome;

  // Initial Entrance Animation with GSAP
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, clearProps: "transform,opacity" }
      )
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.7 },
          "-=0.6"
        )
        .fromTo(
          navContainerRef.current?.children ? Array.from(navContainerRef.current.children) : [],
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, clearProps: "all" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, clearProps: "all" },
          "-=0.4"
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
      setIsScrolled(window.scrollY > 40);
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
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power2.out", delay: 0.1 }
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
        { drawSVG: "100%", duration: 0.35, ease: "power2.out" }
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          showSolidBackground
            ? "bg-[#651217]/95 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#C49A55]/30 shadow-2xl"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent py-5 sm:py-6"
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
            <div className="w-10 h-10 rounded-full bg-[#8E171D] border border-[#C49A55] flex items-center justify-center text-[#FFF1DF] shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-lg font-bold text-[#C49A55]">CC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-normal text-[#FFF1DF] tracking-wide leading-tight group-hover:text-[#C49A55] transition-colors">
                The Calcutta Cafe
              </span>
              <span className="font-bengali text-[10px] text-[#C49A55] tracking-wider leading-none mt-0.5">
                দ্য ক্যালকাটা ক্যাফে • Estd. 2019
              </span>
            </div>
          </Link>

          {/* Centre: Desktop Navigation with GSAP SVG DrawSVG Underline */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-2 xl:gap-3 relative z-10"
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
                  className={`relative px-4 py-2 text-xs xl:text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 flex flex-col items-center ${
                    isActive
                      ? "text-[#C49A55] font-semibold"
                      : "text-[#FFF1DF]/90 hover:text-[#FFF1DF]"
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
                      style={{
                        strokeDasharray: isActive ? "none" : undefined,
                        opacity: isActive ? 1 : 0.9,
                      }}
                    />
                  </svg>
                </Link>
              );
            })}
          </nav>

          {/* Right: Order Online CTA & Animated Shopping Cart Button */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            {/* Desktop CTA */}
            <a
              ref={ctaRef}
              href="#order-online"
              className="hidden sm:inline-flex items-center gap-2 bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF1DF] border border-[#C49A55]/70 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Order Online</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#C49A55]" />
            </a>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={openCart}
              className="relative p-2.5 bg-[#FFF1DF]/10 hover:bg-[#FFF1DF]/20 border border-[#C49A55]/50 text-[#FFF1DF] rounded-full transition-colors duration-300 flex items-center justify-center cursor-pointer"
              aria-label={`Open feast cart with ${totalCount} items`}
            >
              <ShoppingBag className="h-5 w-5 text-[#C49A55]" />

              {/* Cart Count Badge */}
              {totalCount > 0 && (
                <span
                  ref={cartBadgeRef}
                  className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-[#8E171D] border border-[#C49A55] text-[#FFF1DF] text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#FFF1DF] hover:text-[#C49A55] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Full-screen Overlay */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-30 bg-[#651217] text-[#FFF1DF] flex flex-col justify-between pt-24 pb-10 px-6 sm:px-10 lg:hidden overflow-y-auto"
        >
          {/* Subtle Vignette Overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#8E171D]/40 to-[#651217] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="border-b border-[#C49A55]/30 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C49A55] block">
                  The Calcutta Cafe
                </span>
                <span className="font-serif text-2xl text-[#FFF1DF]">
                  Menu &amp; Monograph
                </span>
              </div>
              <span className="font-bengali text-sm text-[#C49A55]">
                খাবারের আসল স্বাদ
              </span>
            </div>

            {/* Staggered Links */}
            <nav className="space-y-3">
              {NAV_LINKS.map((link) => (
                <div key={link.name} className="mobile-nav-item">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-2 border-b border-[#FFF1DF]/10"
                  >
                    <div>
                      <span className="font-serif text-2xl sm:text-3xl text-[#FFF1DF] group-hover:text-[#C49A55] transition-colors block">
                        {link.name}
                      </span>
                      <span className="font-bengali text-xs text-[#C49A55]">
                        {link.bengali}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-[#C49A55] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="relative z-10 pt-6 border-t border-[#C49A55]/30 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#8E171D] border border-[#C49A55] text-[#FFF1DF] py-3 text-xs font-semibold uppercase tracking-[0.2em] shadow-lg"
            >
              <ShoppingBag className="h-4 w-4 text-[#C49A55]" />
              <span>View Curated Feast ({totalCount})</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.swiggy.com/restaurants/the-calcutta-cafe-bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FC8019] text-white py-3 text-center text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                Swiggy
              </a>
              <a
                href="https://www.zomato.com/bangalore/the-calcutta-cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E23744] text-white py-3 text-center text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                Zomato
              </a>
            </div>

            <div className="text-center text-[10px] font-mono uppercase tracking-widest text-[#FFF1DF]/60 pt-1">
              Bangalore Hubs • 11:30 AM – 11:00 PM Daily
            </div>
          </div>
        </div>
      )}
    </>
  );
}
