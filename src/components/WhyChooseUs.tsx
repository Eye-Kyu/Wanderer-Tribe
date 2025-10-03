"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe2, Crown, ShieldCheck } from "lucide-react";

const perks = [
  {
    icon: Globe2,
    title: "Global Reach",
    desc: "Exclusive luxury tours across Asia, Africa, and Europe, tailored for discerning explorers.",
    color: "bg-wanderer-teal/10 text-wanderer-teal border-wanderer-teal/30",
  },
  {
    icon: Crown,
    title: "Custom Experiences",
    desc: "Every journey is custom-crafted to match your passions and exceed your expectations.",
    color: "bg-wanderer-rust/10 text-wanderer-rust border-wanderer-rust/30",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Excellence",
    desc: "Decades of experience and 5-star guest satisfaction make us your trusted luxury travel partner.",
    color: "bg-wanderer-yellow/10 text-wanderer-yellow border-wanderer-yellow/30",
  },
];

export default function WhyChooseUs() {
  const [index, setIndex] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Auto-cycle perks every 4s on mobile
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % perks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section className="relative py-24 bg-beige text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center opacity-20 mix-blend-difference md:w-4/5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576779254625-58a150a7e67d?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto shadow-xl md:w-11/12 bg-white/80 rounded-3xl py-16 px-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-black font-extrabold tracking-tight mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Not just a trip — a symphony of luxury, culture, and curated
            experiences.
          </p>
        </motion.div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className={`rounded-2xl border p-8 text-center mb-4 bg-white shadow-md ${perks[index].color}`}
            >
              {(() => {
                const Icon = perks[index].icon;
                return (
                  <>
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white/20 mb-5">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {perks[index].title}
                    </h3>
                    <p className="text-black text-sm leading-relaxed">
                      {perks[index].desc}
                    </p>
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {perks.map((perk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${perk.color}`}
            >
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white/20 mb-5">
                <perk.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {perk.title}
              </h3>
              <p className="text-black text-sm leading-relaxed">
                {perk.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
