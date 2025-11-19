"use client";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";

// --- Static Image Component ---
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
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow bg-neutral-100">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover md:object-center object-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
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
          <p className="text-sm md:text-base text-white">
            Begin your journey in Phuket — unwind by the sea, explore Phi Phi
            Island&apos;s turquoise bays, and indulge in Thai spa bliss.
          </p>
          <RevealImage
            src="/images/bali.webp"
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
          <p className="text-sm md:text-base text-white">
            Fly to Bangkok and transfer to Pattaya — discover the tropical
            gardens of Nong Nooch, marvel at the Alcazar Cabaret, and unwind at
            Mongchang Café.
          </p>
          <RevealImage
            src="/images/asia/nongnooch.webp"
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
          <p className="text-sm md:text-base text-white">
            Experience Bangkok&apos;s bustling markets, dine sky-high at
            Baiyoke, and cruise along the Chao Phraya River under glittering
            city lights.
          </p>
          <RevealImage
            src="/images/asia/bangkok.webp"
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
          <p className="text-sm md:text-base text-white">
            Enjoy a relaxed morning before your transfer to Suvarnabhumi
            Airport. Bid farewell to Thailand&apos;s warmth and wonder.
          </p>
          <RevealImage
            src="/images/japan-onsen.webp"
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
