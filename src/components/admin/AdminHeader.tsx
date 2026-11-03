'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Plus, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useAdminSidebar } from './AdminLayoutClient';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenSidebar?: () => void;
  onAddDish?: () => void;
  userRole?: string;
}

export default function AdminHeader({
  title,
  subtitle,
  onOpenSidebar,
  onAddDish,
  userRole,
}: AdminHeaderProps) {
  const { openSidebar } = useAdminSidebar();
  const handleToggle = onOpenSidebar || openSidebar;
  return (
    <header className="sticky top-0 z-20 bg-[#1A1424]/95 backdrop-blur-md border-b border-[#382B4B] px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Page Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            className="lg:hidden p-2 rounded-lg bg-[#251D33] border border-[#382B4B] text-stone-300 hover:text-white transition-colors"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-serif font-bold text-[#FFF8ED]">
                {title}
              </h1>
              {userRole && <StatusBadge status={userRole} size="sm" />}
            </div>
            {subtitle && (
              <p className="text-xs text-[#C4B6D8] font-mono mt-0.5 hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/menu"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-stone-300 hover:text-[#FFF8ED] bg-[#251D33] hover:bg-[#322745] border border-[#382B4B] transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FFB834]" />
          </Link>

          {onAddDish && (
            <button
              type="button"
              onClick={onAddDish}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-[#FFF8ED] bg-[#5B1B8A] hover:bg-[#4B1473] border border-[#FFB834]/50 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#FFB834]" />
              <span className="hidden xs:inline">Add Dish</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
