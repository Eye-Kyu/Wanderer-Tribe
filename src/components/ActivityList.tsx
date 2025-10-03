"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function ActivityList(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [pageWidth, setPageWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const CARDS_PER_PAGE = 4;
  const CARD_WIDTH = 336; // ~21rem
  const GAP_PX = 24; // gap between cards (Tailwind gap-6 ≈ 24px)

  // measure width of one "page"
  useEffect(() => {
    const measure = () => {
      setPageWidth(CARDS_PER_PAGE * (CARD_WIDTH + GAP_PX));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const totalPages = Math.ceil(activities.length / CARDS_PER_PAGE);

  const scrollToPage = (page: number) => {
    if (!scrollRef.current || pageWidth === 0) return;
    const container = scrollRef.current;
    const target = page * pageWidth;
    container.scrollTo({ left: target, behavior: "smooth" });
    setCurrentPage(page);
  };

  // Track scroll to sync pagination
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || pageWidth === 0) return;
      const container = scrollRef.current;
      const newPage = Math.round(container.scrollLeft / pageWidth);
      setCurrentPage(newPage);
    };
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [pageWidth]);

  return (
    <section
      id="activities"
      ref={sectionRef}
      className="relative py-20 bg-beige w-full"
      aria-label="Handpicked experiences carousel"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full px-6 text-center mx-auto"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-heading text-gray-900 mb-6">
          Handpicked Experiences
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore a curated selection of activities — from safaris to historic
          sites, culinary delights, and romantic escapes. Each is designed to
          immerse you in unforgettable memories.
        </p>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="relative flex gap-6 px-4 pb-6 overflow-hidden scroll-smooth"
        >
          {activities.map((activity, idx) => (
            <motion.article
              key={idx}
              className="activity-card w-[21rem] flex-shrink-0 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
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
                  sizes="(max-width: 768px) 90vw, 21rem"
                  priority={idx < 3}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {activity.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {activity.desc}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === currentPage ? "bg-wanderer-teal" : "bg-gray-400"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 right-8 flex gap-4 z-30">
          <button
            onClick={() => scrollToPage(Math.max(currentPage - 1, 0))}
            aria-label="Previous page"
            className="p-3 rounded-full bg-wanderer-teal text-white hover:bg-neutral-800 shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToPage(Math.min(currentPage + 1, totalPages - 1))}
            aria-label="Next page"
            className="p-3 rounded-full bg-wanderer-teal text-white hover:bg-neutral-800 shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
