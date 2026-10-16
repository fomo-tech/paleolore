import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About PaleoLore — Archaeology & Prehistory Magazine",
  description: "Learn about PaleoLore's editorial mission, peer-reviewed archaeological sourcing standards, and dedication to deep prehistory.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="shell about-page" id="main-content">
        <span className="eyebrow">EDITORIAL NOTE &amp; MISSION</span>
        <h1>
          The past is not<br />
          <em>a sealed room.</em>
        </h1>

        <div className="about-copy">
          <div>
            <p>
              <strong>PaleoLore</strong> is an independent digital magazine dedicated to examining the human story through material evidence: a fossilized hominin cranium in the Cradle of Humankind, a fragment of San ochre rock art in the Drakensberg, a layer of burnt bone, or an ancient stone blade knapped two million years ago.
            </p>
            <p>
              Our mission is to bridge the gap between academic peer-reviewed archaeology and curious readers worldwide. We believe that deep prehistory is not a distant, abstract timeline, but the foundation of human identity, adaptation, and culture.
            </p>
            <p>
              Every field note published on PaleoLore is researched, contextualized, and written with strict adherence to evidence-based reporting. We distinguish what has been physically recovered from what is theorized, respecting scientific uncertainty while celebrating the thrill of new discoveries.
            </p>
          </div>

          <div className="manifesto">
            <span className="eyebrow">OUR EDITORIAL CREED</span>
            <p>
              <strong>1. Evidence Before Sensation:</strong> We do not publish speculative myths or unverified folklore. Every story is rooted in verified excavations and physical artifacts.
            </p>
            <p>
              <strong>2. Respect for Deep Time:</strong> Human history is millions of years in the making. We treat ancient peoples as complex, inventive, and adaptable communities.
            </p>
            <p>
              <strong>3. Open Corrections:</strong> When dating techniques or genetic analyses revise previously held assumptions, we update our field notes openly and transparently.
            </p>
          </div>
        </div>

        <section className="section-block" style={{ paddingTop: "60px" }}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">HOW WE WORK</span>
              <h2>Editorial Standards &amp; Review</h2>
            </div>
          </div>

          <div className="featured-grid">
            <div style={{ background: "#e5cfaa", padding: "35px", border: "1px solid var(--line)" }}>
              <span className="eyebrow">VERIFIED SOURCING</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "24px", margin: "12px 0 16px" }}>
                Peer-Reviewed Foundations
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.7", margin: 0 }}>
                Our field notes draw directly from peer-reviewed scientific journals (including <em>Nature</em>, <em>Science</em>, <em>Journal of Archaeological Science</em>, and <em>South African Archaeological Bulletin</em>), archaeological field reports, and museum archives.
              </p>
            </div>

            <div style={{ background: "#e5cfaa", padding: "35px", border: "1px solid var(--line)" }}>
              <span className="eyebrow">INDEPENDENCE</span>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "24px", margin: "12px 0 16px" }}>
                Editorial Autonomy
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: "1.7", margin: 0 }}>
                PaleoLore maintains complete editorial independence. We do not accept paid placements masked as editorial commentary, nor do we compromise historical accuracy for commercial interest.
              </p>
            </div>
          </div>
        </section>

        <section className="section-block" style={{ paddingTop: "60px" }}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">CONTACT &amp; CORRESPONDENCE</span>
              <h2>Get in Touch with Our Desk</h2>
            </div>
          </div>
          <p style={{ maxWidth: "680px", color: "var(--muted)", fontSize: "17px", lineHeight: "1.65" }}>
            Have a question about a field note, a correction regarding a stratigraphical layer, or a research paper to share? Visit our dedicated desk:
          </p>
          <div style={{ marginTop: "24px", display: "flex", gap: "20px" }}>
            <Link className="button button-dark" href="/contact">
              Visit Contact Desk &rarr;
            </Link>
            <Link className="button" href="/blog">
              Explore Article Archive
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
