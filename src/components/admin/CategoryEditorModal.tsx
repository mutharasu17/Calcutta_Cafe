'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

export interface CategoryFormData {
  id?: string;
  name: string;
  bengali_name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface CategoryEditorModalProps {
  isOpen: boolean;
  initialData?: CategoryFormData | null;
  onClose: () => void;
  onSaved: () => void;
}

const DEFAULT_CATEGORY_FORM: CategoryFormData = {
  name: '',
  bengali_name: '',
  slug: '',
  description: '',
  display_order: 0,
  is_active: true,
};

export default function CategoryEditorModal({
  isOpen,
  initialData,
  onClose,
  onSaved,
}: CategoryEditorModalProps) {
  const [formData, setFormData] = useState<CategoryFormData>(DEFAULT_CATEGORY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...DEFAULT_CATEGORY_FORM,
        ...initialData,
        is_active: initialData.is_active !== undefined ? Boolean(initialData.is_active) : true,
      });
    } else {
      setFormData(DEFAULT_CATEGORY_FORM);
    }
    setErrorMsg(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof CategoryFormData, value: string | number | boolean) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'name' && typeof value === 'string' && !initialData) {
        next.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg('Category name is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const isEdit = Boolean(formData.id);
      const url = isEdit ? `/api/admin/categories/${formData.id}` : '/api/admin/categories';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save category');
      }

      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving category';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#24201C] border border-[#3E3832] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#3E3832] flex items-center justify-between bg-[#1D1A17]">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#FFF8ED]">
              {formData.id ? 'Edit Category' : 'Create Food Category'}
            </h2>
            <p className="text-xs text-[#A69B8D] font-mono mt-0.5">
              Menu hierarchy and culinary grouping
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form id="category-form" onSubmit={handleSubmit} className="p-6 space-y-4 text-[#FFF8ED]">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
              Category Name (English) *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Fish & Seafood"
              className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
              Bengali Subtitle (বাংলা)
            </label>
            <input
              type="text"
              value={formData.bengali_name}
              onChange={(e) => handleChange('bengali_name', e.target.value)}
              placeholder="e.g. মাছ ও সামুদ্রিক স্বাদ"
              className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm font-bengali text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder="e.g. fish-seafood"
              className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm font-mono text-stone-300 focus:border-[#C49A55] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
              Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="The soul of Bengal's waterways—fresh Hilsa, Bhetki, and Rui..."
              className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg p-3 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center pt-2">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                Display Order
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => handleChange('display_order', parseInt(e.target.value, 10) || 0)}
                className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3 py-2 text-xs text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="cat_is_active"
                checked={formData.is_active}
                onChange={(e) => handleChange('is_active', e.target.checked)}
                className="w-4 h-4 rounded border-[#3E3832] text-[#5B1B8A] focus:ring-[#5B1B8A] bg-[#1A1815]"
              />
              <label htmlFor="cat_is_active" className="text-xs font-medium text-stone-200 cursor-pointer">
                Active on Public Menu
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#3E3832] bg-[#1D1A17] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="category-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#5B1B8A] hover:bg-[#4B1473] text-[#FFF8ED] text-xs font-mono uppercase tracking-wider font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all disabled:opacity-50 border border-[#FFB834]/40"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {formData.id ? 'Save Category' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );
}

