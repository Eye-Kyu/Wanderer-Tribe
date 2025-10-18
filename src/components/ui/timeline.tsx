"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Calculate timeline line height dynamically
  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;

    const updateHeight = () => {
      const cards = timelineRef.current?.querySelectorAll(".timeline-entry");
      if (!timelineRef.current) return;
      const containerRect = timelineRef.current.getBoundingClientRect();

      if (cards && cards.length > 0) {
        const lastCard =
          cards.length >= 10
            ? (cards[9] as HTMLElement)
            : (cards[cards.length - 1] as HTMLElement);
        const lastCardRect = lastCard.getBoundingClientRect();

        const relativeHeight =
          lastCardRect.bottom - containerRect.top - lastCardRect.height * 0.25;

        const maxHeight = containerRect.height;
        setLineHeight(Math.min(relativeHeight, maxHeight));
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, [data]);

  // Animate vertical line height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, lineHeight]
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white/20 backdrop-blur-sm shadow-lg rounded-2xl dark:bg-neutral-950 font-sans md:px-9 relative overflow-visible"
    >
      {/* Header */}
      <div className="mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <p className="border md:py-4 md:px-2 px-2 md:w-52 font-light text-white text-xs w-20 bg-wanderer-rust rounded-full md:text-lg">
          Featured Destination
        </p>
        <h2 className="text-2xl md:text-5xl font-bold text-center pt-6 text-wanderer-ivory mb-12">
          Thailand 10D/9N - Phuket • Pattaya • Bangkok
        </h2>
      </div>

      {/* Timeline */}
      <div
        ref={timelineRef}
        className="relative max-w-7xl mx-auto md:pb-20 pb-4 overflow-visible"
      >
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className={`timeline-entry flex flex-col md:flex-row md:gap-10 pt-7 md:pt-14 relative z-30`}
            >
              {/* Marker Section */}
              <div
                className={`z-10 flex flex-col items-center md:w-1/2 ${
                  isLeft ? "md:items-end" : "md:items-start"
                }`}
              >
                <div className="relative h-10 w-10 rounded-full bg-neutral-200 dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-wanderer-teal/40 border border-neutral-400 dark:border-neutral-700 p-2" />
                </div>
                <h3 className="hidden md:block mt-6 text-3xl font-light text-wanderer-ivory dark:text-neutral-500 text-center">
                  {item.title}
                </h3>
              </div>

              {/* Content Section */}
              <div
                className={`relative w-full md:w-1/2 px-4 z-40 overflow-visible ${
                  isLeft ? "md:pl-10" : "md:pr-10 text-right"
                }`}
              >
                <h3 className="md:hidden block text-2xl mb-4 font-bold text-wanderer-ivory">
                  {item.title}
                </h3>
                <div className="relative w-full min-h-[280px] sm:min-h-[320px] flex flex-col justify-center">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Animated Vertical Line */}
        {/* Desktop - center line */}
        <div
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] bg-neutral-200 dark:bg-neutral-700 overflow-hidden z-20"
          style={{
            height: `${lineHeight}px`,
            maxHeight: "100%",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-green-400 via-blue-500 to-transparent rounded-full"
          />
        </div>

        {/* Mobile - line on left */}
        <div
          className="md:hidden absolute left-6 top-0 w-[2px] bg-neutral-200 dark:bg-neutral-700 overflow-hidden z-20"
          style={{
            height: `${lineHeight}px`,
            maxHeight: "100%",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-green-400 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
