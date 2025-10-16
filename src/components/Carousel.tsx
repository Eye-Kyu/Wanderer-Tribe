"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
}

interface CarouselProps {
  slides: Slide[];
  autoplay?: boolean;
  delay?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoplay = true,
  delay = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // --- GSAP curtain reveal using scale ---
  const animateReveal = (
    newIndex: number,
    dir: "next" | "prev",
    oldIndex?: number
  ) => {
    const newSlide = slideRefs.current[newIndex];
    const oldSlide = oldIndex !== undefined ? slideRefs.current[oldIndex] : null;
    if (!newSlide) return;

    slideRefs.current.forEach((slide) => {
      if (slide) gsap.set(slide, { zIndex: 0, opacity: 0 });
    });

    // Prepare new slide mask
    gsap.set(newSlide, {
      zIndex: 2,
      opacity: 1,
      transformOrigin: dir === "next" ? "100% 50%" : "0% 50%",
      scaleX: 0,
    });

    gsap.to(newSlide, {
      scaleX: 1,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        if (oldSlide) gsap.set(oldSlide, { opacity: 0 });
      },
    });
  };

  const nextSlide = () => {
    const oldIndex = currentIndex;
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
    animateReveal(newIndex, "next", oldIndex);
  };

  const prevSlide = () => {
    const oldIndex = currentIndex;
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    animateReveal(newIndex, "prev", oldIndex);
  };

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(nextSlide, delay);
    return () => clearInterval(autoplayRef.current!);
  }, [currentIndex]);

  // Initial setup
  useEffect(() => {
    const firstSlide = slideRefs.current[0];
    if (firstSlide) {
      gsap.set(firstSlide, {
        zIndex: 2,
        opacity: 1,
        scaleX: 1,
      });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => {
            slideRefs.current[index] = el;
          }}
          className="absolute inset-0 w-full h-full origin-left"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-16 lg:bottom-24 left-4 md:left-10 text-white z-10">
            <h1 className="text-3xl md:text-8xl font-bold mb-2 drop-shadow-lg">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <h2 className="text-base md:text-3xl font-light drop-shadow-md">
                {slide.subtitle}
              </h2>
            )}
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="hidden md:flex items-center justify-center absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 z-20"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 z-20"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-wanderer-gold text-xs bg-black/40 px-3 py-1 rounded-full z-20">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Carousel;
