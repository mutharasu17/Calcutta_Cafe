import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/db';
import { getCurrentAdmin, hasPermission, logAudit } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  const dish = db.prepare(`
    SELECT 
      d.*,
      c.name as category_name,
      c.slug as category_slug
    FROM dishes d
    LEFT JOIN categories c ON d.category_id = c.id
    WHERE d.id = ?
  `).get(id) as Record<string, unknown> | undefined;

  if (!dish) {
    return NextResponse.json({ error: 'Dish not found' }, { status: 404 });
  }

  // Get gallery
  const gallery = db.prepare(`
    SELECT id, image_url, alt_text, display_order
    FROM dish_gallery
    WHERE dish_id = ?
    ORDER BY display_order ASC
  `).all(id);

  // Check if a recipe exists for this dish
  const recipe = db.prepare(`
    SELECT id, title, visibility, prep_time_mins, cook_time_mins, servings
    FROM recipes
    WHERE dish_id = ?
  `).get(id);

  return NextResponse.json({
    dish: {
      ...dish,
      gallery,
      recipe,
    },
  });
}

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
    const db = getDb();

    const existing = db.prepare('SELECT id, name FROM dishes WHERE id = ?').get(id);
    if (!existing) {
      return NextResponse.json({ error: 'Dish not found' }, { status: 404 });
    }

    const {
      name,
      bengali_name,
      slug,
      category_id,
      description,
      price,
      portion_size,
      dietary_tags,
      spice_level,
      preparation_time,
      hero_ingredients,
      cooking_method,
      historical_context,
      chef_notes,
      image_url,
      image_alt,
      status,
      is_signature,
      is_available,
      display_order,
      gallery,
    } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Dish name is required' }, { status: 400 });
    }

    if (!category_id) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: 'A valid non-negative price is required' }, { status: 400 });
    }

    const generatedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE dishes SET
        name = ?,
        bengali_name = ?,
        slug = ?,
        category_id = ?,
        description = ?,
        price = ?,
        portion_size = ?,
        dietary_tags = ?,
        spice_level = ?,
        preparation_time = ?,
        hero_ingredients = ?,
        cooking_method = ?,
        historical_context = ?,
        chef_notes = ?,
        image_url = ?,
        image_alt = ?,
        status = ?,
        is_signature = ?,
        is_available = ?,
        display_order = ?,
        updated_at = ?
      WHERE id = ?
    `).run(
      name.trim(),
      bengali_name?.trim() || null,
      generatedSlug,
      category_id,
      description?.trim() || null,
      parsedPrice,
      portion_size?.trim() || null,
      dietary_tags ? (Array.isArray(dietary_tags) ? dietary_tags.join(',') : dietary_tags.trim()) : 'Non-Veg',
      spice_level?.trim() || 'Mild',
      preparation_time?.trim() || '20-25 mins',
      hero_ingredients?.trim() || null,
      cooking_method?.trim() || null,
      historical_context?.trim() || null,
      chef_notes?.trim() || null,
      image_url?.trim() || null,
      image_alt?.trim() || name.trim(),
      status || 'published',
      is_signature ? 1 : 0,
      is_available !== undefined ? (is_available ? 1 : 0) : 1,
      typeof display_order === 'number' ? display_order : 0,
      now,
      id
    );

    // Update gallery if supplied
    if (Array.isArray(gallery)) {
      db.prepare('DELETE FROM dish_gallery WHERE dish_id = ?').run(id);
      const insertGallery = db.prepare(`
        INSERT INTO dish_gallery (id, dish_id, image_url, alt_text, display_order)
        VALUES (?, ?, ?, ?, ?)
      `);
      gallery.forEach((img, idx) => {
        if (img?.url) {
          const gId = `gal_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 5)}`;
          insertGallery.run(gId, id, img.url, img.alt || name.trim(), idx);
        }
      });
    }

    logAudit(currentAdmin.id, 'update', 'dishes', id, { name, price: parsedPrice });

    try {
      revalidatePath('/menu');
      revalidatePath('/');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update dish error:', error);
    return NextResponse.json({ error: 'Internal server error updating dish' }, { status: 500 });
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

  if (!hasPermission(currentAdmin.role, ['super_admin', 'menu_manager'])) {
    return NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const db = getDb();

    // Delete gallery & dish
    db.prepare('DELETE FROM dish_gallery WHERE dish_id = ?').run(id);
    const result = db.prepare('DELETE FROM dishes WHERE id = ?').run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Dish not found' }, { status: 404 });
    }

    logAudit(currentAdmin.id, 'delete', 'dishes', id);

    try {
      revalidatePath('/menu');
      revalidatePath('/');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete dish error:', error);
    return NextResponse.json({ error: 'Internal server error deleting dish' }, { status: 500 });
  }
}

