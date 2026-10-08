import type { Article } from "./content";
import { getArticleExcerpt } from "./content";
import referenceSitemap from "@/data/reference-sitemap.json";

const REFERENCE_ORIGIN = "https://www.thearchaeologist.org";

function decodeHtml(value = "") {
  return value.replace(/&#39;|&#x27;/gi, "'").replace(/&quot;|&#x22;/gi, '"').replace(/&amp;/gi, "&").replace(/&nbsp;/gi, " ").replace(/&ndash;/gi, "–").replace(/&mdash;/gi, "—").replace(/&rsquo;|&#8217;/gi, "’").replace(/&ldquo;|&#8220;/gi, "“").replace(/&rdquo;|&#8221;/gi, "”").replace(/&hellip;/gi, "…").replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function cleanText(value = "") {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
}

function extractMeta(html: string) {
  const meta: Record<string, string> = {};
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const key = (tag.match(/(?:property|name|itemprop)=["']([^"']+)["']/i) || [])[1];
    const value = (tag.match(/content=["']([^"']*)["']/i) || [])[1];
    if (key && value) meta[key.toLowerCase()] = decodeHtml(value);
  }
  return meta;
}

function dateValue(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10);
}

function titleFromSlug(slug: string) { return slug.split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(" "); }

function archivePlaceholder(slug: string): Article {
  const sourceUrl = referenceSitemap.find((url) => url.endsWith("/blog/" + slug));
  return { slug, title: titleFromSlug(slug), excerpt: "This field note is indexed in the full Archaeologist archive.", content: "This archive entry is available in the full reference archive. Open the original source to read the complete field note and view its media.", category: "Latest Discoveries", categorySlug: "latest-discoveries", era: "Archaeology", date: "", readingTime: "5 min read", author: "The Archaeologist", sourceUrl, status: "published" };
}

export async function fetchReferenceArticle(slug: string): Promise<Article | null> {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  try {
    const sourceUrl = REFERENCE_ORIGIN + "/blog/" + slug;
    const response = await fetch(sourceUrl, { headers: { "user-agent": "Mozilla/5.0 (compatible; archaeology-site-import/1.0)" }, cache: "force-cache" });
    if (!response.ok) return archivePlaceholder(slug);
    const html = await response.text();
    const meta = extractMeta(html);
    const title = cleanText(((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || meta["og:title"] || slug));
    const paragraphs = [...html.matchAll(/<p\b[^>]*style=["'][^"']*white-space:\s*pre-wrap[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi)].map((match) => cleanText(match[1])).filter((text) => text.length > 20);
    const content = (paragraphs.length ? paragraphs : [cleanText(meta["og:description"] || "")]).filter(Boolean).join("\n\n").replace(/\n\nPowered by The archaeologist\s*$/i, "");
    const excerpt = getArticleExcerpt({ excerpt: cleanText(meta["og:description"] || ""), content });
    const datePublished = (html.match(/"datePublished"\s*:\s*"([^"]+)"/i) || [])[1] || meta["article:published_time"] || "";
    const author = decodeHtml((html.match(/"author"\s*:\s*"([^"]+)"/i) || [])[1] || "The Archaeologist");
    const image = (meta["og:image"] || "").replace(/^http:/, "https:");
    const words = content.split(/\s+/).filter(Boolean).length;
    return { slug, title, excerpt, content, category: "Latest Discoveries", categorySlug: "latest-discoveries", era: "Archaeology", date: dateValue(datePublished), readingTime: Math.max(4, Math.ceil(words / 220)) + " min read", author, image, sourceUrl, sourceImageUrl: image, status: "published" };
  } catch {
    return archivePlaceholder(slug);
  }
}
