import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menuData";

// Type definitions matching database schema
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "super_admin" | "menu_manager" | "content_manager";
  is_active: number;
  last_login?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbCategory {
  id: string;
  name: string;
  bengali_name: string | null;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface DbDish {
  id: string;
  name: string;
  bengali_name: string | null;
  slug: string;
  category_id: string;
  description: string | null;
  price: number;
  portion_size: string | null;
  dietary_tags: string;
  spice_level: string;
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
  created_at: string;
  updated_at: string;
}

export interface DbRecipe {
  id: string;
  dish_id: string | null;
  title: string;
  description: string | null;
  prep_time_mins: number | null;
  cook_time_mins: number | null;
  servings: number | null;
  secret_notes: string | null;
  visibility: "internal" | "public";
  created_at: string;
  updated_at: string;
}

// Database singleton holder
let dbInstance: DatabaseSync | null = null;

// Password hashing helper using scryptSync
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, combinedHash: string): boolean {
  try {
    const [salt, key] = combinedHash.split(":");
    if (!salt || !key) return false;
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(Buffer.from(key, "hex"), derivedKey);
  } catch {
    return false;
  }
}

/**
 * Returns the active SQLite database instance, creating tables and initial seeds if needed.
 */
export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dataDir = path.join(process.cwd(), "data");
  let dbPath = ":memory:";

  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    dbPath = path.join(dataDir, "calcutta.db");
  } catch (err) {
    console.warn("[Database] Could not write to /data, falling back to in-memory store", err);
    dbPath = ":memory:";
  }

  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA foreign_keys = ON;");

  // Create Schema Tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('super_admin', 'menu_manager', 'content_manager')),
      is_active INTEGER NOT NULL DEFAULT 1,
      last_login TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      bengali_name TEXT,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dishes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      bengali_name TEXT,
      slug TEXT UNIQUE NOT NULL,
      category_id TEXT NOT NULL REFERENCES categories(id) ON UPDATE CASCADE,
      description TEXT,
      price REAL NOT NULL CHECK(price >= 0),
      portion_size TEXT,
      dietary_tags TEXT NOT NULL DEFAULT 'Non-Veg',
      spice_level TEXT NOT NULL DEFAULT 'Medium',
      preparation_time TEXT,
      hero_ingredients TEXT,
      cooking_method TEXT,
      historical_context TEXT,
      chef_notes TEXT,
      image_url TEXT,
      image_alt TEXT,
      status TEXT NOT NULL DEFAULT 'published',
      is_signature INTEGER NOT NULL DEFAULT 0,
      is_available INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dish_gallery (
      id TEXT PRIMARY KEY,
      dish_id TEXT NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
      image_url TEXT NOT NULL,
      alt_text TEXT,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      dish_id TEXT REFERENCES dishes(id) ON DELETE SET NULL,
      title TEXT NOT NULL,
      description TEXT,
      prep_time_mins INTEGER,
      cook_time_mins INTEGER,
      servings INTEGER,
      secret_notes TEXT,
      visibility TEXT NOT NULL DEFAULT 'internal' CHECK(visibility IN ('internal', 'public')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS recipe_ingredients (
      id TEXT PRIMARY KEY,
      recipe_id TEXT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      quantity TEXT,
      unit TEXT,
      notes TEXT,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS recipe_instructions (
      id TEXT PRIMARY KEY,
      recipe_id TEXT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
      step_number INTEGER NOT NULL,
      instruction TEXT NOT NULL,
      tip TEXT
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      admin_id TEXT REFERENCES admin_users(id),
      action TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT,
      details TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS login_rate_limits (
      identifier TEXT PRIMARY KEY,
      attempts INTEGER NOT NULL DEFAULT 1,
      last_attempt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_dishes_category ON dishes(category_id);
    CREATE INDEX IF NOT EXISTS idx_dishes_status ON dishes(status);
    CREATE INDEX IF NOT EXISTS idx_recipes_visibility ON recipes(visibility);
    CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
  `);

  // Run automated seed if database is newly initialized
  seedDefaultData(db);

  dbInstance = db;
  return dbInstance;
}

function seedDefaultData(db: DatabaseSync) {
  const now = new Date().toISOString();

  // 1. Seed Default Admin Users if none exist
  const countUsers = db.prepare("SELECT COUNT(*) as count FROM admin_users").get() as { count: number };
  if (countUsers.count === 0) {
    const insertUser = db.prepare(`
      INSERT INTO admin_users (id, name, email, password_hash, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, ?, ?)
    `);

    // Super Admin: Akash Santra
    insertUser.run(
      "admin-01",
      "Akash Santra",
      "admin@thecalcuttacafe.com",
      hashPassword("Calcutta@2019!"),
      "super_admin",
      now,
      now
    );

    // Menu Manager
    insertUser.run(
      "admin-02",
      "Sudipto Mukherjee (Chef)",
      "menu@thecalcuttacafe.com",
      hashPassword("CalcuttaMenu#2026"),
      "menu_manager",
      now,
      now
    );

    // Content Manager
    insertUser.run(
      "admin-03",
      "Ananya Sen (Editorial)",
      "editor@thecalcuttacafe.com",
      hashPassword("CalcuttaStory#2026"),
      "content_manager",
      now,
      now
    );
  }

  // 2. Seed Categories from MENU_CATEGORIES if empty
  const countCat = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
  if (countCat.count === 0) {
    const insertCat = db.prepare(`
      INSERT INTO categories (id, name, bengali_name, slug, description, display_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
    `);

    MENU_CATEGORIES.forEach((cat, index) => {
      insertCat.run(
        cat.id,
        cat.name,
        cat.bengaliSubtitle,
        cat.id,
        cat.description,
        index + 1,
        now,
        now
      );
    });
  }

  // 3. Seed 21 Authentic Dishes from MENU_ITEMS if empty
  const countDishes = db.prepare("SELECT COUNT(*) as count FROM dishes").get() as { count: number };
  if (countDishes.count === 0) {
    const insertDish = db.prepare(`
      INSERT INTO dishes (
        id, name, bengali_name, slug, category_id, description,
        price, portion_size, dietary_tags, spice_level, preparation_time,
        hero_ingredients, cooking_method, historical_context, chef_notes,
        image_url, image_alt, status, is_signature, is_available,
        display_order, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    MENU_ITEMS.forEach((item, index) => {
      const isSig = item.isChefSpecial ? 1 : 0;
      insertDish.run(
        item.id,
        item.name,
        item.bengaliName || null,
        item.id,
        item.category,
        item.description,
        item.price,
        "Serves 1–2",
        item.dietary === 'veg' ? 'Veg' : 'Non-Veg',
        item.spiceLevel === 'high' ? 'High' : item.spiceLevel === 'mild' ? 'Mild' : 'Medium',
        "20-25 mins",
        item.tags ? item.tags.join(', ') : 'Bengali Spices',
        'Traditional flame cooking',
        'Authentic Calcutta kitchen recipe handed down through generations.',
        'Best paired with steaming Gobindobhog rice or hot fluffy Luchis.',
        item.image || null,
        `${item.name} prepared in authentic Bengali style`,
        'published',
        isSig,
        1,
        index + 1,
        now,
        now
      );
    });

    // 4. Seed an authentic internal recipe for Kosha Mangsho to demonstrate the privacy engine
    const insertRecipe = db.prepare(`
      INSERT INTO recipes (
        id, dish_id, title, description, prep_time_mins, cook_time_mins,
        servings, secret_notes, visibility, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'internal', ?, ?)
    `);

    insertRecipe.run(
      "recipe-kosha-mangsho",
      "kosha-mangsho",
      "Master Heritage Kosha Mangsho (Sunday Iron Kadai Ritual)",
      "Continuous meditative braising of tender mutton in stone-ground spices and raw mustard oil.",
      45,
      240,
      4,
      "Never rush the browning of onions. Fry potatoes golden before adding to gravy.",
      now,
      now
    );

    const insertIng = db.prepare(`
      INSERT INTO recipe_ingredients (id, recipe_id, name, quantity, unit, notes, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertIng.run("ing-1", "recipe-kosha-mangsho", "Prime bone-in goat mutton", "1000", "g", "Cut into 40g pieces", 1);
    insertIng.run("ing-2", "recipe-kosha-mangsho", "Cold-pressed Kachi Ghani Mustard Oil", "150", "ml", "First-press pungent mustard", 2);
    insertIng.run("ing-3", "recipe-kosha-mangsho", "Halved yellow potatoes", "4", "pcs", "Fried golden", 3);
    insertIng.run("ing-4", "recipe-kosha-mangsho", "Hung curd / plain yogurt", "100", "g", "Whisked smooth", 4);
    insertIng.run("ing-5", "recipe-kosha-mangsho", "Stone-ground ginger & garlic paste", "4", "tbsp", "Sil-bata ground", 5);

    const insertStep = db.prepare(`
      INSERT INTO recipe_instructions (id, recipe_id, step_number, instruction, tip)
      VALUES (?, ?, ?, ?, ?)
    `);
    insertStep.run(
      "step-1",
      "recipe-kosha-mangsho",
      1,
      "Marinate meat in yogurt, turmeric, mustard oil and crushed spices for at least 3 hours.",
      "Bring meat to room temperature before hitting the hot iron pan."
    );
    insertStep.run(
      "step-2",
      "recipe-kosha-mangsho",
      2,
      "In a heavy iron kadai, fry potatoes until deep golden crust forms. Set aside.",
      "The crust seals the potato so it absorbs gravy without crumbling."
    );
    insertStep.run(
      "step-3",
      "recipe-kosha-mangsho",
      3,
      "Slow-sear the mutton over medium flame for 3.5 to 4 hours, patiently coaxing the deep mahogany lacquer without adding excess water.",
      "The true Kosha is coated in aromatic spiced oil, never thin runny water."
    );
  }
}
