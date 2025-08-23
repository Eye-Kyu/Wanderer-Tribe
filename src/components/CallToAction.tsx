// src/components/CallToAction.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, User, MessageSquare } from "lucide-react";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative bg-neutral-900 py-20 px-6 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-800 opacity-90 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-beige mb-6">
          Begin Your Bespoke Journey
        </h2>

        <p className="text-white/70 text-lg mb-10 leading-relaxed">
          Every journey we design is tailored with precision, elegance, and
          discretion. Connect with our concierge team to curate your private
          itinerary.
        </p>

        <motion.form
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-xl space-y-5 max-w-lg mx-auto shadow-md"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {/* Name Field */}
          <div className="relative">
            <User className="absolute top-4 left-4 text-beige" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-3 rounded-md bg-transparent border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-beige"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute top-4 left-4 text-beige" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 rounded-md bg-transparent border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-beige"
            />
          </div>

          {/* Message Field */}
          <div className="relative">
            <MessageSquare
              className="absolute top-4 left-4 text-beige"
              size={20}
            />
            <textarea
              placeholder="Briefly describe your travel interests"
              className="w-full pl-12 pr-4 py-3 h-28 resize-none rounded-md bg-transparent border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-beige"
            />
          </div>

          {/* CTA Button */}
          <motion.button
            type="submit"
            className="w-full py-3 rounded-md bg-beige text-neutral-900 font-medium tracking-wide hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Request Consultation
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
