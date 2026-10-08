import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About The Archaeologist",
  description: "The editorial note and approach behind The Archaeologist.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() { return <><SiteHeader /><main className="shell about-page" id="main-content"><span className="eyebrow">EDITORIAL NOTE / 001</span><h1>The past is not<br /><em>a sealed room.</em></h1><div className="about-copy"><p>The Archaeologist is an independent magazine for people who want to see history through material evidence: a shard of pottery, a layer of ash, a footprint or a city buried by time.</p><div className="manifesto"><span className="eyebrow">We believe</span><p>Archaeology is not only the search for what is old. It is a way to ask how people lived, adapted, invented and imagined the future.</p><p>We tell sourced stories, respect uncertainty and always distinguish evidence from interpretation.</p></div></div></main></>; }
