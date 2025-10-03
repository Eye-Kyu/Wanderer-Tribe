"use client";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

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
      {/* YouTube Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2">
          <iframe
            className="w-full h-full pointer-events-none"
            src="https://www.youtube.com/embed/nl8p6tIV_k0?autoplay=1&mute=1&loop=1&playlist=nl8p6tIV_k0&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
            title="Background Video"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/20 to-black/30 z-10" />

      {/* Hero Content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center px-4 z-20"
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
            <Link href="/Contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#D27D2D] to-[#008080] text-white px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition"
              >
                <button>Book Your Journey</button>
              </motion.div>
            </Link>

            <Link href="/Destinations">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/10 border border-white/30 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-white/20 transition"
            >
              <button>Explore Destinations</button>
            </motion.div>
             </Link> 
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
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer text-center z-20"
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
