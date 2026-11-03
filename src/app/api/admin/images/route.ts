import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getDb } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();

  // Dishes with images
  const dishesWithImages = db.prepare(`
    SELECT id, name, image_url, image_alt, status, updated_at
    FROM dishes
    WHERE image_url IS NOT NULL AND TRIM(image_url) != ''
  `).all() as Array<{ id: string; name: string; image_url: string; image_alt: string; status: string; updated_at: string }>;

  // Uploaded files in public/uploads
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const uploadedFiles: Array<{ filename: string; url: string; size: number; createdAt: string }> = [];

  try {
    const files = await fs.readdir(uploadsDir);
    for (const f of files) {
      if (f.startsWith('.')) continue;
      const stat = await fs.stat(path.join(uploadsDir, f));
      uploadedFiles.push({
        filename: f,
        url: `/uploads/${f}`,
        size: stat.size,
        createdAt: stat.birthtime.toISOString(),
      });
    }
  } catch {
    // Directory might be empty or missing
  }

  return NextResponse.json({
    dishesWithImages,
    uploadedFiles,
  });
}
