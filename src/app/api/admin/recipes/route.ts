import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentAdmin, hasPermission, logAudit } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const visibility = searchParams.get('visibility');
  const search = searchParams.get('search')?.trim();

  const db = getDb();
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (visibility) {
    conditions.push('r.visibility = ?');
    params.push(visibility);
  }

  if (search) {
    conditions.push('(r.title LIKE ? OR d.name LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
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
    ${whereClause}
    ORDER BY r.updated_at DESC
  `;

  const recipes = db.prepare(query).all(...params);
  return NextResponse.json({ recipes });
}

export async function POST(req: NextRequest) {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(currentAdmin.role, ['super_admin', 'menu_manager', 'content_manager'])) {
    return NextResponse.json({ error: 'Forbidden: insufficient permissions' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      dish_id,
      title,
      description,
      prep_time_mins,
      cook_time_mins,
      servings,
      secret_notes,
      visibility, // 'internal' | 'public'
      ingredients, // array of { name, quantity, unit, notes }
      instructions, // array of { step_number, instruction, tip }
    } = body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Recipe title is required' }, { status: 400 });
    }

    const db = getDb();

    // If dish_id is provided, verify it exists
    if (dish_id) {
      const dish = db.prepare('SELECT id FROM dishes WHERE id = ?').get(dish_id);
      if (!dish) {
        return NextResponse.json({ error: 'Associated dish does not exist' }, { status: 400 });
      }
    }

    const id = `rec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();
    const recipeVisibility = visibility === 'public' ? 'public' : 'internal';

    db.prepare(`
      INSERT INTO recipes (
        id, dish_id, title, description, prep_time_mins, cook_time_mins,
        servings, secret_notes, visibility, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      dish_id || null,
      title.trim(),
      description?.trim() || null,
      typeof prep_time_mins === 'number' ? prep_time_mins : null,
      typeof cook_time_mins === 'number' ? cook_time_mins : null,
      typeof servings === 'number' ? servings : null,
      secret_notes?.trim() || null,
      recipeVisibility,
      now,
      now
    );

    // Save ingredients
    if (Array.isArray(ingredients)) {
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

    // Save instructions
    if (Array.isArray(instructions)) {
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

    logAudit(currentAdmin.id, 'create', 'recipes', id, { title, visibility: recipeVisibility });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error('Create recipe error:', error);
    return NextResponse.json({ error: 'Internal server error creating recipe' }, { status: 500 });
  }
}

