'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const setPreset = (presetEmail: string, presetPass: string) => {
    setEmail(presetEmail);
    setPassword(presetPass);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-[#120D1A] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden text-[#FFF8ED]">
      {/* Subtle luxury ambient glow with brand purple and gold */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#5B1B8A]/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-[#FFB834]/12 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Official Brand Medallion Crest */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden border-2 border-[#FFB834] bg-[#5B1B8A] shadow-2xl mb-4 group hover:scale-105 transition-transform">
            <Image
              src="/images/brand/logo.jpeg"
              alt="The Calcutta Cafe Official Logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF8ED] tracking-wide">
            The Calcutta Cafe
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#FFB834] mt-1 font-semibold">
            Restaurant Management System
          </p>
          <div className="w-16 h-0.5 bg-[#FFB834]/40 mx-auto mt-3" />
        </div>

        {/* Card */}
        <div className="bg-[#1A1424]/90 border border-[#382B4B] rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-lg font-serif font-semibold text-[#FFF8ED]">
              Culinary Portal Access
            </h2>
            <p className="text-xs text-[#C4B6D8] font-mono mt-0.5">
              Secure administrative access for kitchen and menu managers
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#C4B6D8] mb-1.5 font-semibold">
                Authorized Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@thecalcuttacafe.com"
                  className="w-full bg-[#241B33] border border-[#382B4B] focus:border-[#FFB834] focus:ring-1 focus:ring-[#FFB834] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#FFF8ED] placeholder-stone-500 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#C4B6D8] mb-1.5 font-semibold">
                Access Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#241B33] border border-[#382B4B] focus:border-[#FFB834] focus:ring-1 focus:ring-[#FFB834] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#FFF8ED] placeholder-stone-500 outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold text-white bg-[#5B1B8A] hover:bg-[#4B1473] border border-[#FFB834]/50 shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
            >
              <span>{isLoading ? 'Verifying...' : 'Authenticate & Enter'}</span>
              <ArrowRight className="w-4 h-4 text-[#FFB834]" />
            </button>
          </form>

          {/* Seed accounts helper for development review */}
          <div className="mt-8 pt-6 border-t border-[#382B4B]/80">
            <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-3 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFB834]" />
              <span>Available Demo Credentials</span>
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPreset('admin@thecalcuttacafe.com', 'Calcutta@2019!')}
                className="w-full text-left p-2.5 rounded-lg bg-[#241B33]/60 hover:bg-[#241B33] border border-[#382B4B] text-[11px] font-mono transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-[#FFF8ED] font-semibold block">Akash Santra (Super Admin)</span>
                  <span className="text-stone-400 text-[10px]">admin@thecalcuttacafe.com</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#5B1B8A]/40 text-[#FFB834] border border-[#FFB834]/30">
                  Fill
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPreset('menu@thecalcuttacafe.com', 'CalcuttaMenu#2026')}
                className="w-full text-left p-2.5 rounded-lg bg-[#241B33]/60 hover:bg-[#241B33] border border-[#382B4B] text-[11px] font-mono transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-[#FFF8ED] font-semibold block">Sudipto Mukherjee (Chef)</span>
                  <span className="text-stone-400 text-[10px]">menu@thecalcuttacafe.com</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800">
                  Fill
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
