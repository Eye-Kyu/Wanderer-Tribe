"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const ItineraryOptions: React.FC = () => {
  const options = [
    {
      title: "Whispers of the Wild - Loyk Mara Camp",
      dates: "15TH - 17TH AUGUST",
      total: "AIR: $3,430 | ROAD: $3,180",
      includes: "Airfare, Full-board stay, Expert-led safaris",
      excludes: "Bush dining ($40/person), Personal items",
      image: "/images/bush-dine.jpg",
    },
    {
      title: "Safari Symphony - Mito Safari Camp",
      dates: "18TH - 20TH AUGUST",
      total: "AIR: $3,730 | ROAD: $3,480",
      includes: "Flights, Luxury tents, Wildlife tours",
      excludes: "Garden walks, Extra excursions",
      image: "/images/mito-camp.jpg",
    },
    {
      title: "Untamed Horizons - Mara Major Camp",
      dates: "15TH - 17TH AUGUST",
      total: "ROAD: $3,530",
      includes: "Tented suites, Park entry",
      excludes: "Beverages, Additional drives",
      image: "/images/tents.jpg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    whileHover: { scale: 1.05, rotate: -1, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative overflow-hidden py-20">
      {/* Luxury diagonal background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200 via-neutral-400 to-primary/20 -skew-y-1"></div>

      <motion.h2
        className="relative font-heading text-4xl md:text-5xl text-white text-center mb-6 z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Unleash Your Maasai Mara Odyssey
      </motion.h2>
      <p className="relative text-lg text-neutral-200 text-center max-w-xl mx-auto mb-14 z-10">
        Dive into a 2-night, 3-day wilderness retreat curated with exclusivity,
        luxury, and adventure in mind. Each option blends untamed nature with
        comfort for a truly unforgettable escape.
      </p>

      {/* Cards */}
      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {options.map((opt, idx) => (
          <motion.div
            key={idx}
            className="group bg-neutral-900 rounded-2xl shadow-xl overflow-hidden transform-gpu hover:shadow-2xl relative border border-neutral-700/40"
            variants={cardVariants}
            whileHover="whileHover"
          >
            <div className="relative overflow-hidden">
              <Image
                src={opt.image}
                alt={opt.title}
                width={400}
                height={250}
                className="w-full h-64 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-5">
                <span className="text-white text-sm font-medium uppercase tracking-wide">
                  {opt.dates}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-2xl text-primary mb-3 group-hover:text-teal transition-colors">
                {opt.title}
              </h3>
              <p className="text-neutral-300 mb-3 text-sm font-medium">
                Total: {opt.total}
              </p>
              <div className="space-y-3 text-neutral-400 text-sm">
                <div>
                  <h4 className="font-semibold text-white">Includes:</h4>
                  <p>{opt.includes}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Excludes:</h4>
                  <p>{opt.excludes}</p>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border border-primary/60 blur-sm"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ItineraryOptions;
