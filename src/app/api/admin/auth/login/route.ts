import { NextRequest, NextResponse } from 'next/server';
import { getDb, verifyPassword } from '@/lib/db';
import {
  signToken,
  checkRateLimit,
  recordFailedLogin,
  resetRateLimit,
  logAudit,
  ADMIN_COOKIE_NAME,
  SESSION_MAX_AGE,
  AdminRole,
} from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rateLimitKey = `${clientIp}:${normalizedEmail}`;

    // Check rate limit
    const rateCheck = checkRateLimit(rateLimitKey);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please try again in ${rateCheck.retryAfterSeconds} seconds.`,
          retryAfter: rateCheck.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    const db = getDb();
    const user = db
      .prepare('SELECT id, email, password_hash, name, role, is_active FROM admin_users WHERE email = ?')
      .get(normalizedEmail) as {
        id: string;
        email: string;
        password_hash: string;
        name: string;
        role: AdminRole;
        is_active: number;
      } | undefined;

    if (!user || !user.is_active || !verifyPassword(password, user.password_hash)) {
      recordFailedLogin(rateLimitKey);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Reset rate limit on success
    resetRateLimit(rateLimitKey);

    // Update last login
    db.prepare('UPDATE admin_users SET last_login = ? WHERE id = ?').run(
      new Date().toISOString(),
      user.id
    );

    // Audit log
    logAudit(user.id, 'login', 'admin_users', user.id, { ip: clientIp });

    // Generate JWT token
    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}

