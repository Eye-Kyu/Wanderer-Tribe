"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Detect screen size on client
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("activities");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full h-screen overflow-hidden z-0"
    >
      {/* Fallback LCP Image */}
      <Image
        src="/images/costa-rica-resort.jpeg"
        alt="Background"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover z-0"
      />

      {/* Conditionally render one video based on screen size */}
      {isMobile ? (
        <video
          className="absolute inset-0 w-full h-full object-cover z-10"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/costa-rica-resort.webp"
          src="/videos/mobile-landing.webm"
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover z-10"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          src="/videos/landing-page.webm"
        />
      )}

      {/* Simplified overlay */}
      <div className="absolute inset-0 bg-black/30 z-20" />

      {/* Hero Text */}
      <motion.div
        className="absolute bottom-10 left-6 sm:left-12 md:left-20 z-30 text-left max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-2xl lg:text-4xl font-heading text-white leading-tight mb-4">
          Discover{" "}
          <span className="bg-gradient-to-r from-[#e98e3a] to-[#176d25] bg-clip-text text-transparent">
            Wonders
          </span>{" "}
          with Wanderer Tribe
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-lg">
          Explore breathtaking destinations and unique experiences around the
          world.
        </p>
      </motion.div>

      {/* Scroll Indicator */}
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
        className="absolute bottom-6 sm:bottom-10 md:left-1/2 transform -translate-x-1/2 cursor-pointer text-center z-30 hidden lg:block"
      >
        <ChevronDown className="w-4 md:w-6 h-6 sm:w-8 sm:h-8 text-white/80 mx-auto" />
        <p className="text-xs sm:text-sm text-white/70 mt-2 tracking-wide font-body">
          Scroll to Explore
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
