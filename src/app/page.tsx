"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "@/components/Hero";
import DestinationsShowcase from "@/components/DestinationsShowcase";
import ItineraryOptions from "@/components/ItineraryOptions";
import DayItinerary from "@/components/DayItinerary";
import HotelShowcase from "@/components/HotelShowcase";
import ActivityList from "@/components/ActivityList";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;

    // ensure bg fully covers the section initially (avoid gaps when translating)
    // we don't set huge translate values — use % for safe parallax
    gsap.set(bg, {
      opacity: 0,
      yPercent: 0,
      willChange: "opacity, transform",
    });

    // Build timeline: fade in + small parallax, then fade out + more parallax
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 45%",    // begin when section top is near bottom of viewport
        end: "bottom 45%",   // end when section bottom is near top of viewport
        scrub: 0.6,          // smooth scrubbing, works both directions
        // markers: true,    // enable while debugging
      },
    });

    // first half of timeline: fade from 0 -> 1 and parallax up a little
    tl.to(
      bg,
      {
        opacity: 1,
       // small upward parallax (6% of element height)
        ease: "power1.out",
        duration: 1,
      },
      0
    );

    // second half: fade from 1 -> 0 and continue parallax up a bit more
    tl.to(
      bg,
      {
        opacity: 0,
        // further parallax as the section leaves
        ease: "power1.in",
        duration: 1,
      },
      0.6 // start this slightly later in the timeline so there's a visible plateau
    );

    tlRef.current = tl;

    return () => {
      // cleanup
      try {
        if (tlRef.current) {
          tlRef.current.scrollTrigger && tlRef.current.scrollTrigger.kill();
          tlRef.current.kill();
        }
        ScrollTrigger.getAll().forEach((st) => st.kill());
      } catch (e) {
        /* ignore cleanup errors */
      }
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#174B2E] text-white">
      <div className="space-y-9">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Destinations Showcase */}
        <DestinationsShowcase />

        {/* 3. Itinerary Highlights */}
        <ItineraryOptions />

        {/* 4. Section with GSAP timeline-controlled background */}
                  <section
              ref={sectionRef}
              className="relative w-screen overflow-hidden min-h-screen" // ✅ Ensures full viewport height
            >
              {/* Background div controlled by GSAP */}
              <div
                ref={bgRef}
                className="absolute inset-0 bg-repeat bg-center min-h-full"
                style={{
                  backgroundColor: "#254D32",
                  backgroundImage: "url('/images/bgs/moroccan.svg')",
                  backgroundSize: "60px 66px", // ✅ Adjust pattern density here
                  backgroundRepeat: "repeat",
                  backgroundAttachment: "fixed", // ✅ optional: enhances parallax feel
                }}
              />

              {/* Gradient overlay for fade-in/out effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(37,77,50,0.9) 0%, rgba(37,77,50,0.6) 20%, rgba(37,77,50,0.22) 50%, rgba(37,77,50,0.6) 80%, rgba(37,77,50,0.9) 100%)",
                  mixBlendMode: "multiply",
                }}
              />

              {/* Optional subtle tint overlay */}
              <div className="absolute inset-0 bg-wanderer-moss/10" />

              {/* Foreground content */}
              <div className="relative z-10 px-4 sm:px-6 lg:px-10 py-16 md:py-24">
                <DayItinerary />
              </div>
</section>

         <HotelShowcase />
      </div>

      {/* 6. Experiences & Activities */}
      <ActivityList />

      {/* 7. Testimonials & Reviews */}
      <Testimonials />

      <div className="space-y-16">
        {/* 8. Why Choose Us */}
        <WhyChooseUs />

        {/* 9. Call to Action */}
        <CallToAction />
      </div>
    </main>
  );
}
