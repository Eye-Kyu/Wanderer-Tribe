"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion"; // Explicit named exports
import { useState } from "react";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [, setIsHovered] = useState(false);

  // Track scroll direction and hide/show header
  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const previousScrollY = scrollY.getPrevious() || 0;
      const isScrollingUp = current < previousScrollY;
      setHidden(current > 100 && !isScrollingUp); // Hide after 100px scroll down
    }
  });

  return (
    <motion.header
      className="fixed top-0 w-full bg-gradient-to-r from-[#D27D2D]/10 via-neutral to-[#008080]/10 shadow-lg z-50 p-6 flex justify-between items-center backdrop-blur-md"
      animate={{ y: hidden ? "-100%" : "0%" }} // Slide up to hide
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Link href="/">
        <Image
          src="/images/Wanderer logo 1.png"
          alt="Wanderer Tribe Logo"
          width={180}
          height={60}
          className="transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <nav className="flex items-center space-x-6">
        <Link
          href="/"
          className="text-lg font-body text-textDark hover:text-[#D27D2D] transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          href="/destinations"
          className="text-lg font-body text-textDark hover:text-[#D27D2D] transition-colors duration-300"
        >
          Destinations
        </Link>
        <Link href="/book">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#008080" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#D27D2D] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            Book Now
          </motion.button>
        </Link>
      </nav>
    </motion.header>
  );
}
