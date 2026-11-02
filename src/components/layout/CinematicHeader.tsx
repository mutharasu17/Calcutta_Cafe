"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ArrowUpRight, Sparkles, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { name: "Home", href: "/", bengali: "প্রচ্ছদ" },
  { name: "Our Story", href: "/about", bengali: "আমাদের কথা" },
  { name: "Menu", href: "/menu", bengali: "মেনু" },
  { name: "Gallery", href: "/#visual-gallery", bengali: "চিত্রশালা" },
  { name: "Contact", href: "/contact", bengali: "যোগাযোগ" },
];

export default function CinematicHeader() {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Check if we are on the homepage
  const isHome = pathname === "/";

  // When not on homepage, always show solid header for legibility
  const showSolidBackground = isScrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          showSolidBackground
            ? "bg-[#651217]/95 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#C49A55]/30 shadow-xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Left: Brand Logo & Bengali Identity */}
          <Link
            href="/"
            className="group flex items-center gap-3 relative z-10"
            aria-label="The Calcutta Cafe Homepage"
          >
            {/* Emblem Monogram */}
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

          {/* Centre: Desktop Navigation Bar with Sliding Hover Indicator */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 relative z-10"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.name)}
                  className={`relative px-4 py-2 text-xs xl:text-sm uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[#C49A55] font-semibold"
                      : "text-[#FFF1DF]/90 hover:text-[#FFF1DF]"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* Motion sliding indicator */}
                  {hoveredNav === link.name && (
                    <motion.div
                      layoutId="header-nav-indicator"
                      className="absolute inset-0 bg-[#FFF1DF]/10 border-b-2 border-[#C49A55] rounded-xs"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Active dot if not currently hovered */}
                  {isActive && hoveredNav !== link.name && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C49A55]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Order Online CTA & Interactive Animated Cart Icon */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            
            {/* Order Online Desktop CTA */}
            <a
              href="#order-online"
              className="hidden sm:inline-flex items-center gap-2 bg-[#8E171D] hover:bg-[#A9272D] text-[#FFF1DF] border border-[#C49A55]/60 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Order Online</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#C49A55]" />
            </a>

            {/* Animated Shopping Cart Button */}
            <motion.button
              onClick={openCart}
              whileTap={{ scale: 0.92 }}
              className="relative p-2.5 bg-[#FFF1DF]/10 hover:bg-[#FFF1DF]/20 border border-[#C49A55]/40 text-[#FFF1DF] rounded-full transition-colors duration-300 flex items-center justify-center"
              aria-label={`Open feast selection cart with ${totalCount} items`}
            >
              <ShoppingBag className="h-5 w-5 text-[#C49A55]" />

              {/* Cart Item Badge with Spring Animation */}
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.35, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-[#8E171D] border border-[#C49A55] text-[#FFF1DF] text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-md"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Hamburger Toggle */}
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

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-[#651217] text-[#FFF1DF] flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:hidden overflow-y-auto"
          >
            {/* Background Texture & Watermark */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#8E171D]/40 to-[#651217] pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Monogram & Title */}
              <div className="border-b border-[#C49A55]/30 pb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C49A55] block">
                    Menu &amp; Monograph
                  </span>
                  <span className="font-serif text-2xl text-[#FFF1DF]">
                    The Calcutta Cafe
                  </span>
                </div>
                <span className="font-bengali text-sm text-[#C49A55]">
                  খাবারের আসল স্বাদ
                </span>
              </div>

              {/* Staggered Navigation Links */}
              <nav className="space-y-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
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
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom Actions: Swiggy/Zomato dispatch & Curated Feast */}
            <div className="relative z-10 pt-8 border-t border-[#C49A55]/30 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#8E171D] border border-[#C49A55] text-[#FFF1DF] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] shadow-lg"
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

              <div className="text-center text-[11px] font-mono uppercase tracking-widest text-[#FFF1DF]/60 pt-2">
                Bangalore Hubs • 11:30 AM – 11:00 PM Daily
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
