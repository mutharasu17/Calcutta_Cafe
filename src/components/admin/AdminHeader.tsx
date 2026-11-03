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
    <header className="sticky top-0 z-20 bg-[#1D1A17]/95 backdrop-blur-md border-b border-[#3E3832] px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Page Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            className="lg:hidden p-2 rounded-lg bg-[#24201C] border border-[#3E3832] text-stone-300 hover:text-white transition-colors"
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
              <p className="text-xs text-[#A69B8D] font-mono mt-0.5 hidden sm:block">
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-stone-300 hover:text-[#FFF8ED] bg-[#24201C] hover:bg-[#2E2924] border border-[#3E3832] transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>

          {onAddDish && (
            <button
              type="button"
              onClick={onAddDish}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold text-white bg-[#8E171D] hover:bg-[#A31C23] border border-[#8E171D] shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden xs:inline">Add Dish</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
