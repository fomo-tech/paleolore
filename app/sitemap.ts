import type { MetadataRoute } from "next";
import { categories } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://thearchaeologist.thegoatfx-stategy.chatgpt.site").replace(/\/$/, "");

function dateValue(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = (await getPublishedArticles()).filter((article) => !article.archivePlaceholder);
  const usedCategories = categories.filter((category) => !category.filterSlug && articles.some((article) => article.categorySlug === category.slug));
  const staticUrls: MetadataRoute.Sitemap = [
    { url: siteUrl + "/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: siteUrl + "/blog", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: siteUrl + "/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: siteUrl + "/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...usedCategories.map((category) => ({ url: siteUrl + "/categories/" + category.slug, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
  const articleUrls = articles.map((article) => ({ url: siteUrl + "/blog/" + article.slug, lastModified: dateValue(article.date), changeFrequency: "monthly" as const, priority: article.featured ? 0.9 : 0.7 }));
  return [...staticUrls, ...articleUrls];
}