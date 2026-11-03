import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { getDb } from './db';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'calcutta-secret-key-heritage-spice-2026';
export const ADMIN_COOKIE_NAME = 'calcutta_admin_token';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export type AdminRole = 'super_admin' | 'menu_manager' | 'content_manager';

export interface AdminUserSession {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

interface TokenPayload extends AdminUserSession {
  exp: number;
  iat: number;
}

/**
 * Sign a token using HMAC-SHA256
 */
export function signToken(user: AdminUserSession, expiresInSeconds = SESSION_MAX_AGE): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const payload: TokenPayload = {
    ...user,
    iat,
    exp,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify and parse a signed session token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadB64, signature] = parts;

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(payloadB64)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return null;
    }

    const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(payloadJson) as TokenPayload;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Check rate limit for IP or email
 * Max 5 failed attempts within 15 minutes window
 */
export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds: number } {
  const db = getDb();
  const maxAttempts = 5;
  const windowMs = 15 * 60 * 1000;
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMs).toISOString();

  const row = db
    .prepare('SELECT attempts, last_attempt FROM login_rate_limits WHERE identifier = ?')
    .get(identifier) as { attempts: number; last_attempt: string } | undefined;

  if (!row) {
    return { allowed: true, remainingAttempts: maxAttempts, retryAfterSeconds: 0 };
  }

  // If last attempt was before window, reset
  if (new Date(row.last_attempt).getTime() < new Date(windowStart).getTime()) {
    db.prepare('DELETE FROM login_rate_limits WHERE identifier = ?').run(identifier);
    return { allowed: true, remainingAttempts: maxAttempts, retryAfterSeconds: 0 };
  }

  if (row.attempts >= maxAttempts) {
    const elapsedMs = now.getTime() - new Date(row.last_attempt).getTime();
    const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - elapsedMs) / 1000));
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  return {
    allowed: true,
    remainingAttempts: maxAttempts - row.attempts,
    retryAfterSeconds: 0,
  };
}

/**
 * Record a failed login attempt
 */
export function recordFailedLogin(identifier: string): void {
  const db = getDb();
  const now = new Date().toISOString();

  const row = db
    .prepare('SELECT attempts FROM login_rate_limits WHERE identifier = ?')
    .get(identifier) as { attempts: number } | undefined;

  if (row) {
    db.prepare(
      'UPDATE login_rate_limits SET attempts = attempts + 1, last_attempt = ? WHERE identifier = ?'
    ).run(now, identifier);
  } else {
    db.prepare(
      'INSERT INTO login_rate_limits (identifier, attempts, last_attempt) VALUES (?, 1, ?)'
    ).run(identifier, now);
  }
}

/**
 * Reset rate limit after successful login
 */
export function resetRateLimit(identifier: string): void {
  const db = getDb();
  db.prepare('DELETE FROM login_rate_limits WHERE identifier = ?').run(identifier);
}

/**
 * Audit logger for administrative actions
 */
export function logAudit(
  adminId: string,
  action: string,
  targetType: string,
  targetId?: string,
  details?: Record<string, unknown>
): void {
  try {
    const db = getDb();
    const id = `audit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO audit_logs (id, admin_id, action, target_type, target_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      adminId,
      action,
      targetType,
      targetId || null,
      details ? JSON.stringify(details) : null,
      now
    );
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}

/**
 * Server-side helper to verify currently authenticated admin user
 * Works across Server Components, Server Actions, and Route Handlers
 */
export async function getCurrentAdmin(): Promise<AdminUserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    // Verify user still exists and is active in database
    const db = getDb();
    const user = db
      .prepare('SELECT id, email, name, role, is_active FROM admin_users WHERE id = ?')
      .get(payload.id) as { id: string; email: string; name: string; role: AdminRole; is_active: number } | undefined;

    if (!user || !user.is_active) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch {
    return null;
  }
}

/**
 * Helper to check role permission
 */
export function hasPermission(userRole: AdminRole, requiredRoles: AdminRole[]): boolean {
  if (userRole === 'super_admin') return true;
  return requiredRoles.includes(userRole);
}
