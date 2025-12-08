"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    continent: "Africa",
    tagline: "Wild safaris & timeless landscapes",
    image: "/images/africa.webp",
    link: "/Destinations/africa",
  },
  {
    continent: "Asia",
    tagline: "Mystical journeys across vibrant cultures",
    image: "/images/asia.webp",
    link: "/Destinations/asia",
  },
  {
    continent: "Middle East",
    tagline: "Romantic escapes & rich history",
    image: "/images/middle-east/Doha.webp",
    link: "/Destinations/europe",
  },
];

export default function DestinationsShowcase() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="font-heading mb-4">
          Explore Our Signature Destinations
        </h2>
        <p className="max-w-2xl mx-auto p">
          Handpicked luxury experiences across Asia, Africa, and the Middle
          East. Immerse yourself in the extraordinary.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        {destinations.map((d, idx) => (
          <Link key={idx} href={d.link}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group overflow-hidden shadow-2xl rounded-xl cursor-pointer"
            >
              <Image
                src={d.image}
                alt={d.continent}
                width={500}
                height={350}
                className="object-cover w-full h-72 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-500 flex flex-col justify-center items-center text-center p-6">
                <h3 className="font-heading text-white mb-2">{d.continent}</h3>
                <p className="text-white/80 extra">{d.tagline}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
