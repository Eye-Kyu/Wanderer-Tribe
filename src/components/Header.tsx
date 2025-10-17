"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
import { useCtaModal } from "@/context/CTAModalContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledUp, setScrolledUp] = useState(false);
  const [, setActiveDropdown] = useState<string | null>(null);

  const { openCta } = useCtaModal();
  const pathname = usePathname();

  const handleTravelEnquiry = () => {
    if (pathname === "/") {
      const ctaSection = document.getElementById("cta");
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: "smooth" });
      } else {
        openCta();
      }
    } else {
      openCta();
    }
  };

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
    }, 2000);
  };

  // --- Scroll Hide/Show Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        setShowNavbar(true);
        setScrolledUp(false);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowNavbar(true);
        setScrolledUp(true);
        resetIdleTimer();
      } else if (currentScrollY > lastScrollY + 10) {
        // Scrolling down
        setShowNavbar(false);
        setScrolledUp(false);
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

  // --- Mouse movement detection ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
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

    if (mobileMenuOpen) tlRef.current.play();
    else tlRef.current.reverse();
  }, [mobileMenuOpen]);

  // --- Dropdown Animations ---
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
    if (dropdownTimelines.current[menu]) {
      dropdownTimelines.current[menu]!.reverse().eventCallback(
        "onReverseComplete",
        () => {
          if (dropdownRefs.current[menu]) {
            gsap.set(dropdownRefs.current[menu], { display: "none" });
          }
        }
      );
    }
    setActiveDropdown(null);
  };

  return (
    <>
      {/* --- Mini logo when navbar hidden (desktop only) --- */}
      <AnimatePresence>
        {!showNavbar && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex fixed top-4 left-6 z-[90] pointer-events-none"
          >
            <Image
              src="/images/Wanderer logo 1.png"
              alt="mini-logo"
              width={80}
              height={30}
              className="object-contain drop-shadow-md"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Navbar --- */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: showNavbar ? 0 : -120 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 w-full z-[100] h-20 md:h-28 border-b border-black/10 shadow-xl transition-colors duration-500 ${
          scrolledUp
            ? "bg-white text-black"
            : "bg-transparent text-white mix-blend-difference"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
          {/* Mobile Navbar */}
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
              className="text-black z-[400]"
            >
              {mobileMenuOpen ? (
                <FaTimes size={20} className="transition-all" />
              ) : (
                <FaBars size={24} className="transition-all" />
              )}
            </button>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex w-full items-center justify-between text-lg font-light relative">
            {/* Left side links */}
            <div className="flex items-center space-x-16">
              {/* Destinations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("destinations")}
                onMouseLeave={() => handleMouseLeave("destinations")}
              >
                <Link
                  href="/Destinations"
                  className="hover:text-wanderer-rust font-bold"
                >
                  Destinations
                </Link>
                <div
                  ref={(el) => (dropdownRefs.current["destinations"] = el)}
                  className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-xl py-4 px-6 hidden"
                >
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center hover:text-wanderer-moss space-x-2">
                      <FaGlobeEurope />{" "}
                      <Link href="/Destinations/europe">Middle East</Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-wanderer-moss">
                      <FaGlobeAfrica />{" "}
                      <Link href="/Destinations/africa">Africa</Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-wanderer-moss">
                      <FaGlobeAsia />{" "}
                      <Link href="/Destinations/asia">Asia</Link>
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
                <Link
                  href="/Experiences"
                  className="hover:text-wanderer-rust font-bold"
                >
                  Experiences
                </Link>
                <div
                  ref={(el) => (dropdownRefs.current["experiences"] = el)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white text-wanderer-green rounded-xl shadow-xl py-4 px-6 hidden"
                >
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2 hover:text-wanderer-moss">
                      <FaSpa />{" "}
                      <Link href="/Experiences/wellness">
                        Wellness Retreats
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-wanderer-moss">
                      <FaHiking />{" "}
                      <Link href="/Experiences/adventure">
                        Adventure Travel
                      </Link>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-wanderer-moss">
                      <FaGem />{" "}
                      <Link href="/Experiences/luxury">Luxury Escapes</Link>
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
              <Link
                href="/About"
                className="hover:text-wanderer-rust font-bold"
              >
                About
              </Link>
              <Link
                href="/Contact"
                className="hover:text-wanderer-rust font-bold"
              >
                Contact
              </Link>

              <button
                onClick={handleTravelEnquiry}
                className="bg-wanderer-gold text-sm text-black py-2 px-4 rounded-2xl hover:bg-wanderer-moss hover:text-wanderer-mahogany transition"
              >
                Travel Enquiry
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          ref={menuRef}
          className="fixed inset-0 bg-wanderer-forest text-white font-extralight flex flex-col justify-center items-center gap-8 text-md md:hidden z-[300] h-screen"
          style={{ clipPath: "circle(0% at 100% 0)", pointerEvents: "none" }}
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
              ref={(el) => el && (linkRefs.current[i] = el)}
              className="opacity-0 translate-y-10"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <button
            ref={(el) =>
              el && (linkRefs.current[4] = el as unknown as HTMLAnchorElement)
            }
            className="bg-primary button2 text-white py-1 px-2 rounded-2xl hover:bg-wanderer-rust hover:text-wanderer-green transition opacity-0 translate-y-10"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Now
          </button>
        </div>
      </motion.nav>
    </>
  );
}
