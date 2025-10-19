"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <section className="min-h-screen bg-wanderer-moss text-neutral-800 py-16 px-6 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10"
      >
        <h1 className="text-4xl font-heading text-wanderer-gold mb-8 text-center">
          Wanderer Tribe – Privacy Policy
        </h1>

        <p className="text-sm text-neutral-500 mb-10 text-center">
          Last updated: October 2025
        </p>

        <div className="space-y-8 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              1. Introduction
            </h2>
            <p>
              Wanderer Tribe (“we,” “our,” “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website, book experiences, or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              2. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Personal details (name, email, phone number, address)</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Travel preferences, booking history, and communication records</li>
              <li>Device and usage data (browser type, IP address, location, cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              3. How We Use Your Information
            </h2>
            <p>We use your data to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Process bookings and manage travel arrangements</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our services and personalize your experience</li>
              <li>Send updates, offers, and travel inspiration (you can opt out anytime)</li>
              <li>Comply with legal obligations and prevent fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              4. Data Protection & Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Sensitive information, such as payment details, is transmitted securely using encryption. However, no online system is 100% secure, and you share information at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              5. Sharing of Information
            </h2>
            <p>
              We only share your information with trusted third parties when necessary to provide our services — such as travel partners, payment processors, and email service providers. We do not sell or rent your personal data to marketers or advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              6. Cookies & Tracking Technologies
            </h2>
            <p>
              Our website uses cookies to enhance user experience, analyze site traffic, and improve functionality. You can choose to disable cookies in your browser settings, though some features may not work properly without them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              7. Your Rights
            </h2>
            <p>
              Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@wanderertribe.com" className="text-wanderer-gold underline">
                privacy@wanderertribe.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              8. Data Retention
            </h2>
            <p>
              We retain your data only as long as necessary to fulfill the purposes described in this policy or as required by law. When data is no longer needed, it is securely deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              9. Third-Party Links
            </h2>
            <p>
              Our site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. Please review their privacy policies before sharing any personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              10. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy occasionally. The latest version will always be available on this page, and significant changes will be communicated through our website or email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              11. Contact Us
            </h2>
            <p>
              For questions, concerns, or data requests, please reach out to us at{" "}
              <a href="mailto:privacy@wanderertribe.com" className="text-wanderer-gold underline">
                privacy@wanderertribe.com
              </a>.
            </p>
          </section>
        </div>

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Wanderer Tribe. All rights reserved.
        </footer>
      </motion.div>
    </section>
  );
}
