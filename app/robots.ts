import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://thearchaeologist.thegoatfx-stategy.chatgpt.site").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/"], disallow: ["/admin", "/api/"] },
      { userAgent: "AdsBot-Google", allow: ["/"] },
    ],
    sitemap: siteUrl + "/sitemap.xml",
  };
}
