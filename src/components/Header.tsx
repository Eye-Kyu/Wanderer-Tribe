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
  FaChevronDown,
} from "react-icons/fa";
import { useCtaModal } from "@/context/CTAModalContext";
import { usePathname } from "next/navigation";

const mobileLinks = [
  {
    href: "/Destinations",
    label: "Destinations",
    children: [
      { href: "/Destinations/africa", label: "Africa", icon: FaGlobeAfrica },
      { href: "/Destinations/europe", label: "Middle East", icon: FaGlobeEurope },
      { href: "/Destinations/asia", label: "Asia", icon: FaGlobeAsia },
    ],
  },
  {
    href: "/Experiences",
    label: "Experiences",
    children: [
      { href: "/Experiences/wellness", label: "Wellness Retreats", icon: FaSpa },
      { href: "/Experiences/adventure", label: "Adventure Travel", icon: FaHiking },
      { href: "/Experiences/luxury", label: "Luxury Escapes", icon: FaGem },
    ],
  },
  { href: "/About", label: "About" },
  { href: "/Contact", label: "Contact" },
];

// Menu reveals as a circle growing out of the hamburger button
const menuOrigin = "at calc(100% - 2.5rem) 2.5rem";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledUp, setScrolledUp] = useState(false);
  const [, setActiveDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
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

  // --- Mobile menu: lock page scroll and close on Escape while open ---
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setOpenSubmenu(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
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
    const tl = dropdownTimelines.current[menu];
    if (tl) {
      tl.reverse().eventCallback("onReverseComplete", () => {
        if (dropdownRefs.current[menu]) {
          gsap.set(dropdownRefs.current[menu], { display: "none" });
        }
      });
    } else {
      if (dropdownRefs.current[menu]) {
        gsap.set(dropdownRefs.current[menu], { display: "none" });
      }
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
          scrolledUp ? "bg-white text-black" : "bg-transparent text-white"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between h-full">
          {/* Mobile Navbar */}
          <div className="flex w-full items-center justify-between md:hidden">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Wanderer logo 1.png"
                alt="wanderer-tribe-logo"
                width={72}
                height={72}
                className="object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                scrolledUp
                  ? "text-black"
                  : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
              }`}
            >
              <FaBars size={22} />
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
                  className="hover:text-wanderer-rust font-medium"
                >
                  Destinations
                </Link>
                <div
                  ref={(el) => {
                    dropdownRefs.current["destinations"] = el;
                  }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-xl py-4 px-6 hidden"
                >
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2 hover:text-wanderer-moss">
                      <FaGlobeAfrica />{" "}
                      <Link href="/Destinations/africa">Africa</Link>
                    </li>
                    <li className="flex items-center hover:text-wanderer-moss space-x-2">
                      <FaGlobeEurope />{" "}
                      <Link href="/Destinations/europe">Middle East</Link>
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
                  className="hover:text-wanderer-rust font-medium"
                >
                  Experiences
                </Link>
                <div
                  ref={(el) => {
                    dropdownRefs.current["experiences"] = el;
                  }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white text-black rounded-xl shadow-xl py-4 px-6 hidden"
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
                className="hover:text-wanderer-rust font-medium"
              >
                About
              </Link>
              <Link
                href="/Contact"
                className="hover:text-wanderer-rust font-medium"
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

      </motion.nav>

      {/* --- Mobile Menu Overlay (outside the nav so its transform can't clip it) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="md:hidden fixed inset-0 z-[10000] h-[100dvh] flex flex-col bg-wanderer-forest text-wanderer-ivory"
            initial={{ clipPath: `circle(0% ${menuOrigin})` }}
            animate={{ clipPath: `circle(150% ${menuOrigin})` }}
            exit={{ clipPath: `circle(0% ${menuOrigin})` }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Top bar mirrors the navbar so the close button sits where the hamburger was */}
            <div className="flex h-20 shrink-0 items-center justify-between px-5 border-b border-wanderer-ivory/10">
              <Link href="/" onClick={closeMobileMenu} className="flex items-center">
                <Image
                  src="/images/Wanderer logo 1.png"
                  alt="wanderer-tribe-logo"
                  width={72}
                  height={72}
                  className="object-contain"
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full border border-wanderer-ivory/25 transition-colors active:bg-wanderer-ivory/10"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-6 pt-4" aria-label="Mobile navigation">
              <ul>
                {mobileLinks.map((link, i) => {
                  const expanded = openSubmenu === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      className="border-b border-wanderer-ivory/15"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.07, duration: 0.45, ease: "easeOut" }}
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={closeMobileMenu}
                          className={`flex-1 py-4 font-[Stardom] text-[1.9rem] leading-tight transition-colors ${
                            isActive(link.href) ? "text-wanderer-gold" : "active:text-wanderer-gold"
                          }`}
                        >
                          {link.label}
                        </Link>
                        {link.children && (
                          <button
                            onClick={() => setOpenSubmenu(expanded ? null : link.href)}
                            aria-label={`${expanded ? "Hide" : "Show"} ${link.label} links`}
                            aria-expanded={expanded}
                            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-wanderer-ivory/70 active:bg-wanderer-ivory/10"
                          >
                            <FaChevronDown
                              size={14}
                              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {link.children && expanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            {link.children.map(({ href, label, icon: Icon }) => (
                              <li key={href}>
                                <Link
                                  href={href}
                                  onClick={closeMobileMenu}
                                  className={`flex items-center gap-3 py-2.5 pl-1 text-base font-light transition-colors ${
                                    isActive(href) ? "text-wanderer-gold" : "text-wanderer-ivory/80 active:text-wanderer-gold"
                                  }`}
                                >
                                  <Icon className="shrink-0 text-wanderer-gold/80" size={15} />
                                  {label}
                                </Link>
                              </li>
                            ))}
                            <li className="h-3" aria-hidden="true" />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Call to action */}
            <motion.div
              className="shrink-0 px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + mobileLinks.length * 0.07, duration: 0.45, ease: "easeOut" }}
            >
              <button
                onClick={() => {
                  closeMobileMenu();
                  // wait for the menu to close and scroll to unlock before scrolling to the form
                  setTimeout(handleTravelEnquiry, 400);
                }}
                className="w-full rounded-full bg-wanderer-gold py-3.5 text-base font-medium text-wanderer-mahogany transition-colors active:bg-wanderer-ivory"
              >
                Travel Enquiry
              </button>
              <p className="mt-4 text-center text-xs text-wanderer-ivory/60">
                Discover wonders across Africa, Asia &amp; the Middle East
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
