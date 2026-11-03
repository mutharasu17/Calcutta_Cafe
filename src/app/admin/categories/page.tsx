import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { getDb } from '@/lib/db';
import CategoryManagementClient from './CategoryManagementClient';

export default async function AdminCategoriesPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect('/admin/login');
  }

  const db = getDb();

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

  const categories = db.prepare(`
    SELECT 
      c.id, 
      c.name, 
      c.bengali_name, 
      c.slug, 
      c.description, 
      c.display_order, 
      c.is_active, 
      COUNT(d.id) as dish_count
    FROM categories c
    LEFT JOIN dishes d ON c.id = d.category_id
    GROUP BY c.id
    ORDER BY c.display_order ASC
  `).all() as CategoryRow[];

  return (
    <CategoryManagementClient
      currentUser={currentAdmin}
      initialCategories={categories}
    />
  );
}
