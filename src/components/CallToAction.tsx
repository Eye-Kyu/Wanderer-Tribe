"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  User,
  MessageSquare,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function CallToAction() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    travellers: "",
    date: "",
    length: "",
    details: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.travellers) newErrors.travellers = "Select number of travellers";
    if (!form.date) newErrors.date = "Choose a travel date";
    if (!form.length) newErrors.length = "Select trip length";
    if (!form.details.trim()) newErrors.details = "Please provide trip details";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        alert(
          "Your booking request has been sent! Check your email for confirmation."
        );
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          travellers: "",
          date: "",
          length: "",
          details: "",
        });
        setErrors({});
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send your booking request.");
    }
  };

  return (
    <section
      id="cta"
      className="py-12 sm:py-16 px-4 sm:px-6 md:px-10 bg-gradient-to-b  to-[#e4a762]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white rounded-lg shadow-black shadow-md overflow-hidden flex flex-col md:grid md:grid-cols-2"
      >
        {/* Left side - Image */}
        <div className="relative h-52 sm:h-72 md:h-auto md:block">
          <Image
            src="/images/contact-bg.webp"
            alt="Curated Travel Experience"
            fill
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side - Content + Form */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-wanderer-rust mb-4">
            Plan Your Curated Experience
          </h2>
          <p className="text-sm sm:text-base text-[#333333]/80 mb-8 leading-relaxed">
            Every trip we design is unique, personalized, and tailored to your
            desires. Share your vision, and let us create an unforgettable
            journey — crafted just for you.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* First + Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <User
                  className="absolute top-4 left-4 text-[#2F4F2F]"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333] text-sm sm:text-base`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="relative">
                <User
                  className="absolute top-4 left-4 text-[#2F4F2F]"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333] text-sm sm:text-base`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute top-4 left-4 text-[#2F4F2F]"
                size={18}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333] text-sm sm:text-base`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Number of Travellers */}
            <div className="relative">
              <Users
                className="absolute top-4 left-4 text-[#2F4F2F]"
                size={18}
              />
              <select
                value={form.travellers}
                onChange={(e) =>
                  setForm({ ...form, travellers: e.target.value })
                }
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.travellers ? "border-red-500" : "border-gray-300"
                } bg-white focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333] text-sm sm:text-base`}
              >
                <option value="">Number of Travellers</option>
                <option>1</option>
                <option>2</option>
                <option>3-5</option>
                <option>6-10</option>
                <option>10+</option>
              </select>
              {errors.travellers && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.travellers}
                </p>
              )}
            </div>

            {/* Travel Date */}
            <div className="relative">
              <Calendar
                className="absolute top-4 left-4 text-[#2F4F2F]"
                size={18}
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={`peer w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333] text-sm sm:text-base ${
                  !form.date ? "text-transparent" : "text-[#333333]"
                }`}
              />
              {!form.date && (
                <span className="absolute left-12 top-3 text-gray-400 pointer-events-none text-sm sm:text-base">
                  Travel date (if known)
                </span>
              )}
            </div>

            {/* Trip Length */}
            <div className="relative">
              <Clock
                className="absolute top-4 left-4 text-[#2F4F2F]"
                size={18}
              />
              <select
                value={form.length}
                onChange={(e) => setForm({ ...form, length: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.length ? "border-red-500" : "border-gray-300"
                } bg-white focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333] text-sm sm:text-base`}
              >
                <option value="">Trip Length (Weeks)</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>3 Weeks</option>
                <option>4 Weeks+</option>
              </select>
              {errors.length && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.length}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare
                className="absolute top-4 left-4 text-[#2F4F2F]"
                size={18}
              />
              <textarea
                placeholder="Tell us more about your dream trip..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 h-24 sm:h-28 resize-none rounded-md border ${
                  errors.details ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333] text-sm sm:text-base`}
              />
              {errors.details && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.details}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full py-3 rounded-md bg-wanderer-green text-white font-medium tracking-wide hover:bg-wanderer-teal transition-colors ease-in-out duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Start your journey"
            >
              Start Your Journey
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
