"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";

// --- Image Reveal Component ---
function RevealImage({
  src,
  alt,
  priority = false,
  direction = "vertical",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  direction?: "vertical" | "horizontal";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full aspect-[5/3] rounded-lg overflow-hidden shadow bg-neutral-100 transition-all duration-700 ${
        visible
          ? direction === "horizontal"
            ? "clip-reveal-horizontal opacity-100"
            : "clip-reveal-vertical opacity-100"
          : direction === "horizontal"
          ? "clip-hidden-horizontal opacity-0"
          : "clip-hidden-vertical opacity-0"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover md:object-center object-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
      <style jsx>{`
        .clip-hidden-vertical {
          clip-path: inset(100% 0 0 0);
          transform: scale(1.05);
        }
        .clip-reveal-vertical {
          clip-path: inset(0 0 0 0);
          transform: scale(1);
        }
        .clip-hidden-horizontal {
          clip-path: inset(0 100% 0 0);
          transform: scale(1.05);
        }
        .clip-reveal-horizontal {
          clip-path: inset(0 0 0 0);
          transform: scale(1);
        }
        .transition-all {
          transition: clip-path 1s ease, transform 0.7s ease, opacity 0.7s ease;
        }
      `}</style>
    </div>
  );
}

// --- Main Timeline ---
export default function ThailandItineraryTimeline() {
  const data = [
    {
      title: "Phuket • Island Escape",
      content: (
        <div className="space-y-4">
          <p className="text-sm md:text-base text-[#333333]">
            Begin your journey in Phuket — unwind by the sea, explore Phi Phi
            Island's turquoise bays, and indulge in Thai spa bliss.
          </p>
          <RevealImage
            src="/images/bali.jpeg"
            alt="Phuket Islands"
            priority
            direction="vertical"
          />
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-gold text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">
              Phi Phi Island Tour
            </span>
            <span className="bg-wanderer-gold text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">
              Thai Spa Experience
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Pattaya • Culture & Coastal Vibes",
      content: (
        <div className="space-y-4">
          <p className="text-sm md:text-base text-[#333333]">
            Fly to Bangkok and transfer to Pattaya — discover the tropical
            gardens of Nong Nooch, marvel at the Alcazar Cabaret, and unwind at
            Mongchang Café.
          </p>
          <RevealImage
            src="/images/asia/nongnooch.jpg"
            alt="Pattaya Highlights"
            direction="horizontal"
          />
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-gold text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">
              Nong Nooch Gardens
            </span>
            <span className="bg-wanderer-gold text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">
              Alcazar Cabaret
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Bangkok • City of Temples & Taste",
      content: (
        <div className="space-y-4">
          <p className="text-sm md:text-base text-[#333333]">
            Experience Bangkok's bustling markets, dine sky-high at Baiyoke, and
            cruise along the Chao Phraya River under glittering city lights.
          </p>
          <RevealImage
            src="/images/asia/bangkok.jpeg"
            alt="Bangkok City"
            direction="vertical"
          />
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-gold text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">
              Floating Market
            </span>
            <span className="bg-wanderer-gold text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">
              Dinner Cruise
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Departure • Farewell Thailand",
      content: (
        <div className="space-y-4">
          <p className="text-sm md:text-base text-[#333333]">
            Enjoy a relaxed morning before your transfer to Suvarnabhumi
            Airport. Bid farewell to Thailand's warmth and wonder.
          </p>
          <RevealImage
            src="/images/japan-onsen.jpeg"
            alt="Thailand Departure"
            direction="horizontal"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
      <Timeline data={data} />
    </div>
  );
}
