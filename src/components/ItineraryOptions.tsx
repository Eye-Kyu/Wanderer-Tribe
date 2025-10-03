"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const pawPrints = Array.from({ length: 15 });

const ItineraryOptions: React.FC = () => {
  const options = [
    {
      title: "Whispers of the Wild - Loyk Mara Camp",
      destination: "Maasai Mara, Kenya",
      includes: "Airfare, Full-board stay, Expert-led safaris",
      excludes: "Bush dining ($40/person), Personal items",
      image: "/images/bush-dine.jpg",
    },
    {
      title: "Safari Symphony - Mito Safari Camp",
      destination: "Serengeti, Tanzania",
      includes: "Flights, Luxury tents, Wildlife tours",
      excludes: "Garden walks, Extra excursions",
      image: "/images/mito-camp.jpg",
    },
    {
      title: "Untamed Horizons - Mara Major Camp",
      destination: "Maasai Mara, Kenya",
      includes: "Tented suites, Park entry",
      excludes: "Beverages, Additional drives",
      image: "/images/tents.jpg",
    },
    {
      title: "Serenity Escape - Olare Mara Camp",
      destination: "Olare, Kenya",
      includes: "Airfare, Full-board stay, Guided tours",
      excludes: "Spa services, Premium drinks",
      image: "/images/camp4.jpg",
    },
    {
      title: "Wild Dreams - Talek River Camp",
      destination: "Talek, Kenya",
      includes: "Tents, Safaris, Park entry",
      excludes: "Private guides, Beverages",
      image: "/images/camp5.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const totalSlides = Math.ceil(options.length / visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (i: number) => {
    setCurrentIndex(i);
  };

  return (
    <section className="relative overflow-hidden py-20 bg-beige">
      {/* Background paw prints */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {pawPrints.map((_, i) => {
          const top = `${Math.random() * 90}%`;
          const left = `${Math.random() * 90}%`;
          const rotation = `${Math.random() * 360}deg`;
          const scale = 0.8 + Math.random() * 0.4; // random scale between 0.8 and 1.2
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ top, left, rotate: rotation }}
              initial={{ scale }}
              animate={{
                scale: [scale, scale * 1.1, scale],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="https://img.icons8.com/ios-filled/50/dog-footprint.png"
                alt="paw-print"
                width={50}
                height={50}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.h2
        className="font-heading text-3xl md:text-4xl lg:text-5xl text-wanderer-green text-center mb-6 relative z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Unleash Your Safari Odyssey
      </motion.h2>
      <p className="text-base md:text-lg text-wanderer-teal text-center max-w-xl mx-auto mb-14 relative z-10">
        Dive into a 2-night, 3-day wilderness retreat curated with exclusivity,
        luxury, and adventure in mind.
      </p>

      {/* Carousel wrapper */}
      <div className="relative max-w-7xl mx-auto overflow-hidden z-10">
        <motion.div
          className="flex gap-6 md:gap-8 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            width: `${(options.length / visibleCards) * 100}%`,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.offset.x < -50) handleNext();
            if (info.offset.x > 50) handlePrev();
          }}
        >
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="group relative flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 rounded-xl overflow-hidden shadow-xl lg:my-5 lg:mx-3 bg-white border border-neutral-200"
            >
              <Image
                src={opt.image}
                alt={opt.title}
                width={400}
                height={400}
                className="w-full h-[30rem] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transition-all duration-500 ease-in-out group-hover:h-40 h-20 overflow-hidden">
                <h3 className="text-wanderer-green font-semibold text-lg">
                  {opt.title}
                </h3>
                <p className="text-sm text-wanderer-teal mb-2">
                  {opt.destination}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-neutral-700">
                    <span className="font-semibold">Includes:</span>{" "}
                    {opt.includes}
                  </p>
                  <p className="text-sm text-neutral-700">
                    <span className="font-semibold">Excludes:</span>{" "}
                    {opt.excludes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-6 space-x-2 relative z-10">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === currentIndex ? "bg-wanderer-teal" : "bg-neutral-400"
            }`}
          />
        ))}
      </div>

      {/* Prev/Next arrows */}
      <div className="flex justify-end items-center gap-4 mt-6 pr-6 md:pr-10 relative z-10">
        <button
          onClick={handlePrev}
          className="p-3 bg-wanderer-teal text-white rounded-full hover:bg-wanderer-yellow hover:text-wanderer-green transition shadow-md"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-wanderer-teal text-white rounded-full hover:bg-wanderer-yellow hover:text-wanderer-green transition shadow-md"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default ItineraryOptions;
