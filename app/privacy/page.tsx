import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy | PaleoLore",
  description: "Privacy policy, cookies disclosure, Google AdSense terms and data rights for readers of PaleoLore Magazine.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="shell about-page" id="main-content">
        <span className="eyebrow">EDITORIAL &amp; READER POLICY</span>
        <h1>Privacy Policy</h1>
        <p className="category-intro" style={{ maxWidth: "780px" }}>
          At PaleoLore (accessible from <Link className="text-link" href="/">https://www.paleolore.com</Link>), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by PaleoLore and how we use it.
        </p>

        <div className="article-layout" style={{ paddingTop: "20px" }}>
          <div className="article-content" style={{ maxWidth: "800px" }}>
            <h2>1. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our editorial desk at <a className="text-link" href="mailto:contact@paleolore.com">contact@paleolore.com</a>.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              PaleoLore operates as an independent digital magazine focusing on archaeology, paleontology, and human prehistory. We only collect personal information that you voluntarily provide to us when you subscribe to our newsletter, submit editorial inquiries, or contact us directly.
            </p>
            <p>
              If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>

            <h2>3. Log Files and Web Analytics</h2>
            <p>
              PaleoLore follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting services do this as part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>

            <h2>4. Cookies and Web Beacons</h2>
            <p>
              Like any other website, PaleoLore uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>

            <h2>5. Google DoubleClick DART Cookie &amp; Advertising Partners</h2>
            <p>
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <a className="text-link" href="https://www.paleolore.com">www.paleolore.com</a> and other sites on the internet.
            </p>
            <p>
              Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:{" "}
              <a className="text-link" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                https://policies.google.com/technologies/ads
              </a>
            </p>
            <p>
              Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
            </p>
            <ul>
              <li>
                <strong>Google AdSense:</strong>{" "}
                <a className="text-link" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                  https://policies.google.com/technologies/ads
                </a>
              </li>
            </ul>
            <p>
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on PaleoLore, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p>
              Note that PaleoLore has no access to or control over these cookies that are used by third-party advertisers. You may opt out of personalized advertising by visiting{" "}
              <a className="text-link" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>{" "}
              or{" "}
              <a className="text-link" href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                aboutads.info
              </a>.
            </p>

            <h2>6. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p>
              Under the CCPA, among other rights, California consumers have the right to request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers, request deletion of collected personal data, and request that a business that sells a consumer&apos;s personal data not sell the consumer&apos;s personal data.
            </p>
            <p>
              PaleoLore does not sell reader personal data. If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
            </p>

            <h2>7. GDPR Data Protection Rights</h2>
            <p>
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul>
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>

            <h2>8. Children&apos;s Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. PaleoLore does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>

            <h2>9. Updates to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted.
            </p>
            <p><em>Last updated: October 16, 2026.</em></p>
          </div>

          <aside className="article-aside">
            <div className="manifesto" style={{ marginBottom: "25px" }}>
              <span className="eyebrow">EDITORIAL DESK</span>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                PaleoLore is dedicated to transparency in both our historical sourcing and our reader privacy standards.
              </p>
            </div>
            <div className="manifesto">
              <span className="eyebrow">CONTACT</span>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                Questions regarding data protection or editorial inquiries:
              </p>
              <p style={{ fontSize: "13px" }}>
                <strong>Email:</strong><br />
                <a className="text-link" href="mailto:contact@paleolore.com">contact@paleolore.com</a>
              </p>
              <p style={{ fontSize: "13px" }}>
                <strong>Editorial Office:</strong><br />
                PaleoLore Magazine<br />
                <Link className="text-link" href="/contact">Visit Contact Desk &rarr;</Link>
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
