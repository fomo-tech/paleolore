const FALLBACK_SITE_URL = "https://prehistorictimes.com";

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
  if (configured) return configured;

  const deploymentUrl = normalizeSiteUrl(
    process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "",
  );
  if (deploymentUrl) return deploymentUrl;

  return process.env.NODE_ENV === "production" ? FALLBACK_SITE_URL : "http://localhost:5173";
}
