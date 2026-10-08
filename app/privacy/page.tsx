import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() { return <><SiteHeader /><main className="shell about-page"><span className="eyebrow">READER POLICY</span><h1>Privacy</h1><div className="about-copy"><div><p>This site uses only the data needed to operate the newsletter, CMS and content measurement. We do not sell reader information.</p><p>If advertising is enabled, some advertising partners may use cookies or similar technologies under their own policies.</p></div><div className="manifesto"><span className="eyebrow">Contact</span><p>For questions about personal data or content on this site, contact the editorial desk through the website administrator email.</p></div></div></main></>; }