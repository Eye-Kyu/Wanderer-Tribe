"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* -------------------- TYPES -------------------- */
interface ItineraryOption {
  title: string;
  destination: string;
  includes: string;
  excludes: string;
  image: string;
}

/* -------------------- REUSABLE CARD -------------------- */
const CarouselCard = ({ option, isDesktop = false }: { option: ItineraryOption; isDesktop?: boolean }) => {
  return (
    <div
      className={`relative flex-1 rounded-xl overflow-hidden shadow-xl bg-white border border-neutral-200 group`}
    >
      <Image
        src={option.image}
        alt={option.title}
        width={400}
        height={400}
        className="w-full h-[22rem] md:h-[24rem] lg:h-[28rem] object-cover"
      />

      {/* Card Info */}
      {isDesktop ? (
        // 👉 Desktop: reveal more on hover
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transition-all duration-500 ease-in-out group-hover:h-40 h-20 overflow-hidden">
          <h3 className="text-wanderer-green font-semibold text-lg">
            {option.title}
          </h3>
          <p className="text-sm text-wanderer-teal mb-2">{option.destination}</p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm text-neutral-700">
              <span className="font-semibold">Includes:</span> {option.includes}
            </p>
            <p className="text-sm text-neutral-700">
              <span className="font-semibold">Excludes:</span> {option.excludes}
            </p>
          </div>
        </div>
      ) : (
        // 👉 Mobile: always show all details (no hover needed)
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
          <h3 className="text-black font-semibold text-lg">
            {option.title}
          </h3>
          <p className="text-sm text-wanderer-teal mb-2">{option.destination}</p>
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Includes:</span> {option.includes}
          </p>
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Excludes:</span> {option.excludes}
          </p>
        </div>
      )}
    </div>
  );
};

/* -------------------- MOBILE CAROUSEL -------------------- */
import { useRef, useEffect } from "react";

const MobileCarousel = ({ options }: { options: ItineraryOption[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track scroll position to sync dots
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, offsetWidth } = carouselRef.current;
        const newIndex = Math.round(scrollLeft / offsetWidth);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    };

    const container = carouselRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentIndex]);

  const handleDotClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.offsetWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="sm:hidden w-full">
      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {options.map((opt, idx) => (
          <div
            key={idx}
            className="snap-center flex-shrink-0 w-full px-4"
          >
            <CarouselCard option={opt} />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {options.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === currentIndex ? "bg-wanderer-teal" : "bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};


/* -------------------- DESKTOP CAROUSEL -------------------- */
const DesktopCarousel = ({ options }: { options: ItineraryOption[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;
  const totalSlides = Math.ceil(options.length / visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (i: number) => setCurrentIndex(i);

  return (
    <>
      <div className="hidden sm:flex max-w-7xl mx-auto gap-6 overflow-hidden">
        {options
          .slice(currentIndex * visibleCards, (currentIndex + 1) * visibleCards)
          .map((opt, idx) => (
            <CarouselCard key={idx} option={opt} isDesktop />
          ))}
      </div>

      {/* Pagination + Arrows */}
      <div className="hidden sm:flex justify-between items-center mt-6 max-w-7xl mx-auto">
        <div className="flex space-x-2">
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
        <div className="flex gap-4">
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
      </div>
    </>
  );
};

/* -------------------- MAIN COMPONENT -------------------- */
const ItineraryOptions: React.FC = () => {
  const options: ItineraryOption[] = [
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

  const pawPrints = Array.from({ length: 15 });

  return (
    <section className="relative overflow-hidden py-20 bg-beige">
      {/* Background paw prints */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {pawPrints.map((_, i) => {
          const top = `${Math.random() * 90}%`;
          const left = `${Math.random() * 90}%`;
          const rotation = `${Math.random() * 360}deg`;
          const scale = 0.8 + Math.random() * 0.4;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ top, left, rotate: rotation }}
              initial={{ scale }}
              animate={{ scale: [scale, scale * 1.1, scale] }}
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

      {/* Section Title */}
      <motion.h2
        className="font-heading text-wanderer-green text-center mb-6 relative z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Unleash Your Safari Odyssey
      </motion.h2>
      <p className=" text-neutral-700 text-center max-w-xl mx-auto mb-14 relative z-10">
        Dive into a 2-night, 3-day wilderness retreat curated with exclusivity,
        luxury, and adventure in mind.
      </p>

      {/* Mobile Carousel */}
      <MobileCarousel options={options} />

      {/* Desktop Carousel */}
      <DesktopCarousel options={options} />
    </section>
  );
};

export default ItineraryOptions;
