"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe2, Crown, ShieldCheck } from "lucide-react";

// --- Data ---
const perks = [
  {
    icon: Globe2,
    title: "Global Reach",
    desc: "Enjoy exclusive tours across Asia, Africa, and Europe, tailored for discerning explorers.",
    color: "bg-wanderer-moss/40 text-wanderer-teal border-wanderer-teal/30",
  },
  {
    icon: Crown,
    title: "Custom Experiences",
    desc: "Every journey is custom-crafted to match your passions and exceed your expectations.",
    color: "bg-wanderer-rust/30 text-wanderer-rust border-wanderer-rust/30",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Excellence",
    desc: "Decades of experience and 5-star guest satisfaction make us your trusted travel partner.",
    color: "bg-[#005c67]/50 text-wanderer-yellow border-wanderer-yellow/30",
  },
];

// --- Responsive hook ---
function useBreakpoint() {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export default function WhyChooseUs() {
  const [index, setIndex] = useState(0);
  const bp = useBreakpoint();

  // Auto-cycle only on mobile
  useEffect(() => {
    if (bp !== "mobile") return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % perks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bp]);

  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center opacity-20 mix-blend-difference"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576779254625-58a150a7e67d?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto shadow-lg shadow-black w-11/12 bg-white/90 rounded-3xl py-16 px-6 md:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className=" text-black font-extrabold tracking-tight mb-4">
            Why Choose Us
          </h2>
          <p className= " text-black max-w-2xl mx-auto">
            Not just a trip — a symphony of luxury, culture, and curated
            experiences.
          </p>
        </motion.div>

        {/* --- MOBILE: Carousel (1 item at a time) --- */}
        {bp === "mobile" && (
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
                      <h3 className=" font-semibold text-black mb-2">
                        {perks[index].title}
                      </h3>
                      <p className="text-black extra leading-relaxed">
                        {perks[index].desc}
                      </p>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* --- TABLET: 2-column grid --- */}
        {bp === "tablet" && (
          <div className="grid grid-cols-2 gap-8">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${perk.color}`}
              >
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white/20 mb-5">
                  <perk.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {perk.title}
                </h3>
                <p className="text-black text-sm">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- DESKTOP: 3-column grid --- */}
        {bp === "desktop" && (
          <div className="grid md:grid-cols-3 gap-10">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`rounded-2xl shadow-sm shadow-black p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${perk.color}`}
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
        )}
      </div>
    </section>
  );
}
