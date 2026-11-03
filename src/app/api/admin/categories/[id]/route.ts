import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/db';
import { getCurrentAdmin, hasPermission, logAudit } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(currentAdmin.role, ['super_admin', 'menu_manager'])) {
    return NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { name, bengali_name, slug, description, display_order, is_active } = body;

    const db = getDb();
    const existing = db.prepare('SELECT id, name FROM categories WHERE id = ?').get(id);
    if (!existing) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const generatedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check slug collision with other categories
    const slugCollision = db
      .prepare('SELECT id FROM categories WHERE slug = ? AND id != ?')
      .get(generatedSlug, id);
    if (slugCollision) {
      return NextResponse.json({ error: 'Another category has this slug' }, { status: 409 });
    }

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE categories
      SET name = ?, bengali_name = ?, slug = ?, description = ?, display_order = ?, is_active = ?, updated_at = ?
      WHERE id = ?
    `).run(
      name.trim(),
      bengali_name?.trim() || null,
      generatedSlug,
      description?.trim() || null,
      typeof display_order === 'number' ? display_order : 0,
      is_active !== undefined ? (is_active ? 1 : 0) : 1,
      now,
      id
    );

    logAudit(currentAdmin.id, 'update', 'categories', id, { name, slug: generatedSlug });

    try {
      revalidatePath('/menu');
      revalidatePath('/');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json({ error: 'Internal server error updating category' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(currentAdmin.role, ['super_admin'])) {
    return NextResponse.json({ error: 'Only Super Admin can delete categories' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const db = getDb();

    // Check if category has dishes
    const dishCount = (
      db.prepare('SELECT COUNT(*) as count FROM dishes WHERE category_id = ?').get(id) as { count: number }
    ).count;

    if (dishCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category: it has ${dishCount} assigned dishes. Reassign or delete them first.` },
        { status: 400 }
      );
    }

    const result = db.prepare('DELETE FROM categories WHERE id = ?').run(id);
    if (result.changes === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    logAudit(currentAdmin.id, 'delete', 'categories', id);

    try {
      revalidatePath('/menu');
      revalidatePath('/');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json({ error: 'Internal server error deleting category' }, { status: 500 });
  }
}

