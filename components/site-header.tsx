import Link from "next/link";

const nav = [["Explore", "/blog"], ["Prehistory", "/categories/prehistory"], ["Civilizations", "/categories/civilizations"], ["Paleontology", "/categories/paleontology"]];

export function SiteHeader() {
  return <header className="site-header">
    <div className="topline"><span>FIELD NOTES FROM THE OLDEST LAYERS</span><span className="topline-right">Archaeology magazine · 2026</span></div>
    <div className="masthead shell"><Link href="/" className="brand" aria-label="The Archaeologist - Home"><span className="brand-logo-wrap"><img className="brand-logo" src="/archaeologist-logo.png" alt="" /></span><span><strong>THE</strong><b>ARCHAEOLOGIST</b></span></Link><div className="masthead-note">History does not disappear.<br />It simply lies deeper.</div><Link href="/admin" className="editor-link">CMS / EDITORIAL</Link></div>
    <nav className="main-nav shell" aria-label="Main navigation">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/about">About us</Link><Link href="/blog" className="nav-search">Search the archive <span aria-hidden="true">⌕</span></Link></nav>
  </header>;
}