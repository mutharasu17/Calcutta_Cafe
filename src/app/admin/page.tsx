import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { getDb } from '@/lib/db';
import DashboardClient from './DashboardClient';

export default async function AdminDashboardPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect('/admin/login');
  }

  const db = getDb();

  // Metrics
  const totalDishes = (db.prepare('SELECT COUNT(*) as count FROM dishes').get() as { count: number }).count;
  const publishedDishes = (db.prepare("SELECT COUNT(*) as count FROM dishes WHERE status = 'published'").get() as { count: number }).count;
  const draftDishes = (db.prepare("SELECT COUNT(*) as count FROM dishes WHERE status = 'draft'").get() as { count: number }).count;
  const totalCategories = (db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number }).count;
  const totalRecipes = (db.prepare('SELECT COUNT(*) as count FROM recipes').get() as { count: number }).count;
  const internalRecipes = (db.prepare("SELECT COUNT(*) as count FROM recipes WHERE visibility = 'internal'").get() as { count: number }).count;

  const missingImages = (
    db.prepare(`
      SELECT COUNT(*) as count FROM dishes 
      WHERE image_url IS NULL 
         OR TRIM(image_url) = '' 
         OR image_url LIKE '%placeholder%' 
         OR image_url = 'none'
    `).get() as { count: number }
  ).count;

  // Recently updated dishes
  const recentlyUpdated = db.prepare(`
    SELECT d.id, d.name, d.price, d.status, d.image_url, d.updated_at, c.name as category_name
    FROM dishes d
    LEFT JOIN categories c ON d.category_id = c.id
    ORDER BY d.updated_at DESC
    LIMIT 6
  `).all() as Array<{
    id: string;
    name: string;
    price: number;
    status: string;
    image_url: string | null;
    updated_at: string;
    category_name: string | null;
  }>;

  // Categories breakdown
  const categoryStats = db.prepare(`
    SELECT c.id, c.name, c.slug, COUNT(d.id) as dish_count
    FROM categories c
    LEFT JOIN dishes d ON c.id = d.category_id
    GROUP BY c.id
    ORDER BY c.display_order ASC
  `).all() as Array<{
    id: string;
    name: string;
    slug: string;
    dish_count: number;
  }>;

  // Categories list for modal
  const categories = db.prepare(`
    SELECT id, name, slug FROM categories ORDER BY display_order ASC
  `).all() as Array<{ id: string; name: string; slug: string }>;

  // Recent audit
  const recentAudit = db.prepare(`
    SELECT a.id, a.action, a.target_type, a.target_id, a.created_at, u.name as admin_name, u.role as admin_role
    FROM audit_logs a
    LEFT JOIN admin_users u ON a.admin_id = u.id
    ORDER BY a.created_at DESC
    LIMIT 8
  `).all() as Array<{
    id: string;
    action: string;
    target_type: string;
    target_id: string | null;
    created_at: string;
    admin_name: string | null;
    admin_role: string | null;
  }>;

  return (
    <DashboardClient
      currentUser={currentAdmin}
      metrics={{
        totalDishes,
        publishedDishes,
        draftDishes,
        totalCategories,
        totalRecipes,
        internalRecipes,
        missingImages,
      }}
      recentlyUpdated={recentlyUpdated}
      categoryStats={categoryStats}
      recentAudit={recentAudit}
      categories={categories}
    />
  );
}

