import type { Article } from "./content";
import referenceSitemap from "@/data/reference-sitemap.json";


function titleFromSlug(slug: string) { return slug.split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(" "); }

function archivePlaceholder(slug: string): Article {
  const sourceUrl = referenceSitemap.find((url) => url.endsWith("/blog/" + slug));
  return { slug, title: titleFromSlug(slug), excerpt: "This archive entry is indexed in the full Archaeologist archive.", content: "This archive entry is available in the full reference archive. Open the original source to read the complete field note and view its media.", category: "Latest Discoveries", categorySlug: "latest-discoveries", era: "Archaeology", date: "", readingTime: "1 min read", author: "The Archaeologist", sourceUrl, status: "published", archivePlaceholder: true };
}

export async function fetchReferenceArticle(slug: string): Promise<Article | null> {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  const sourceUrl = referenceSitemap.find((url) => url.endsWith("/blog/" + slug));
  if (!sourceUrl) return null;
  return archivePlaceholder(slug);
}
