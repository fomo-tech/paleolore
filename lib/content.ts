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

export const categories: Category[] = [
  ...referenceSite.categories.map((category) => ({ name: category.name, slug: category.slug, eyebrow: category.eyebrow })),
  { name: "Prehistory", slug: "prehistory", eyebrow: "PREHISTORY", filterSlug: "latest-discoveries" },
  { name: "Civilizations", slug: "civilizations", eyebrow: "CIVILIZATIONS", filterSlug: "archaeology-greatest-finds" },
];

export const sampleArticles: Article[] = referenceSite.articles.map((article, index) => {
  const editorial = editorialBySlug.get(article.slug);
  const content = editorial?.content || article.content;
  return {
    slug: article.slug,
    title: article.title,
    excerpt: editorial?.excerpt || getArticleExcerpt({ excerpt: article.excerpt, content }),
    content,
    category: article.category,
    categorySlug: article.categorySlug,
    era: article.era,
    date: article.date,
    readingTime: Math.max(3, Math.ceil(content.split(/\s+/).filter(Boolean).length / 190)) + " min read",
    author: editorial ? "The Archaeologist Editorial Desk" : article.author,
    image: article.image,
    sourceUrl: article.sourceUrl,
    sourceImageUrl: article.sourceImageUrl,
    featured: index === 0,
    status: "published",
  };
});

export function getCategory(slug: string) { return categories.find((category) => category.slug === slug); }
