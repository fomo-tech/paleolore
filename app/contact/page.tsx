"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  }

  return (
    <>
      <SiteHeader />
      <main className="shell about-page" id="main-content">
        <span className="eyebrow">EDITORIAL DESK &amp; INQUIRIES</span>
        <h1>Contact PaleoLore</h1>
        <p className="category-intro" style={{ maxWidth: "720px" }}>
          We welcome correspondence from archaeologists, researchers, students, and readers worldwide. Whether you have an editorial lead, a correction, or a press inquiry, our desk is open.
        </p>

        <div className="admin-grid" style={{ marginTop: "40px" }}>
          <div className="editor-panel" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
            <span className="eyebrow">DIRECT CORRESPONDENCE</span>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "28px", margin: "10px 0 20px", fontWeight: "400" }}>
              Send an inquiry
            </h2>

            {submitted ? (
              <div style={{ background: "#d6c19f", border: "1px solid var(--rust)", padding: "30px", marginTop: "15px" }}>
                <span className="eyebrow" style={{ color: "var(--rust)" }}>MESSAGE RECEIVED</span>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "22px", margin: "10px 0" }}>
                  Thank you for reaching out, {formData.name}.
                </h3>
                <p style={{ margin: "0 0 15px", color: "var(--ink)", fontSize: "15px" }}>
                  Your note has been dispatched to the PaleoLore editorial desk. We review every piece of correspondence carefully and reply within 24 to 48 business hours.
                </p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="editor-form" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="two-col">
                  <label>
                    Your name *
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </label>
                  <label>
                    Email address *
                    <input
                      required
                      type="email"
                      placeholder="jane@institution.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </label>
                </div>

                <label>
                  Inquiry subject
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ background: "#f7ead0", border: "1px solid var(--line)", padding: "11px 12px", color: "var(--ink)" }}
                  >
                    <option value="General inquiry">General reader inquiry</option>
                    <option value="Editorial pitch">Editorial pitch / Field research note</option>
                    <option value="Fact correction">Factual correction / Citation update</option>
                    <option value="Syndication">Syndication or Press inquiry</option>
                    <option value="Advertising">Advertising &amp; Sponsorship</option>
                  </select>
                </label>

                <label>
                  Message *
                  <textarea
                    required
                    rows={6}
                    placeholder="Provide details about your query or observation..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </label>

                <div className="form-actions" style={{ marginTop: "10px" }}>
                  <button type="submit" className="button button-dark">
                    Dispatch message &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="admin-list" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
            <span className="eyebrow">MAILING DESKS</span>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <strong style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "17px" }}>Editorial Desk</strong>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "var(--muted)" }}>
                  For pitches, archaeological field discoveries and research notes:
                </p>
                <a className="text-link" href="mailto:editorial@paleolore.com">editorial@paleolore.com</a>
              </div>

              <div>
                <strong style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "17px" }}>General &amp; Reader Support</strong>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "var(--muted)" }}>
                  For reader questions, newsletter subscriptions and general feedback:
                </p>
                <a className="text-link" href="mailto:contact@paleolore.com">contact@paleolore.com</a>
              </div>

              <div>
                <strong style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "17px" }}>Fact Checks &amp; Corrections</strong>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "var(--muted)" }}>
                  To submit a factual dispute or citation clarification regarding any published note:
                </p>
                <a className="text-link" href="mailto:corrections@paleolore.com">corrections@paleolore.com</a>
              </div>

              <div className="manifesto" style={{ marginTop: "10px" }}>
                <span className="eyebrow">EDITORIAL INTEGRITY</span>
                <p style={{ fontSize: "13px", marginTop: "8px" }}>
                  PaleoLore maintains independent editorial review. Every field report is checked against excavation papers and primary anthropological sources.
                </p>
                <p style={{ fontSize: "13px" }}>
                  Read our <Link className="text-link" href="/privacy">Privacy Policy</Link> and <Link className="text-link" href="/about">Editorial Statement</Link>.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
