"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
          width: "400px",
          height: "350px",
        },
        {
          scale: 1.2,
          borderRadius: "0%",
          width: "100vw",
          height: "100vh",
          ease: "power3.inOut",
          duration: 1.2,
        }
      );

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=1"
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
        image: "/images/Adventure/inca-trail.jpeg",
        accentColor: "#008080",
         imagePosition: "left",
      }
    ],
    []
  );

  return (
    <div className="relative min-h-screen bg-[#0E2A2A] text-white overflow-hidden">
      {/* 🎬 Intro Overlay */}
      <section
        ref={overlayRef}
        className="relative flex items-center justify-center h-screen overflow-hidden bg-[#0E2A2A]"
      >
        <div
          ref={imageRef}
          className="relative overflow-hidden z-10"
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "50%",
          }}
        >
          <Image
            src="/images/ab2.jpg"
            alt="Wanderer Tribe"
            fill
            priority
            quality={100}
            className="object-cover"
          />
        </div>

        <div
          ref={textRef}
          className="absolute text-white font-bold leading-none text-[18vw] tracking-tight text-center mix-blend-difference select-none z-20"
        >
          <span className="block">Wanderer</span>
          <span className="block -mt-[2vw]">Tribe</span>
        </div>
      </section>
      
      
      {/* 📖 About Sections */}
<section className="relative w-full">
  {chapters.map((chapter) => (
    <div
      key={chapter.id}
      className={`flex flex-col md:flex-row  ${
        chapter.imagePosition === "right" ? "md:flex-row-reverse" : ""
      } relative shadow-black shadow-sm bg-[#0E2A2A]`}
    >
      {/* Image Side */}
      <motion.div
        className="relative w-full md:w-1/2 h-[40vh] sm:h-[50vh] md:h-auto overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <Image
          src={chapter.image || "/images/default-image.jpg"}
          alt={chapter.title}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-10 md:py-0">
        <motion.h3
          className="font-heading text-2xl sm:text-3xl lg:text-5xl mb-4 sm:mb-6 font-semibold"
          style={{ color: chapter.accentColor }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {chapter.title}
        </motion.h3>

        <p className="text-gray-300 text-base sm:text-lg max-w-lg mb-3 sm:mb-4 leading-relaxed">
          {chapter.subtitle}
        </p>
        <p className="text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed">
          {chapter.content}
        </p>
      </div>
    </div>
  ))}
</section>


      {/* ✨ CTA */}
      <section className="relative py-20 px-6 text-center bg-[#122F2F] border-t border-gray-700">
        <motion.h2
          className="font-heading text-3xl md:text-5xl mb-6 text-[#F5E1C0]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Embark on Your Epic
        </motion.h2>
        <motion.p
          className="text-gray-300 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let Wanderer Tribe weave your story with threads of rarity and wonder—
          contact us to begin.
        </motion.p>
        <Link href="/Contact">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#D27D2D" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-[#D27D2D] text-white shadow-lg transition-all duration-300"
          >
            Begin Your Odyssey
          </motion.button>
        </Link>
      </section>
    </div>
  );
}
