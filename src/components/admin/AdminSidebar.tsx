'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  UtensilsCrossed,
  FolderTree,
  BookOpen,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  X,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminSidebarProps {
  user?: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Food Menu', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Categories', href: '/admin/categories', icon: FolderTree },
  { label: 'Kitchen Recipes', href: '/admin/recipes', icon: BookOpen },
  { label: 'Media & Images', href: '/admin/images', icon: ImageIcon },
];

export default function AdminSidebar({ user, isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#1A1424] border-r border-[#382B4B] text-[#FFF8ED]">
      {/* Brand Header with Official Medallion Logo */}
      <div className="p-6 border-b border-[#382B4B] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#FFB834] bg-[#5B1B8A] shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
            <Image
              src="/images/brand/logo.jpeg"
              alt="The Calcutta Cafe Official Logo"
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-base font-serif font-bold text-[#FFF8ED] tracking-wide block">
              The Calcutta Cafe
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB834] block font-semibold">
              Culinary CMS
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#C4B6D8] px-3 mb-2 font-semibold">
          Management
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#5B1B8A] text-white shadow-md font-semibold border border-[#FFB834]/40'
                  : 'text-stone-300 hover:text-[#FFF8ED] hover:bg-[#281D38]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFB834]' : 'text-stone-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-6 mt-6 border-t border-[#382B4B]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#C4B6D8] px-3 mb-2 font-semibold">
            Storefront
          </div>
          <Link
            href="/menu"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-300 hover:text-[#FFF8ED] hover:bg-[#281D38] transition-colors"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-[#FFB834]" />
              <span>View Live Menu</span>
            </span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-300 hover:text-[#FFF8ED] hover:bg-[#281D38] transition-colors"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-[#FFB834]" />
              <span>Brand Homepage</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-[#382B4B] bg-[#140F1D]">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <p className="text-xs font-semibold text-[#FFF8ED] truncate">{user.name}</p>
                <p className="text-[11px] text-stone-400 font-mono truncate">{user.email}</p>
              </div>
              <StatusBadge status={user.role} size="sm" />
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <Link
            href="/admin/login"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-[#FFB834] bg-[#5B1B8A] rounded-lg hover:bg-[#4B1473] transition-colors"
          >
            <span>Log In</span>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile Offcanvas Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </div>
    </>
  );
}
