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
      "Immerse yourself in serene environments and rejuvenate your mind, body, and soul. From yoga retreats in Bali to spa escapes in Morocco, wellness experiences offer the perfect blend of relaxation, mindfulness, and holistic healing.",
    image: "/images/experiences/wellness-hero.jpg",
    link: "/Experiences/wellness",
    features: [
      { icon: FaSpa, text: "Luxury Spas & Hammams" },
      { icon: FaLeaf, text: "Nature & Healing Retreats" },
      { icon: GiMeditation, text: "Yoga & Meditation" },
    ],
  },
  {
    id: "adventure",
    title: "Adventure Travel",
    description:
      "For the thrill-seekers and explorers, adventure travel takes you off the beaten path. Hike through majestic mountains, dive into pristine waters, or embark on extreme sports across the globe. Every experience is designed to challenge and inspire.",
    image: "/images/experiences/adventure-hero.jpg",
    link: "/Experiences/adventure",
    features: [
      { icon: FaMountain, text: "Mountain & Hiking Adventures" },
      { icon: FaWater, text: "Water Sports & Diving" },
      { icon: FaParachuteBox, text: "Extreme & Aerial Sports" },
    ],
  },
  {
    id: "luxury",
    title: "Luxury Escapes",
    description:
      "Indulge in the finest accommodations, exclusive experiences, and breathtaking destinations. Luxury escapes are crafted for comfort, elegance, and unforgettable memories, whether it’s a private villa in the Maldives or a curated city adventure in Europe.",
    image: "/images/experiences/luxury-hero.jpg",
    link: "/Experiences/luxury",
    features: [
      { icon: FaGem, text: "Exclusive Experiences" },
      { icon: FaCocktail, text: "Fine Dining & Cocktails" },
      { icon: FaHotel, text: "5-Star Accommodations" },
    ],
  },
];

export default function ExperiencesPage() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-32">
      <motion.h1
        className="text-5xl md:text-6xl font-heading text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Explore Experiences
      </motion.h1>

      {experiencesOverview.map((exp, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <motion.div
            key={exp.id}
            className={`flex flex-col lg:flex-row items-center ${
              !isEven ? "lg:flex-row-reverse" : ""
            } gap-10`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            {/* Image */}
            <div className="relative w-full lg:w-1/2 h-64 sm:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="lg:w-1/2 flex flex-col justify-center space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-semibold text-[#2D5BD2]">
                {exp.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{exp.description}</p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {exp.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-gray-100"
                  >
                    <feature.icon className="text-[#2D5BD2] w-6 h-6" />
                    <span className="text-gray-800 font-medium">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={exp.link}
                className="inline-block bg-[#2D5BD2] text-white px-6 py-3 rounded-full hover:opacity-90 transition self-center lg:self-start mt-6"
              >
                Explore {exp.title}
              </Link>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
