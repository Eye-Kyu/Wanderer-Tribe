"use client";
import Navbar from "@/components/Header";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  // Parallax and scroll effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.9]);

  // Form state
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
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <div className="relative min-h-screen bg-[#FAF9F6] text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <Image
            src="/images/contact-wilderness.jpg"
            alt="Contact Background"
            fill
            className="object-cover brightness-90"
          />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 className="text-4xl md:text-6xl font-heading text-white font-semibold">
              Contact Wanderer Tribe
            </motion.h1>
            <motion.p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl">
              We’re here to help you craft unforgettable, unique travel
              experiences. Reach out and let us make your next adventure
              exceptional.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 px-6 max-w-3xl mx-auto">
        <motion.div
          className="bg-white border border-gray-200 rounded-xl p-10 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D27D2D] focus:border-transparent placeholder-transparent"
                placeholder="Your Name"
              />
              <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D27D2D] peer-focus:text-sm">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D27D2D] focus:border-transparent placeholder-transparent"
                placeholder="Your Email"
              />
              <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D27D2D] peer-focus:text-sm">
                Your Email
              </label>
            </div>

            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="peer w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D27D2D] focus:border-transparent bg-white"
                required
              >
                <option value="" disabled>
                  Select Inquiry Type
                </option>
                <option value="booking">Booking</option>
                <option value="collaboration">Collaboration</option>
                <option value="general">General</option>
              </select>
              <label className="absolute left-4 top-1 text-gray-400 text-sm pointer-events-none">
                Inquiry Type
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="peer w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D27D2D] focus:border-transparent placeholder-transparent h-32 resize-none"
                placeholder="Your Message"
              />
              <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D27D2D] peer-focus:text-sm">
                Your Message
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full font-medium bg-[#D27D2D] text-white hover:bg-[#B5661F] shadow-md transition"
              >
                Submit
              </button>
              {isSubmitted && (
                <p className="mt-4 text-green-600 text-sm transition-opacity duration-500">
                  Thank you! We’ll respond shortly.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </section>

      {/* Contact Details Section */}
      <section className="relative py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-[#D27D2D] mb-2">Email</h3>
            <p className="text-gray-700">explore@wanderertribe.com</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-[#D27D2D] mb-2">Phone</h3>
            <p className="text-gray-700">+31 6 13227086</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-[#D27D2D] mb-2">
              Social
            </h3>
            <div className="flex justify-center space-x-4 mt-2">
              {/* Example icons */}
              <a
                href="https://instagram.com/wanderertribe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#D27D2D] transition"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com/wanderertribe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#D27D2D] transition"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com/wanderertribe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#D27D2D] transition"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="relative py-16 px-6 text-center bg-white border-t border-gray-200">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Begin Your Journey
        </motion.h2>
        <motion.p
          className="text-gray-700 mb-6 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Reach out today and let us help you plan a unique experience that you
          will never forget.
        </motion.p>
        <a href="/about" className="inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 rounded-full font-medium bg-[#D27D2D] text-white hover:bg-[#B5661F] shadow-md transition"
          >
            Learn More
          </motion.button>
        </a>
      </section>
    </div>
  );
}
