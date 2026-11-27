import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { EMAIL } from "@/lib/email";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Wanderer Tribe collects, uses and protects your personal information when you visit the site, enquire or book a trip.",
  path: "/Privacy",
});

export default function PrivacyPage() {
  return (
    <article className="py-[var(--section-gap-s)]" aria-labelledby="legal-title">
      <div className="container legal-grid">
        <header className="legal-head">
          <h1 id="legal-title" className="text-display-s">Privacy Policy</h1>
          <p className="text-quiet">Last updated: October 2025</p>
        </header>

        <nav aria-label="Contents" className="legal-toc">
          <p className="text-sm text-quiet">Contents</p>
          <ol>
              <li><a href="#section-1" className="link-quiet">1. Introduction</a></li>
              <li><a href="#section-2" className="link-quiet">2. Information We Collect</a></li>
              <li><a href="#section-3" className="link-quiet">3. How We Use Your Information</a></li>
              <li><a href="#section-4" className="link-quiet">4. Data Protection & Security</a></li>
              <li><a href="#section-5" className="link-quiet">5. Sharing of Information</a></li>
              <li><a href="#section-6" className="link-quiet">6. Cookies & Tracking Technologies</a></li>
              <li><a href="#section-7" className="link-quiet">7. Your Rights</a></li>
              <li><a href="#section-8" className="link-quiet">8. Data Retention</a></li>
              <li><a href="#section-9" className="link-quiet">9. Third-Party Links</a></li>
              <li><a href="#section-10" className="link-quiet">10. Updates to This Policy</a></li>
              <li><a href="#section-11" className="link-quiet">11. Contact Us</a></li>
          </ol>
        </nav>

        <div className="legal">

          <section id="section-1" aria-labelledby="section-1-title">
            <h2 id="section-1-title" className="break-words min-w-0">
              1. Introduction
            </h2>
            <p>
              Wanderer Tribe (“we,” “our,” “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website, book experiences, or use our services.
            </p>
          </section>

          <section id="section-2" aria-labelledby="section-2-title">
            <h2 id="section-2-title" className="break-words min-w-0">
              2. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>Personal details (name, email, phone number, address)</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Travel preferences, booking history, and communication records</li>
              <li>Device and usage data (browser type, IP address, location, cookies)</li>
            </ul>
          </section>

          <section id="section-3" aria-labelledby="section-3-title">
            <h2 id="section-3-title" className="break-words min-w-0">
              3. How We Use Your Information
            </h2>
            <p>We use your data to:</p>
            <ul>
              <li>Process bookings and manage travel arrangements</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our services and personalize your experience</li>
              <li>Send updates, offers, and travel inspiration (you can opt out anytime)</li>
              <li>Comply with legal obligations and prevent fraudulent activity</li>
            </ul>
          </section>

          <section id="section-4" aria-labelledby="section-4-title">
            <h2 id="section-4-title" className="break-words min-w-0">
              4. Data Protection & Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Sensitive information, such as payment details, is transmitted securely using encryption. However, no online system is 100% secure, and you share information at your own risk.
            </p>
          </section>

          <section id="section-5" aria-labelledby="section-5-title">
            <h2 id="section-5-title" className="break-words min-w-0">
              5. Sharing of Information
            </h2>
            <p>
              We only share your information with trusted third parties when necessary to provide our services (such as travel partners, payment processors, and email service providers). We do not sell or rent your personal data to marketers or advertisers.
            </p>
          </section>

          <section id="section-6" aria-labelledby="section-6-title">
            <h2 id="section-6-title" className="break-words min-w-0">
              6. Cookies & Tracking Technologies
            </h2>
            <p>
              Our website uses cookies to enhance user experience, analyze site traffic, and improve functionality. You can choose to disable cookies in your browser settings, though some features may not work properly without them.
            </p>
          </section>

          <section id="section-7" aria-labelledby="section-7-title">
            <h2 id="section-7-title" className="break-words min-w-0">
              7. Your Rights
            </h2>
            <p>
              Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, contact us at{" "}
              <a href={`mailto:${EMAIL.privacy}`} className="link">
                {EMAIL.privacy}
              </a>.
            </p>
          </section>

          <section id="section-8" aria-labelledby="section-8-title">
            <h2 id="section-8-title" className="break-words min-w-0">
              8. Data Retention
            </h2>
            <p>
              We retain your data only as long as necessary to fulfill the purposes described in this policy or as required by law. When data is no longer needed, it is securely deleted or anonymized.
            </p>
          </section>

          <section id="section-9" aria-labelledby="section-9-title">
            <h2 id="section-9-title" className="break-words min-w-0">
              9. Third-Party Links
            </h2>
            <p>
              Our site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. Please review their privacy policies before sharing any personal data.
            </p>
          </section>

          <section id="section-10" aria-labelledby="section-10-title">
            <h2 id="section-10-title" className="break-words min-w-0">
              10. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy occasionally. The latest version will always be available on this page, and significant changes will be communicated through our website or email.
            </p>
          </section>

          <section id="section-11" aria-labelledby="section-11-title">
            <h2 id="section-11-title" className="break-words min-w-0">
              11. Contact Us
            </h2>
            <p>
              For questions, concerns, or data requests, please reach out to us at{" "}
              <a href={`mailto:${EMAIL.privacy}`} className="link">
                {EMAIL.privacy}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
