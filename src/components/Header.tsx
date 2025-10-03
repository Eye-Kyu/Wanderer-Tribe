// src/components/Navbar.tsx
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
  const [showLogo, setShowLogo] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setShowNavbar(true);
        setShowLogo(true);
        if (hideTimeout) clearTimeout(hideTimeout);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
        setShowLogo(true);

        if (hideTimeout) clearTimeout(hideTimeout);

        const timeout = setTimeout(() => {
          setShowNavbar(false);
          setShowLogo(false);
        }, 2000);

        setHideTimeout(timeout);
      } else {
        setShowNavbar(false);
        setShowLogo(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (hideTimeout) clearTimeout(hideTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, hideTimeout]);

  const dropdownVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: showNavbar ? 0 : -120 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-40 h-36 backdrop-blur-md bg-white border-b border-wanderer-teal/40 text-white"
      aria-label="Main navigation"
    >
      {/* Desktop Nav */}
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center h-full">
        <div className="flex flex-row items-center space-x-32 text-lg font-light text-black">
          {/* Destinations */}
          <Link
            href="/Destinations"
            onMouseEnter={() => setHoveredMenu("destinations")}
            onMouseLeave={() => setHoveredMenu(null)}
            className="relative cursor-pointer hover:text-wanderer-rust"
          >
            Destinations
            <AnimatePresence>
              {hoveredMenu === "destinations" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white text-wanderer-green rounded-xl shadow-xl py-4 px-6 z-50"
                >
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                      <FaGlobeEurope aria-hidden="true" />
                      <Link
                        href="/Destinations/europe"
                        className="hover:text-wanderer-rust"
                      >
                        Europe
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaGlobeAfrica aria-hidden="true" />
                      <Link
                        href="/Destinations/africa"
                        className="hover:text-wanderer-rust"
                      >
                        Africa
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaGlobeAsia aria-hidden="true" />
                      <Link
                        href="/Destinations/asia"
                        className="hover:text-wanderer-rust"
                      >
                        Middle East
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Experiences */}
          <Link
            href="/Experiences"
            onMouseEnter={() => setHoveredMenu("experiences")}
            onMouseLeave={() => setHoveredMenu(null)}
            className="relative cursor-pointer hover:text-wanderer-rust"
          >
            Experiences
            <AnimatePresence>
              {hoveredMenu === "experiences" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white text-wanderer-green rounded-xl shadow-xl py-4 px-6 z-50"
                >
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                      <FaSpa aria-hidden="true" />
                      <Link
                        href="/Experiences/wellness"
                        className="hover:text-wanderer-rust"
                      >
                        Wellness Retreats
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaHiking aria-hidden="true" />
                      <Link
                        href="/Experiences/adventure"
                        className="hover:text-wanderer-rust"
                      >
                        Adventure Travel
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaGem aria-hidden="true" />
                      <Link
                        href="/Experiences/luxury"
                        className="hover:text-wanderer-rust"
                      >
                        Luxury Escapes
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Logo fades separately */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: showLogo ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Wanderer logo 1.png"
                alt="wanderer-tribe-logo"
                width={160}
                height={55}
                className="object-contain z-50"
              />
            </Link>
          </motion.div>

          {/* Other Links */}
          <Link href="/About" className="cursor-pointer hover:text-wanderer-rust">
            About
          </Link>
          <Link href="/Contact" className="cursor-pointer hover:text-wanderer-rust">
            Contact
          </Link>
          <button className="bg-primary text-sm  text-white  py-2 px-2 rounded-2xl hover:bg-wanderer-rust hover:text-wanderer-green transition">
            Travel Enquiry
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden absolute right-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {mobileMenuOpen ? (
              <FaTimes size={24} aria-hidden="true" />
            ) : (
              <FaBars size={24} aria-hidden="true" />
            )}
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
            className="md:hidden bg-white text-wanderer-green px-6 py-4 space-y-4"
          >
            <Link href="/destinations" className="block hover:text-wanderer-rust">
              Destinations
            </Link>
            <Link href="/experiences" className="block hover:text-wanderer-rust">
              Experiences
            </Link>
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/images/Wanderer logo 1.png"
                alt="wanderer-tribe-logo"
                width={100}
                height={30}
                className="object-contain"
              />
            </Link>
            <Link href="/about" className="block hover:text-wanderer-rust">
              About
            </Link>
            <Link href="/contact" className="block hover:text-wanderer-rust">
              Contact
            </Link>
            <button className="w-full bg-primary text-white py-2 rounded-2xl hover:bg-wanderer-yellow hover:text-wanderer-green transition">
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
