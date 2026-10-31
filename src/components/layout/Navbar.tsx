"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "../ui/BrandLogo";
import { Menu as MenuIcon, X, ShoppingBag, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Our Journey", href: "/#journey" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-3.5 shadow-2xl shadow-black/60"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <BrandLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href) && !item.href.includes("#");

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#D4AF37]"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#8B1E1E] via-[#D4AF37] to-[#8B1E1E]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/order"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#8B1E1E] via-[#A62424] to-[#8B1E1E] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#8B1E1E]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8B1E1E]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <ShoppingBag className="h-4 w-4 text-[#D4AF37] transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Order Online</span>
              <span className="ml-0.5 rounded bg-black/20 px-1.5 py-0.5 text-[9px] text-[#D4AF37]">
                Live
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="rounded-lg p-2 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-full max-w-sm border-l border-[#D4AF37]/20 bg-[#0E1522] p-6 shadow-2xl transition-transform duration-300 ease-out ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <BrandLogo size="sm" />
            <button
              onClick={() => setIsMobileOpen(false)}
              className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-neutral-200 transition-colors hover:bg-[#8B1E1E]/20 hover:text-[#D4AF37]"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 opacity-50" />
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              href="/order"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B1E1E] to-[#681414] py-3.5 text-center text-sm font-semibold tracking-wider text-white shadow-lg shadow-[#8B1E1E]/40"
            >
              <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
              <span>ORDER ONLINE (SWIGGY / ZOMATO)</span>
            </Link>

            <div className="mt-6 text-center text-xs text-neutral-400">
              <p>Bangalore Cloud Kitchen Hub</p>
              <p className="mt-1 text-[11px] text-[#D4AF37]">
                Delhi NCR Expansion Coming Soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
