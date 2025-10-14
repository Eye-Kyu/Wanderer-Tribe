"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselItem {
  image: string;
  caption: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoSlideInterval?: number;
}

export default function Carousel({
  items,
  autoSlideInterval = 6000,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const directionRef = useRef<"left" | "right">("right");

  // 🎥 GSAP Cinematic Transition Logic
  useEffect(() => {
    const slides = slidesRef.current;
    if (!slides.length) return;

    slides.forEach((slide, i) => {
      gsap.set(slide, {
        opacity: i === activeIndex ? 1 : 0,
        scale: i === activeIndex ? 1 : 1.08,
        zIndex: i === activeIndex ? 2 : 1,
      });
    });

    const prevIndex =
      directionRef.current === "right"
        ? (activeIndex - 1 + slides.length) % slides.length
        : (activeIndex + 1) % slides.length;

    const current = slides[activeIndex];
    const previous = slides[prevIndex];

    const tl = gsap.timeline({ defaults: { duration: 1.3, ease: "power3.inOut" } });

    // Current slide fade-in & smooth zoom
    tl.fromTo(
      current,
      {
        opacity: 0,
        scale: 1.08,
        x: directionRef.current === "right" ? "8%" : "-8%",
      },
      {
        opacity: 1,
        scale: 1,
        x: "0%",
        zIndex: 2,
      }
    );

    // Previous slide fade out
    tl.to(
      previous,
      {
        opacity: 0,
        scale: 1.02,
        x: directionRef.current === "right" ? "-4%" : "4%",
        zIndex: 1,
      },
      "<"
    );

    // Caption fade-in delay for elegance
    const caption = current.querySelector("h2");
    if (caption) {
      gsap.fromTo(
        caption,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.4,
          ease: "power3.out",
        }
      );
    }
  }, [activeIndex]);

  // 🔁 Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      directionRef.current = "right";
      setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [items.length, autoSlideInterval]);

  const handlePrev = () => {
    directionRef.current = "left";
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    directionRef.current = "right";
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-neutral-950">
      <div className="relative w-full h-full">
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) slidesRef.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden will-change-transform"
          >
            <Image
              src={item.image}
              alt={item.caption}
              fill
              className="object-cover"
              priority={i === 0}
            />
            {/* Removed dark fade — replaced with subtle vignette for clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center">
              <h2 className="font-heading text-4xl md:text-7xl font-bold text-white text-center px-6 drop-shadow-lg">
                {item.caption}
              </h2>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-4 rounded-full z-50 transition"
          aria-label="Previous Slide"
        >
          <FaChevronLeft size={22} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-4 rounded-full z-50 transition"
          aria-label="Next Slide"
        >
          <FaChevronRight size={22} />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-50">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
