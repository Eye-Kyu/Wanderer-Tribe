"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Activities ---
const activities = [
  { title: "African Safaris", desc: "Witness the Big Five in their natural habitat with luxury lodges under starlit skies.", image: "/images/africa/serengeti.jpeg" },
  { title: "Tropical Beaches", desc: "Relax on pristine white sands and turquoise waters in secluded destinations.", image: "/images/asia/maldives.jpeg" },
  { title: "Culinary Delights", desc: "Taste world-class cuisine with private chefs and immersive food tours.", image: "/images/luxury/bordeaux-wine.jpeg" },
  { title: "Historic Sites", desc: "Step back in time exploring ancient ruins and UNESCO heritage wonders.", image: "/images/africa/cairo.jpeg" },
  { title: "Luxury Cruises", desc: "Sail across oceans and rivers aboard elegant yachts and premium liners.", image: "/images/luxury/french-riviera-yacht.jpeg" },
  { title: "Mountain Adventures", desc: "Discover alpine trails, private lodges, and breathtaking summits.", image: "/images/adventure/swiss-alps.jpeg" },
  { title: "Cultural Journeys", desc: "Engage with traditions, art, and spiritual heritage across continents.", image: "/images/asia-temple.jpg" },
  { title: "Desert Escapes", desc: "Experience starlit skies and golden dunes in luxury desert camps.", image: "/images/luxury/dubai-desert.jpeg" },
  { title: "Wildlife Encounters", desc: "Meet exotic wildlife through conservation-led safaris and guided treks.", image: "/images/africa/okavango.jpeg" },
  { title: "City Luxury", desc: "Stay in iconic cities, indulging in fine dining, shopping, and nightlife.", image: "/images/shibuya.jpeg" },
  { title: "Romantic Getaways", desc: "Private villas, candlelit dinners, and bespoke experiences for couples.", image: "/images/luxury/south-africa-lodge.jpeg" },
  { title: "Adventure Sports", desc: "Dive, ski, paraglide, or surf in world-renowned adventure destinations.", image: "/images/adventure/costa-rica-rafting.jpeg" },
];

// --- Responsive Hook ---
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

// --- Mobile Version (1 card per page) ---
function MobileCarousel({ isInView }: { isInView: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      {activities.map((activity, idx) => (
        <motion.article
          key={idx}
          className="w-full p-4 bg-white rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: idx * 0.05, duration: 0.6 }}
        >
          <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1 text-gray-900">
            {activity.title}
          </h3>
          <p className="text-gray-600 text-sm">{activity.desc}</p>
        </motion.article>
      ))}
    </div>
  );
}

// --- Desktop Version (carousel w/ pagination) ---
function DesktopCarousel({ isInView }: { isInView: boolean }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const CARDS_PER_PAGE = 4;
  const CARD_WIDTH = 336;
  const GAP_PX = 24;

  useEffect(() => {
    const measure = () => setPageWidth(CARDS_PER_PAGE * (CARD_WIDTH + GAP_PX));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const totalPages = Math.ceil(activities.length / CARDS_PER_PAGE);

  const scrollToPage = (page: number) => {
    if (!scrollRef.current || pageWidth === 0) return;
    const target = page * pageWidth;
    scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || pageWidth === 0) return;
      const newPage = Math.round(scrollRef.current.scrollLeft / pageWidth);
      setCurrentPage(newPage);
    };
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [pageWidth]);

  return (
    <>
      <div ref={scrollRef} className="flex gap-6 px-4 pb-6 overflow-hidden scroll-smooth">
        {activities.map((activity, idx) => (
          <motion.article
            key={idx}
            className="w-[21rem] flex-shrink-0 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.04, duration: 0.6 }}
          >
            <div className="relative w-full h-[22rem] mb-4 rounded-lg overflow-hidden">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 21rem"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {activity.title}
            </h3>
            <p className="text-gray-600 text-sm">{activity.desc}</p>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === currentPage ? "bg-wanderer-teal" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-30">
        <button
          onClick={() => scrollToPage(Math.max(currentPage - 1, 0))}
          className="p-3 rounded-full bg-wanderer-teal text-white hover:bg-neutral-800 shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollToPage(Math.min(currentPage + 1, totalPages - 1))}
          className="p-3 rounded-full bg-wanderer-teal text-white hover:bg-neutral-800 shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

// --- Main Component ---
export default function ActivityList(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile(1024); // breakpoint at 1024px

  return (
    <section
      id="activities"
      ref={sectionRef}
      className="relative py-20 bg-beige w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full px-6 text-center mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-heading text-gray-900 mb-6">
          Handpicked Experiences
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore a curated selection of activities — from safaris to historic
          sites, culinary delights, and romantic escapes. Each is designed to
          immerse you in unforgettable memories.
        </p>

        {isMobile ? (
          <MobileCarousel isInView={isInView} />
        ) : (
          <DesktopCarousel isInView={isInView} />
        )}
      </motion.div>
    </section>
  );
}
