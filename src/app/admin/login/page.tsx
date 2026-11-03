'use client';

import React, { useState } from 'react';
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
    <div className="min-h-screen bg-[#141210] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden text-[#FFF8ED]">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#8E171D]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-[#C49A55]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#8E171D] border-2 border-[#C49A55]/50 shadow-2xl mb-4 text-[#D4AF37] font-serif text-2xl font-bold">
            ক
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF8ED] tracking-wide">
            The Calcutta Cafe
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mt-1">
            Restaurant Management System
          </p>
          <div className="w-16 h-0.5 bg-[#C49A55]/40 mx-auto mt-3" />
        </div>

        {/* Card */}
        <div className="bg-[#1E1B18]/90 border border-[#3E3832] rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-lg font-serif font-semibold text-[#FFF8ED]">
              Culinary Portal Access
            </h2>
            <p className="text-xs text-[#A69B8D] font-mono mt-0.5">
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
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
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
                  className="w-full bg-[#141210] border border-[#3E3832] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#FFF8ED] placeholder:text-stone-600 focus:outline-none focus:border-[#C49A55] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A69B8D] mb-1.5 font-semibold">
                Security Password
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
                  className="w-full bg-[#141210] border border-[#3E3832] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#FFF8ED] placeholder:text-stone-600 focus:outline-none focus:border-[#C49A55] transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-[#8E171D] hover:bg-[#A31C23] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xl shadow-lg flex items-center justify-center gap-2 border border-[#8E171D] transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Switcher */}
          <div className="mt-8 pt-6 border-t border-[#3E3832]">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#A69B8D] text-center mb-3">
              Role-Based Credentials (Audit Testing)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPreset('admin@thecalcuttacafe.com', 'Calcutta@2019!')}
                className="p-2 rounded-lg bg-[#24201C] hover:bg-[#2E2924] border border-[#3E3832] text-left transition-colors"
              >
                <span className="block text-[10px] font-mono text-[#D4AF37] font-semibold">Super Admin</span>
                <span className="block text-[9px] text-stone-400 truncate">Full System</span>
              </button>
              <button
                type="button"
                onClick={() => setPreset('menu@thecalcuttacafe.com', 'CalcuttaMenu#2026')}
                className="p-2 rounded-lg bg-[#24201C] hover:bg-[#2E2924] border border-[#3E3832] text-left transition-colors"
              >
                <span className="block text-[10px] font-mono text-blue-400 font-semibold">Menu Mgr</span>
                <span className="block text-[9px] text-stone-400 truncate">Dishes & Prices</span>
              </button>
              <button
                type="button"
                onClick={() => setPreset('editor@thecalcuttacafe.com', 'CalcuttaStory#2026')}
                className="p-2 rounded-lg bg-[#24201C] hover:bg-[#2E2924] border border-[#3E3832] text-left transition-colors"
              >
                <span className="block text-[10px] font-mono text-purple-400 font-semibold">Content Mgr</span>
                <span className="block text-[9px] text-stone-400 truncate">Recipes & Text</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-6 flex items-center justify-center gap-2 text-xs text-stone-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted Session • HMAC SHA-256 • Rate-Limited</span>
        </div>
      </div>
    </div>
  );
}

