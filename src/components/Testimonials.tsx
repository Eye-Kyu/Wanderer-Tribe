// src/components/Testimonials.tsx
"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aisha K., Kenya",
    text: "From the moment I landed, everything was perfectly organized. The team made sure every little detail was taken care of, from my accommodation to excursions. I felt pampered and at ease the entire time.",
  },
  {
    name: "Liam T., UK",
    text: "I was amazed by how seamlessly luxury and authenticity were blended. The trip felt unique, not cookie-cutter, and every activity was tailored to my preferences. The attention to detail was exceptional.",
  },
  {
    name: "Priya S., India",
    text: "This was a dream vacation that exceeded every expectation. The service was warm and personal, and the itinerary balanced adventure with relaxation beautifully.",
  },
  {
    name: "Marco R., Italy",
    text: "I felt like royalty the entire trip. Every transfer, every meal, every experience felt curated with care. It’s rare to find such seamless service.",
  },
  {
    name: "Sophia L., Canada",
    text: "The balance of adventure and comfort was extraordinary. Every day felt new and exciting, but I was always at ease knowing every detail was handled.",
  },
];

// Duplicate testimonials for seamless looping
const loopTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="relative min-h-[70vh] py-20 px-8 overflow-hidden bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-100">
      {/* Diagonal luxury background pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] animate-drift"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 40px)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative z-10">
        <h2 className="font-heading text-4xl text-primary mb-12 text-center">
          Traveler Experiences
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-teal mx-auto mt-2" />
        </h2>

        {/* Carousel container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 25, // Adjust speed
              ease: "linear",
            }}
          >
            {loopTestimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-[40%] bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-md"
              >
                <p className="text-textDark text-base italic mb-6 leading-relaxed">
                  {t.text}
                </p>
                <p className="text-primary font-semibold">{t.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
