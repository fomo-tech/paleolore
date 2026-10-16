import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { ArticleCard } from "@/components/article-card";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Archaeology, Prehistory & Ancient Worlds",
  description: "Read clear, carefully sourced stories about archaeology, prehistory, human evolution, artifacts and ancient civilizations.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const articles = await getPublishedArticles();
  const [featured, ...latest] = articles;
  return <>
    <SiteHeader />
    <main id="main-content">
      <section className="hero shell" aria-labelledby="home-heading">
        <div className="hero-copy">
          <span className="eyebrow">THE ARCHIVE / ISSUE 01</span>
          <h1 id="home-heading">Stories<br /><em>beneath the soil</em></h1>
          <p>PaleoLore is an independent English magazine about archaeology, prehistory and the civilizations that laid the first stones of the world we know.</p>
          <div className="hero-actions"><Link className="button button-dark" href="/blog">Explore the archive</Link><Link className="text-link" href="/about">Read our editorial note</Link></div>
        </div>
        <div className="hero-art" aria-label="Prehistoric cave art and stone logo illustration" role="img"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="artifact-mark">✦</span><div className="strata strata-a" /><div className="strata strata-b" /><div className="strata strata-c" /><span className="hero-art-caption">FIELD NOTE 001<br />LAYER / MEMORY</span></div>
      </section>
      <div className="shell ad-wrap"><AdSlot label="Top advertising space" /></div>
      <section className="shell section-block" aria-labelledby="selected-heading"><div className="section-heading"><div><span className="eyebrow">SELECTED EVIDENCE</span><h2 id="selected-heading">Read from the field</h2></div><Link className="text-link" href="/blog">View all stories</Link></div><div className="featured-grid">{featured && <ArticleCard article={featured} featured />}{latest[0] && <ArticleCard article={latest[0]} />}</div></section>
      <section className="shell section-block" aria-labelledby="subjects-heading"><div className="section-heading"><div><span className="eyebrow">MAP OF THE PAST</span><h2 id="subjects-heading">Follow the traces</h2></div></div><div className="category-grid">{categories.map((category, index) => <Link className="category-tile" href={"/categories/" + category.slug} key={category.slug}><span className="category-index">0{index + 1}</span><span className="category-eyebrow">{category.eyebrow}</span><strong>{category.name}</strong><span className="category-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
      <section className="shell newsletter" aria-labelledby="newsletter-heading"><div><span className="eyebrow">FIELD NOTES / EVERY 2 WEEKS</span><h2 id="newsletter-heading">A letter from the past,<br />delivered to your inbox.</h2></div><form className="newsletter-form"><label className="sr-only" htmlFor="email">Email</label><input id="email" type="email" placeholder="Your email address" autoComplete="email" /><button className="button button-dark" type="submit">Subscribe</button></form></section>
    </main>
    <footer className="site-footer"><div className="shell footer-grid"><div><div className="footer-brand">PALEO<b>LORE</b></div><p>Read the past to see the present more clearly.</p></div><div><span className="eyebrow">Explore</span><Link href="/blog">Article archive</Link><Link href="/about">About us</Link><Link href="/contact">Contact desk</Link><Link href="/privacy">Privacy policy</Link></div><div><span className="eyebrow">The magazine</span><span>Discoveries · Prehistory</span><span>Artifacts · Paleontology</span><span>Independent editorial</span></div></div></footer>
  </>;
}
