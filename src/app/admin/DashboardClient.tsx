'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UtensilsCrossed,
  FileEdit,
  AlertTriangle,
  Lock,
  Plus,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStatCard from '@/components/admin/DashboardStatCard';
import StatusBadge from '@/components/admin/StatusBadge';
import DishEditorModal, { DishFormData } from '@/components/admin/DishEditorModal';
import { AdminUserSession } from '@/lib/auth';

interface MetricStats {
  totalDishes: number;
  publishedDishes: number;
  draftDishes: number;
  totalCategories: number;
  totalRecipes: number;
  internalRecipes: number;
  missingImages: number;
}

interface RecentDish {
  id: string;
  name: string;
  price: number;
  status: string;
  image_url: string | null;
  updated_at: string;
  category_name: string | null;
}

interface CategoryStat {
  id: string;
  name: string;
  slug: string;
  dish_count: number;
}

interface AuditLogEntry {
  id: string;
  action: string;
  target_type: string;
  target_id: string | null;
  created_at: string;
  admin_name: string | null;
  admin_role: string | null;
}

interface DashboardClientProps {
  currentUser: AdminUserSession;
  metrics: MetricStats;
  recentlyUpdated: RecentDish[];
  categoryStats: CategoryStat[];
  recentAudit: AuditLogEntry[];
  categories: Array<{ id: string; name: string; slug: string }>;
  onOpenSidebar?: () => void;
}

export default function DashboardClient({
  currentUser,
  metrics,
  recentlyUpdated,
  categoryStats,
  recentAudit,
  categories,
  onOpenSidebar,
}: DashboardClientProps) {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [selectedDishToEdit, setSelectedDishToEdit] = useState<DishFormData | null>(null);

  const handleOpenAddDish = () => {
    setSelectedDishToEdit(null);
    setIsDishModalOpen(true);
  };

  const handleDishSaved = () => {
    setIsDishModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#141210]">
      {/* Top Header */}
      <AdminHeader
        title="Culinary CMS Overview"
        subtitle={`Welcome back, ${currentUser.name} (${currentUser.role.replace('_', ' ')})`}
        onOpenSidebar={onOpenSidebar || (() => {})}
        onAddDish={handleOpenAddDish}
        userRole={currentUser.role}
      />

      <main className="p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Metric Cards Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardStatCard
              label="Total Repertoire"
              value={metrics.totalDishes}
              subtext={`${metrics.publishedDishes} published on live menu`}
              icon={UtensilsCrossed}
              badge={{
                text: `${Math.round((metrics.publishedDishes / (metrics.totalDishes || 1)) * 100)}% live`,
                variant: 'success',
              }}
            />

            <DashboardStatCard
              label="Draft Items"
              value={metrics.draftDishes}
              subtext="Unpublished or kitchen testing"
              icon={FileEdit}
              badge={{
                text: metrics.draftDishes > 0 ? 'Pending' : 'All Clear',
                variant: metrics.draftDishes > 0 ? 'warning' : 'info',
              }}
            />

            <DashboardStatCard
              label="Missing Photos"
              value={metrics.missingImages}
              subtext="Needs authentic food photography"
              icon={AlertTriangle}
              badge={{
                text: metrics.missingImages === 0 ? 'Complete' : 'Attention',
                variant: metrics.missingImages === 0 ? 'success' : 'danger',
              }}
            />

            <DashboardStatCard
              label="Master Recipes"
              value={metrics.totalRecipes}
              subtext={`${metrics.internalRecipes} strictly internal / confidential`}
              icon={Lock}
              badge={{
                text: 'IP Protected',
                variant: 'info',
              }}
            />
          </div>
        </section>

        {/* Quick Action Banner */}
        <section className="bg-gradient-to-r from-[#24201C] to-[#1E1B18] border border-[#3E3832] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-base font-serif font-bold text-[#FFF8ED]">
              Culinary Operations Quick Launch
            </h2>
            <p className="text-xs text-[#A69B8D] leading-relaxed">
              Add new heritage dishes, update seasonal pricing, or record secret kitchen master formulations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAddDish}
              className="px-4 py-2 bg-[#8E171D] hover:bg-[#A31C23] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Dish</span>
            </button>

            <Link
              href="/admin/categories"
              className="px-4 py-2 bg-[#29251F] hover:bg-[#322E27] text-stone-200 text-xs font-mono uppercase tracking-wider font-semibold rounded-xl border border-[#3E3832] transition-colors"
            >
              Categories
            </Link>

            <Link
              href="/admin/recipes"
              className="px-4 py-2 bg-[#29251F] hover:bg-[#322E27] text-stone-200 text-xs font-mono uppercase tracking-wider font-semibold rounded-xl border border-[#3E3832] transition-colors"
            >
              Recipes
            </Link>

            <Link
              href="/menu"
              target="_blank"
              className="px-4 py-2 bg-[#29251F] hover:bg-[#322E27] text-[#D4AF37] text-xs font-mono uppercase tracking-wider font-semibold rounded-xl border border-[#C49A55]/30 flex items-center gap-1.5 transition-colors"
            >
              <span>Live Feast</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Two-column layout: Recent Dishes + Categories Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recently Updated Dishes (2 cols) */}
          <div className="lg:col-span-2 bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#3E3832]">
              <div>
                <h3 className="text-base font-serif font-bold text-[#FFF8ED]">
                  Recently Updated Menu Dishes
                </h3>
                <p className="text-xs text-[#A69B8D] font-mono mt-0.5">
                  Latest culinary adjustments and price revisions
                </p>
              </div>

              <Link
                href="/admin/menu"
                className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>View All Dishes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#2E2924]">
              {recentlyUpdated.map((dish) => (
                <div
                  key={dish.id}
                  className="py-3 flex items-center justify-between gap-3 group hover:bg-[#24201C] px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-lg bg-stone-900 border border-[#3E3832] overflow-hidden flex-shrink-0">
                      {dish.image_url ? (
                        <Image
                          src={dish.image_url}
                          alt={dish.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-600 font-mono">
                          No Pic
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#FFF8ED] truncate">
                        {dish.name}
                      </p>
                      <p className="text-xs text-[#A69B8D] truncate">
                        {dish.category_name || 'Unassigned'} •{' '}
                        <span className="text-[#D4AF37] font-semibold">₹{dish.price}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={dish.status} size="sm" />
                    <span className="text-[11px] font-mono text-stone-500 hidden sm:inline">
                      {new Date(dish.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Overview (1 col) */}
          <div className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#3E3832]">
              <div>
                <h3 className="text-base font-serif font-bold text-[#FFF8ED]">
                  Categories
                </h3>
                <p className="text-xs text-[#A69B8D] font-mono mt-0.5">
                  Distribution of dishes
                </p>
              </div>

              <Link
                href="/admin/categories"
                className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:underline"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {categoryStats.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#24201C] border border-[#3E3832] text-xs"
                >
                  <span className="font-medium text-stone-200">{cat.name}</span>
                  <span className="font-mono px-2 py-0.5 rounded-full bg-[#1A1815] text-[#D4AF37] border border-[#3E3832] font-semibold">
                    {cat.dish_count} {cat.dish_count === 1 ? 'dish' : 'dishes'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Log Section */}
        <section className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#3E3832]">
            <div>
              <h3 className="text-base font-serif font-bold text-[#FFF8ED]">
                Security & Administrative Audit Trail
              </h3>
              <p className="text-xs text-[#A69B8D] font-mono mt-0.5">
                Cryptographically tracked administrative mutations
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] font-mono uppercase tracking-wider text-[#A69B8D] border-b border-[#3E3832]">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Administrator</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Resource</th>
                  <th className="py-2.5 px-3">Target ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2E2924] font-mono text-stone-300">
                {recentAudit.map((log) => (
                  <tr key={log.id} className="hover:bg-[#24201C]/60">
                    <td className="py-2.5 px-3 text-stone-500 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#FFF8ED]">
                      {log.admin_name || 'System'}
                    </td>
                    <td className="py-2.5 px-3 uppercase text-[#D4AF37]">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-3 text-stone-400">
                      {log.target_type}
                    </td>
                    <td className="py-2.5 px-3 text-stone-500 truncate max-w-[120px]">
                      {log.target_id || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Dish Editor Modal */}
      <DishEditorModal
        isOpen={isDishModalOpen}
        initialData={selectedDishToEdit}
        categories={categories}
        onClose={() => setIsDishModalOpen(false)}
        onSaved={handleDishSaved}
      />
    </div>
  );
}
