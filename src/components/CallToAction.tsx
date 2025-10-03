"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, User, MessageSquare, Calendar, Users, Clock } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully! (replace with API call)");
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
    }
  };

  return (
    <section className="py-16 px-6 md:px-10 bg-gradient-to-b from-beige to-[#e4a762]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white rounded-sm shadow-lg overflow-hidden grid md:grid-cols-2"
      >
        {/* Left side - Image */}
        <div className="relative">
          <Image
            src="/images/contact-bg.jpg"
            alt="Curated Travel Experience"
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side - Content + Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="font-heading text-3xl md:text-4xl text-[#D2691E] mb-4">
            Plan Your Curated Experience
          </h2>
          <p className="text-[#333333]/80 mb-8 leading-relaxed">
            Every trip we design is unique, personalized, and tailored to your
            desires. Share your vision, and let us create an unforgettable
            journey — crafted just for you.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute top-4 left-4 text-[#2F4F2F]" size={20} />
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333]`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="relative">
                <User className="absolute top-4 left-4 text-[#2F4F2F]" size={20} />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333]`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute top-4 left-4 text-[#2F4F2F]" size={20} />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Number of Travellers */}
            <div className="relative">
              <Users className="absolute top-4 left-4 text-[#2F4F2F]" size={20} />
              <select
                value={form.travellers}
                onChange={(e) => setForm({ ...form, travellers: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.travellers ? "border-red-500" : "border-gray-300"
                } bg-white focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333]`}
              >
                <option value="">Number of Travellers</option>
                <option>1</option>
                <option>2</option>
                <option>3-5</option>
                <option>6-10</option>
                <option>10+</option>
              </select>
              {errors.travellers && (
                <p className="text-red-500 text-sm mt-1">{errors.travellers}</p>
              )}
            </div>

                  {/* Travel Date (Optional with Custom Label) */}
                  <div className="relative">
                    <Calendar className="absolute top-4 left-4 text-[#2F4F2F]" size={20} />

                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className={`peer w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333] ${
                        !form.date ? "text-transparent" : "text-[#333333]"
                      }`}
                    />

                    {/* Custom label acting like placeholder */}
                    {!form.date && (
                      <span className="absolute left-12 top-3 text-gray-400 pointer-events-none text-sm">
                        Travel date (if known)
                      </span>
                    )}
                  </div>



            {/* Trip Length */}
            <div className="relative">
              <Clock className="absolute top-4 left-4 text-[#2F4F2F]" size={20} />
              <select
                value={form.length}
                onChange={(e) => setForm({ ...form, length: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-md border ${
                  errors.length ? "border-red-500" : "border-gray-300"
                } bg-white focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333]`}
              >
                <option value="">Trip Length (Weeks)</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>3 Weeks</option>
                <option>4 Weeks+</option>
              </select>
              {errors.length && (
                <p className="text-red-500 text-sm mt-1">{errors.length}</p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare className="absolute top-4 left-4 text-[#2F4F2F]" size={20} />
              <textarea
                placeholder="Tell us more about your dream trip..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 h-28 resize-none rounded-md border ${
                  errors.details ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#D2691E] text-[#333333]`}
              />
              {errors.details && (
                <p className="text-red-500 text-sm mt-1">{errors.details}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full py-3 rounded-md bg-wanderer-green text-white font-medium tracking-wide hover:bg-wanderer-rust  transition-colors-duration-300-ease-in-out"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
