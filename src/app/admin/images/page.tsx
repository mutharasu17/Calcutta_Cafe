import fs from 'node:fs/promises';
import path from 'node:path';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { getDb } from '@/lib/db';
import ImageManagementClient from './ImageManagementClient';

export default async function AdminImagesPage() {
  const currentAdmin = await getCurrentAdmin();
  if (!currentAdmin) {
    redirect('/admin/login');
  }

  const db = getDb();

  interface DishImageRow {
    id: string;
    name: string;
    image_url: string | null;
    image_alt: string | null;
    status: string;
  }

  const dishesWithImages = db.prepare(`
    SELECT id, name, image_url, image_alt, status
    FROM dishes
    WHERE image_url IS NOT NULL 
      AND TRIM(image_url) != '' 
      AND image_url NOT LIKE '%placeholder%'
      AND image_url != 'none'
    ORDER BY name ASC
  `).all() as DishImageRow[];

  const dishesMissingImages = db.prepare(`
    SELECT id, name, image_url, image_alt, status
    FROM dishes
    WHERE image_url IS NULL 
      OR TRIM(image_url) = '' 
      OR image_url LIKE '%placeholder%'
      OR image_url = 'none'
    ORDER BY name ASC
  `).all() as DishImageRow[];

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
    // upload dir may be empty
  }

  return (
    <ImageManagementClient
      currentUser={currentAdmin}
      dishesWithImages={dishesWithImages}
      dishesMissingImages={dishesMissingImages}
      uploadedFiles={uploadedFiles}
    />
  );
}
