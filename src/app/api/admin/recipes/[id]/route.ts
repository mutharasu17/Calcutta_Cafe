import { NextRequest, NextResponse } from 'next/server';
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

  const recipe = db.prepare(`
    SELECT 
      r.*,
      d.name as dish_name,
      d.image_url as dish_image,
      c.name as category_name
    FROM recipes r
    LEFT JOIN dishes d ON r.dish_id = d.id
    LEFT JOIN categories c ON d.category_id = c.id
    WHERE r.id = ?
  `).get(id) as Record<string, unknown> | undefined;

  if (!recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }

  const ingredients = db.prepare(`
    SELECT id, name, quantity, unit, notes, display_order
    FROM recipe_ingredients
    WHERE recipe_id = ?
    ORDER BY display_order ASC
  `).all(id);

  const instructions = db.prepare(`
    SELECT id, step_number, instruction, tip
    FROM recipe_instructions
    WHERE recipe_id = ?
    ORDER BY step_number ASC
  `).all(id);

  return NextResponse.json({
    recipe: {
      ...recipe,
      ingredients,
      instructions,
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

  if (!hasPermission(currentAdmin.role, ['super_admin', 'menu_manager', 'content_manager'])) {
    return NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const db = getDb();

    const existing = db.prepare('SELECT id, title FROM recipes WHERE id = ?').get(id);
    if (!existing) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    const {
      dish_id,
      title,
      description,
      prep_time_mins,
      cook_time_mins,
      servings,
      secret_notes,
      visibility,
      ingredients,
      instructions,
    } = body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Recipe title is required' }, { status: 400 });
    }

    if (dish_id) {
      const dish = db.prepare('SELECT id FROM dishes WHERE id = ?').get(dish_id);
      if (!dish) {
        return NextResponse.json({ error: 'Associated dish does not exist' }, { status: 400 });
      }
    }

    const now = new Date().toISOString();
    const recipeVisibility = visibility === 'public' ? 'public' : 'internal';

    db.prepare(`
      UPDATE recipes SET
        dish_id = ?,
        title = ?,
        description = ?,
        prep_time_mins = ?,
        cook_time_mins = ?,
        servings = ?,
        secret_notes = ?,
        visibility = ?,
        updated_at = ?
      WHERE id = ?
    `).run(
      dish_id || null,
      title.trim(),
      description?.trim() || null,
      typeof prep_time_mins === 'number' ? prep_time_mins : null,
      typeof cook_time_mins === 'number' ? cook_time_mins : null,
      typeof servings === 'number' ? servings : null,
      secret_notes?.trim() || null,
      recipeVisibility,
      now,
      id
    );

    // Replace ingredients
    if (Array.isArray(ingredients)) {
      db.prepare('DELETE FROM recipe_ingredients WHERE recipe_id = ?').run(id);
      const insertIng = db.prepare(`
        INSERT INTO recipe_ingredients (id, recipe_id, name, quantity, unit, notes, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      ingredients.forEach((ing, idx) => {
        if (ing?.name) {
          const ingId = `ing_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 5)}`;
          insertIng.run(
            ingId,
            id,
            ing.name.trim(),
            ing.quantity?.toString() || null,
            ing.unit?.trim() || null,
            ing.notes?.trim() || null,
            idx
          );
        }
      });
    }

    // Replace instructions
    if (Array.isArray(instructions)) {
      db.prepare('DELETE FROM recipe_instructions WHERE recipe_id = ?').run(id);
      const insertInst = db.prepare(`
        INSERT INTO recipe_instructions (id, recipe_id, step_number, instruction, tip)
        VALUES (?, ?, ?, ?, ?)
      `);
      instructions.forEach((inst, idx) => {
        if (inst?.instruction) {
          const instId = `ins_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 5)}`;
          insertInst.run(
            instId,
            id,
            inst.step_number || idx + 1,
            inst.instruction.trim(),
            inst.tip?.trim() || null
          );
        }
      });
    }

    logAudit(currentAdmin.id, 'update', 'recipes', id, { title, visibility: recipeVisibility });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update recipe error:', error);
    return NextResponse.json({ error: 'Internal server error updating recipe' }, { status: 500 });
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
    return NextResponse.json({ error: 'Only Super Admin can delete recipes' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const db = getDb();

    db.prepare('DELETE FROM recipe_ingredients WHERE recipe_id = ?').run(id);
    db.prepare('DELETE FROM recipe_instructions WHERE recipe_id = ?').run(id);
    const result = db.prepare('DELETE FROM recipes WHERE id = ?').run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    logAudit(currentAdmin.id, 'delete', 'recipes', id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete recipe error:', error);
    return NextResponse.json({ error: 'Internal server error deleting recipe' }, { status: 500 });
  }
}

