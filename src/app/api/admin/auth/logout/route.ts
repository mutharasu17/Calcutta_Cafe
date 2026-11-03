import { NextResponse } from 'next/server';
import { getCurrentAdmin, ADMIN_COOKIE_NAME, logAudit } from '@/lib/auth';

export async function POST() {
  const currentAdmin = await getCurrentAdmin();
  if (currentAdmin) {
    logAudit(currentAdmin.id, 'logout', 'admin_users', currentAdmin.id);
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

