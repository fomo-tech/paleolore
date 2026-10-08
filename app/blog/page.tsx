import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse English-language stories about archaeology, prehistory, paleontology, artifacts and ancient civilizations.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const articles = await getPublishedArticles();
  const query = (await searchParams).q?.toLowerCase().trim();
  const filtered = query ? articles.filter((article) => (article.title + " " + article.excerpt + " " + article.category).toLowerCase().includes(query)) : articles;
  const resultLabel = query ? "Showing " + filtered.length + " result" + (filtered.length === 1 ? "" : "s") + " for “" + query + "”" : filtered.length + " field notes in the archive";
  return <><SiteHeader /><main className="shell blog-hero" id="main-content"><span className="eyebrow">THE ARCHIVE / ALL NOTES</span><h1>The archive<br /><em>never sleeps.</em></h1><p>Every story is a piece of evidence: read slowly, placed in context and retold in the language of the present.</p><div className="filter-bar"><span className="filter-label">Browse by subject</span><Link href="/blog" aria-current={!query ? "page" : undefined}>All stories</Link>{categories.map((category) => <Link href={"/categories/" + category.slug} key={category.slug}>{category.name}</Link>)}<form action="/blog" className="search-form" role="search"><label className="sr-only" htmlFor="archive-search">Search stories</label><input id="archive-search" name="q" defaultValue={query} placeholder="Search stories" /><button type="submit" aria-label="Submit search">⌕</button></form></div><div className="archive-result-count">{resultLabel}</div><div className="article-list">{filtered.length ? filtered.map((article) => <ArticleCard article={article} key={article.slug} />) : <div className="empty-state"><h2>No traces found</h2><p>Try a different keyword in the archive.</p><Link className="text-link" href="/blog">Reset the search</Link></div>}</div></main></>;
}
