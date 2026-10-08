import { cookies } from "next/headers";
const COOKIE_NAME = "archaeologist_admin";
function encode(value: ArrayBuffer | string) { const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value); return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
async function sign(value: string) { const secret = new TextEncoder().encode(process.env.ADMIN_SECRET || "change-this-admin-secret"); const key = await crypto.subtle.importKey("raw", secret, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); return encode(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))); }
export async function createSessionToken() { const value = `admin:${Date.now()}`; return `${encode(value)}.${await sign(value)}`; }
export async function isAdmin() { const token = (await cookies()).get(COOKIE_NAME)?.value; if (!token) return false; const [value, signature] = token.split("."); if (!value || !signature) return false; const decoded = atob(value.replace(/-/g, "+").replace(/_/g, "/")); return signature === await sign(decoded); }
export { COOKIE_NAME };