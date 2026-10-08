import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://thearchaeologist.thegoatfx-stategy.chatgpt.site").replace(/\/$/, "");
const siteTitle = "The Archaeologist — Archaeology & Prehistory Magazine";
const siteDescription = "An independent English magazine about archaeology, prehistory, artifacts, paleontology and ancient civilizations.";
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | The Archaeologist" },
  description: siteDescription,
  keywords: ["archaeology", "prehistory", "paleontology", "artifacts", "ancient civilizations", "human evolution"],
  authors: [{ name: "The Archaeologist" }],
  creator: "The Archaeologist",
  publisher: "The Archaeologist",
  alternates: { canonical: "/" },
  icons: { icon: "/archaeologist-logo.png", shortcut: "/archaeologist-logo.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: "The Archaeologist",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    locale: "en_US",
    images: [{ url: siteUrl + "/archaeologist-logo.png", width: 512, height: 512, alt: "The Archaeologist prehistoric stone logo" }],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: [siteUrl + "/archaeologist-logo.png"] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Archaeologist",
  url: siteUrl,
  description: siteDescription,
  publisher: { "@type": "Organization", name: "The Archaeologist", url: siteUrl, logo: { "@type": "ImageObject", url: siteUrl + "/archaeologist-logo.png" } },
  potentialAction: { "@type": "SearchAction", target: siteUrl + "/blog?q={search_term_string}", "query-input": "required name=search_term_string" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{adsenseClient && <script async src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(adsenseClient)} crossOrigin="anonymous" />}</body></html>;
}
