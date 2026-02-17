"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -------------------- TYPES -------------------- */
interface ItineraryOption {
  title: string;
  destination: string;
  includes: string;
  excludes: string;
  image: string;
}

/* -------------------- REUSABLE CARD -------------------- */
const CarouselCard = ({
  option,
  isDesktop = false,
}: {
  option: ItineraryOption;
  isDesktop?: boolean;
}) => (
  <div className="relative flex-1 rounded-xl overflow-hidden shadow-2xl bg-white group">
    <Image
      src={option.image}
      alt={option.title}
      width={400}
      height={400}
      className="w-full h-[22rem] md:h-[24rem] lg:h-[28rem] object-cover"
    />
    <div
      className={`absolute bottom-0 left-0 right-0 bg-white p-4 transition-all duration-500 ease-in-out ${
        isDesktop ? "group-hover:h-40 h-20" : ""
      } overflow-hidden`}
    >
      <h3 className="text-wanderer-rust font-light text-lg">{option.title}</h3>
      <p className="text-sm text-wanderer-bronze mb-2">{option.destination}</p>
      {isDesktop ? (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Includes:</span> {option.includes}
          </p>
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Excludes:</span> {option.excludes}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Includes:</span> {option.includes}
          </p>
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Excludes:</span> {option.excludes}
          </p>
        </div>
      )}
    </div>
  </div>
);

/* -------------------- MOBILE CAROUSEL -------------------- */
const MobileCarousel = ({ options }: { options: ItineraryOption[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, offsetWidth } = carouselRef.current;
        const newIndex = Math.round(scrollLeft / offsetWidth);
        if (newIndex !== currentIndex) setCurrentIndex(newIndex);
      }
    };

    const container = carouselRef.current;
    container?.addEventListener("scroll", handleScroll, { passive: true });
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  const handleDotClick = (i: number) => {
    carouselRef.current?.scrollTo({
      left: carouselRef.current.offsetWidth * i,
      behavior: "smooth",
    });
    setCurrentIndex(i);
  };

  return (
    <div className="sm:hidden w-full">
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {options.map((opt, idx) => (
          <div key={idx} className="snap-center flex-shrink-0 w-full px-4">
            <CarouselCard option={opt} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {options.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label="current slide"
            className={`w-3 h-3 rounded-full transition ${
              i === currentIndex ? "bg-wanderer-gold" : "bg-wanderer-mahogany"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* -------------------- DESKTOP CAROUSEL -------------------- */ const DesktopCarousel =
  ({ options }: { options: ItineraryOption[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3;
    const carouselRef = useRef<HTMLDivElement>(null);

    const cardWidthPercentage = 100 / visibleCards;

    // Convert vertical mouse wheel → horizontal scroll
    useEffect(() => {
      const container = carouselRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }, []);

    // Sync dots with manual scroll
    useEffect(() => {
      const container = carouselRef.current;
      if (!container) return;

      const handleScroll = () => {
        const slideWidth = container.offsetWidth;
        const newIndex = Math.round(container.scrollLeft / slideWidth);
        setCurrentIndex(newIndex);
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const scrollToIndex = (index: number) => {
      if (!carouselRef.current) return;

      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    };

    const totalSlides = Math.ceil(options.length / visibleCards);

    const handlePrev = () => {
      const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
      scrollToIndex(newIndex);
    };

    const handleNext = () => {
      const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      scrollToIndex(newIndex);
    };

    return (
      <>
        <div
          ref={carouselRef}
          className="hidden sm:flex max-w-7xl mx-auto gap-6 overflow-x-auto scroll-smooth hide-scrollbar"
        >
          {options.map((opt, idx) => (
            <div key={idx} style={{ flex: `0 0 ${cardWidthPercentage}%` }}>
              <CarouselCard option={opt} isDesktop />
            </div>
          ))}
        </div>

        <div className="hidden sm:flex justify-between items-center mt-6 max-w-7xl mx-auto">
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === currentIndex ? "bg-wanderer-gold" : "bg-neutral-400"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="p-3 text-white rounded-full button transition shadow-md"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 text-white rounded-full button transition shadow-md"
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
  const [prints, setPrints] = useState<
    { top: string; left: string; rotation: string; scale: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map(() => ({
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      rotation: `${Math.random() * 360}deg`,
      scale: 0.8 + Math.random() * 0.4,
    }));
    setPrints(generated);
  }, []);

  useEffect(() => {
    gsap.utils.toArray(".tribal-print").forEach((el) => {
      gsap.to(el as HTMLElement, {
        y: "+=20",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2 + Math.random() * 2,
      });
    });
  }, [prints]);

  const options: ItineraryOption[] = [
    {
      title: "Whispers of the Wild - Loyk Mara Camp",
      destination: "Maasai Mara, Kenya",
      includes: "Airfare, Full-board stay, Expert-led safaris",
      excludes: "Bush dining ($40/person), Personal items",
      image: "/images/bush-dine.webp",
    },
    {
      title: "Safari Symphony - Mito Safari Camp",
      destination: "Serengeti, Tanzania",
      includes: "Flights, Luxury tents, Wildlife tours",
      excludes: "Garden walks, Extra excursions",
      image: "/images/mito-camp.webp",
    },
    {
      title: "Untamed Horizons - Mara Major Camp",
      destination: "Maasai Mara, Kenya",
      includes: "Tented suites, Park entry",
      excludes: "Beverages, Additional drives",
      image: "/images/tents.webp",
    },
    {
      title: "Serenity Escape - Olare Mara Camp",
      destination: "Olare, Kenya",
      includes: "Airfare, Full-board stay, Guided tours",
      excludes: "Spa services, Premium drinks",
      image: "/images/ole.jpg",
    },
    {
      title: "Wild Dreams - Talek River Camp",
      destination: "Talek, Kenya",
      includes: "Tents, Safaris, Park entry",
      excludes: "Private guides, Beverages",
      image: "/images/talek.jpg",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20">
      {/* ✅ Background tribal print images */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {prints.map((p, i) => (
          <div
            key={i}
            className="tribal-print absolute"
            style={{
              top: p.top,
              left: p.left,
              transform: `rotate(${p.rotation}) scale(${p.scale})`,
            }}
          >
            <Image
              src="/images/bgs/pawprints.svg"
              alt="tribal pattern"
              width={120}
              height={110}
              className="w-[60px] h-[55px] sm:w-[80px] sm:h-[70px] md:w-[120px] md:h-[110px]"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4 md:space-y-9 md:pb-10">
        <h5 className="text-2xl text-center">Wild Wanderer</h5>
        <motion.h2
          className="font-heading text-wanderer-green text-center mb-6 relative z-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Unleash Your Wandering Pilgrimage
        </motion.h2>
        <p className="text-center max-w-xl mx-auto mb-14 relative z-10 pb-6">
          Dive into an itinerary curated with the charm nature offers, tranquil
          escapes, and boundless exploration.
        </p>
      </div>

      <MobileCarousel options={options} />
      <DesktopCarousel options={options} />
    </section>
  );
};

export default ItineraryOptions;
