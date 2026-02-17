"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backupRef = useRef<HTMLDivElement>(null);

  // 🎞️ Cinematic Intro
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: overlayRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        imageRef.current,
        {
          scale: 0.7,
          borderRadius: "50%",
        },
        {
          scale: 1.2,
          borderRadius: "0%",
          ease: "power3.inOut",
          duration: 1,
        },
      );

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.9,
          ease: "power2.inOut",
        },
        "-=0.8",
      );

      tl.fromTo(
        backupRef.current,
        {
          scale: 0.6,
          opacity: 0,
          y: 0,
        },
        {
          scale: 1,
          opacity: 1,
          y: -30,
          ease: "power3.inOut",
          duration: 0.8,
        },
        "-=0.3",
      );
    }, overlayRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const chapters = useMemo(
    () => [
      {
        id: "vision",
        title: "The Founders' Vision",
        subtitle: "A Dream Born of Wanderlust",
        content:
          "Amidst the rustle of acacia trees and the whispers of distant dunes, Wanderer Tribe was born. Our founders envisioned more than travel — they dreamed of connection. From Africa's sacred lands to forgotten island trails, Wanderer Tribe seeks not to escape life, but to discover it — through stories, encounters, and journeys that awaken the soul.",
        image: "/images/About/vision.svg",
        accentColor: "#F5E1C0",
        imagePosition: "left",
      },
      {
        id: "philosophy",
        title: "Our Guiding Light",
        subtitle: "Beyond the Beaten Path",
        content:
          "Travel need not be a checklist of monuments. We weave odysseys where you dance with desert winds, sip tea with mountain hermits, and witness the birth of a new day over uncharted horizons.",
        image: "/images/About/philosophy.svg",
        accentColor: "#F5E1C0",
        imagePosition: "right",
      },
      {
        id: "previews",
        title: "Exclusive Previews",
        subtitle: "Whispers of What's Next",
        content:
          "Peek into the future: a lost temple in Cambodia's jungles, a volcanic island off Iceland, a Himalayan pass blooming with rare orchids. These are the next chapters Wanderer Tribe is unveiling—join us to be among the first to explore.",
        image: "/images/Adventure/inca-trail.webp",
        accentColor: "#008080",
        imagePosition: "left",
      },
    ],
    [],
  );

  useEffect(() => {
    // Cinematic Intro Timeline
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: overlayRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    introTl.fromTo(
      imageRef.current,
      {
        scale: 0.7,
        borderRadius: "50%",
        width: 400,
        height: 350,
      },
      {
        scale: 1.2,
        borderRadius: "0%",
        width: window.innerWidth,
        height: window.innerHeight,
        ease: "power3.inOut",
        duration: 1,
      },
    );

    introTl.to(
      textRef.current,
      {
        opacity: 0,
        y: -30,
        duration: 0.9,
        ease: "power2.inOut",
      },
      "-=0.8",
    );

    introTl.fromTo(
      backupRef.current,
      {
        scale: 0.6,
        opacity: 0,
        y: 0,
      },
      {
        scale: 1,
        opacity: 1,
        y: -30,
        ease: "power3.inOut",
        duration: 0.8,
      },
      "-=0.3",
    );

    // Parallax & Fade-In for chapters
    chaptersRef.current.forEach((chapterEl) => {
      const image = chapterEl.querySelector(".chapter-image");
      const title = chapterEl.querySelector(".chapter-title");
      const subtitle = chapterEl.querySelector(".chapter-subtitle");
      const content = chapterEl.querySelector(".chapter-content");

      // Parallax for image
      gsap.to(image, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: chapterEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        willChange: "transform",
      });

      // Fade and slide-up for text elements
      [title, subtitle, content].forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.6,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: chapterEl,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            willChange: "opacity, transform",
          },
        );
      });
    });

    // CTA fade-in
    gsap.fromTo(
      ".cta-heading",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        willChange: "opacity, transform",
      },
    );

    gsap.fromTo(
      ".cta-text",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        willChange: "opacity",
      },
    );

    gsap.fromTo(
      ".cta-button",
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        willChange: "opacity, transform",
      },
    );

    // Cleanup function to kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0E2A2A] text-white overflow-x-hidden">
      {/* 🎬 Intro Overlay */}
      <section
        ref={overlayRef}
        className="relative flex items-center justify-center h-screen overflow-hidden bg-[#0E2A2A]"
      >
        <div
          ref={imageRef}
          className="relative overflow-hidden z-10"
          style={{
            width: "410px",
            height: "350px",
            borderRadius: "50%",
          }}
        >
          <Image
            src="/images/About/Abt.webp"
            alt="Wanderer Tribe"
            sizes="100vw"
            fill
            priority
            quality={100}
            className="object-cover"
          />
        </div>

        <div
          ref={textRef}
          className="absolute text-white font-bold leading-none text-[18vw] tracking-tight text-center mix-blend-exclusion select-none z-20 pointer-events-none"
        >
          <span className="block">Wanderer</span>
          <span className="block -mt-[2vw]">Tribe</span>
        </div>

        <div
          ref={backupRef}
          className="absolute font-bold leading-none text-[18vw] tracking-tight text-center mix-blend-screen select-none z-20 pointer-events-none"
        >
          <span className="block">ABOUT US</span>
        </div>
      </section>

      {/* 📖 About Sections */}
      <section className="relative w-full backdrop-blur-md pt-6 md:pt-11">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`flex flex-col md:flex-row ${
              chapter.imagePosition === "right" ? "md:flex-row-reverse" : ""
            } relative shadow-black shadow-sm bg-[#0E2A2A] md:px-6 md:space-y-9 overflow-hidden`}
            style={{ minHeight: "50vh" }}
            ref={(el) => {
              if (el) chaptersRef.current[index] = el;
            }}
          >
            {/* Image Side */}
            <div
              className="chapter-image relative w-full md:w-1/2 h-[40vh] sm:h-[50vh] md:h-[45vh] overflow-hidden will-change-transform"
              style={{ willChange: "transform" }}
            >
              <Image
                src={chapter.image}
                alt={chapter.title}
                fill
                className="object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-10 md:py-0">
              <h3
                className="chapter-title font-heading text-2xl sm:text-3xl lg:text-5xl mb-4 sm:mb-6 font-semibold"
                style={{ color: chapter.accentColor }}
              >
                {chapter.title}
              </h3>

              <p className="chapter-subtitle text-gray-300 text-base sm:text-lg max-w-lg mb-3 sm:mb-4 leading-relaxed">
                {chapter.subtitle}
              </p>
              <p className="chapter-content text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed">
                {chapter.content}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ✨ CTA */}
      <section className="cta-section relative py-20 px-6 text-center bg-[#122F2F] border-t border-gray-700">
        <h2 className="cta-heading font-heading text-3xl md:text-5xl mb-6 text-[#F5E1C0]">
          Embark on Your Epic
        </h2>
        <p className="cta-text text-gray-300 mb-8 max-w-xl mx-auto">
          Let Wanderer Tribe weave your story with threads of rarity and
          wonder—contact us to begin.
        </p>
        <Link href="/Contact" passHref>
          <button
            className="cta-button inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-[#D27D2D] text-white shadow-lg transition-transform duration-300"
            onMouseEnter={() =>
              gsap.to(".cta-button", {
                scale: 1.05,
                backgroundColor: "#D27D2D",
                duration: 0.3,
              })
            }
            onMouseLeave={() =>
              gsap.to(".cta-button", {
                scale: 1,
                backgroundColor: "#D27D2D",
                duration: 0.3,
              })
            }
            onMouseDown={() =>
              gsap.to(".cta-button", { scale: 0.95, duration: 0.1 })
            }
            onMouseUp={() =>
              gsap.to(".cta-button", { scale: 1, duration: 0.1 })
            }
          >
            Begin Your Odyssey
          </button>
        </Link>
      </section>
    </div>
  );
}
