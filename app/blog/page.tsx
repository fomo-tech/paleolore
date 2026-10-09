import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

function normalizeSearch(value = "") {
  return value.toLocaleLowerCase("en-US").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim();
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const query = (await searchParams).q?.trim();
  const hasQuery = Boolean(query);
  return {
    title: hasQuery ? "Search: " + query : "Archive",
    description: "Browse English-language stories about archaeology, prehistory, paleontology, artifacts and ancient civilizations.",
    alternates: { canonical: "/blog" },
    robots: hasQuery ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const articles = await getPublishedArticles();
  const rawQuery = (await searchParams).q || "";
  const query = normalizeSearch(rawQuery);
  const terms = query.split(/\s+/).filter(Boolean);
  const filtered = query ? articles.filter((article) => {
    const haystack = normalizeSearch([article.title, article.slug, article.excerpt, article.content, article.category, article.categorySlug, article.era, article.author].join(" "));
    return terms.every((term) => haystack.includes(term));
  }) : articles;
  const resultLabel = query ? "Showing " + filtered.length + " result" + (filtered.length === 1 ? "" : "s") + " for “" + rawQuery.trim() + "”" : filtered.length + " field notes in the archive";

  return <><SiteHeader /><main className="shell blog-hero" id="main-content"><span className="eyebrow">THE ARCHIVE / ALL NOTES</span><h1>The archive<br /><em>never sleeps.</em></h1><p>Every story is a piece of evidence: read slowly, placed in context and retold in the language of the present.</p>
    <div className="filter-bar" aria-label="Archive filters">
      <div className="filter-heading"><span className="filter-label">Browse by subject</span><span className="filter-count">{categories.length + 1} sections</span></div>
      <div className="filter-links"><Link href="/blog" aria-current={!query ? "page" : undefined}>All stories</Link>{categories.map((category) => <Link href={"/categories/" + category.slug} key={category.slug}>{category.name}</Link>)}</div>
      <form action="/blog" method="get" className="search-form" role="search"><label className="sr-only" htmlFor="archive-search">Search stories</label><input id="archive-search" type="search" name="q" defaultValue={rawQuery} placeholder="Search stories" autoComplete="off" enterKeyHint="search" /><button type="submit" aria-label="Search the archive">Search</button></form>
    </div>
    <div className="archive-result-count" aria-live="polite">{resultLabel}</div><div className="article-list">{filtered.length ? filtered.map((article) => <ArticleCard article={article} key={article.slug} />) : <div className="empty-state"><h2>No traces found</h2><p>Try a different keyword in the archive.</p><Link className="text-link" href="/blog">Reset the search</Link></div>}</div></main></>;
}
