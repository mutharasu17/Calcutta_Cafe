import React from 'react';

type BadgeType =
  | 'published'
  | 'draft'
  | 'archived'
  | 'internal'
  | 'public'
  | 'available'
  | 'out_of_stock'
  | 'super_admin'
  | 'menu_manager'
  | 'content_manager';

interface StatusBadgeProps {
  status: BadgeType | string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const normalized = (status || '').toLowerCase().replace(/\s+/g, '_');

  let bg = 'bg-stone-800 text-stone-300 border-stone-700';
  let label = status;

  switch (normalized) {
    case 'published':
      bg = 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
      label = 'Published';
      break;
    case 'draft':
      bg = 'bg-amber-950/80 text-amber-400 border-amber-800/60';
      label = 'Draft';
      break;
    case 'archived':
      bg = 'bg-stone-800 text-stone-400 border-stone-700';
      label = 'Archived';
      break;
    case 'internal':
      bg = 'bg-rose-950/80 text-rose-300 border-rose-800/60';
      label = '🔒 Confidential (Internal)';
      break;
    case 'public':
      bg = 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60';
      label = 'Public Recipe';
      break;
    case 'available':
      bg = 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      label = 'In Stock';
      break;
    case 'out_of_stock':
      bg = 'bg-rose-950/80 text-rose-300 border-rose-800/60';
      label = 'Out of Stock';
      break;
    case 'super_admin':
      bg = 'bg-amber-950/80 text-[#D4AF37] border-[#C49A55]/50';
      label = 'Super Admin';
      break;
    case 'menu_manager':
      bg = 'bg-blue-950/80 text-blue-300 border-blue-800/60';
      label = 'Menu Manager';
      break;
    case 'content_manager':
      bg = 'bg-purple-950/80 text-purple-300 border-purple-800/60';
      label = 'Content Manager';
      break;
    default:
      label = status;
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${bg} ${sizeClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}

