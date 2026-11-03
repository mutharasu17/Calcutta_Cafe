'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Lock, Globe, AlertCircle, ChefHat } from 'lucide-react';

interface RecipeIngredient {
  id?: string;
  name: string;
  quantity?: string;
  unit?: string;
  notes?: string;
}

interface RecipeInstruction {
  id?: string;
  step_number: number;
  instruction: string;
  tip?: string;
}

export interface RecipeFormData {
  id?: string;
  dish_id?: string;
  title: string;
  description?: string;
  prep_time_mins?: number | '';
  cook_time_mins?: number | '';
  servings?: number | '';
  secret_notes?: string;
  visibility: 'internal' | 'public';
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
}

interface DishOption {
  id: string;
  name: string;
  category_name?: string;
}

interface RecipeEditorModalProps {
  isOpen: boolean;
  initialData?: RecipeFormData | null;
  dishes: DishOption[];
  onClose: () => void;
  onSaved: () => void;
}

const DEFAULT_RECIPE_FORM: RecipeFormData = {
  dish_id: '',
  title: '',
  description: '',
  prep_time_mins: 20,
  cook_time_mins: 40,
  servings: 4,
  secret_notes: '',
  visibility: 'internal',
  ingredients: [
    { name: '', quantity: '', unit: '', notes: '' }
  ],
  instructions: [
    { step_number: 1, instruction: '', tip: '' }
  ],
};

export default function RecipeEditorModal({
  isOpen,
  initialData,
  dishes,
  onClose,
  onSaved,
}: RecipeEditorModalProps) {
  const [formData, setFormData] = useState<RecipeFormData>(DEFAULT_RECIPE_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...DEFAULT_RECIPE_FORM,
        ...initialData,
        ingredients: initialData.ingredients?.length ? initialData.ingredients : [{ name: '', quantity: '', unit: '', notes: '' }],
        instructions: initialData.instructions?.length ? initialData.instructions : [{ step_number: 1, instruction: '', tip: '' }],
      });
    } else {
      setFormData(DEFAULT_RECIPE_FORM);
    }
    setErrorMsg(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof RecipeFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Ingredients operations
  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: '', notes: '' }],
    }));
  };

  const handleRemoveIngredient = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== idx),
    }));
  };

  const handleIngredientChange = (idx: number, field: keyof RecipeIngredient, value: string) => {
    setFormData((prev) => {
      const next = [...prev.ingredients];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, ingredients: next };
    });
  };

  // Instructions operations
  const handleAddInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { step_number: prev.instructions.length + 1, instruction: '', tip: '' },
      ],
    }));
  };

  const handleRemoveInstruction = (idx: number) => {
    setFormData((prev) => {
      const filtered = prev.instructions.filter((_, i) => i !== idx);
      // Re-number
      const renumbered = filtered.map((inst, i) => ({ ...inst, step_number: i + 1 }));
      return { ...prev, instructions: renumbered };
    });
  };

  const handleInstructionChange = (idx: number, field: keyof RecipeInstruction, value: string) => {
    setFormData((prev) => {
      const next = [...prev.instructions];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, instructions: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.title.trim()) {
      setErrorMsg('Recipe title is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const isEdit = Boolean(formData.id);
      const url = isEdit ? `/api/admin/recipes/${formData.id}` : '/api/admin/recipes';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        prep_time_mins: formData.prep_time_mins === '' ? null : Number(formData.prep_time_mins),
        cook_time_mins: formData.cook_time_mins === '' ? null : Number(formData.cook_time_mins),
        servings: formData.servings === '' ? null : Number(formData.servings),
        ingredients: formData.ingredients.filter((i) => i.name.trim() !== ''),
        instructions: formData.instructions.filter((i) => i.instruction.trim() !== ''),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save recipe');
      }

      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving recipe';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#24201C] border border-[#3E3832] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#3E3832] flex items-center justify-between bg-[#1D1A17]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#C49A55]/15 text-[#D4AF37] border border-[#C49A55]/30">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#FFF8ED]">
                {formData.id ? 'Edit Kitchen Recipe' : 'Add Kitchen Master Recipe'}
              </h2>
              <p className="text-xs text-[#A69B8D] font-mono mt-0.5">
                Standard operating formula and chef master instructions
              </p>
            </div>
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-[#FFF8ED]">
          <form id="recipe-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Visibility & Security Banner */}
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                formData.visibility === 'internal'
                  ? 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                  : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {formData.visibility === 'internal' ? (
                  <Lock className="w-5 h-5 text-rose-400 flex-shrink-0" />
                ) : (
                  <Globe className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                )}
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider font-bold">
                    {formData.visibility === 'internal'
                      ? 'Confidential Kitchen Property (Internal)'
                      : 'Public Master Recipe (Visible to Readers)'}
                  </p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {formData.visibility === 'internal'
                      ? 'Protected under kitchen IP. Only visible to verified kitchen managers and administrators.'
                      : 'Editorial feature recipe. Content can be read on the public website and blog.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#1A1815] p-1 rounded-lg border border-[#3E3832]">
                <button
                  type="button"
                  onClick={() => handleFieldChange('visibility', 'internal')}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
                    formData.visibility === 'internal'
                      ? 'bg-rose-900 text-white font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Internal Only
                </button>
                <button
                  type="button"
                  onClick={() => handleFieldChange('visibility', 'public')}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
                    formData.visibility === 'public'
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Public
                </button>
              </div>
            </div>

            {/* Core Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="e.g. Master Shorshe Ilish Secret Formulation"
                  className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                  Linked Menu Dish
                </label>
                <select
                  value={formData.dish_id || ''}
                  onChange={(e) => handleFieldChange('dish_id', e.target.value)}
                  className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                >
                  <option value="">No linked dish (Standalone Master Recipe)</option>
                  {dishes.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} {d.category_name ? `(${d.category_name})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                  Prep Time (Minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.prep_time_mins || ''}
                  onChange={(e) => handleFieldChange('prep_time_mins', e.target.value)}
                  placeholder="20"
                  className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                  Cook Time (Minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.cook_time_mins || ''}
                  onChange={(e) => handleFieldChange('cook_time_mins', e.target.value)}
                  placeholder="40"
                  className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                  Servings Yield
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.servings || ''}
                  onChange={(e) => handleFieldChange('servings', e.target.value)}
                  placeholder="4"
                  className="w-full bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                />
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="pt-2 border-t border-[#3E3832]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A69B8D] font-bold">
                  Standard Kitchen Ingredients ({formData.ingredients.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-3 py-1 bg-[#2E2924] hover:bg-[#C49A55]/20 text-[#D4AF37] border border-[#C49A55]/30 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Ingredient
                </button>
              </div>

              <div className="space-y-2">
                {formData.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Ingredient Name (e.g. Yellow Mustard Seeds)"
                      value={ing.name}
                      onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                      className="flex-3 bg-[#1A1815] border border-[#3E3832] rounded-lg px-3 py-1.5 text-xs text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Qty (e.g. 50)"
                      value={ing.quantity || ''}
                      onChange={(e) => handleIngredientChange(idx, 'quantity', e.target.value)}
                      className="flex-1 bg-[#1A1815] border border-[#3E3832] rounded-lg px-3 py-1.5 text-xs text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Unit (g, tsp)"
                      value={ing.unit || ''}
                      onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
                      className="flex-1 bg-[#1A1815] border border-[#3E3832] rounded-lg px-3 py-1.5 text-xs text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Notes (e.g. fresh ground)"
                      value={ing.notes || ''}
                      onChange={(e) => handleIngredientChange(idx, 'notes', e.target.value)}
                      className="flex-2 bg-[#1A1815] border border-[#3E3832] rounded-lg px-3 py-1.5 text-xs text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      disabled={formData.ingredients.length === 1}
                      className="p-1.5 text-stone-500 hover:text-rose-400 disabled:opacity-20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="pt-2 border-t border-[#3E3832]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A69B8D] font-bold">
                  Step-by-Step Cooking Steps ({formData.instructions.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddInstruction}
                  className="px-3 py-1 bg-[#2E2924] hover:bg-[#C49A55]/20 text-[#D4AF37] border border-[#C49A55]/30 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Step
                </button>
              </div>

              <div className="space-y-3">
                {formData.instructions.map((inst, idx) => (
                  <div key={idx} className="p-3 bg-[#1A1815] border border-[#3E3832] rounded-xl flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#5B1B8A] text-[#FFF8ED] border border-[#FFB834]/40 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-1">
                      {idx + 1}
                    </span>
                    <div className="flex-1 space-y-2">
                      <textarea
                        rows={2}
                        placeholder={`Instruction for step ${idx + 1}...`}
                        value={inst.instruction}
                        onChange={(e) => handleInstructionChange(idx, 'instruction', e.target.value)}
                        className="w-full bg-[#24201C] border border-[#3E3832] rounded-lg p-2.5 text-xs text-[#FFF8ED] focus:border-[#C49A55] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Chef's Tip / Warning for this step (optional)"
                        value={inst.tip || ''}
                        onChange={(e) => handleInstructionChange(idx, 'tip', e.target.value)}
                        className="w-full bg-[#24201C] border border-[#3E3832] rounded-lg px-2.5 py-1.5 text-xs text-amber-300 placeholder:text-stone-600 focus:border-[#C49A55] focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(idx)}
                      disabled={formData.instructions.length === 1}
                      className="p-1.5 text-stone-500 hover:text-rose-400 disabled:opacity-20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Secret Notes / Formulation Key */}
            <div className="pt-2 border-t border-[#3E3832]">
              <label className="block text-xs font-mono uppercase tracking-wider text-rose-400 mb-1.5 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Secret Notes & Kitchen Warnings (Strictly Confidential)
              </label>
              <textarea
                rows={2}
                value={formData.secret_notes || ''}
                onChange={(e) => handleFieldChange('secret_notes', e.target.value)}
                placeholder="Specific supplier notes, oil temperature thresholds, batch ratios..."
                className="w-full bg-[#1A1815] border border-rose-950/60 rounded-lg p-3 text-xs text-rose-200 focus:border-rose-700 focus:outline-none leading-relaxed"
              />
            </div>
          </form>
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
            form="recipe-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#5B1B8A] hover:bg-[#4B1473] text-[#FFF8ED] text-xs font-mono uppercase tracking-wider font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all disabled:opacity-50 border border-[#FFB834]/40"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {formData.id ? 'Save Recipe' : 'Create Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
}

