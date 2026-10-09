import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { getPublishedArticles } from "@/lib/articles";
import { getCategory } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const category = getCategory((await params).slug);
  if (!category) return {};
  return {
    title: category.name,
    description: "Explore " + category.name.toLowerCase() + " stories from The Archaeologist archive.",
    alternates: { canonical: "/categories/" + category.slug },
    robots: category.filterSlug ? { index: false, follow: true } : undefined,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  const filterSlug = category.filterSlug || category.slug;
  const articles = (await getPublishedArticles()).filter((article) => article.categorySlug === filterSlug);
  return <><SiteHeader /><main className="shell category-page" id="main-content"><span className="eyebrow">{category.eyebrow}</span><h1>{category.name}</h1><p className="category-intro">A single layer in humanity’s map of memory. Explore carefully sourced field notes, discoveries and context from the archive.</p><div className="archive-result-count">{articles.length} field note{articles.length === 1 ? "" : "s"} in this subject</div><div className="article-list">{articles.length ? articles.map((article) => <ArticleCard article={article} key={article.slug} />) : <div className="empty-state"><h2>No notes in this layer yet</h2><p>Return to the full archive to explore every subject.</p></div>}</div></main></>;
}
