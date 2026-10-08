import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { getPublishedArticles } from "@/lib/articles";
import { getCategory } from "@/lib/content";
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { const category = getCategory((await params).slug); if (!category) notFound(); const articles = (await getPublishedArticles()).filter((article) => article.categorySlug === category.slug); return <><SiteHeader /><main className="shell category-page"><span className="eyebrow">{category.eyebrow}</span><h1>{category.name}</h1><p className="category-intro">Một lát cắt trong bản đồ ký ức của nhân loại.</p><div className="article-list">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div></main></> }