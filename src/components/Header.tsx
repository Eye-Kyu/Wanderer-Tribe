"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
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
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setActiveDropdown] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const dropdownTimelines = useRef<Record<string, gsap.core.Timeline>>({});
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  // --- Utility: Reset idle timer ---
  const resetIdleTimer = () => {
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => {
      setShowNavbar(false);
    }, 2000); // hide after 2s idle
  };

  // --- Scroll Hide/Show ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near top
      if (currentScrollY < 100) {
        setShowNavbar(true);
        if (idleTimeout.current) clearTimeout(idleTimeout.current);
        return;
      }

      // Scrolling up → show navbar + idle timer
      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
        resetIdleTimer();
      } else {
        // Scrolling down → hide immediately
        setShowNavbar(false);
        if (idleTimeout.current) clearTimeout(idleTimeout.current);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // --- Mouse movement detection (hover near navbar keeps it visible) ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        // If mouse near top, keep navbar visible
        setShowNavbar(true);
        resetIdleTimer();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- GSAP Mobile Menu Animation ---
  useEffect(() => {
    if (!menuRef.current) return;

    if (!tlRef.current) {
      tlRef.current = gsap.timeline({ paused: true });
      tlRef.current
        .to(menuRef.current, {
          clipPath: "circle(150% at 100% 0)",
          duration: 0.8,
          ease: "power3.inOut",
          pointerEvents: "auto",
        })
        .fromTo(
          linkRefs.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }

    if (mobileMenuOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [mobileMenuOpen]);

  // --- GSAP Dropdown Animation ---
  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
    if (!dropdownRefs.current[menu]) return;

    if (!dropdownTimelines.current[menu]) {
      dropdownTimelines.current[menu] = gsap.timeline({ paused: true });
      dropdownTimelines.current[menu]
        .set(dropdownRefs.current[menu], { display: "block" })
        .fromTo(
          dropdownRefs.current[menu]?.querySelectorAll("li"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
        );
    }
    dropdownTimelines.current[menu].play();
  };

  const handleMouseLeave = (menu: string) => {
    if (dropdownTimelines.current[menu] !== undefined) {
      dropdownTimelines.current[menu]!.reverse().eventCallback("onReverseComplete", () => {
        if (dropdownRefs.current[menu]) {
          gsap.set(dropdownRefs.current[menu], { display: "none" });
        }
      });
    }
    setActiveDropdown(null);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: showNavbar ? 0 : -120 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-[100] h-20 md:h-28  bg-transparent border-b border-black/20 shadow-xl"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* --- Mobile (Logo left + Hamburger right) --- */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Wanderer logo 1.png"
              alt="wanderer-tribe-logo"
              width={90}
              height={25}
              className="object-contain"
            />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-wanderer-green z-[400]"
          >
            {mobileMenuOpen ? (
              <FaTimes size={20} className="text-black transition-all" />
            ) : (
              <FaBars size={24} className="text-black transition-all" />
            )}
          </button>
        </div>

        {/* --- Desktop Nav (Logo centered) --- */}
        <div className="hidden md:flex w-full items-center justify-between text-lg font-light text-black relative">
          {/* Left side links */}
          <div className="flex items-center space-x-16">
            {/* Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("destinations")}
              onMouseLeave={() => handleMouseLeave("destinations")}
            >
              <Link href="/Destinations" className="hover:text-wanderer-rust font-bold text-white">
                Destinations
              </Link>
              <div
                ref={(el) => { dropdownRefs.current["destinations"] = el; }}
                className="absolute top-full left-0 mt-2 w-56 bg-white text-wanderer-green rounded-xl shadow-xl py-4 px-6 hidden"
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <FaGlobeEurope /> <Link href="/Destinations/europe">Europe</Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaGlobeAfrica /> <Link href="/Destinations/africa">Africa</Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaGlobeAsia /> <Link href="/Destinations/asia">Middle East</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Experiences Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("experiences")}
              onMouseLeave={() => handleMouseLeave("experiences")}
            >
              <Link href="/Experiences" className="hover:text-wanderer-rust font-bold text-white">
                Experiences
              </Link>
              <div
                ref={(el) => { dropdownRefs.current["experiences"] = el; }}
                className="absolute top-full left-0 mt-2 w-64 bg-white text-wanderer-green rounded-xl shadow-xl py-4 px-6 hidden"
              >
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <FaSpa /> <Link href="/Experiences/wellness">Wellness Retreats</Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaHiking /> <Link href="/Experiences/adventure">Adventure Travel</Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaGem /> <Link href="/Experiences/luxury">Luxury Escapes</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Wanderer logo 1.png"
              alt="wanderer-tribe-logo"
              width={120}
              height={45}
              className="object-contain my-2"
            />
          </Link>

          {/* Right side links */}
          <div className="flex items-center space-x-16">
            <Link href="/About" className="hover:text-wanderer-rust font-bold text-white">
              About
            </Link>
            <Link href="/Contact" className="hover:text-wanderer-rust font-bold text-white mix-blend-difference">
              Contact
            </Link>
            <Link href="#cta" >
            <button className="bg-wanderer-gold text-sm text-black py-2 px-4 rounded-2xl hover:bg-wanderer-moss hover:text-wanderer-mahogany transition">
              Travel Enquiry
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* --- Mobile Fullscreen Overlay Menu (GSAP controlled) --- */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-wanderer-green text-white font-extralight flex flex-col justify-center items-center gap-8 text-md md:hidden z-[300] h-screen"
        style={{
          clipPath: "circle(0% at 100% 0)",
          pointerEvents: "none",
        }}
      >
        {[
          { href: "/Destinations", label: "Destinations" },
          { href: "/Experiences", label: "Experiences" },
          { href: "/About", label: "About" },
          { href: "/Contact", label: "Contact" },
        ].map((link, i) => (
          <Link
            key={i}
            href={link.href}
            ref={(el) => {
              if (el) linkRefs.current[i] = el;
            }}
            className="opacity-0 translate-y-10"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <button
          ref={(el) => {
            if (el) linkRefs.current[4] = el as unknown as HTMLAnchorElement;
          }}
          className="bg-primary text-white py-1 px-2 rounded-2xl hover:bg-wanderer-rust hover:text-wanderer-green transition opacity-0 translate-y-10"
          onClick={() => setMobileMenuOpen(false)}
        >
          Book Now
        </button>
      </div>
    </motion.nav>
  );
}
