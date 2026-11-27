import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply when you book or use Wanderer Tribe.",
};

export default function TermsPage() {
  return (
    <article className="py-[var(--section-gap-s)]" aria-labelledby="legal-title">
      <div className="container legal-grid">
        <header className="legal-head">
          <h1 id="legal-title" className="text-display-s">Terms & Conditions</h1>
          <p className="text-quiet">Last updated: October 2025</p>
        </header>

        <nav aria-label="Contents" className="legal-toc">
          <p className="text-sm text-quiet">Contents</p>
          <ol>
              <li><a href="#section-1" className="link-quiet">1. Introduction</a></li>
              <li><a href="#section-2" className="link-quiet">2. Eligibility</a></li>
              <li><a href="#section-3" className="link-quiet">3. Booking & Payments</a></li>
              <li><a href="#section-4" className="link-quiet">4. User Responsibilities</a></li>
              <li><a href="#section-5" className="link-quiet">5. Intellectual Property</a></li>
              <li><a href="#section-6" className="link-quiet">6. Travel Risks & Liability</a></li>
              <li><a href="#section-7" className="link-quiet">7. Cancellations & Refunds</a></li>
              <li><a href="#section-8" className="link-quiet">8. Privacy</a></li>
              <li><a href="#section-9" className="link-quiet">9. Modifications</a></li>
              <li><a href="#section-10" className="link-quiet">10. Contact Us</a></li>
          </ol>
        </nav>

        <div className="legal">

          <section id="section-1" aria-labelledby="section-1-title">
            <h2 id="section-1-title" className="break-words min-w-0">
              1. Introduction
            </h2>
            <p>
              Welcome to Wanderer Tribe (“we,” “our,” “us”). By accessing or using our website, platform, or any of our services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section id="section-2" aria-labelledby="section-2-title">
            <h2 id="section-2-title" className="break-words min-w-0">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years old or the age of majority in your jurisdiction to use our services. By using Wanderer Tribe, you represent and warrant that you meet these eligibility requirements.
            </p>
          </section>

          <section id="section-3" aria-labelledby="section-3-title">
            <h2 id="section-3-title" className="break-words min-w-0">
              3. Booking & Payments
            </h2>
            <p>
              All bookings made through Wanderer Tribe are subject to availability and confirmation. Payments are processed securely through our approved gateways. Prices may change at any time before booking confirmation. Once confirmed, refunds or modifications are subject to our cancellation policy.
            </p>
          </section>

          <section id="section-4" aria-labelledby="section-4-title">
            <h2 id="section-4-title" className="break-words min-w-0">
              4. User Responsibilities
            </h2>
            <p>
              You agree to provide accurate, current, and complete information when making a booking or creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>
          </section>

          <section id="section-5" aria-labelledby="section-5-title">
            <h2 id="section-5-title" className="break-words min-w-0">
              5. Intellectual Property
            </h2>
            <p>
              All content on Wanderer Tribe, including text, images, graphics, logos, and code, is our property or licensed to us and protected under applicable copyright and trademark laws. You may not reproduce, distribute, or modify any part of the website without our prior written consent.
            </p>
          </section>

          <section id="section-6" aria-labelledby="section-6-title">
            <h2 id="section-6-title" className="break-words min-w-0">
              6. Travel Risks & Liability
            </h2>
            <p>
              Wanderer Tribe acts as a facilitator connecting travelers with trusted partners. We are not responsible for personal injury, property loss, or any damages arising from travel activities booked through our platform. Travelers are encouraged to obtain personal insurance and review local advisories before traveling.
            </p>
          </section>

          <section id="section-7" aria-labelledby="section-7-title">
            <h2 id="section-7-title" className="break-words min-w-0">
              7. Cancellations & Refunds
            </h2>
            <p>
              Our cancellation and refund terms vary by experience or trip package. Please review the cancellation policy displayed at checkout before completing payment. Refunds, if approved, will be processed within 14 business days to the original payment method.
            </p>
          </section>

          <section id="section-8" aria-labelledby="section-8-title">
            <h2 id="section-8-title" className="break-words min-w-0">
              8. Privacy
            </h2>
            <p>
              Your privacy is important to us. Please review our{" "}
              <a href="/privacy" className="link">
                Privacy Policy
              </a>{" "}
              to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section id="section-9" aria-labelledby="section-9-title">
            <h2 id="section-9-title" className="break-words min-w-0">
              9. Modifications
            </h2>
            <p>
              We may update these Terms at any time. The most current version will always be available on this page. By continuing to use Wanderer Tribe after updates, you agree to the revised Terms.
            </p>
          </section>

          <section id="section-10" aria-labelledby="section-10-title">
            <h2 id="section-10-title" className="break-words min-w-0">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:support@wanderertribe.com" className="link">
                support@wanderertribe.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
