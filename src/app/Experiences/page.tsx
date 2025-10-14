"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaSpa,
  FaLeaf,
  FaMountain,
  FaWater,
  FaParachuteBox,
  FaGem,
  FaCocktail,
  FaHotel,
} from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";

const experiencesOverview = [
  {
    id: "wellness",
    title: "Wellness Retreats",
    description:
      "Rejuvenate with sunrise yoga on Bali's cliffside retreats or unwind in Morocco's ancient hammams. These sanctuaries blend mindfulness, nature, and holistic healing for a soulful escape.",
    image: "/images/bali-yoga.jpeg",
    link: "/Experiences/wellness",
    features: [
      { icon: FaSpa, text: "Luxury Spas & Hammams" },
      { icon: FaLeaf, text: "Nature & Healing Retreats" },
      { icon: GiMeditation, text: "Yoga & Meditation" },
    ],
    featured: "Bali, Indonesia",
  },
  {
    id: "adventure",
    title: "Adventure Travel",
    description:
      "Conquer the Inca Trail's rugged peaks, dive into the Great Barrier Reef's depths, or soar with a skydive over the Swiss Alps. Each journey ignites your spirit with challenge and awe.",
    image: "/images/adventure/inca-trail.jpeg",
    link: "/Experiences/adventure",
    features: [
      { icon: FaMountain, text: "Mountain & Hiking Adventures" },
      { icon: FaWater, text: "Water Sports & Diving" },
      { icon: FaParachuteBox, text: "Extreme & Aerial Sports" },
    ],
    featured: "Peru, South America",
  },
  {
    id: "luxury",
    title: "Luxury Escapes",
    description:
      "Savor a private villa sunset in the Maldives or a Bordeaux wine tasting in a chateau. These escapes offer bespoke elegance, from 5-star suites to curated cultural immersions.",
    image: "/images/luxury/bordeaux-wine.jpeg",
    link: "/Experiences/luxury",
    features: [
      { icon: FaGem, text: "Exclusive Experiences" },
      { icon: FaCocktail, text: "Fine Dining & Cocktails" },
      { icon: FaHotel, text: "5-Star Accommodations" },
    ],
    featured: "Maldives, Indian Ocean",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="bg-[#152523]">
    <section
      className="relative min-h-screen  py-24 px-6 max-w-7xl mx-auto space-y-20"
      style={{
        backgroundImage: "url('/images/faint-map-pattern.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        opacity: 0.95,
      }}
    >
      <motion.h1
        className="font-heading text-4xl md:text-5xl text-center text-white mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Explore Experiences
      </motion.h1>

      {experiencesOverview.map((exp, idx) => {
        const isEven = idx % 2 === 0;
        const isAdventure = exp.id === "adventure";
        const flexReverse = isAdventure ? !isEven : isEven;

        return (
          <motion.div
            key={exp.id}
            className={`relative overflow-hidden rounded-2xl bg-wanderer-moss shadow-black shadow-md ${
              flexReverse ? "pr-8 md:pl-16" : "pl-8 md:pr-16"
            } flex flex-col md:flex-row items-center gap-10 py-10`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            {/* Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-wanderer-ivory">
                {exp.title}
              </h2>
              <p className="text-black leading-relaxed">{exp.description}</p>
              <div className="text-sm text-wanderer-ivory italic">
                Featured: {exp.featured}
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {exp.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gray-300 hover:bg-gray-100 shadow-white/20 shadow-md transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="text-[#008080] w-6 h-6" />
                    </motion.div>
                    <span className="text-gray-800 text-base font-medium">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={exp.link}
                className="inline-block md:w-80 bg-wanderer-rust hover:bg-white text-white hover:text-wanderer-rust px-6 py-3 rounded-full transition-colors duration-200 mt-6 ease-in-out relative group"
              >
                <span className="relative z-10">
                  Chart Your {exp.title} Path
                </span>
                <span className="absolute inset-0 bg-gray-200/20 rounded-full -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </Link>
            </div>

            {/* Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/60 to-transparent"></div>
            </div>
          </motion.div>
        );
      })}
    </section>
    </div>
  );
}
