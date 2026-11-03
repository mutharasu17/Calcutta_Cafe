import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { getDb } from '@/lib/db';
import MenuManagementClient from './MenuManagementClient';

export default async function AdminMenuPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect('/admin/login');
  }

  const db = getDb();

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

  const dishes = db.prepare(`
    SELECT 
      d.*,
      c.name as category_name
    FROM dishes d
    LEFT JOIN categories c ON d.category_id = c.id
    ORDER BY d.display_order ASC, d.created_at DESC
  `).all() as DishRow[];

  const categories = db.prepare(`
    SELECT id, name, slug FROM categories ORDER BY display_order ASC
  `).all() as Array<{ id: string; name: string; slug: string }>;

  return (
    <MenuManagementClient
      currentUser={currentAdmin}
      initialDishes={dishes}
      categories={categories}
    />
  );
}
