import referenceSite from "@/data/reference-site.json";

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
};

export const categories = referenceSite.categories.map((category) => ({
  name: category.name,
  slug: category.slug,
  eyebrow: category.eyebrow,
}));

export const sampleArticles: Article[] = referenceSite.articles.map((article, index) => ({
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
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