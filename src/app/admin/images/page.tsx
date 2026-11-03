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

  // Uploaded and authentic media files
  const uploadedFiles: Array<{ filename: string; url: string; size: number; createdAt: string }> = [];

  const mediaDirs = [
    { dir: path.join(process.cwd(), 'public', 'uploads'), urlPrefix: '/uploads' },
    { dir: path.join(process.cwd(), 'public', 'images', 'brand'), urlPrefix: '/images/brand' },
    { dir: path.join(process.cwd(), 'public', 'images', 'dishes'), urlPrefix: '/images/dishes' },
  ];

  for (const { dir, urlPrefix } of mediaDirs) {
    try {
      const files = await fs.readdir(/*turbopackIgnore: true*/ dir);
      for (const f of files) {
        if (f.startsWith('.') || !/\.(jpe?g|png|webp|svg)$/i.test(f)) continue;
        const stat = await fs.stat(/*turbopackIgnore: true*/ path.join(/*turbopackIgnore: true*/ dir, f));
        uploadedFiles.push({
          filename: f,
          url: `${urlPrefix}/${f}`,
          size: stat.size,
          createdAt: stat.birthtime.toISOString(),
        });
      }
    } catch {
      // directory may not exist
    }
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
