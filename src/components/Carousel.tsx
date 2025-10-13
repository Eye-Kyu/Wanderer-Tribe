"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel() {
  const carouselItems = [
    {
      image: "/images/africa.jpg",
      caption: "Discover the World's Wonders",
    },
    {
      image: "/images/discover-europe.jpg",
      caption: "Timeless Europe Awaits",
    },
    {
      image: "/images/discover-africa.jpg",
      caption: "Wild African Adventures",
    },
    { image: "/images/explore-asia.jpeg", caption: "Exotic Asian Escapes" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const directionRef = useRef<"left" | "right">("right");

  // --- GSAP clip-path transition logic ---
  useEffect(() => {
    const slides = slidesRef.current;
    if (!slides || slides.length === 0) return;

    slides.forEach((slide, i) => {
      gsap.set(slide, {
        clipPath:
          i === activeIndex
            ? "inset(0% 0% 0% 0%)"
            : directionRef.current === "right"
            ? "inset(0% 0% 0% 100%)"
            : "inset(0% 100% 0% 0%)",
        opacity: i === activeIndex ? 1 : 0,
        zIndex: i === activeIndex ? 2 : 1,
      });
    });

    const prevIndex =
      directionRef.current === "right"
        ? (activeIndex - 1 + slides.length) % slides.length
        : (activeIndex + 1) % slides.length;

    const tl = gsap.timeline();

    // Animate current slide in
    tl.to(slides[activeIndex], {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power3.inOut",
      opacity: 1,
    });

    // Animate previous slide out
    tl.to(
      slides[prevIndex],
      {
        clipPath:
          directionRef.current === "right"
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 100%)",
        duration: 1.2,
        ease: "power3.inOut",
        opacity: 0,
      },
      "<"
    );
  }, [activeIndex]);

  // --- Auto-slide every 6 seconds ---
  useEffect(() => {
    const timer = setInterval(() => {
      directionRef.current = "right";
      setActiveIndex((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const handlePrev = () => {
    directionRef.current = "left";
    setActiveIndex((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    directionRef.current = "right";
    setActiveIndex((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full">
        {carouselItems.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) slidesRef.current[i] = el;
            }}
            className="absolute inset-0"
          >
            <Image
              src={item.image}
              alt={item.caption}
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="font-heading text-4xl md:text-7xl font-bold text-white text-center px-6 drop-shadow-lg">
                {item.caption}
              </h2>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-6 button top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-4 rounded-full z-50"
          aria-label="Previous Slide"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-6 button top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-4 rounded-full z-50"
          aria-label="Next Slide"
        >
         <FaChevronRight size={20} />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-50">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-white scale-125" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
