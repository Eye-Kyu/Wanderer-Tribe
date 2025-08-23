"use client";
import { useInView, motion } from "framer-motion"; // Corrected import
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById("activities");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative w-full h-screen overflow-hidden z-0"
      id="hero"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        poster="/images/mito-camp.jpg"
      >
        <source src="/videos/hero-langkwi.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

      {/* Hero Content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading text-white mb-6 leading-tight">
            Discover{" "}
            <span className="bg-gradient-to-r from-[#D27D2D] to-[#008080] bg-clip-text text-transparent">
              Wonders
            </span>{" "}
            <br />
            with Wanderer Tribe
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-body">
            Curated journeys across Asia, Africa & Europe for the modern luxury
            adventurer.
          </p>

          <div className="flex gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#D27D2D] to-[#008080] text-white px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition"
            >
              <button>Book Your Journey</button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/10 border border-white/30 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-white/20 transition"
            >
              <button>Explore Destinations</button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Animation */}
      <motion.div
        onClick={scrollToNext}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer text-center"
      >
        <ChevronDown className="w-8 h-8 text-white/80 mx-auto" />
        <p className="text-sm text-white/70 mt-2 tracking-wide font-body">
          Scroll to Explore
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
