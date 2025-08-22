// src/components/CallToAction.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="p-8 bg-neutral min-h-[50vh] flex items-center justify-center"
    >
      <motion.div
        className="max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-heading text-4xl text-primary mb-6">
          Start Your Journey
        </h2>
        <p className="text-textDark mb-8 text-lg max-w-2xl mx-auto">
          Ready to create your dream travel experience? Contact us to begin
          planning your personalized adventure.
        </p>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-beige text-primary border-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-beige text-primary border-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-beige text-primary border-none focus:ring-2 focus:ring-primary h-24 resize-none"
          />
          <motion.button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-teal text-white font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Get in Touch
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
