"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGlobeEurope,
  FaGlobeAfrica,
  FaGlobeAsia,
  FaSpa,
  FaHiking,
  FaGem,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const dropdownVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
  };

  const navLinks = (
    <ul className="flex flex-col md:flex-row md:space-x-10 text-sm uppercase tracking-wider font-light text-black">
      <li
        onMouseEnter={() => setHoveredMenu("destinations")}
        onMouseLeave={() => setHoveredMenu(null)}
        className="relative"
      >
        <span className="cursor-pointer hover:text-primary">Destinations</span>
        <AnimatePresence>
          {hoveredMenu === "destinations" && (
            <motion.div
              variants={dropdownVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-xl py-4 px-6 z-50"
            >
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <FaGlobeEurope />
                  <Link
                    href="/destinations/europe"
                    className="hover:text-primary"
                  >
                    Europe
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaGlobeAfrica />
                  <Link
                    href="/destinations/africa"
                    className="hover:text-primary"
                  >
                    Africa
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaGlobeAsia />
                  <Link
                    href="/destinations/asia"
                    className="hover:text-primary"
                  >
                    Asia
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </li>

      <li
        onMouseEnter={() => setHoveredMenu("experiences")}
        onMouseLeave={() => setHoveredMenu(null)}
        className="relative"
      >
        <span className="cursor-pointer hover:text-primary">Experiences</span>
        <AnimatePresence>
          {hoveredMenu === "experiences" && (
            <motion.div
              variants={dropdownVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-full left-0 mt-2 w-64 bg-white text-black rounded-xl shadow-xl py-4 px-6 z-50"
            >
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <FaSpa />
                  <Link
                    href="/experiences/wellness"
                    className="hover:text-primary"
                  >
                    Wellness Retreats
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaHiking />
                  <Link
                    href="/experiences/adventure"
                    className="hover:text-primary"
                  >
                    Adventure Travel
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaGem />
                  <Link
                    href="/experiences/luxury"
                    className="hover:text-primary"
                  >
                    Luxury Escapes
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </li>

      <li>
        <Link href="/about" className="hover:text-primary">
          About
        </Link>
      </li>
      <li>
        <Link href="/contact" className="hover:text-primary">
          Contact
        </Link>
      </li>
    </ul>
  );

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50 bg-transparent text-white transition-all"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Image
          src="/images/Wanderer logo 1.png"
          alt="wanderer-tribe-logo"
          width={100}
          height={30}
        />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks}
          <button className="bg-primary text-white px-5 py-2 rounded-full hover:opacity-90 transition">
            Book Now
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white text-black px-6 py-4 space-y-4"
          >
            {navLinks}
            <button className="w-full bg-primary text-white py-2 rounded-full">
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
