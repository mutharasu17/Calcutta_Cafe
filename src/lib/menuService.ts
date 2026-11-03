import { getDb } from './db';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem, CategoryInfo, MenuCategory } from '@/data/menuData';

/**
 * Fetch published categories from SQLite database with fallback to static menuData
 */
export function getPublicCategories(): CategoryInfo[] {
  try {
    const db = getDb();
    const rows = db.prepare(`
      SELECT id, name, bengali_name, slug, description
      FROM categories
      WHERE is_active = 1
      ORDER BY display_order ASC
    `).all() as Array<{
      id: string;
      name: string;
      bengali_name: string | null;
      slug: string;
      description: string | null;
    }>;

    if (!rows || rows.length === 0) {
      return MENU_CATEGORIES;
    }

    return rows.map((cat) => {
      // Find matching fallback image if available
      const staticMatch = MENU_CATEGORIES.find((c) => c.id === cat.slug || c.name.toLowerCase() === cat.name.toLowerCase());
      return {
        id: (cat.slug as MenuCategory) || 'fish-seafood',
        name: cat.name,
        bengaliSubtitle: cat.bengali_name || staticMatch?.bengaliSubtitle || '',
        description: cat.description || staticMatch?.description || '',
        image: staticMatch?.image || '/images/hero-bengali-bhoj.jpg',
      };
    });
  } catch (error) {
    console.warn('Failed to query public categories from DB, using fallback:', error);
    return MENU_CATEGORIES;
  }
}

/**
 * Fetch published menu items from SQLite database with fallback to static menuData
 */
export function getPublicMenuItems(): MenuItem[] {
  try {
    const db = getDb();
    const rows = db.prepare(`
      SELECT 
        d.id,
        d.name,
        d.bengali_name,
        d.slug,
        d.description,
        d.price,
        d.portion_size,
        d.dietary_tags,
        d.spice_level,
        d.preparation_time,
        d.hero_ingredients,
        d.cooking_method,
        d.image_url,
        d.image_alt,
        d.is_signature,
        c.slug as category_slug,
        c.name as category_name
      FROM dishes d
      LEFT JOIN categories c ON d.category_id = c.id
      WHERE d.status = 'published' AND d.is_available = 1
      ORDER BY d.display_order ASC, d.created_at ASC
    `).all() as Array<{
      id: string;
      name: string;
      bengali_name: string | null;
      slug: string;
      description: string | null;
      price: number;
      portion_size: string | null;
      dietary_tags: string | null;
      spice_level: string | null;
      preparation_time: string | null;
      hero_ingredients: string | null;
      cooking_method: string | null;
      image_url: string | null;
      image_alt: string | null;
      is_signature: number;
      category_slug: string | null;
      category_name: string | null;
    }>;

    if (!rows || rows.length === 0) {
      return MENU_ITEMS;
    }

    return rows.map((dish) => {
      // Map dietary
      const rawDietary = (dish.dietary_tags || '').toLowerCase();
      const isVeg = rawDietary.includes('veg') && !rawDietary.includes('non');
      const dietary: 'veg' | 'non-veg' = isVeg ? 'veg' : 'non-veg';

      // Map spice level
      const rawSpice = (dish.spice_level || '').toLowerCase();
      let spiceLevel: 'mild' | 'medium' | 'high' = 'medium';
      if (rawSpice.includes('mild')) spiceLevel = 'mild';
      else if (rawSpice.includes('high') || rawSpice.includes('hot')) spiceLevel = 'high';

      // Parse tags
      const tags: string[] = [];
      if (dish.is_signature) tags.push('Signature');
      if (dish.hero_ingredients) {
        dish.hero_ingredients.split(',').forEach((t) => tags.push(t.trim()));
      }

      // Map category
      const categorySlug = (dish.category_slug || 'fish-seafood') as MenuCategory;

      return {
        id: dish.slug || dish.id,
        name: dish.name,
        bengaliName: dish.bengali_name || undefined,
        category: categorySlug,
        description: dish.description || '',
        image: dish.image_url || '/images/hero-bengali-bhoj.jpg',
        dietary,
        spiceLevel,
        isChefSpecial: Boolean(dish.is_signature),
        tags: tags.length > 0 ? tags.slice(0, 4) : undefined,
        price: dish.price,
      };
    });
  } catch (error) {
    console.warn('Failed to query public dishes from DB, using fallback:', error);
    return MENU_ITEMS;
  }
}

