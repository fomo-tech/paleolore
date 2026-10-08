import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

export const metadata = { title: "Archive", description: "The latest stories about archaeology, prehistory and paleontology." };

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const articles = await getPublishedArticles();
  const query = (await searchParams).q?.toLowerCase().trim();
  const filtered = query ? articles.filter((article) => `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query)) : articles;
  return <><SiteHeader /><main className="shell blog-hero"><span className="eyebrow">THE ARCHIVE / ALL NOTES</span><h1>The archive<br /><em>never sleeps.</em></h1><p>Every story is a piece of evidence: read slowly, placed in context and retold in the language of the present.</p><div className="filter-bar"><Link href="/blog">All</Link>{categories.map((category) => <Link href={`/categories/${category.slug}`} key={category.slug}>{category.name}</Link>)}<form action="/blog" className="search-form"><input name="q" defaultValue={query} placeholder="Search stories" /><button type="submit">⌕</button></form></div><div className="article-list">{filtered.length ? filtered.map((article) => <ArticleCard article={article} key={article.slug} />) : <div className="empty-state"><h2>No traces found</h2><p>Try a different keyword in the archive.</p></div>}</div></main></>;
}