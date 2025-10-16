"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

interface HeroImageProps {
  src: string;
  alt?: string;
  overlay?: string;
  children?: React.ReactNode;
}

const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt = "Hero Image",
  overlay = "bg-black/40",
  children,
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const image = el.querySelector(".hero-image");
    const overlayEl = el.querySelector(".hero-overlay");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom+=200 top", // extend fade duration
        scrub: true,
      },
    });

    // Animate both opacity and scale
    tl.to(image, { scale: 1.1, opacity: 0.6, ease: "power1.out" }, 0);
    tl.to(overlayEl, { opacity: 0.8, ease: "power1.out" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen lg:h-[75vh] overflow-hidden rounded-b-[2.5rem]"
    >
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover object-top transition-transform duration-500"
        />

        {/* Overlay */}
        {overlay && (
          <div
            className={`hero-overlay absolute inset-0 ${overlay} rounded-b-[2.5rem] pointer-events-none transition-opacity`}
          />
        )}
      </div>

      {/* Foreground Content */}
      {children && (
        <div className="relative flex items-center justify-center h-full text-white z-10 px-6 text-center">
          {children}
        </div>
      )}
    </section>
  );
};

export default HeroImage;
