import { findMongoArticle, listMongoArticles } from "./mongo";
import { sampleArticles, type Article } from "./content";
import { fetchReferenceArticle } from "./reference-remote";

export async function getArticles(options?: { includeDrafts?: boolean }) { const mongoArticles = await listMongoArticles(); const articles = mongoArticles?.length ? mongoArticles : sampleArticles; return options?.includeDrafts ? articles : articles.filter((article) => article.status !== "draft"); }
export async function getPublishedArticles() { return getArticles(); }
export async function getArticleBySlug(slug: string) { const mongoArticle = await findMongoArticle(slug); if (mongoArticle) return mongoArticle; const localArticle = sampleArticles.find((article) => article.slug === slug); if (localArticle) return localArticle; return fetchReferenceArticle(slug); }
export function articleToJsonLd(article: Article) { return { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, author: { "@type": "Person", name: article.author }, datePublished: article.date.includes(".") ? article.date.split(".").reverse().join("-") : article.date, publisher: { "@type": "Organization", name: "The Archaeologist" }, mainEntityOfPage: `https://thearchaeologist.org/blog/${article.slug}` }; }