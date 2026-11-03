'use client';

import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import CategoryEditorModal, { CategoryFormData } from '@/components/admin/CategoryEditorModal';
import { AdminUserSession } from '@/lib/auth';

interface CategoryRow {
  id: string;
  name: string;
  bengali_name: string | null;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: number;
  dish_count: number;
}

interface CategoryManagementClientProps {
  currentUser: AdminUserSession;
  initialCategories: CategoryRow[];
  onOpenSidebar?: () => void;
}

export default function CategoryManagementClient({
  currentUser,
  initialCategories,
  onOpenSidebar,
}: CategoryManagementClientProps) {
  const [categories, setCategories] = useState<CategoryRow[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryFormData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cat: CategoryRow) => {
    setEditingCategory({
      id: cat.id,
      name: cat.name,
      bengali_name: cat.bengali_name || '',
      slug: cat.slug,
      description: cat.description || '',
      display_order: cat.display_order,
      is_active: Boolean(cat.is_active),
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (cat: CategoryRow) => {
    if (cat.dish_count > 0) {
      setDeleteError(`Cannot delete category "${cat.name}" because it contains ${cat.dish_count} dishes. Reassign or delete those dishes first.`);
      return;
    }
    setDeleteError(null);
    setDeletingId(cat.id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/categories/${deletingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete category');
      }
      setCategories((prev) => prev.filter((c) => c.id !== deletingId));
      setDeletingId(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete error';
      setDeleteError(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#141210]">
      <AdminHeader
        title="Food Categories"
        subtitle="Menu hierarchy, display order and Bengali subheadings"
        onOpenSidebar={onOpenSidebar || (() => {})}
        userRole={currentUser.role}
      />

      <main className="p-4 sm:p-8 space-y-6 max-w-6xl w-full mx-auto">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-[#A69B8D]">
            <span>Total Categories: </span>
            <span className="font-bold text-[#D4AF37]">{categories.length}</span>
          </div>

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-[#5B1B8A] hover:bg-[#4B1473] text-[#FFF8ED] text-xs font-mono uppercase tracking-wider font-semibold rounded-xl shadow-lg flex items-center gap-1.5 transition-all border border-[#FFB834]/40"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Create Category</span>
          </button>
        </div>

        {/* Error notification */}
        {deleteError && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{deleteError}</span>
            </div>
            <button
              onClick={() => setDeleteError(null)}
              className="text-stone-400 hover:text-white text-xs font-mono"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between hover:border-[#C49A55]/30 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#29251F] border border-[#3E3832] text-[#D4AF37] flex items-center justify-center font-mono font-bold text-xs">
                      #{cat.display_order}
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#FFF8ED]">
                        {cat.name}
                      </h3>
                      {cat.bengali_name && (
                        <p className="text-xs font-bengali text-[#D4AF37]">
                          {cat.bengali_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#24201C] text-stone-300 border border-[#3E3832]">
                    {cat.dish_count} {cat.dish_count === 1 ? 'dish' : 'dishes'}
                  </span>
                </div>

                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {cat.description || 'No description set.'}
                </p>
              </div>

              <div className="pt-3 border-t border-[#2E2924] flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-500">
                  Slug: /{cat.slug}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-1.5 text-stone-400 hover:text-[#D4AF37] hover:bg-[#29251F] rounded-lg transition-colors"
                    title="Edit category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {currentUser.role === 'super_admin' && (
                    <button
                      onClick={() => handleDeleteClick(cat)}
                      className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CategoryEditorModal
        isOpen={isModalOpen}
        initialData={editingCategory}
        onClose={() => setIsModalOpen(false)}
        onSaved={() => {
          setIsModalOpen(false);
          window.location.reload();
        }}
      />

      <ConfirmationDialog
        isOpen={Boolean(deletingId)}
        title="Delete Food Category"
        message="Are you sure you want to delete this category? This will permanently remove the category."
        confirmText="Delete Category"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
