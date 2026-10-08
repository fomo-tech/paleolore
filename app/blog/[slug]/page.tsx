/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { articleToJsonLd, getArticleBySlug, getPublishedArticles } from "@/lib/articles";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://thearchaeologist.org").replace(/\/$/, "");

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return (await getPublishedArticles()).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug);
  if (!article) return {};
  const canonical = "/blog/" + article.slug;
  const image = article.image ? new URL(article.image, siteUrl).toString() : undefined;
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    alternates: { canonical },
    authors: [{ name: article.author || "The Archaeologist" }],
    openGraph: {
      type: "article",
      url: siteUrl + canonical,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date || undefined,
      authors: article.author ? [article.author] : undefined,
      section: article.category,
      images: image ? [{ url: image, alt: article.title }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: article.title, description: article.excerpt, images: image ? [image] : undefined },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticleBySlug((await params).slug);
  if (!article || article.status === "draft") notFound();

  const allArticles = await getPublishedArticles();
  const paragraphs = article.content.split(/\n\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const related = allArticles.filter((candidate) => candidate.slug !== article.slug && candidate.categorySlug === article.categorySlug).slice(0, 3);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
      { "@type": "ListItem", position: 2, name: article.category, item: siteUrl + "/categories/" + article.categorySlug },
      { "@type": "ListItem", position: 3, name: article.title, item: siteUrl + "/blog/" + article.slug },
    ],
  };

  return <><SiteHeader /><main className="shell article-layout" id="main-content"><article>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href={"/categories/" + article.categorySlug}>{article.category}</Link><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span></nav>
    <header className="article-header"><div className="article-meta"><span>{article.category}</span><span>{article.era}</span><span>{article.readingTime}</span></div><h1 className="article-title">{article.title}</h1><p className="article-dek">{article.excerpt}</p><div className="article-byline"><span>By {article.author || "The Archaeologist"}</span><time dateTime={article.date || undefined}>{article.date || "Archive note"}</time></div></header>
    {article.image && <figure className="article-cover"><img src={article.image} alt={article.title} width="1600" height="900" fetchPriority="high" /><figcaption>Cover image imported from the reference archive{article.sourceUrl && <> · <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">View original source</a></>}</figcaption></figure>}
    <div className="article-content">{paragraphs.map((paragraph, index) => <p className={index === 0 ? "article-lede" : undefined} key={index}>{paragraph}</p>)}</div>
    <div className="share-row"><span>Share this note</span><Link href={"mailto:?subject=" + encodeURIComponent(article.title)}>Email</Link><Link href="/blog">More stories</Link>{article.sourceUrl && <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Original source</a>}</div>
    {related.length > 0 && <section className="article-related" aria-labelledby="related-heading"><div className="section-heading"><div><span className="eyebrow">CONTINUE READING</span><h2 id="related-heading">More from the archive</h2></div><Link className="text-link" href="/blog">View all stories</Link></div><div className="related-grid">{related.map((candidate) => <ArticleCard article={candidate} key={candidate.slug} />)}</div></section>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleToJsonLd(article)) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
  </article><aside className="article-aside"><AdSlot label="Advertising space" /><div className="article-aside-note"><span className="eyebrow">RESEARCH NOTE</span><p>The Archaeologist separates news, interpretation and speculation. Every story begins with a specific trace.</p></div></aside></main></>;
}
