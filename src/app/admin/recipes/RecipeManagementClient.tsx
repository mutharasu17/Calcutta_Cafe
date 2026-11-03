'use client';

import React, { useState, useMemo } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Lock,
  Search,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import RecipeEditorModal, { RecipeFormData } from '@/components/admin/RecipeEditorModal';
import { AdminUserSession } from '@/lib/auth';

interface RecipeRow {
  id: string;
  dish_id: string | null;
  dish_name: string | null;
  category_name: string | null;
  title: string;
  description: string | null;
  prep_time_mins: number | null;
  cook_time_mins: number | null;
  servings: number | null;
  visibility: 'internal' | 'public';
  created_at: string;
  updated_at: string;
  ingredient_count: number;
  instruction_count: number;
}

interface DishOption {
  id: string;
  name: string;
  category_name?: string;
}

interface RecipeManagementClientProps {
  currentUser: AdminUserSession;
  initialRecipes: RecipeRow[];
  dishes: DishOption[];
  onOpenSidebar?: () => void;
}

export default function RecipeManagementClient({
  currentUser,
  initialRecipes,
  dishes,
  onOpenSidebar,
}: RecipeManagementClientProps) {
  const [recipes, setRecipes] = useState<RecipeRow[]>(initialRecipes);
  const [search, setSearch] = useState('');
  const [filterVisibility, setFilterVisibility] = useState<'all' | 'internal' | 'public'>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<RecipeFormData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchDish = r.dish_name?.toLowerCase().includes(q);
        if (!matchTitle && !matchDish) return false;
      }
      if (filterVisibility !== 'all' && r.visibility !== filterVisibility) {
        return false;
      }
      return true;
    });
  }, [recipes, search, filterVisibility]);

  const handleCreate = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const handleEdit = async (recipe: RecipeRow) => {
    try {
      const res = await fetch(`/api/admin/recipes/${recipe.id}`);
      const data = await res.json();
      if (data.recipe) {
        setEditingRecipe(data.recipe);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to load recipe details:', err);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/recipes/${deletingId}`, { method: 'DELETE' });
      if (res.ok) {
        setRecipes((prev) => prev.filter((r) => r.id !== deletingId));
        setDeletingId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#141210]">
      <AdminHeader
        title="Kitchen Master Recipes"
        subtitle="Standard operating procedures, formulas, and confidential heritage recipes"
        onOpenSidebar={onOpenSidebar || (() => {})}
        userRole={currentUser.role}
      />

      <main className="p-4 sm:p-8 space-y-6 max-w-6xl w-full mx-auto">
        {/* Security Alert Header */}
        <div className="bg-rose-950/30 border border-rose-800/50 rounded-2xl p-4 flex items-center gap-3.5 text-rose-200">
          <Lock className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <div className="text-xs space-y-0.5">
            <p className="font-mono uppercase font-bold tracking-wider">
              Confidentiality & Kitchen IP Protection
            </p>
            <p className="text-stone-400">
              Internal recipes are encrypted in the local database and never exposed to the public frontend or search engines.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes by title or dish..."
              className="w-full bg-[#1A1815] border border-[#3E3832] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#FFF8ED] placeholder:text-stone-600 focus:outline-none focus:border-[#C49A55]"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#1A1815] border border-[#3E3832] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFilterVisibility('all')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors ${
                  filterVisibility === 'all'
                    ? 'bg-[#8E171D] text-white font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterVisibility('internal')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors ${
                  filterVisibility === 'internal'
                    ? 'bg-[#8E171D] text-white font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Internal
              </button>
              <button
                type="button"
                onClick={() => setFilterVisibility('public')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors ${
                  filterVisibility === 'public'
                    ? 'bg-[#8E171D] text-white font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Public
              </button>
            </div>

            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-[#8E171D] hover:bg-[#A31C23] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xl shadow-lg flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Recipe</span>
            </button>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-stone-500 font-mono text-xs">
              No recipes found matching current filters.
            </div>
          ) : (
            filtered.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#C49A55]/30 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#FFF8ED]">
                        {recipe.title}
                      </h3>
                      {recipe.dish_name && (
                        <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                          Linked to: {recipe.dish_name}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={recipe.visibility} size="sm" />
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {recipe.description || 'Master kitchen formulation specification.'}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#24201C] border border-[#3E3832] text-center text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase">Prep/Cook</span>
                    <span className="text-stone-300 font-bold">
                      {recipe.prep_time_mins || 0}+{recipe.cook_time_mins || 0}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase">Ingredients</span>
                    <span className="text-[#D4AF37] font-bold">
                      {recipe.ingredient_count} items
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase">Steps</span>
                    <span className="text-emerald-400 font-bold">
                      {recipe.instruction_count} steps
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2E2924] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-500">
                    Updated {new Date(recipe.updated_at).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(recipe)}
                      className="p-1.5 text-stone-400 hover:text-[#D4AF37] hover:bg-[#29251F] rounded-lg transition-colors"
                      title="Edit recipe formula"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {currentUser.role === 'super_admin' && (
                      <button
                        onClick={() => setDeletingId(recipe.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                        title="Delete recipe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <RecipeEditorModal
        isOpen={isModalOpen}
        initialData={editingRecipe}
        dishes={dishes}
        onClose={() => setIsModalOpen(false)}
        onSaved={() => {
          setIsModalOpen(false);
          window.location.reload();
        }}
      />

      <ConfirmationDialog
        isOpen={Boolean(deletingId)}
        title="Delete Kitchen Recipe"
        message="Are you sure you want to permanently delete this master formulation from the system?"
        confirmText="Delete Formula"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
