import referenceSite from "@/data/reference-site.json";
import editorialContent from "@/data/editorial-content.json";

export type Category = { name: string; slug: string; eyebrow: string; filterSlug?: string };
export type Article = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  era: string;
  date: string;
  readingTime: string;
  author: string;
  image?: string;
  sourceUrl?: string;
  sourceImageUrl?: string;
  featured?: boolean;
  status?: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  archivePlaceholder?: boolean;
};

const editorialBySlug = new Map(editorialContent.articles.map((article) => [article.slug, article]));
const REFERENCE_ORIGIN = "https://www.thearchaeologist.org/";

function cleanText(value = "") {
  return value.replace(/^Introduction\s+/i, "").replace(/\s+/g, " ").trim();
}

export function getArticleExcerpt(article: { excerpt: string; content: string }) {
  const source = cleanText(article.content || article.excerpt);
  const sentences = source.match(/[^.!?]+[.!?]+/g) || [];
  const candidate = cleanText(sentences.slice(0, 2).join(" ") || source);
  if (candidate.length <= 220) return candidate;
  const firstSentence = cleanText(sentences[0] || "");
  if (firstSentence && firstSentence.length <= 260) return firstSentence;
  return candidate.slice(0, 217).replace(/\s+\S*$/, "").trim() + "…";
}

export function applyEditorialContent(article: Article): Article {
  const editorial = editorialBySlug.get(article.slug);
  if (editorial) {
    return {
      ...article,
      excerpt: editorial.excerpt,
      content: editorial.content,
      readingTime: Math.max(3, Math.ceil(editorial.content.split(/\s+/).filter(Boolean).length / 190)) + " min read",
      author: "The Archaeologist Editorial Desk",
    };
  }
  if (!article.sourceUrl?.startsWith(REFERENCE_ORIGIN)) return article;
  return {
    ...article,
    excerpt: "This archive entry is awaiting an original editorial note.",
    content: "This archive entry is not published until it has been independently researched and written by The Archaeologist editorial team.",
    readingTime: "1 min read",
    author: "The Archaeologist Editorial Desk",
    archivePlaceholder: true,
  };
}

export const categories: Category[] = [
  ...referenceSite.categories.map((category) => ({ name: category.name, slug: category.slug, eyebrow: category.eyebrow })),
  { name: "Prehistory", slug: "prehistory", eyebrow: "PREHISTORY", filterSlug: "latest-discoveries" },
  { name: "Civilizations", slug: "civilizations", eyebrow: "CIVILIZATIONS", filterSlug: "archaeology-greatest-finds" },
];

export const sampleArticles: Article[] = referenceSite.articles.map((article, index) => applyEditorialContent({
  slug: article.slug,
  title: article.title,
  excerpt: "",
  content: "",
  category: article.category,
  categorySlug: article.categorySlug,
  era: article.era,
  date: article.date,
  readingTime: "1 min read",
  author: "The Archaeologist Editorial Desk",
  image: article.image,
  sourceUrl: article.sourceUrl,
  sourceImageUrl: article.sourceImageUrl,
  featured: index === 0,
  status: "published",
}));

export function getCategory(slug: string) { return categories.find((category) => category.slug === slug); }