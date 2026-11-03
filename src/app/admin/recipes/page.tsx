import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { getDb } from '@/lib/db';
import RecipeManagementClient from './RecipeManagementClient';

export default async function AdminRecipesPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect('/admin/login');
  }

  const db = getDb();

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

  const recipes = db.prepare(`
    SELECT 
      r.id,
      r.dish_id,
      r.title,
      r.description,
      r.prep_time_mins,
      r.cook_time_mins,
      r.servings,
      r.visibility,
      r.created_at,
      r.updated_at,
      d.name as dish_name,
      c.name as category_name,
      (SELECT COUNT(*) FROM recipe_ingredients ri WHERE ri.recipe_id = r.id) as ingredient_count,
      (SELECT COUNT(*) FROM recipe_instructions rin WHERE rin.recipe_id = r.id) as instruction_count
    FROM recipes r
    LEFT JOIN dishes d ON r.dish_id = d.id
    LEFT JOIN categories c ON d.category_id = c.id
    ORDER BY r.updated_at DESC
  `).all() as RecipeRow[];

  const dishes = db.prepare(`
    SELECT d.id, d.name, c.name as category_name
    FROM dishes d
    LEFT JOIN categories c ON d.category_id = c.id
    ORDER BY d.name ASC
  `).all() as Array<{ id: string; name: string; category_name?: string }>;

  return (
    <RecipeManagementClient
      currentUser={currentAdmin}
      initialRecipes={recipes}
      dishes={dishes}
    />
  );
}
