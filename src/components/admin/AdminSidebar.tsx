'use client';

import React from 'react';
import Link from 'next/link';
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
  ShieldAlert,
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
    <div className="flex flex-col h-full bg-[#1D1A17] border-r border-[#3E3832] text-[#FFF8ED]">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#3E3832] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#8E171D] border border-[#C49A55]/40 flex items-center justify-center font-serif text-lg font-bold text-[#D4AF37] shadow-lg group-hover:scale-105 transition-transform">
            ক
          </div>
          <div>
            <span className="text-base font-serif font-bold text-[#FFF8ED] tracking-wide block">
              The Calcutta Cafe
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
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
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#A69B8D] px-3 mb-2 font-semibold">
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
                  ? 'bg-[#8E171D] text-white shadow-md font-semibold'
                  : 'text-stone-300 hover:text-[#FFF8ED] hover:bg-[#29251F]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-stone-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-6">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#A69B8D] px-3 mb-2 font-semibold">
            Public Storefront
          </div>
          <Link
            href="/menu"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:bg-[#29251F] border border-[#C49A55]/20 transition-colors"
          >
            <span>Live Menu</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-[#3E3832] bg-[#171513]">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="min-w-0 pr-2">
                <p className="text-xs font-semibold text-[#FFF8ED] truncate">{user.name}</p>
                <p className="text-[11px] font-mono text-[#A69B8D] truncate">{user.email}</p>
              </div>
              <StatusBadge status={user.role} size="sm" />
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider text-stone-300 hover:text-white bg-[#24201C] hover:bg-stone-800 border border-[#3E3832] rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-stone-400" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Admin Session Active</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 h-screen fixed left-0 top-0 z-30">
        {navContent}
      </aside>

      {/* Mobile drawer with backdrop */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-full h-full z-10 animate-slideRight">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}

