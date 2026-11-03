'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, Eye, Save, AlertCircle, Flame } from 'lucide-react';
import ImageUploader from './ImageUploader';

export interface DishFormData {
  id?: string;
  name: string;
  bengali_name: string;
  slug: string;
  category_id: string;
  description: string;
  price: number | string;
  portion_size: string;
  dietary_tags: string;
  spice_level: string;
  preparation_time: string;
  hero_ingredients: string;
  cooking_method: string;
  historical_context: string;
  chef_notes: string;
  image_url: string;
  image_alt: string;
  status: 'published' | 'draft' | 'archived';
  is_signature: boolean;
  is_available: boolean;
  display_order: number;
}

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface DishEditorModalProps {
  isOpen: boolean;
  initialData?: DishFormData | null;
  categories: CategoryOption[];
  onClose: () => void;
  onSaved: () => void;
}

const DEFAULT_FORM: DishFormData = {
  name: '',
  bengali_name: '',
  slug: '',
  category_id: '',
  description: '',
  price: '',
  portion_size: 'Serves 1-2',
  dietary_tags: 'Non-Veg',
  spice_level: 'Medium',
  preparation_time: '20-25 mins',
  hero_ingredients: '',
  cooking_method: '',
  historical_context: '',
  chef_notes: '',
  image_url: '',
  image_alt: '',
  status: 'published',
  is_signature: false,
  is_available: true,
  display_order: 0,
};

export default function DishEditorModal({
  isOpen,
  initialData,
  categories,
  onClose,
  onSaved,
}: DishEditorModalProps) {
  const [formData, setFormData] = useState<DishFormData>(DEFAULT_FORM);
  const [activeTab, setActiveTab] = useState<'details' | 'preview'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...DEFAULT_FORM,
        ...initialData,
        is_signature: Boolean(initialData.is_signature),
        is_available: initialData.is_available !== undefined ? Boolean(initialData.is_available) : true,
      });
    } else {
      setFormData({
        ...DEFAULT_FORM,
        category_id: categories[0]?.id || '',
      });
    }
    setErrorMsg(null);
  }, [initialData, categories, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof DishFormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-generate slug and image_alt if name changes and we are creating new
      if (field === 'name' && typeof value === 'string' && !initialData) {
        next.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        if (!next.image_alt) {
          next.image_alt = value;
        }
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg('Dish name is required.');
      return;
    }
    if (!formData.category_id) {
      setErrorMsg('Please select a category.');
      return;
    }
    if (formData.price === '' || isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      setErrorMsg('Please enter a valid non-negative price.');
      return;
    }

    try {
      setIsSubmitting(true);
      const isEdit = Boolean(formData.id);
      const url = isEdit ? `/api/admin/dishes/${formData.id}` : '/api/admin/dishes';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save dish');
      }

      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving dish';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find((c) => c.id === formData.category_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#24201C] border border-[#3E3832] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#3E3832] flex items-center justify-between bg-[#1D1A17]">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#FFF8ED]">
              {formData.id ? 'Edit Dish & Heritage Repertoire' : 'Add New Dish to Repertoire'}
            </h2>
            <p className="text-xs text-[#A69B8D] font-mono mt-0.5">
              Comprehensive 20-field culinary and publishing specification
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'details' ? 'preview' : 'details')}
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg border border-[#C49A55]/40 text-[#D4AF37] hover:bg-[#C49A55]/10 flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {activeTab === 'details' ? 'Preview Card' : 'Back to Form'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 text-[#FFF8ED]">
          {activeTab === 'preview' ? (
            /* Live Public Preview Card */
            <div className="flex flex-col items-center justify-center py-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-4">
                Public Feast Preview Rendering
              </span>

              <div className="w-full max-w-sm bg-[#1E1B18] border border-[#3E3832] rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                  {formData.image_url ? (
                    <Image
                      src={formData.image_url}
                      alt={formData.image_alt || formData.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-600 font-mono text-xs">
                      No Image Set
                    </div>
                  )}
                  {formData.is_signature && (
                    <span className="absolute top-3 left-3 bg-[#8E171D] text-white text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Chef&apos;s Signature
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-[#D4AF37] font-serif font-bold text-base px-3 py-1 rounded-lg border border-[#C49A55]/30">
                    ₹{formData.price || 0}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[#A69B8D] mb-1">
                    <span className="font-mono uppercase">{selectedCategory?.name || 'Category'}</span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Flame className="w-3 h-3" /> {formData.spice_level}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#FFF8ED] mb-0.5">
                    {formData.name || 'Dish Name'}
                  </h3>
                  {formData.bengali_name && (
                    <p className="text-sm font-bengali text-[#D4AF37] mb-2 font-medium">
                      {formData.bengali_name}
                    </p>
                  )}

                  <p className="text-xs text-stone-300 line-clamp-2 mb-4 leading-relaxed">
                    {formData.description || 'Description will appear here on the public menu.'}
                  </p>

                  <div className="pt-3 border-t border-[#3E3832] flex items-center justify-between text-xs font-mono text-[#A69B8D]">
                    <span>{formData.portion_size}</span>
                    <span>{formData.preparation_time}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-column Form */
            <form id="dish-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Core Identity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Dish Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Shorshe Ilish"
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Bengali Name (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.bengali_name}
                    onChange={(e) => handleChange('bengali_name', e.target.value)}
                    placeholder="e.g. সর্ষে ইলিশ"
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
                    placeholder="e.g. shorshe-ilish"
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm font-mono text-stone-300 focus:border-[#C49A55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Category *
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => handleChange('category_id', e.target.value)}
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section 2: Pricing & Portions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="495"
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm font-bold text-[#D4AF37] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Portion Size
                  </label>
                  <input
                    type="text"
                    value={formData.portion_size}
                    onChange={(e) => handleChange('portion_size', e.target.value)}
                    placeholder="Serves 1-2 (2 pcs)"
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    value={formData.preparation_time}
                    onChange={(e) => handleChange('preparation_time', e.target.value)}
                    placeholder="20-25 mins"
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 3: Culinary Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Dietary Classification
                  </label>
                  <select
                    value={formData.dietary_tags}
                    onChange={(e) => handleChange('dietary_tags', e.target.value)}
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  >
                    <option value="Non-Veg">Non-Veg (মাছ / মাংস)</option>
                    <option value="Veg">Vegetarian (নিরামিষ)</option>
                    <option value="Egg">Egg</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Spice Level
                  </label>
                  <select
                    value={formData.spice_level}
                    onChange={(e) => handleChange('spice_level', e.target.value)}
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  >
                    <option value="Mild">Mild (মৃদু)</option>
                    <option value="Medium">Medium (মাঝারি)</option>
                    <option value="High">High / Jhaal (ঝাল)</option>
                  </select>
                </div>
              </div>

              {/* Section 4: Ingredients & Cooking Technique */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Hero Ingredients
                  </label>
                  <input
                    type="text"
                    value={formData.hero_ingredients}
                    onChange={(e) => handleChange('hero_ingredients', e.target.value)}
                    placeholder="Fresh Hilsa, Yellow Mustard, Green Chillies"
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Cooking Method
                  </label>
                  <input
                    type="text"
                    value={formData.cooking_method}
                    onChange={(e) => handleChange('cooking_method', e.target.value)}
                    placeholder="Mustard paste simmered with virgin mustard oil"
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 5: Editorial Descriptions */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                  Customer Description (Menu Card)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="The classic Bengali delicacy—Hilsa simmered in traditional mustard paste..."
                  className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg p-3 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Historical Context & Heritage
                  </label>
                  <textarea
                    rows={2}
                    value={formData.historical_context}
                    onChange={(e) => handleChange('historical_context', e.target.value)}
                    placeholder="East Bengal Padma river tradition documented since 19th century..."
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg p-3 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Chef&apos;s Notes / Secret Pairing
                  </label>
                  <textarea
                    rows={2}
                    value={formData.chef_notes}
                    onChange={(e) => handleChange('chef_notes', e.target.value)}
                    placeholder="Best savoured with steaming hot Gobindobhog rice and extra green chillies."
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg p-3 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 6: Media & Imagery */}
              <div className="space-y-3 pt-2 border-t border-[#3E3832]">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] font-semibold">
                  Dish Photography
                </label>
                <ImageUploader
                  value={formData.image_url}
                  onChange={(url) => handleChange('image_url', url)}
                  altText={formData.name}
                />
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1 font-semibold">
                    Image Alt Text (SEO & Accessibility)
                  </label>
                  <input
                    type="text"
                    value={formData.image_alt}
                    onChange={(e) => handleChange('image_alt', e.target.value)}
                    placeholder="Plate of authentic Shorshe Ilish with green chillies"
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 7: Publishing & Status */}
              <div className="pt-2 border-t border-[#3E3832] grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                    Publishing Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleChange('status', e.target.value as DishFormData['status'])
                    }
                    className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3 py-2 text-xs text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

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

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="is_signature"
                    checked={formData.is_signature}
                    onChange={(e) => handleChange('is_signature', e.target.checked)}
                    className="w-4 h-4 rounded border-[#3E3832] text-[#8E171D] focus:ring-[#8E171D] bg-[#1A1815]"
                  />
                  <label htmlFor="is_signature" className="text-xs font-medium text-stone-200 cursor-pointer">
                    Chef&apos;s Signature
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="is_available"
                    checked={formData.is_available}
                    onChange={(e) => handleChange('is_available', e.target.checked)}
                    className="w-4 h-4 rounded border-[#3E3832] text-[#8E171D] focus:ring-[#8E171D] bg-[#1A1815]"
                  />
                  <label htmlFor="is_available" className="text-xs font-medium text-stone-200 cursor-pointer">
                    Available in Kitchen
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

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
            form="dish-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#8E171D] hover:bg-[#A31C23] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {formData.id ? 'Save Changes' : 'Create Dish'}
          </button>
        </div>
      </div>
    </div>
  );
}
