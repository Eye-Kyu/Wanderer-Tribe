"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-wanderer-moss text-neutral-800  py-16 px-6 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white shadow-md shadow-black  rounded-3xl p-10"
      >
        <h1 className="text-4xl font-heading text-wanderer-gold mb-8 text-center">
          Wanderer Tribe - Terms & Conditions
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
              Welcome to Wanderer Tribe (“we,” “our,” “us”). By accessing or using our website, platform, or any of our services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years old or the age of majority in your jurisdiction to use our services. By using Wanderer Tribe, you represent and warrant that you meet these eligibility requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              3. Booking & Payments
            </h2>
            <p>
              All bookings made through Wanderer Tribe are subject to availability and confirmation. Payments are processed securely through our approved gateways. Prices may change at any time before booking confirmation. Once confirmed, refunds or modifications are subject to our cancellation policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              4. User Responsibilities
            </h2>
            <p>
              You agree to provide accurate, current, and complete information when making a booking or creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              5. Intellectual Property
            </h2>
            <p>
              All content on Wanderer Tribe, including text, images, graphics, logos, and code, is our property or licensed to us and protected under applicable copyright and trademark laws. You may not reproduce, distribute, or modify any part of the website without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              6. Travel Risks & Liability
            </h2>
            <p>
              Wanderer Tribe acts as a facilitator connecting travelers with trusted partners. We are not responsible for personal injury, property loss, or any damages arising from travel activities booked through our platform. Travelers are encouraged to obtain personal insurance and review local advisories before traveling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              7. Cancellations & Refunds
            </h2>
            <p>
              Our cancellation and refund terms vary by experience or trip package. Please review the cancellation policy displayed at checkout before completing payment. Refunds, if approved, will be processed within 14 business days to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              8. Privacy
            </h2>
            <p>
              Your privacy is important to us. Please review our{" "}
              <a href="/privacy" className="text-wanderer-gold underline">
                Privacy Policy
              </a>{" "}
              to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              9. Modifications
            </h2>
            <p>
              We may update these Terms at any time. The most current version will always be available on this page. By continuing to use Wanderer Tribe after updates, you agree to the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-wanderer-moss mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:support@wanderertribe.com" className="text-wanderer-gold underline">
                support@wanderertribe.com
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
