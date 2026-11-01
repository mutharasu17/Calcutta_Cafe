"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BrandLogo from "../ui/BrandLogo";
import AnnouncementBar from "./AnnouncementBar";
import SearchModal from "../ui/SearchModal";
import DishDetailModal from "../ui/DishDetailModal";
import { MENU_CATEGORIES, MenuItem } from "@/data/menuData";
import { useFoodDiscovery } from "@/lib/useFoodDiscovery";
import {
  Search,
  Heart,
  ChevronDown,
  Menu as MenuIcon,
  X,
  ArrowRight,
  ExternalLink,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";

export default function RetailHeader() {
  const pathname = usePathname();
  const { favorites, isFavorite, toggleFavorite } = useFoodDiscovery();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Primary Retail Navigation Bar */}
        <div
          className={`bg-[#FFFDF8] border-b border-[#E6D8C3] transition-all duration-300 ${
            isScrolled ? "py-3 shadow-md" : "py-4 sm:py-5"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 flex items-center justify-between">
            {/* Left: Mobile Drawer Trigger & Brand Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="lg:hidden p-2 text-[#29251F] hover:text-[#7A382B] transition-colors"
                aria-label="Open navigation drawer"
              >
                <MenuIcon className="h-5 w-5" />
              </button>

              <BrandLogo size="md" />
            </div>

            {/* Center: Desktop Navigation Bar with Mega Menu */}
            <nav
              className="hidden lg:flex items-center gap-7 xl:gap-9 text-xs uppercase tracking-[0.16em] font-medium text-[#29251F]"
              aria-label="Main Navigation"
            >
              <Link
                href="/menu"
                className={`transition-colors hover:text-[#7A382B] ${
                  pathname === "/menu" ? "text-[#7A382B] font-semibold" : ""
                }`}
              >
                Shop All
              </Link>

              {/* Mega Menu Trigger: Delicacies */}
              <div
                className="relative py-2"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button
                  onClick={() => setIsMegaMenuOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 transition-colors hover:text-[#7A382B] ${
                    isMegaMenuOpen ? "text-[#7A382B] font-semibold" : ""
                  }`}
                  aria-expanded={isMegaMenuOpen}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isMegaMenuOpen ? "rotate-180 text-[#7A382B]" : ""
                    }`}
                  />
                </button>

                {/* Anand Sweets Style Mega Dropdown Menu */}
                {isMegaMenuOpen && (
                  <div className="absolute top-full -left-24 w-[760px] bg-[#FFFDF8] border border-[#E6D8C3] shadow-2xl p-6 grid grid-cols-3 gap-5 animate-fade-in z-50">
                    {MENU_CATEGORIES.filter((c) => c.id !== "drinks").map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/menu?category=${cat.id}`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="group flex gap-3 p-2.5 rounded-none border border-transparent hover:border-[#E6D8C3] hover:bg-[#F5EFE4] transition-all"
                      >
                        <div className="relative h-16 w-16 bg-[#E6D8C3] overflow-hidden flex-shrink-0 border border-[#E6D8C3]">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bengali text-[11px] text-[#7A382B] font-medium block truncate">
                            {cat.bengaliSubtitle}
                          </span>
                          <h4 className="font-serif text-sm font-semibold text-[#29251F] group-hover:text-[#7A382B] transition-colors leading-tight">
                            {cat.name}
                          </h4>
                          <span className="text-[10px] font-mono text-[#6B6357] uppercase tracking-wider block mt-1">
                            Explore Collection →
                          </span>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-3 pt-3 border-t border-[#E6D8C3] flex items-center justify-between text-[11px] font-mono text-[#6B6357]">
                      <span>Authentic Bengali Heritage Culinary Repertoire</span>
                      <Link
                        href="/menu"
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="text-[#7A382B] hover:text-[#29251F] font-semibold uppercase tracking-wider flex items-center gap-1"
                      >
                        <span>View All Courses</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`transition-colors hover:text-[#7A382B] ${
                  pathname === "/about" ? "text-[#7A382B] font-semibold" : ""
                }`}
              >
                Our Story
              </Link>

              <Link
                href="/blog"
                className={`transition-colors hover:text-[#7A382B] ${
                  pathname.startsWith("/blog") ? "text-[#7A382B] font-semibold" : ""
                }`}
              >
                Journal
              </Link>

              <Link
                href="/contact"
                className={`transition-colors hover:text-[#7A382B] ${
                  pathname === "/contact" ? "text-[#7A382B] font-semibold" : ""
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right: Search, Favourites, Order Online CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Trigger Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#29251F] hover:text-[#7A382B] transition-colors relative"
                aria-label="Open search dialog"
              >
                <Search className="h-4 sm:h-5 w-4 sm:w-5" />
              </button>

              {/* Favourites Shortcut with Live Counter */}
              <Link
                href="/menu"
                className="p-2 text-[#29251F] hover:text-[#7A382B] transition-colors relative"
                aria-label={`Saved favourites: ${favorites.length}`}
              >
                <Heart
                  className={`h-4 sm:h-5 w-4 sm:w-5 ${
                    favorites.length > 0 ? "fill-current text-rose-500" : ""
                  }`}
                />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#7A382B] text-[#FFFDF8] text-[9px] font-mono flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* High-Impact Terracotta Order Online Button */}
              <Link
                href="/order"
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#7A382B] hover:bg-[#5E2B21] text-[#FFFDF8] px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-sm"
              >
                <span>Order Online</span>
                <ExternalLink className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          MOBILE SLIDE-OVER NAVIGATION DRAWER (ANAND SWEETS STYLE)
      ────────────────────────────────────────────────────────── */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="absolute inset-0" onClick={() => setIsMobileDrawerOpen(false)} />

          <div className="relative z-10 w-full max-w-sm bg-[#FFFDF8] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[#E6D8C3]">
            {/* Drawer Header */}
            <div>
              <div className="p-5 border-b border-[#E6D8C3] flex items-center justify-between bg-[#F5EFE4]">
                <BrandLogo size="sm" />
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-2 text-[#29251F] hover:text-[#7A382B] transition-colors"
                  aria-label="Close navigation drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Quick Search Bar */}
              <div className="p-4 border-b border-[#E6D8C3]">
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 bg-[#F5EFE4] border border-[#E6D8C3] px-3.5 py-2.5 text-xs text-[#6B6357]"
                >
                  <Search className="h-4 w-4 text-[#7A382B]" />
                  <span>Search dishes & ingredients...</span>
                </button>
              </div>

              {/* Category-First Navigation Links */}
              <div className="p-5 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#7A382B] font-semibold block mb-2.5">
                    Shop Our Range • রসনার সম্ভার
                  </span>
                  <div className="space-y-1">
                    {MENU_CATEGORIES.filter((c) => c.id !== "drinks").map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/menu?category=${cat.id}`}
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="flex items-center justify-between py-2 text-sm text-[#29251F] hover:text-[#7A382B] transition-colors border-b border-[#E6D8C3]/40"
                      >
                        <span className="font-serif">{cat.name}</span>
                        <span className="font-bengali text-xs text-[#7A382B]">
                          {cat.bengaliSubtitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-[#E6D8C3]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#7A382B] font-semibold block mb-2">
                    Company & Heritage
                  </span>
                  <Link
                    href="/about"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="block text-sm font-serif text-[#29251F] hover:text-[#7A382B]"
                  >
                    Our Story & Akash Santra (2019)
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="block text-sm font-serif text-[#29251F] hover:text-[#7A382B]"
                  >
                    The Bengal Journal (Culinary Essays)
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="block text-sm font-serif text-[#29251F] hover:text-[#7A382B]"
                  >
                    Contact & Bangaluru Kitchen Hubs
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-5 border-t border-[#E6D8C3] bg-[#F5EFE4] space-y-3">
              <Link
                href="/order"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#7A382B] text-[#FFFDF8] py-3 text-xs font-semibold uppercase tracking-wider shadow-sm"
              >
                <UtensilsCrossed className="h-4 w-4" />
                <span>Order Online Direct</span>
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#6B6357]">
                <MapPin className="h-3 w-3 text-[#7A382B]" />
                <span>Indiranagar • Koramangala • Whitefield</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDish={(dish) => setSelectedDish(dish)}
      />

      {/* Dish Detail Sheet Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        isFavorite={selectedDish ? isFavorite(selectedDish.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}

