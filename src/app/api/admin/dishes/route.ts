import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/db';
import { getCurrentAdmin, hasPermission, logAudit } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.trim() || '';
  const categoryId = searchParams.get('categoryId') || '';
  const dietary = searchParams.get('dietary') || '';
  const status = searchParams.get('status') || '';
  const sort = searchParams.get('sort') || 'order';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '50', 10)));
  const offset = (page - 1) * limit;

  const db = getDb();

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (search) {
    conditions.push('(d.name LIKE ? OR d.bengali_name LIKE ? OR d.description LIKE ? OR d.hero_ingredients LIKE ?)');
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (categoryId) {
    conditions.push('d.category_id = ?');
    params.push(categoryId);
  }

  if (dietary) {
    conditions.push('d.dietary_tags LIKE ?');
    params.push(`%${dietary}%`);
  }

  if (status) {
    conditions.push('d.status = ?');
    params.push(status);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  let orderBy = 'd.display_order ASC, d.created_at DESC';
  if (sort === 'price_asc') orderBy = 'd.price ASC';
  else if (sort === 'price_desc') orderBy = 'd.price DESC';
  else if (sort === 'name') orderBy = 'd.name ASC';
  else if (sort === 'updated') orderBy = 'd.updated_at DESC';

  const countQuery = `
    SELECT COUNT(*) as total
    FROM dishes d
    ${whereClause}
  `;
  const total = (db.prepare(countQuery).get(...params) as { total: number }).total;

  const dataQuery = `
    SELECT 
      d.*,
      c.name as category_name,
      c.slug as category_slug
    FROM dishes d
    LEFT JOIN categories c ON d.category_id = c.id
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;
  const dishes = db.prepare(dataQuery).all(...params, limit, offset);

  return NextResponse.json({
    dishes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
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

    const db = getDb();

    // Verify category exists
    const category = db.prepare('SELECT id FROM categories WHERE id = ?').get(category_id);
    if (!category) {
      return NextResponse.json({ error: 'Specified category does not exist' }, { status: 400 });
    }

    const generatedSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const id = `dish_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO dishes (
        id, name, bengali_name, slug, category_id, description, price, portion_size,
        dietary_tags, spice_level, preparation_time, hero_ingredients, cooking_method,
        historical_context, chef_notes, image_url, image_alt, status, is_signature,
        is_available, display_order, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `).run(
      id,
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
      now
    );

    // Save gallery images if provided
    if (Array.isArray(gallery) && gallery.length > 0) {
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

    logAudit(currentAdmin.id, 'create', 'dishes', id, { name, price: parsedPrice });

    try {
      revalidatePath('/menu');
      revalidatePath('/');
    } catch (err) {
      console.warn('Revalidation notice:', err);
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error('Create dish error:', error);
    return NextResponse.json({ error: 'Internal server error creating dish' }, { status: 500 });
  }
}

