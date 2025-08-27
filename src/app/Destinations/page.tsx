"use client";
import Navbar from "@/components/Header";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

type Destination = {
  name: string;
  description: string;
  days: number;
  cost: string;
  locations: string;
  activities: string;
  image: string;
};

export default function Destinations() {
  // Animations
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.07]);

  const carouselItems = [
    {
      image: "/images/africa.jpg",
      caption: "Discover the World's Wonders",
    },
    {
      image: "/images/discover-europe.jpeg",
      caption: "Timeless Europe Awaits",
    },
    {
      image: "/images/discover-africa.jpg",
      caption: "Wild African Adventures",
    },
    { image: "/images/explore-asia.jpeg", caption: "Exotic Asian Escapes" },
  ];

  const destinations: { [key: string]: Destination[] } = {
    Europe: [
      {
        name: "Paris, France",
        description:
          "Experience the romance of Paris with its iconic Eiffel Tower and charming cafés along the Seine.",
        days: 3,
        cost: "$2,500",
        locations: "Paris",
        activities: "Eiffel Tower Visit, Louvre Museum, Seine River Cruise",
        image: "/images/paris.jpeg",
      },
      {
        name: "Rome, Italy",
        description:
          "Explore ancient ruins and vibrant streets in Rome, home to the Colosseum and Vatican.",
        days: 4,
        cost: "$2,800",
        locations: "Rome",
        activities: "Colosseum Tour, Vatican Museums, Trastevere Dining",
        image: "/images/rome.jpeg",
      },
      {
        name: "Barcelona, Spain",
        description:
          "Discover Gaudí's architecture and lively culture in Barcelona’s Gothic Quarter.",
        days: 5,
        cost: "$3,000",
        locations: "Barcelona",
        activities: "Sagrada Familia, Park Güell, La Rambla",
        image: "/images/barcelona.jpeg",
      },
      {
        name: "Amsterdam, Netherlands",
        description:
          "Cruise the canals and visit world-class museums in picturesque Amsterdam.",
        days: 4,
        cost: "$2,700",
        locations: "Amsterdam",
        activities: "Canal Cruise, Van Gogh Museum, Anne Frank House",
        image: "/images/amsterdam.jpeg",
      },
      {
        name: "Venice, Italy",
        description:
          "Float through Venice's canals and marvel at St. Mark's Basilica.",
        days: 3,
        cost: "$2,900",
        locations: "Venice",
        activities: "Gondola Ride, St. Mark's Square, Doge's Palace",
        image: "/images/venice.jpeg",
      },
    ],
    Africa: [
      {
        name: "Maasai Mara, Kenya",
        description:
          "Embark on a thrilling safari in Maasai Mara, home to the Great Migration.",
        days: 4,
        cost: "$3,200",
        locations: "Maasai Mara",
        activities: "Game Drives, Hot Air Balloon, Maasai Village Visit",
        image: "/images/africa/maasai-mara.jpeg",
      },
      {
        name: "Cape Town, South Africa",
        description:
          "Enjoy stunning views from Table Mountain and explore the Cape Winelands.",
        days: 5,
        cost: "$3,500",
        locations: "Cape Town",
        activities: "Table Mountain, Robben Island, Wine Tasting",
        image: "/images/africa/cape-town.jpeg",
      },
      {
        name: "Serengeti, Tanzania",
        description:
          "Witness vast plains and wildlife in the Serengeti's endless horizons.",
        days: 6,
        cost: "$4,000",
        locations: "Serengeti",
        activities: "Wildlife Safari, Ngorongoro Crater, Cultural Tours",
        image: "/images/africa/serengeti.jpeg",
      },
      {
        name: "Victoria Falls, Zambia/Zimbabwe",
        description:
          "Marvel at the worlds largest waterfall and its misty rainbows.",
        days: 4,
        cost: "$3,300",
        locations: "Victoria Falls",
        activities: "Boat Cruise, Devil's Pool, Helicopter Tour",
        image: "/images/africa/victoria-falls.jpeg",
      },
      {
        name: "Marrakech, Morocco",
        description:
          "Dive into the souks and palaces of Marrakech's vibrant medina.",
        days: 5,
        cost: "$3,100",
        locations: "Marrakech",
        activities: "Jemaa el-Fna, Bahia Palace, Sahara Excursion",
        image: "/images/africa/lalibela.jpeg",
      },
    ],
    Asia: [
      {
        name: "Kyoto, Japan",
        description:
          "Explore ancient temples and serene gardens in Kyoto's cultural heart.",
        days: 5,
        cost: "$3,800",
        locations: "Kyoto",
        activities: "Fushimi Inari Shrine, Bamboo Forest, Tea Ceremony",
        image: "/images/asia/kyoto.jpeg",
      },
      {
        name: "Tsushima, Japan",
        description:
          "Discover the rugged beauty and samurai history of Tsushima Island.",
        days: 4,
        cost: " $3,500",
        locations: "Tsushima",
        activities: "Hiking, Historical Sites, Coastal Views",
        image: "/images/tsushima.jpeg",
      },
      {
        name: "Mount Fuji, Japan",
        description:
          "Climb or admire the majestic Mount Fuji, a symbol of Japan's natural beauty.",
        days: 3,
        cost: "$2,900",
        locations: "Mount Fuji",
        activities: "Hiking, Lake Kawaguchi, Onsen Visit",
        image: "/images/mount-fuji.jpeg",
      },
      {
        name: "Shibuya, Japan",
        description:
          "Experience Tokyo's bustling Shibuya Crossing and trendy districts.",
        days: 4,
        cost: "$3,400",
        locations: "Shibuya",
        activities: "Shibuya Crossing, Harajuku, Meiji Shrine",
        image: "/images/shibuya.jpeg",
      },
      {
        name: "Bali, Indonesia",
        description:
          "Relax on Bali's beaches and explore its spiritual temples.",
        days: 6,
        cost: "$3,700",
        locations: "Bali",
        activities: "Ubud Monkey Forest, Tanah Lot, Beach Relaxation",
        image: "/images/bali.jpeg",
      },
    ],
  };

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const regions = useMemo(
    () => [
      {
        name: "Europe",
        description:
          "Europe, a tapestry of history and culture, invites you to explore its iconic landmarks like the Eiffel Tower and Colosseum. From the romantic streets of Paris to the ancient ruins of Rome, this continent offers a blend of art, architecture, and cuisine.\nTravel tip: Spring and fall provide pleasant weather and fewer crowds. Ideal for cultural enthusiasts and history buffs.",
        image: "/images/discover-europe.jpeg",
        link: "/Destinations/europe",
      },
      {
        name: "Africa",
        description:
          "Africa, the cradle of humanity, boasts wild safaris in Maasai Mara and scenic coastlines in Cape Town. Immerse in vibrant cultures, from Maasai dances to South African winelands. The continent's diverse landscapes range from savannahs to mountains.\nTravel tip: Pack lightweight clothing and sunscreen, and book safaris during the dry season for optimal wildlife viewing.",
        image: "/images/discover-africa.jpg",
        link: "/Destinations/africa",
      },
      {
        name: "Asia",
        description:
          "Asia, a fusion of ancient traditions and modernity, features serene temples in Kyoto and tropical paradises in Bali. Experience geisha culture, bustling markets, and pristine beaches. This region offers a sensory journey through spice markets and spiritual retreats.\nTravel tip: Respect local customs, and visit during shoulder seasons for balanced weather and costs.",
        image: "/images/explore-asia.jpeg",
        link: "/Destinations/asia",
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Subtle animated background blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(210,125,45,0.25), transparent)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(20,184,166,0.22), transparent)",
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.5, 0.85, 0.5],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Carousel with parallax */}
      <section className="relative w-full overflow-hidden">
        <motion.div
          className="flex will-change-transform"
          animate={{
            x: [0, "-100%", "-200%", "-300%"],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            },
          }}
        >
          {carouselItems.concat(carouselItems).map((item, idx) => (
            <div key={idx} className="relative w-full h-[60vh] flex-shrink-0">
              <motion.div
                style={{ y: heroY, scale: heroScale }}
                className="h-full"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/40 grid place-items-center">
                <motion.h2
                  className="font-heading text-4xl md:text-5xl font-bold text-white text-center px-6"
                  initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }}
                  animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  {item.caption}
                </motion.h2>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Regions Overview */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {regions.map((region, idx) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-stretch overflow-hidden rounded-3xl border 
                ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""} 
                bg-white/5 border-white/10 backdrop-blur-xl shadow-[0_8px_50px_rgba(0,0,0,0.45)]`}
            >
              {/* Image */}
              <motion.div
                className="relative w-full md:w-2/5 h-[60vh] group"
                initial={{ opacity: 0.8, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <Image
                  src={region.image}
                  alt={`${region.name} Background`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20 group-hover:opacity-60 transition-opacity" />
              </motion.div>

              {/* Content */}
              <motion.div
                className="relative flex flex-col justify-center w-full md:w-3/5 p-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                {/* Heading with underline accent */}
                <div className="mb-6">
                  <motion.h3
                    className="font-heading text-4xl md:text-5xl text-primary tracking-tight"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {region.name}
                  </motion.h3>
                  <motion.div
                    className="h-[3px] w-20 bg-gradient-to-r from-[#D27D2D] to-teal-400 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>

                <p className="text-neutral-800 dark:text-neutral-200/90 text-lg md:text-xl leading-relaxed mb-8">
                  {region.description}
                </p>

                {/* Destination chips with icons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {destinations[region.name].map((dest) => (
                    <motion.button
                      key={dest.name}
                      onClick={() => setSelectedDestination(dest)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-2 border border-black  bg-transparent font-medium px-4 py-2 rounded-full shadow transition-all duration-300 text-sm"
                    >
                      <span className="text-base">📍</span>
                      <span className="whitespace-nowrap">{dest.name}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-neutral-500">
                        Tap for details
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href={region.link}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold overflow-hidden bg-transparent border border-black  transition-all duration-300"
                  >
                    Explore {region.name}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDestination(null)}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 40 }}
              className="bg-neutral-900 rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-2xl hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                onClick={() => setSelectedDestination(null)}
                aria-label="Close"
                tabIndex={0}
              >
                &times;
              </button>
              <div className="mb-4"></div>
              <Image
                src={selectedDestination.image}
                alt={selectedDestination.name}
                width={800}
                height={500}
                className="w-full h-64 object-cover rounded-lg"
                priority
              />
              <h3 className="font-heading text-2xl text-primary mb-2">
                {selectedDestination.name}
              </h3>
              <p className="text-neutral-200 mb-2">
                {selectedDestination.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                <p className="text-neutral-300">
                  <strong>Days:</strong> {selectedDestination.days}
                </p>
                <p className="text-neutral-300">
                  <strong>Cost:</strong> {selectedDestination.cost}
                </p>
                <p className="text-neutral-300 col-span-2">
                  <strong>Locations:</strong> {selectedDestination.locations}
                </p>
                <p className="text-neutral-300 col-span-2">
                  <strong>Activities:</strong> {selectedDestination.activities}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-background rounded-t-3xl border-t border-white/10">
        <h2 className="font-heading text-3xl md:text-4xl mb-6">
          Ready to Wander?
        </h2>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold overflow-hidden bg-transparent border border-black transition-all duration-300"
        >
          Book Your Adventure
        </motion.button>
      </section>
    </div>
  );
}
