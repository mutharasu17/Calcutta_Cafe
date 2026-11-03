'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Search,
  Edit2,
  Trash2,
  Sparkles,
  CheckCircle,
  XCircle,
  Flame,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import DishEditorModal, { DishFormData } from '@/components/admin/DishEditorModal';
import { AdminUserSession } from '@/lib/auth';

interface DishRow {
  id: string;
  name: string;
  bengali_name: string | null;
  slug: string;
  category_id: string;
  category_name?: string;
  description: string | null;
  price: number;
  portion_size: string | null;
  dietary_tags: string | null;
  spice_level: string | null;
  preparation_time: string | null;
  hero_ingredients: string | null;
  cooking_method: string | null;
  historical_context: string | null;
  chef_notes: string | null;
  image_url: string | null;
  image_alt: string | null;
  status: 'published' | 'draft' | 'archived';
  is_signature: number;
  is_available: number;
  display_order: number;
}

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface MenuManagementClientProps {
  currentUser: AdminUserSession;
  initialDishes: DishRow[];
  categories: CategoryOption[];
  onOpenSidebar?: () => void;
}

export default function MenuManagementClient({
  currentUser,
  initialDishes,
  categories,
  onOpenSidebar,
}: MenuManagementClientProps) {
  const [dishes, setDishes] = useState<DishRow[]>(initialDishes);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('order');

  // Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<DishFormData | null>(null);
  const [deletingDishId, setDeletingDishId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filtered & sorted dishes
  const filteredDishes = useMemo(() => {
    return dishes
      .filter((dish) => {
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = dish.name.toLowerCase().includes(q);
          const matchBengali = dish.bengali_name?.toLowerCase().includes(q);
          const matchDesc = dish.description?.toLowerCase().includes(q);
          if (!matchName && !matchBengali && !matchDesc) return false;
        }

        if (selectedCategory !== 'all' && dish.category_id !== selectedCategory) {
          return false;
        }

        if (selectedDietary !== 'all') {
          const dt = (dish.dietary_tags || '').toLowerCase();
          if (selectedDietary === 'veg' && (!dt.includes('veg') || dt.includes('non'))) return false;
          if (selectedDietary === 'non-veg' && !dt.includes('non')) return false;
        }

        if (selectedStatus !== 'all' && dish.status !== selectedStatus) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return a.display_order - b.display_order;
      });
  }, [dishes, search, selectedCategory, selectedDietary, selectedStatus, sortBy]);

  const handleCreate = () => {
    setEditingDish(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (dish: DishRow) => {
    setEditingDish({
      id: dish.id,
      name: dish.name,
      bengali_name: dish.bengali_name || '',
      slug: dish.slug,
      category_id: dish.category_id,
      description: dish.description || '',
      price: dish.price,
      portion_size: dish.portion_size || '',
      dietary_tags: dish.dietary_tags || 'Non-Veg',
      spice_level: dish.spice_level || 'Medium',
      preparation_time: dish.preparation_time || '',
      hero_ingredients: dish.hero_ingredients || '',
      cooking_method: dish.cooking_method || '',
      historical_context: dish.historical_context || '',
      chef_notes: dish.chef_notes || '',
      image_url: dish.image_url || '',
      image_alt: dish.image_alt || '',
      status: dish.status,
      is_signature: Boolean(dish.is_signature),
      is_available: Boolean(dish.is_available),
      display_order: dish.display_order,
    });
    setIsEditorOpen(true);
  };

  const handleToggleAvailability = async (dish: DishRow) => {
    const updatedStatus = !dish.is_available;
    try {
      const res = await fetch(`/api/admin/dishes/${dish.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dish,
          is_available: updatedStatus,
        }),
      });

      if (res.ok) {
        setDishes((prev) =>
          prev.map((d) => (d.id === dish.id ? { ...d, is_available: updatedStatus ? 1 : 0 } : d))
        );
        showNotification(`${dish.name} marked as ${updatedStatus ? 'In Stock' : 'Out of Stock'}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!deletingDishId) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/dishes/${deletingDishId}`, { method: 'DELETE' });
      if (res.ok) {
        setDishes((prev) => prev.filter((d) => d.id !== deletingDishId));
        setDeletingDishId(null);
        showNotification('Dish successfully deleted from repertoire');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const refreshDishes = async () => {
    setIsEditorOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#141210]">
      <AdminHeader
        title="Food Menu Repertoire"
        subtitle="Manage 20 fields of culinary metadata, seasonal pricing and photography"
        onOpenSidebar={onOpenSidebar || (() => {})}
        onAddDish={handleCreate}
        userRole={currentUser.role}
      />

      <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Toast Notification */}
        {notification && (
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <section className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes by English name, বাংলা, or description..."
                className="w-full bg-[#141210] border border-[#3E3832] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#FFF8ED] placeholder:text-stone-600 focus:outline-none focus:border-[#C49A55]"
              />
            </div>

            {/* Quick Count Badge */}
            <div className="text-xs font-mono text-[#A69B8D] flex items-center gap-2 self-end md:self-center">
              <span>Showing</span>
              <span className="font-bold text-[#FFB834] px-2 py-0.5 rounded-full bg-[#24201C] border border-[#3E3832]">
                {filteredDishes.length}
              </span>
              <span>of {dishes.length} dishes</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#2E2924]">
            {/* Category Select */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#A69B8D] mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#141210] border border-[#3E3832] rounded-lg px-2.5 py-1.5 text-xs text-[#FFF8ED] focus:outline-none focus:border-[#C49A55]"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dietary Select */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#A69B8D] mb-1">
                Dietary
              </label>
              <select
                value={selectedDietary}
                onChange={(e) => setSelectedDietary(e.target.value)}
                className="w-full bg-[#141210] border border-[#3E3832] rounded-lg px-2.5 py-1.5 text-xs text-[#FFF8ED] focus:outline-none focus:border-[#C49A55]"
              >
                <option value="all">All Dietary</option>
                <option value="non-veg">Non-Veg</option>
                <option value="veg">Vegetarian</option>
              </select>
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#A69B8D] mb-1">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#141210] border border-[#3E3832] rounded-lg px-2.5 py-1.5 text-xs text-[#FFF8ED] focus:outline-none focus:border-[#C49A55]"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Sort Select */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#A69B8D] mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#141210] border border-[#3E3832] rounded-lg px-2.5 py-1.5 text-xs text-[#FFF8ED] focus:outline-none focus:border-[#C49A55]"
              >
                <option value="order">Display Order</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Desktop Table View (lg screens) */}
        <section className="hidden lg:block bg-[#1E1B18] border border-[#3E3832] rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#171513] text-[10px] font-mono uppercase tracking-wider text-[#A69B8D] border-b border-[#3E3832]">
              <tr>
                <th className="py-3.5 px-4">Photo</th>
                <th className="py-3.5 px-4">Dish Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Culinary Spec</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E2924] text-xs">
              {filteredDishes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-500 font-mono">
                    No dishes found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredDishes.map((dish) => (
                  <tr key={dish.id} className="hover:bg-[#24201C] transition-colors">
                    {/* Photo thumbnail */}
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-12 rounded-lg bg-stone-900 border border-[#3E3832] overflow-hidden">
                        {dish.image_url ? (
                          <Image
                            src={dish.image_url}
                            alt={dish.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-stone-600 font-mono">
                            No Pic
                          </div>
                        )}
                        {Boolean(dish.is_signature) && (
                          <span className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-[#5B1B8A] text-[#FFB834] border border-[#FFB834]/40" title="Chef's Signature">
                            <Sparkles className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Dish Title */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-serif font-bold text-sm text-[#FFF8ED] truncate">
                        {dish.name}
                      </p>
                      {dish.bengali_name && (
                        <p className="text-xs font-bengali text-[#D4AF37]">
                          {dish.bengali_name}
                        </p>
                      )}
                      <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                        {dish.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-stone-300 font-medium">
                      {dish.category_name || '—'}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono font-bold text-[#D4AF37] text-sm">
                      ₹{dish.price}
                    </td>

                    {/* Culinary spec */}
                    <td className="py-3 px-4 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#141210] text-stone-300 border border-[#3E3832]">
                          {dish.dietary_tags || 'Non-Veg'}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#141210] text-amber-300 border border-[#3E3832] flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" />
                          {dish.spice_level || 'Medium'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 block">
                        {dish.portion_size}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 space-y-1">
                      <div>
                        <StatusBadge status={dish.status} size="sm" />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(dish)}
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                          dish.is_available
                            ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/40 hover:bg-rose-950/40 hover:text-rose-400'
                            : 'bg-rose-950/50 text-rose-400 border-rose-800/40 hover:bg-emerald-950/40 hover:text-emerald-400'
                        }`}
                      >
                        {dish.is_available ? <CheckCircle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                        <span>{dish.is_available ? 'In Stock' : 'Out of Stock'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEdit(dish)}
                          className="p-1.5 text-stone-400 hover:text-[#D4AF37] hover:bg-[#2E2924] rounded-lg transition-colors"
                          title="Edit complete dish"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingDishId(dish.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                          title="Delete dish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Mobile / Tablet Cards Grid (screens < lg) */}
        <section className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredDishes.length === 0 ? (
            <div className="col-span-full py-12 text-center text-stone-500 font-mono text-xs">
              No dishes found matching current filters.
            </div>
          ) : (
            filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-4 shadow-xl space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-xl bg-stone-900 border border-[#3E3832] overflow-hidden flex-shrink-0">
                    {dish.image_url ? (
                      <Image
                        src={dish.image_url}
                        alt={dish.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-600 font-mono">
                        No Pic
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif font-bold text-sm text-[#FFF8ED] truncate">
                        {dish.name}
                      </h3>
                      <span className="font-mono font-bold text-sm text-[#D4AF37]">
                        ₹{dish.price}
                      </span>
                    </div>

                    {dish.bengali_name && (
                      <p className="text-xs font-bengali text-[#D4AF37]">
                        {dish.bengali_name}
                      </p>
                    )}

                    <p className="text-[11px] text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#2E2924]">
                  <StatusBadge status={dish.status} size="sm" />
                  <span className="text-[11px] font-mono text-stone-400">
                    {dish.category_name}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleEdit(dish)}
                    className="flex-1 py-2 rounded-xl bg-[#29251F] hover:bg-[#322E27] border border-[#3E3832] text-xs font-mono uppercase tracking-wider text-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleToggleAvailability(dish)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono uppercase tracking-wider transition-colors ${
                      dish.is_available
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
                        : 'bg-rose-950/40 text-rose-400 border-rose-800/40'
                    }`}
                  >
                    {dish.is_available ? 'In Stock' : 'Out'}
                  </button>

                  <button
                    onClick={() => setDeletingDishId(dish.id)}
                    className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Dish Editor Modal */}
      <DishEditorModal
        isOpen={isEditorOpen}
        initialData={editingDish}
        categories={categories}
        onClose={() => setIsEditorOpen(false)}
        onSaved={refreshDishes}
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={Boolean(deletingDishId)}
        title="Delete Repertoire Dish"
        message="Are you certain you wish to delete this dish from the database? This action is permanent and will remove it from the public website menu."
        confirmText="Permanently Delete"
        cancelText="Keep Dish"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingDishId(null)}
      />
    </div>
  );
}
