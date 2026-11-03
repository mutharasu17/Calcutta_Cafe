'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Check, Image as ImageIcon, Link as LinkIcon, Grid } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  altText?: string;
}

export const OFFICIAL_DISH_PHOTOS = [
  { url: '/images/dishes/luchi-chholar-dal.jpeg', name: 'Luchi & Chholar Dal' },
  { url: '/images/dishes/lachha-paratha-alur-tarkari.jpeg', name: 'Lachha Paratha & Aloor Tarkari' },
  { url: '/images/dishes/lachha-paratha-egg-bhurji.jpeg', name: 'Lachha Paratha & Egg Bhurji' },
  { url: '/images/dishes/tawa-butter-paratha.jpeg', name: 'Tawa Butter Paratha' },
  { url: '/images/dishes/street-masala-omelette.jpeg', name: 'Street Masala Omelette' },
  { url: '/images/dishes/ruti-chholar-dal-dimer-dalna.jpeg', name: 'Ruti, Dal & Dimer Dalna' },
  { url: '/images/dishes/bengali-veg-thali.jpeg', name: 'Grand Bengali Veg Thali' },
  { url: '/images/dishes/bengali-soya-thali.jpeg', name: 'Soya Chunk Dalna Thali' },
  { url: '/images/dishes/bengali-egg-thali.jpeg', name: 'Special Egg Thali' },
  { url: '/images/dishes/macher-jhol-thali.jpeg', name: 'Katla Macher Jhol Thali' },
  { url: '/images/dishes/katla-kalia-bhaat.jpeg', name: 'Katla Kalia & Bhaat' },
  { url: '/images/dishes/murgir-jhol-bhaat.jpeg', name: 'Murgir Jhol & Bhaat' },
  { url: '/images/dishes/dimer-dalna-bhaat.jpeg', name: 'Dimer Dalna & Rice' },
  { url: '/images/dishes/aloo-matar-bhaat.jpeg', name: 'Aloo Matar & Bhaat' },
  { url: '/images/dishes/labra-mixed-veg-bhaat.jpeg', name: 'Labra Mixed Veg & Bhaat' },
  { url: '/images/dishes/steamed-gobindobhog-rice.jpeg', name: 'Steamed Gobindobhog Rice' },
  { url: '/images/dishes/kolkata-chicken-fried-rice.jpeg', name: 'Chicken Fried Rice' },
  { url: '/images/dishes/kolkata-egg-fried-rice.jpeg', name: 'Egg Fried Rice' },
  { url: '/images/dishes/bengali-veg-fried-rice.jpeg', name: 'Bengali Veg Pulao Rice' },
  { url: '/images/dishes/kolkata-chicken-chowmein.jpeg', name: 'Chicken Chowmein' },
  { url: '/images/dishes/kolkata-egg-chowmein.jpeg', name: 'Egg Chowmein' },
  { url: '/images/dishes/kolkata-street-maggi.jpeg', name: 'Kolkata Street Maggi' },
];

export default function ImageUploader({ value, onChange, altText }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tab, setTab] = useState<'gallery' | 'upload' | 'url'>('gallery');
  const [urlInput, setUrlInput] = useState(value || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setUploadError(null);

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit.');
      return;
    }

    // Validate type
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      setUploadError('Unsupported image format. Please use JPG, PNG, WEBP or AVIF.');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      onChange(data.url);
      setUrlInput(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUploadError(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Tab toggle */}
      <div className="flex items-center gap-2 border-b border-[#382B4B] pb-2">
        <button
          type="button"
          onClick={() => setTab('gallery')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
            tab === 'gallery'
              ? 'bg-[#5B1B8A] text-[#FFF8ED] font-semibold border border-[#FFB834]/40'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Grid className="w-3.5 h-3.5 text-[#FFB834]" />
          Official Gallery ({OFFICIAL_DISH_PHOTOS.length})
        </button>

        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
            tab === 'upload'
              ? 'bg-[#5B1B8A] text-[#FFF8ED] font-semibold border border-[#FFB834]/40'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload Image
        </button>

        <button
          type="button"
          onClick={() => setTab('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
            tab === 'url'
              ? 'bg-[#5B1B8A] text-[#FFF8ED] font-semibold border border-[#FFB834]/40'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Image URL
        </button>
      </div>

      {/* Official Gallery Picker */}
      {tab === 'gallery' && (
        <div className="bg-[#171120] border border-[#382B4B] rounded-xl p-3 max-h-56 overflow-y-auto">
          <p className="text-[11px] font-mono text-[#FFB834] mb-2 px-1">
            Click any authentic terracotta platter dish photograph to assign:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {OFFICIAL_DISH_PHOTOS.map((item) => {
              const isSelected = value === item.url;
              return (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => {
                    onChange(item.url);
                    setUrlInput(item.url);
                  }}
                  className={`group relative aspect-square rounded-lg overflow-hidden border text-left transition-all ${
                    isSelected
                      ? 'border-[#FFB834] ring-2 ring-[#FFB834] shadow-md'
                      : 'border-[#382B4B] hover:border-[#FFB834]/60 opacity-80 hover:opacity-100'
                  }`}
                  title={item.name}
                >
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                    unoptimized
                  />
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-[#5B1B8A] text-[#FFB834] p-1 rounded-full shadow-md border border-[#FFB834]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 px-1 py-0.5 text-[9px] text-[#FFF8ED] truncate font-sans">
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {tab === 'upload' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#FFB834] bg-[#5B1B8A]/20'
              : 'border-[#382B4B] hover:border-[#FFB834]/60 bg-[#171120]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 rounded-full bg-[#241A32] text-[#FFB834] border border-[#382B4B]">
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-[#FFB834] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[#FFF8ED]">
                {isUploading ? 'Uploading to food storage...' : 'Click or drag food photography here'}
              </p>
              <p className="text-xs text-[#A69B8D] mt-1">
                Supports JPG, PNG, WEBP, AVIF (Max 5MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* URL Input */}
      {tab === 'url' && (
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://... or /images/..."
            className="flex-1 bg-[#171120] border border-[#382B4B] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] placeholder:text-stone-500 focus:outline-none focus:border-[#FFB834]"
          />
          <button
            type="button"
            onClick={handleUrlApply}
            className="px-4 py-2 bg-[#5B1B8A] hover:bg-[#4B1473] text-[#FFF8ED] text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-colors border border-[#FFB834]/40"
          >
            Apply
          </button>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <p className="text-xs text-rose-400 font-sans">{uploadError}</p>
      )}

      {/* Current Image Preview */}
      {value && (
        <div className="relative flex items-center gap-3 p-2.5 bg-[#171120] border border-[#382B4B] rounded-lg">
          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-stone-900 border border-stone-800 flex-shrink-0">
            {value.startsWith('/') || value.startsWith('http') ? (
              <Image
                src={value}
                alt={altText || 'Preview'}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-stone-500">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-stone-300 truncate">{value}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#FFB834] mt-0.5">
              <Check className="w-3 h-3 text-emerald-400" /> Ready for display
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onChange('');
              setUrlInput('');
            }}
            className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-md transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
