"use client";

import { useCtaModal } from "@/context/CTAModalContext";
import { useState } from "react";
import { Check, ChevronDown, Copy, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default function ContactPage() {
  const { openCta } = useCtaModal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          category: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      raw: "info@wanderertribe.com",
      value: (
        <a href="mailto:info@wanderertribe.com" className="link">
          info@wanderertribe.com
        </a>
      ),
    },
    {
      icon: Phone,
      title: "Phone",
      raw: "+31 6 13227086",
      value: (
        <a href="tel:+31613227086" className="link">
          +31 6 13227086
        </a>
      ),
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      raw: "+31 6 13227086",
      value: (
        <a
          href="https://wa.me/31613227086"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Chat on WhatsApp
        </a>
      ),
    },
    {
      icon: MapPin,
      title: "Address",
      raw: "347F+4C3, Kariguni, Kenol Town, Murang'a, County Supermarket Building, First Floor",
      value: (
        <address className="not-italic">
          347F+4C3, Kariguni <br />
          Kenol Town, Murang&apos;a <br />
          County Supermarket Building, First Floor
        </address>
      ),
    },
  ];

  return (
    <>
      <section aria-labelledby="contact-title" className="pt-[var(--space-3xl)] pb-[var(--section-gap-s)]">
        <div className="container grid gap-x-[var(--gap-columns)] gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h1 id="contact-title" className="text-display">Contact us</h1>
              <p className="lead text-ink-2">
                For travel inquiries, collaborations, or support, reach out using the form or the
                details below. Our team will respond promptly.
              </p>
            </div>

            <dl className="contact-list">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="contact-row">
                    <Icon aria-hidden="true" size={20} className="text-signal mt-1 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <dt className="text-sm text-quiet">{item.title}</dt>
                      <dd className="m-0">{item.value}</dd>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.raw, i)}
                      className="icon-btn"
                      aria-label={copiedIndex === i ? `${item.title} copied` : `Copy ${item.title} to clipboard`}
                    >
                      {copiedIndex === i ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
                    </button>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={handleSubmit} className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="field-label">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="field-label">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="contact-category" className="field-label">Inquiry type</label>
                <div className="select-wrap">
                  <select
                    id="contact-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="field-input"
                  >
                    <option value="">Select</option>
                    <option value="booking">Booking</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="general">General</option>
                  </select>
                  <ChevronDown aria-hidden="true" size={18} />
                </div>
              </div>

              <div>
                <label htmlFor="contact-country" className="field-label">Country or region (optional)</label>
                <input
                  id="contact-country"
                  type="text"
                  name="country"
                  autoComplete="country-name"
                  onChange={handleChange}
                  className="field-input"
                  placeholder="e.g. Kenya"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="field-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="field-input resize-y"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn btn-primary">
                  Send message
                </button>

                <p role="status" className="text-sm text-ink-2">
                  {isSubmitted ? "Thank you! We'll get back to you soon." : ""}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-plan-title" className="field py-[var(--section-gap-s)]">
        <div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h2 id="contact-plan-title" className="text-field-ink">Plan a trip with us</h2>
            <p className="lead text-field-muted">
              Reach out today and let us help you plan a unique experience you will never forget.
            </p>
          </div>
          <button type="button" onClick={() => openCta()} className="btn btn-primary">
            Plan a trip
          </button>
        </div>
      </section>
    </>
  );
}
