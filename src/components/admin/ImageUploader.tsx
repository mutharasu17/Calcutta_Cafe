'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Check, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  altText?: string;
}

export default function ImageUploader({ value, onChange, altText }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
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
      <div className="flex items-center gap-2 border-b border-[#3E3832] pb-2">
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
            tab === 'upload'
              ? 'bg-[#8E171D] text-white font-semibold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload Image
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md transition-colors ${
            tab === 'url'
              ? 'bg-[#8E171D] text-white font-semibold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Image URL
        </button>
      </div>

      {/* Upload Zone */}
      {tab === 'upload' ? (
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
              ? 'border-[#C49A55] bg-[#C49A55]/10'
              : 'border-[#3E3832] hover:border-[#C49A55]/50 bg-[#1A1815]/50'
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
            <div className="p-3 rounded-full bg-[#2E2924] text-[#D4AF37] border border-[#443D36]">
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
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
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://... or /images/..."
            className="flex-1 bg-[#1A1815] border border-[#3E3832] rounded-lg px-3.5 py-2 text-sm text-[#FFF8ED] placeholder:text-stone-500 focus:outline-none focus:border-[#C49A55]"
          />
          <button
            type="button"
            onClick={handleUrlApply}
            className="px-4 py-2 bg-[#8E171D] hover:bg-[#A31C23] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-colors"
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
        <div className="relative flex items-center gap-3 p-2.5 bg-[#1A1815] border border-[#3E3832] rounded-lg">
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
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 mt-0.5">
              <Check className="w-3 h-3" /> Ready for display
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

