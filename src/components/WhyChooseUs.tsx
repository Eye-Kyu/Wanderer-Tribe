"use client";
import { motion } from "framer-motion";
import { Globe2, Crown, ShieldCheck } from "lucide-react";

const perks = [
  {
    icon: <Globe2 className="w-8 h-8 text-primary" />,
    title: "Global Reach",
    desc: "Exclusive luxury tours in Asia, Africa, and Europe.",
  },
  {
    icon: <Crown className="w-8 h-8 text-primary" />,
    title: "Bespoke Experiences",
    desc: "Tailor-made itineraries crafted to perfection.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Trusted Excellence",
    desc: "Decades of expertise with 5-star guest satisfaction.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-b from-neutral-100 to-neutral-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
          Why Choose Us
        </h2>
        <p className="text-textDark/80 max-w-2xl mx-auto">
          More than just travel — we create memories wrapped in luxury,
          authenticity, and seamless experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {perks.map((perk, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <div className="mb-4">{perk.icon}</div>
            <h3 className="font-heading text-xl text-primary mb-2">
              {perk.title}
            </h3>
            <p className="text-textDark/80">{perk.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
