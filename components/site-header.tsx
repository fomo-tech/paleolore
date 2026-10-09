import Image from "next/image";
import Link from "next/link";
import { ArchiveSearch } from "@/components/archive-search";

const nav = [["Explore", "/blog"], ["Discoveries", "/categories/latest-discoveries"], ["Ancient worlds", "/categories/archaeology-greatest-finds"], ["Paleontology", "/categories/paleontology"]];

export function SiteHeader() {
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <div className="topline"><span>FIELD NOTES FROM THE OLDEST LAYERS</span><span className="topline-right">Archaeology magazine · 2026</span></div>
    <div className="masthead shell"><Link href="/" className="brand" aria-label="The Archaeologist - Home"><span className="brand-logo-wrap"><Image className="brand-logo" src="/archaeologist-logo.png" alt="" width={512} height={512} priority /></span><span><strong>THE</strong><b>ARCHAEOLOGIST</b></span></Link><div className="masthead-note">History does not disappear.<br />It simply lies deeper.</div></div>
    <nav className="main-nav shell" aria-label="Main navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/about">About us</Link><ArchiveSearch className="nav-search search-trigger" /></nav>
  </header>;
}
