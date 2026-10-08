import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy, cookies and advertising information for readers of The Archaeologist.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() { return <><SiteHeader /><main className="shell about-page" id="main-content"><span className="eyebrow">READER POLICY</span><h1>Privacy</h1><div className="about-copy"><div><p>This policy explains how The Archaeologist handles information used to operate the newsletter, editorial CMS, site security and audience measurement.</p><p>If advertising is enabled, Google and other advertising partners may use cookies or similar technologies under their own policies. Readers can manage cookies through their browser settings and any consent controls shown on the site.</p><p>We do not sell reader information. Third-party links on article pages lead to external sites with their own privacy policies.</p></div><div className="manifesto"><span className="eyebrow">Contact</span><p>For questions about personal data, advertising or content, contact the website administrator associated with this publication.</p></div></div></main></>; }
