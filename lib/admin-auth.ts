import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    "dev-insecure-admin-secret"
  );
}

function adminPassword(): string {
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set");
  }
  return password;
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("hex");
}

function buildToken(issuedAt: number): string {
  const payload = `ok:${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  if (!payload.startsWith("ok:")) return false;

  const issuedAt = Number(payload.slice(3));
  if (!Number.isFinite(issuedAt)) return false;

  const ageSeconds = (Date.now() - issuedAt) / 1000;
  if (ageSeconds < 0 || ageSeconds > MAX_AGE_SECONDS) return false;

  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

export function checkAdminPassword(password: string): boolean {
  try {
    const expected = adminPassword();
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function createAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, buildToken(Date.now()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function requireAdmin(): Promise<Response | null> {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
