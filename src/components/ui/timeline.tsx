"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Dynamically observe container height
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
  setHeight(entry.contentRect.height);
}

    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Attach scroll progress to the whole container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"], // smoother sync
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      className="w-full bg-[#f7f7f7] shadow-md rounded-2xl dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="border py-4 px-3 md:w-52 border-black rounded-full md:text-xl">
          Featured Destination
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#036648] mb-12">
        Thailand 10D/9N - Phuket • Pattaya • Bangkok
      </h2>
      </div>

      <div className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row md:gap-10 pt-20 md:pt-40}`}
            >
              {/* Timeline marker + Title */}
              <div
                className={`sticky top-40 z-40 flex flex-col items-center  md:w-1/2`}
              >
                <div className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center relative">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
                <h3 className="hidden md:block mt-6 text-3xl font-bold text-neutral-500 dark:text-neutral-500">
                  {item.title}
                </h3>
              </div>

              {/* Content */}
              <div
                className={`relative w-full md:w-1/2 px-4 ${
                  isLeft ? "md:pl-10" : "md:pr-10 text-right"
                }`}
              >
                <h3 className="md:hidden block text-2xl mb-4 font-bold text-neutral-500 dark:text-neutral-500">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          );
        })}

        {/* Vertical line + animation */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] bg-neutral-200 dark:bg-neutral-700 overflow-hidden"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
