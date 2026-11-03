'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Copy,
  Check,
  Image as ImageIcon,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploader from '@/components/admin/ImageUploader';
import { AdminUserSession } from '@/lib/auth';

interface DishImageItem {
  id: string;
  name: string;
  image_url: string | null;
  image_alt: string | null;
  status: string;
}

interface UploadedFileItem {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
}

interface ImageManagementClientProps {
  currentUser: AdminUserSession;
  dishesWithImages: DishImageItem[];
  dishesMissingImages: DishImageItem[];
  uploadedFiles: UploadedFileItem[];
  onOpenSidebar?: () => void;
}

export default function ImageManagementClient({
  currentUser,
  dishesWithImages,
  dishesMissingImages,
  uploadedFiles,
  onOpenSidebar,
}: ImageManagementClientProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dishes' | 'missing' | 'uploads'>('dishes');
  const [newUploadedUrl, setNewUploadedUrl] = useState('');

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#141210]">
      <AdminHeader
        title="Food Photography & Media"
        subtitle="Manage food photography, track missing dish assets, and upload high-res images"
        onOpenSidebar={onOpenSidebar || (() => {})}
        userRole={currentUser.role}
      />

      <main className="p-4 sm:p-8 space-y-6 max-w-6xl w-full mx-auto">
        {/* Direct Upload Box */}
        <section className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#3E3832]">
            <div>
              <h3 className="text-base font-serif font-bold text-[#FFF8ED]">
                Upload High-Resolution Food Asset
              </h3>
              <p className="text-xs text-[#A69B8D] font-mono mt-0.5">
                Saved directly to high-speed static CDN storage (/public/uploads)
              </p>
            </div>
          </div>

          <ImageUploader
            value={newUploadedUrl}
            onChange={(url) => {
              setNewUploadedUrl(url);
              window.location.reload();
            }}
          />
        </section>

        {/* Tab Navigator */}
        <div className="flex items-center gap-2 border-b border-[#3E3832] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('dishes')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'dishes'
                ? 'bg-[#8E171D] text-white font-bold'
                : 'text-stone-400 hover:text-white bg-[#1A1815]'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Dishes With Photos ({dishesWithImages.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('missing')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'missing'
                ? 'bg-rose-900 text-white font-bold'
                : 'text-stone-400 hover:text-white bg-[#1A1815]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Missing Photos ({dishesMissingImages.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('uploads')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'uploads'
                ? 'bg-[#8E171D] text-white font-bold'
                : 'text-stone-400 hover:text-white bg-[#1A1815]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Storage Uploads ({uploadedFiles.length})</span>
          </button>
        </div>

        {/* Tab 1: Dishes With Images */}
        {activeTab === 'dishes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dishesWithImages.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl overflow-hidden shadow-xl group hover:border-[#C49A55]/40 transition-colors"
              >
                <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                  {dish.image_url && (
                    <Image
                      src={dish.image_url}
                      alt={dish.image_alt || dish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-sm text-[#FFF8ED] truncate">
                      {dish.name}
                    </h4>
                  </div>

                  <p className="text-[11px] font-mono text-stone-400 truncate">
                    {dish.image_url}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2E2924]">
                    <button
                      onClick={() => handleCopy(dish.image_url || '')}
                      className="text-xs font-mono uppercase text-[#D4AF37] hover:text-[#FFF8ED] flex items-center gap-1 transition-colors"
                    >
                      {copiedUrl === dish.image_url ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Dishes Missing Images */}
        {activeTab === 'missing' && (
          <div className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl p-6 shadow-xl space-y-4">
            <p className="text-xs text-stone-300 leading-relaxed">
              The following dishes currently do not have photography or are using placeholder graphics. Click &quot;Add Dish Photo&quot; in the Food Menu to upload authentic photographs.
            </p>

            <div className="divide-y divide-[#2E2924]">
              {dishesMissingImages.map((dish) => (
                <div key={dish.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-serif font-bold text-[#FFF8ED]">
                      {dish.name}
                    </p>
                    <p className="text-xs text-stone-400">
                      ID: {dish.id}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2.5 py-1 rounded-full">
                    Missing Asset
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Uploaded Storage Files */}
        {activeTab === 'uploads' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedFiles.length === 0 ? (
              <div className="col-span-full py-12 text-center text-stone-500 font-mono text-xs">
                No uploaded files found in /public/uploads directory yet.
              </div>
            ) : (
              uploadedFiles.map((file) => (
                <div
                  key={file.filename}
                  className="bg-[#1E1B18] border border-[#3E3832] rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <Image
                      src={file.url}
                      alt={file.filename}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-xs font-mono text-stone-200 truncate">{file.filename}</p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                      <span>{(file.size / 1024).toFixed(1)} KB</span>
                      <button
                        onClick={() => handleCopy(file.url)}
                        className="text-[#D4AF37] hover:text-[#FFF8ED] flex items-center gap-1"
                      >
                        {copiedUrl === file.url ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
