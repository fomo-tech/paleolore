import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const imageStyle = article.image ? { backgroundImage: `linear-gradient(180deg, rgba(42,24,16,.08), rgba(42,24,16,.64)), url("${article.image}")` } : undefined;
  return <article className={featured ? "article-card article-card-featured" : "article-card"}><div className="article-image" style={imageStyle} role="img" aria-label={article.title}><span className="image-label">{article.era}</span><span className="image-glyph">{featured ? "◒" : "⌘"}</span></div><div className="article-card-body"><div className="article-meta"><span>{article.category}</span><span>{article.readingTime}</span></div><h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><div className="article-byline"><span>{article.author}</span><span>{article.date}</span></div></div></article>;
}