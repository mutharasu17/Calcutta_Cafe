import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/db';
import { getCurrentAdmin, hasPermission, logAudit } from '@/lib/auth';

export async function GET() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  const categories = db.prepare(`
    SELECT 
      c.id, 
      c.name, 
      c.bengali_name, 
      c.slug, 
      c.description, 
      c.display_order, 
      c.is_active, 
      c.created_at, 
      c.updated_at,
      COUNT(d.id) as dish_count
    FROM categories c
    LEFT JOIN dishes d ON c.id = d.category_id
    GROUP BY c.id
    ORDER BY c.display_order ASC
  `).all();

  return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(currentAdmin.role, ['super_admin', 'menu_manager'])) {
    return NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, bengali_name, slug, description, display_order, is_active } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const generatedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const db = getDb();

    // Check slug uniqueness
    const existing = db.prepare('SELECT id FROM categories WHERE slug = ?').get(generatedSlug);
    if (existing) {
      return NextResponse.json({ error: 'A category with this slug already exists' }, { status: 409 });
    }

    const id = `cat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO categories (id, name, bengali_name, slug, description, display_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      name.trim(),
      bengali_name?.trim() || null,
      generatedSlug,
      description?.trim() || null,
      typeof display_order === 'number' ? display_order : 0,
      is_active !== undefined ? (is_active ? 1 : 0) : 1,
      now,
      now
    );

    logAudit(currentAdmin.id, 'create', 'categories', id, { name, slug: generatedSlug });

    // On-demand revalidation
    try {
      revalidatePath('/menu');
      revalidatePath('/');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json({ error: 'Internal server error creating category' }, { status: 500 });
  }
}

