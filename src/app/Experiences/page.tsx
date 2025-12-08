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
    image: "/images/adventure/inca-trail.webp",
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
    image: "/images/luxury/bordeaux-wine.webp",
    link: "/Experiences/luxury",
    features: [
      { icon: FaGem, text: "Exclusive Experiences" },
      { icon: FaCocktail, text: "Fine Dining & Cocktails" },
      { icon: FaHotel, text: "Premium Stays" },
    ],
    featured: "Maldives, Indian Ocean",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="bg-[#152523]">
      <section
        className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto space-y-16 sm:space-y-20"
        style={{
          backgroundImage: "url('/images/faint-map-pattern.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          opacity: 0.95,
        }}
      >
        {/* Section Title */}
        <motion.h1
          className="font-heading text-3xl sm:text-4xl md:text-5xl text-center text-white mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Explore Experiences
        </motion.h1>

        {experiencesOverview.map((exp, idx) => {
          const reverseLayout = idx % 2 !== 0; // Alternate layout left-right

          return (
            <motion.div
              key={exp.id}
              className={`relative overflow-hidden rounded-2xl bg-wanderer-moss shadow-black shadow-md flex flex-col lg:flex-row ${
                reverseLayout ? "lg:flex-row-reverse" : ""
              } items-stretch gap-0`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Image Section */}
              <div className="relative w-full lg:w-1/2 h-56 sm:h-72 lg:h-[550px] overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover brightness-90 transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0" />
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2 p-3 sm:p-8 lg:p-12 flex flex-col justify-center space-y-4 sm:space-y-6 text-center lg:text-left md:bg-gradient-to-br from-[#000]/30 to-[#FAF9F6]/20 bg-wanderer-moss lg:bg-transparent">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl md:font-light font-semibold text-wanderer-ivory">
                  {exp.title}
                </h2>

                <p className="text-black text-base sm:text-lg leading-relaxed">
                  {exp.description}
                </p>

                <div className="text-sm sm:text-base text-wanderer-ivory italic">
                  Featured: {exp.featured}
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  {exp.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center lg:justify-start space-x-3 p-3 sm:p-4 rounded-xl bg-gray-300 hover:bg-gray-100 shadow-white/20 shadow-md transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <feature.icon className="text-[#008080] w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.div>
                      <span className="text-gray-800 text-xs sm:text-sm font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center lg:justify-start">
                  <Link
                    href={exp.link}
                    className="inline-block sm:w-auto md:w-auto lg:w-auto bg-wanderer-forest hover:bg-wanderer-ivory text-white hover:text-wanderer-mahogany px-3 sm:px-6 py-1 sm:py-4 lg:py-2 rounded-full transition-colors duration-200 mt-6 ease-in-out relative group button2 text-sm sm:text-base font-medium"
                  >
                    <span className="relative z-10">Discover</span>
                    <span className="absolute inset-0 bg-gray-200/20 rounded-full -z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
