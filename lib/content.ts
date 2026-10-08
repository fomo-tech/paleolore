import referenceSite from "@/data/reference-site.json";

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

export const sampleArticles: Article[] = referenceSite.articles.map((article, index) => ({
  slug: article.slug,
  title: article.title,
  excerpt: getArticleExcerpt({ excerpt: article.excerpt, content: article.content }),
  content: article.content,
  category: article.category,
  categorySlug: article.categorySlug,
  era: article.era,
  date: article.date,
  readingTime: article.readingTime,
  author: article.author,
  image: article.image,
  sourceUrl: article.sourceUrl,
  sourceImageUrl: article.sourceImageUrl,
  featured: index === 0,
  status: "published",
}));

export function getCategory(slug: string) { return categories.find((category) => category.slug === slug); }
