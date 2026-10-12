/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const isLocalImage = Boolean(article.image?.startsWith("/"));
  return <article className={featured ? "article-card article-card-featured" : "article-card"}>
    <Link className="article-image" href={"/blog/" + article.slug} aria-label={"Read " + article.title}>
      {article.image && isLocalImage && <Image src={article.image} alt={article.title} fill sizes={featured ? "(max-width: 800px) 100vw, 65vw" : "(max-width: 800px) 100vw, 35vw"} priority={featured} />}
      {article.image && !isLocalImage && <img src={article.image} alt={article.title} loading={featured ? "eager" : "lazy"} decoding="async" />}
      <span className="image-wash" aria-hidden="true" />
    </Link>
    <div className="article-card-body"><div className="article-meta"><span>{article.category}</span><span>{article.readingTime}</span></div><h3><Link href={"/blog/" + article.slug}>{article.title}</Link></h3><p>{article.excerpt}</p><div className="article-byline"><span>{article.author}</span><span>{article.date || "Archive note"}</span></div><Link className="card-read-link" href={"/blog/" + article.slug}>Read field note <span aria-hidden="true">↗</span></Link></div>
  </article>;
}
