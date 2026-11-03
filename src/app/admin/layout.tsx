import React from 'react';
import type { Metadata } from 'next';
import { getCurrentAdmin } from '@/lib/auth';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export const metadata: Metadata = {
  title: 'Culinary CMS — The Calcutta Cafe',
  description: 'Restaurant content management system for The Calcutta Cafe',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentAdmin();

  return (
    <AdminLayoutClient user={user} isLoginPage={!user}>
      {children}
    </AdminLayoutClient>
  );
}

