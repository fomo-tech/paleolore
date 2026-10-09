import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested field note could not be found in The Archaeologist archive.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <>
    <SiteHeader />
    <main className="shell not-found-page" id="main-content">
      <div className="not-found-mark" aria-hidden="true">404</div>
      <span className="eyebrow">FIELD NOTE / LAYER MISSING</span>
      <h1>This layer<br /><em>is missing.</em></h1>
      <p>The page you are looking for may have moved deeper into the archive, or the trail may have ended here.</p>
      <div className="not-found-actions">
        <Link className="button button-dark" href="/blog">Explore the archive</Link>
        <Link className="text-link" href="/">Return to the surface</Link>
      </div>
    </main>
  </>;
}