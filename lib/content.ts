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

const PALEONTOLOGY_SLUGS = new Set([
  "gladysvale-south-africas-2m-year-hominin-cave",
  "gondolin-south-africas-sabertooth-den",
  "swartkrans-south-africas-homo-erectus-fire-use",
  "drimolen-south-africas-earliest-homo",
  "rising-star-cave-south-africas-homo-naledi-system",
  "die-kelders-south-africas-middle-stone-age-cave",
  "peers-cave-south-africas-15000-year-burials",
  "nelson-bay-cave-south-africas-micro-lithics",
]);

const FINDS_SLUGS = new Set([
  "magaliesberg-caves-south-africas-san-rock-art",
  "oakhurst-rockshelter-south-africas-wilton-culture",
  "byneskranskop-south-africas-pastoralist-transition",
  "matjes-river-rockshelter-south-africas-shellfish-midden",
  "elands-bay-cave-south-africas-2000-year-sequence",
  "faraone-shelter-south-africas-rock-engravings",
  "barkly-east-rock-art-south-africas-freehand-paintings",
  "wildebeestkuil-south-africas-game-drive-traps",
  "drakensberg-san-art-south-africas-4000-year-scenes",
  "giants-castle-south-africas-eland-paintings",
  "kamberg-rock-art-south-africas-shaman-scenes",
  "main-caves-south-africas-battle-paintings",
  "didima-south-africas-mythological-figures",
  "injisuthi-south-africas-procession-friezes",
]);

export function applyEditorialContent(article: Article): Article {
  let category = article.category || "Latest Discoveries";
  let categorySlug = article.categorySlug || "latest-discoveries";
  let era = article.era || "Archaeology";

  if (PALEONTOLOGY_SLUGS.has(article.slug)) {
    category = "Paleontology";
    categorySlug = "paleontology";
    era = "Deep Time";
  } else if (FINDS_SLUGS.has(article.slug)) {
    category = "Archaeology's Greatest Finds";
    categorySlug = "archaeology-greatest-finds";
    era = "Artifacts";
  } else if (article.slug) {
    category = "Latest Discoveries";
    categorySlug = "latest-discoveries";
    era = "Discoveries";
  }

  const editorial = editorialBySlug.get(article.slug);
  if (editorial) {
    return {
      ...article,
      category,
      categorySlug,
      era,
      excerpt: editorial.excerpt,
      content: editorial.content,
      readingTime: Math.max(3, Math.ceil(editorial.content.split(/\s+/).filter(Boolean).length / 190)) + " min read",
      author: "PaleoLore Editorial Desk",
    };
  }
  if (!article.sourceUrl?.startsWith(REFERENCE_ORIGIN)) return article;
  return {
    ...article,
    category,
    categorySlug,
    era,
    excerpt: "This archive entry is awaiting an original editorial note.",
    content: "This archive entry is not published until it has been independently researched and written by the PaleoLore editorial team.",
    readingTime: "1 min read",
    author: "PaleoLore Editorial Desk",
    archivePlaceholder: true,
  };
}

export const categories: Category[] = [
  { name: "Latest Discoveries", slug: "latest-discoveries", eyebrow: "DISCOVERIES" },
  { name: "Archaeology's Greatest Finds", slug: "archaeology-greatest-finds", eyebrow: "ARTIFACTS" },
  { name: "Paleontology", slug: "paleontology", eyebrow: "DEEP TIME" },
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
  author: "PaleoLore Editorial Desk",
  image: article.image,
  sourceUrl: article.sourceUrl,
  sourceImageUrl: article.sourceImageUrl,
  featured: index === 0,
  status: "published",
}));

export function getCategory(slug: string) { return categories.find((category) => category.slug === slug); }