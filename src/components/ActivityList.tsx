"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Activities ---
const activities = [
  {
    title: "African Safaris",
    desc: "Witness the Big Five in their natural habitat with luxury lodges under starlit skies.",
    image: "/images/africa/serengeti.webp",
  },
  {
    title: "Tropical Beaches",
    desc: "Relax on pristine white sands and turquoise waters in secluded destinations.",
    image: "/images/asia/maldives.webp",
  },
  {
    title: "Culinary Delights",
    desc: "Taste world-class cuisine with private chefs and immersive food tours.",
    image: "/images/luxury/bordeaux-wine.webp",
  },
  {
    title: "Historic Sites",
    desc: "Step back in time exploring ancient ruins and UNESCO heritage wonders.",
    image: "/images/africa/cairo.webp",
  },
  {
    title: "Luxury Cruises",
    desc: "Sail across oceans and rivers aboard elegant yachts and premium liners.",
    image: "/images/luxury/french-riviera-yacht.webp",
  },
  {
    title: "Mountain Adventures",
    desc: "Discover alpine trails, private lodges, and breathtaking summits.",
    image: "/images/adventure/swiss-alps.webp",
  },
  {
    title: "Cultural Journeys",
    desc: "Engage with traditions, art, and spiritual heritage across continents.",
    image: "/images/asia-temple.webp",
  },
  {
    title: "Desert Escapes",
    desc: "Experience starlit skies and golden dunes in luxury desert camps.",
    image: "/images/luxury/dubai-desert.webp",
  },
  {
    title: "Wildlife Encounters",
    desc: "Meet exotic wildlife through conservation-led safaris and guided treks.",
    image: "/images/africa/okavango.webp",
  },
  {
    title: "City Luxury",
    desc: "Stay in iconic cities, indulging in fine dining, shopping, and nightlife.",
    image: "/images/shibuya.jpeg",
  },
  {
    title: "Romantic Getaways",
    desc: "Private villas, candlelit dinners, and bespoke experiences for couples.",
    image: "/images/luxury/south-africa-lodge.webp",
  },
  {
    title: "Adventure Sports",
    desc: "Dive, ski, paraglide, or surf in world-renowned adventure destinations.",
    image: "/images/adventure/costa-rica-rafting.webp",
  },
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
          <h3 className="text-lg font-semibold text-wanderer-rust mb-1 ">
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
  const [cardWidth, setCardWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const CARDS_VISIBLE = 3;
  const CARD_WIDTH = 336;
  const GAP_PX = 24;

  useEffect(() => {
    // Measure a single card + gap
    setCardWidth(CARD_WIDTH + GAP_PX);
    const handleResize = () => setCardWidth(CARD_WIDTH + GAP_PX);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, activities.length - CARDS_VISIBLE);

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const target = idx * cardWidth;
    scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || cardWidth === 0) return;
      const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
      setCurrentIndex(idx);
    };
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [cardWidth]);

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-6 px-4 pb-6 overflow-hidden scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {activities.map((activity, idx) => (
          <motion.article
            key={idx}
            className="w-[21rem] flex-shrink-0 p-2 bg-white rounded-xl shadow-xl hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.04, duration: 0.6 }}
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative w-full h-[22rem] mb-4 rounded-xl overflow-hidden">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 21rem"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-wanderer-rust">
              {activity.title}
            </h3>
            <p className="text-gray-600 text-sm">{activity.desc}</p>
          </motion.article>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-30">
        <button
          onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
          className="p-3 rounded-full bg-wanderer-teal button shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollToIndex(Math.min(currentIndex + 1, maxIndex))}
          className="p-3 rounded-full bg-wanderer-teal button shadow-md"
          aria-label="Scroll right"
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
      className="
        relative py-20 w-full
        bg-gradient-to-b from-[#174B2E] via-[#1a4e4a] to-[#005c67]
        text-white
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full px-6 text-center mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-heading mb-6 text-wanderer-gold">
          Handpicked Experiences
        </h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-200">
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
