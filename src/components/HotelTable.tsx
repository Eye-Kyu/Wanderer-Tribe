"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HotelTable() {
  const hotels = [
    {
      option:
        "Steg Hotel (Boutique Hotel ) (3*)- Groovy King Holiday Villa Langkawi (4*)- Superior",
      tier1: "USD 2689 | KSH 346,881",
      tier2: "USD 2386 | KSH 307,794",
      image: "/images/hotel1.jpg",
    },
    {
      option:
        "Concorde Kuala Lumpur Hotel (4*)- Deluxe Holiday Villa Langkawi (4*)- Superior",
      tier1: "USD 2810 | KSH 362,490",
      tier2: "USD 2507 | KSH 323,403",
      image: "/images/hotel2.jpg",
    },
    {
      option:
        "Parkroyal Collections(5*)- Lifestyle premier Pelangi Beach Resort (5*)-Garden",
      tier1: "USD 3856 | KSH 497,424",
      tier2: "USD 3554 | KSH 458,466",
      image: "/images/hotel3.jpg",
    },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8 }, // Removed 'ease' string
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-white overflow-hidden"
    >
      {/* Subtle gold overlay */}
      <div className="absolute inset-0 bg-[url('/images/gold-texture.png')] opacity-10 bg-cover bg-center pointer-events-none" />

      {/* Section Title */}
      <motion.h2
        className="font-serif tracking-wide text-5xl text-[#2C2C2C] mb-14 text-center relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        Select Your Sanctuary
      </motion.h2>

      {/* Hotels Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {hotels.map((hotel, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-8 border border-[#D4AF37]/20 hover:shadow-2xl hover:bg-[#FAF9F6] transition-all duration-700"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(212,175,55,0.25)",
            }}
          >
            <div className="w-full h-56 overflow-hidden rounded-xl mb-6">
              <Image
                src={hotel.image}
                alt={hotel.option}
                width={384}
                height={224}
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
              />
            </div>

            <h3 className="font-serif text-2xl text-[#2C2C2C] mb-4 relative after:block after:w-14 after:h-[2px] after:bg-[#D4AF37] after:mt-2">
              {hotel.option.split("-")[0]} Retreat
            </h3>

            <p className="text-sm text-gray-600 mb-2">Tier 1: {hotel.tier1}</p>
            <p className="text-sm text-gray-600">Tier 2: {hotel.tier2}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
