const FALLBACK_SITE_URL = "https://www.paleolore.com";

function normalizeSiteUrl(value: string) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (["yourdomain.com", "www.yourdomain.com"].includes(url.hostname.toLowerCase())) return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  const configured = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "");
  if (configured) {
    const hostname = new URL(configured).hostname.toLowerCase();
    const isPreviewHost = hostname.endsWith(".vercel.app");
    const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";
    const isLegacyHost = [
      "prehistorictimes.com",
      "www.prehistorictimes.com",
      "yourdomain.com",
      "www.yourdomain.com",
    ].includes(hostname);

    if (!isPreviewHost && !isLocalHost && !isLegacyHost) return configured;
  }

  // Canonical URLs must never use a Vercel preview hostname in production.
  return process.env.NODE_ENV === "production" ? FALLBACK_SITE_URL : "http://localhost:5173";
}
