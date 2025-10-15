"use client";

import { useCtaModal } from "@/context/CTAModalContext";
import CallToAction from "@/components/CallToAction";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const { showCta, openCta, closeCta } = useCtaModal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", category: "", message: "" });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#0E2A2A] text-white overflow-hidden">
      {/* Header Section */}
      <div className="w-full border-b border-wanderer-forest">
        <div className="flex flex-col justify-center items-start px-6 sm:px-10 md:px-20 pt-16 sm:pt-24 md:pt-28 space-y-6 text-left">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold">
            CONTACT US
          </h1>
          <p className="text-base sm:text-lg md:max-w-3xl leading-relaxed text-white/90">
            For travel inquiries, collaborations, or support, feel free to reach
            out using the form or through the details below — our team will
            respond promptly.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 bg-[#FAF6EF] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#DAD3C8] shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left — Contact Info */}
          <div className="flex flex-col items-center justify-center text-center md:text-left">
            <div className="space-y-5 w-full max-w-sm">
              {[
                {
                  icon: "✉️",
                  title: "Email",
                  value: "explore@wanderertribe.com",
                },
                { icon: "📞", title: "Phone", value: "+254 110036929" },
                {
                  icon: "📍",
                  title: "Address",
                  value: "La Casa De Papel — Rio De Janeiro, Brazil",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center md:justify-start gap-4 bg-white rounded-xl px-5 py-4 shadow-[inset_0_3px_10px_rgba(0,0,0,0.15)] hover:shadow-md transition"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#F5E1C0] rounded-full text-lg">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="font-medium text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-black/20 w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-black/20 p-3 focus:border-black outline-none text-black text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-black/20 p-3 focus:border-black outline-none text-black text-sm sm:text-base"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              {/* Inquiry + Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inquiry Type*
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-b border-black/20 p-3 focus:border-black outline-none text-black text-sm sm:text-base"
                  >
                    <option value="">Select</option>
                    <option value="booking">Booking</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    name="country"
                    onChange={handleChange}
                    className="w-full border-b border-black/20 p-3 focus:border-black outline-none text-black text-sm sm:text-base"
                    placeholder="e.g. Kenya"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-black/20 p-3 focus:border-black outline-none text-black h-28 sm:h-32 resize-none text-sm sm:text-base"
                  placeholder="Enter your message"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-wanderer-moss text-white font-medium hover:bg-[#B5661F] transition text-sm sm:text-base"
                >
                  Submit
                </button>
                {isSubmitted && (
                  <p className="text-green-600 text-sm">
                    Thank you! We&apos;ll get back to you soon.
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Final Call-to-Action */}
      <section className="relative py-16 px-4 sm:px-6 text-center bg-gradient-to-b from-[#0E2A2A] to-[#181818]">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Begin Your Journey
        </motion.h2>
        <motion.p
          className="text-white mb-6 max-w-md mx-auto text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Reach out today and let us help you plan a unique experience that you
          will never forget.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={openCta}
          className="px-8 py-3 rounded-full font-medium bg-wanderer-gold text-wanderer-moss hover:bg-wanderer-moss hover:text-wanderer-gold shadow-md transition text-sm sm:text-base"
        >
          Learn More
        </motion.button>
      </section>

      {/* CTA Modal */}
      <AnimatePresence>
        {showCta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm px-4"
            onClick={closeCta}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={closeCta}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
              <CallToAction />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
