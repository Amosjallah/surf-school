import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "saltline_desk";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function secret() {
  const value = process.env.ADMIN_SECRET;
  if (!value) throw new Error("ADMIN_SECRET is not set.");
  return value;
}

function sign(body: string) {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

function passwordDigest(value: string) {
  return createHmac("sha256", secret()).update(value).digest();
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.ADMIN_SECRET) return false;
  const left = passwordDigest(input);
  const right = passwordDigest(expected);
  return timingSafeEqual(left, right);
}

export function createSessionToken() {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const body = `v1.${expires}`;
  return `${body}.${sign(body)}`;
}

export function sessionIsValid(token: string | undefined) {
  if (!token || !process.env.ADMIN_SECRET) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const body = `${parts[0]}.${parts[1]}`;
  const expires = Number(parts[1]);
  const expected = sign(body);
  const left = Buffer.from(expected);
  const right = Buffer.from(parts[2]);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  return Number.isFinite(expires) && expires > Date.now();
}

export async function isAdmin() {
  const jar = await cookies();
  return sessionIsValid(jar.get(COOKIE)?.value);
}

export async function setAdminCookie() {
  const jar = await cookies();
  jar.set(COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearAdminCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
