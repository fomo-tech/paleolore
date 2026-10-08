import { findMongoArticle, listMongoArticles } from "./mongo";
import { applyEditorialContent, sampleArticles, type Article } from "./content";
import { fetchReferenceArticle } from "./reference-remote";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://thearchaeologist.thegoatfx-stategy.chatgpt.site").replace(/\/$/, "");

function absoluteUrl(value?: string) {
  if (!value) return undefined;
  return value.startsWith("http") ? value : SITE_URL + (value.startsWith("/") ? value : "/" + value);
}

function isoDate(value: string) {
  if (!value) return undefined;
  const normalized = value.includes(".") ? value.split(".").reverse().join("-") : value;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export async function getArticles(options?: { includeDrafts?: boolean }) {
  const mongoArticles = await listMongoArticles();
  const articles = mongoArticles?.length ? mongoArticles.map(applyEditorialContent) : sampleArticles;
  return options?.includeDrafts ? articles : articles.filter((article) => article.status !== "draft");
}

export async function getPublishedArticles() { return getArticles(); }

export async function getArticleBySlug(slug: string) {
  const mongoArticle = await findMongoArticle(slug);
  if (mongoArticle) return applyEditorialContent(mongoArticle);
  const localArticle = sampleArticles.find((article) => article.slug === slug);
  if (localArticle) return localArticle;
  return fetchReferenceArticle(slug);
}

export function articleToJsonLd(article: Article) {
  const articleUrl = SITE_URL + "/blog/" + article.slug;
  const image = absoluteUrl(article.image);
  const published = isoDate(article.date);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": articleUrl + "#article",
    url: articleUrl,
    headline: article.title,
    description: article.excerpt,
    ...(image ? { image: [image] } : {}),
    ...(published ? { datePublished: published, dateModified: published } : {}),
    author: { "@type": "Person", name: article.author || "The Archaeologist" },
    publisher: {
      "@type": "Organization",
      name: "The Archaeologist",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: SITE_URL + "/archaeologist-logo.png" },
    },
    articleSection: article.category,
    isAccessibleForFree: true,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
}
