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
const curtainRef = useRef<HTMLDivElement | null>(null);
const autoplayRef = useRef<NodeJS.Timeout | null>(null);
const animRef = useRef<gsap.core.Timeline | null>(null);

// Animate slide transition using curtain
const animateReveal = (
newIndex: number,
dir: "next" | "prev",
oldIndex?: number
) => {
const curtain = curtainRef.current;
const newSlide = slideRefs.current[newIndex];
const oldSlide =
oldIndex !== undefined ? slideRefs.current[oldIndex] : null;
if (!curtain || !newSlide) return;


animRef.current?.kill();

// Stack order reset
slideRefs.current.forEach((s) => {
  if (s) gsap.set(s, { zIndex: 0, opacity: 0 });
});
if (oldSlide) gsap.set(oldSlide, { zIndex: 1, opacity: 1 });
gsap.set(newSlide, { zIndex: 0, opacity: 1 });

const isNext = dir === "next";
gsap.set(curtain, {
  zIndex: 2,
  display: "block",
  opacity: 1,
  xPercent: isNext ? -100 : 100,
  backgroundColor: "#000",
});

const tl = gsap.timeline({
  defaults: { duration: 0.8, ease: "power3.inOut" },
  onComplete: () => {
    gsap.set(curtain, { display: "none", opacity: 0 });
    animRef.current = null;
  },
});

tl.to(curtain, { xPercent: 0 })
  .add(() => {
    if (oldSlide) gsap.set(oldSlide, { opacity: 0 });
    gsap.set(newSlide, { zIndex: 1, opacity: 1 });
  })
  .to(curtain, { xPercent: isNext ? 100 : -100 });

animRef.current = tl;


};

// navigation
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

// autoplay
useEffect(() => {
if (!autoplay) return;
autoplayRef.current = setInterval(nextSlide, delay);


return () => {
  if (autoplayRef.current) {
    clearInterval(autoplayRef.current);
  }
};


}, [currentIndex, autoplay, delay]);

// set first slide visible
useEffect(() => {
const first = slideRefs.current[0];
if (first) gsap.set(first, { zIndex: 1, opacity: 1 });
}, []);

return ( <div className="relative w-screen h-screen overflow-hidden">
{slides.map((slide, index) => (
<div
key={index}
ref={(el) => {
slideRefs.current[index] = el;
}}
className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
            index === currentIndex
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
>
<Image
src={slide.image}
alt={slide.title}
fill
priority={index === 0}
className="object-cover"
/> <div className="absolute inset-0 bg-black/40" /> <div className="absolute bottom-16 lg:bottom-24 left-4 md:left-10 text-white z-10"> <h1 className="text-3xl md:text-8xl font-bold mb-2 drop-shadow-lg">
{slide.title} </h1>
{slide.subtitle && ( <p className="text-sm md:text-2xl font-light drop-shadow-md">
{slide.subtitle} </p>
)} </div> </div>
))}


  {/* Curtain overlay */}
  <div
    ref={curtainRef}
    className="absolute inset-0 pointer-events-none"
    style={{ backgroundColor: "#000", display: "none" }}
  />

  {/* Navigation */}
  <button
    onClick={prevSlide}
    className="hidden md:flex items-center justify-center absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 z-30"
  >
    <ArrowLeft className="h-5 w-5" />
  </button>
  <button
    onClick={nextSlide}
    className="hidden md:flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 z-30"
  >
    <ArrowRight className="h-5 w-5" />
  </button>

  {/* Pagination */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-wanderer-gold text-xs bg-black/40 px-3 py-1 rounded-full z-30">
    {currentIndex + 1} / {slides.length}
  </div>
</div>


);
};

export default Carousel;
