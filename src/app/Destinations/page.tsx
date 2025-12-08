"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import Carousel from "@/components/Carousel";

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
  const destinations: { [key: string]: Destination[] } = {
    The_Middle_East: [
      {
        name: "Dubai, United Arab Emirates",
        description:
          "Experience futuristic architecture, luxurious shopping, and desert adventures in dazzling Dubai.",
        days: 4,
        cost: "$3,200",
        locations: "Dubai",
        activities: "Burj Khalifa Visit, Desert Safari, Dubai Marina Cruise",
        image: "/images/middle-east/Dubai.webp",
      },
      {
        name: "Petra, Jordan",
        description:
          "Discover the ancient rose-red city carved into rock, one of the New Seven Wonders of the World.",
        days: 3,
        cost: "$2,400",
        locations: "Petra",
        activities: "Treasury Visit, Siq Canyon Walk, Wadi Rum Excursion",
        image: "/images/middle-east/Jordan.webp",
      },
      {
        name: "Cairo, Egypt",
        description:
          "Uncover the mysteries of ancient Egypt, from the Great Pyramids of Giza to the treasures of the Nile.",
        days: 5,
        cost: "$2,800",
        locations: "Cairo",
        activities: "Pyramids Tour, Egyptian Museum, Nile Dinner Cruise",
        image: "/images/middle-east/Egypt.webp",
      },
      {
        name: "Doha, Qatar",
        description:
          "Blend tradition and innovation in Doha with its modern skyline and rich Qatari culture.",
        days: 4,
        cost: "$2,900",
        locations: "Doha",
        activities: "Souq Waqif, Museum of Islamic Art, Corniche Walk",
        image: "/images/middle-east/Doha.webp",
      },
      {
        name: "Muscat, Oman",
        description:
          "Enjoy the serene beauty of Oman's coast, its forts, and traditional souqs in Muscat.",
        days: 3,
        cost: "$2,700",
        locations: "Muscat",
        activities: "Grand Mosque Visit, Muttrah Souq, Dolphin Watching Cruise",
        image: "/images/middle-east/Oman.webp",
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
        image: "/images/africa/maasai-mara.webp",
      },
      {
        name: "Cape Town, South Africa",
        description:
          "Enjoy stunning views from Table Mountain and explore the Cape Winelands.",
        days: 5,
        cost: "$3,500",
        locations: "Cape Town",
        activities: "Table Mountain, Robben Island, Wine Tasting",
        image: "/images/africa/cape-town.webp",
      },
      {
        name: "Serengeti, Tanzania",
        description:
          "Witness vast plains and wildlife in the Serengeti's endless horizons.",
        days: 6,
        cost: "$4,000",
        locations: "Serengeti",
        activities: "Wildlife Safari, Ngorongoro Crater, Cultural Tours",
        image: "/images/africa/serengeti.webp",
      },
      {
        name: "Victoria Falls, Zambia/Zimbabwe",
        description:
          "Marvel at the worlds largest waterfall and its misty rainbows.",
        days: 4,
        cost: "$3,300",
        locations: "Victoria Falls",
        activities: "Boat Cruise, Devil's Pool, Helicopter Tour",
        image: "/images/africa/victoria-falls.webp",
      },
      {
        name: "Marrakech, Morocco",
        description:
          "Dive into the souks and palaces of Marrakech's vibrant medina.",
        days: 5,
        cost: "$3,100",
        locations: "Marrakech",
        activities: "Jemaa el-Fna, Bahia Palace, Sahara Excursion",
        image: "/images/africa/lalibela.webp",
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
        image: "/images/asia/kyoto.webp",
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
        image: "/images/bali.webp",
      },
    ],
  };

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const regions = useMemo(
    () => [
      {
        name: "The_Middle_East",
        description:
          "The Middle East, a crossroads of cultures, invites you to explore its ancient wonders and modern marvels. From the bustling souks of Marrakech to the futuristic skyline of Dubai, this region offers a rich tapestry of history, architecture, and cuisine.\nTravel tip: Visit during the cooler months for pleasant weather, and embrace local customs and traditions.",
        image: "/images/middleeast/dubai.webp",
        link: "/Destinations/europe",
      },
      {
        name: "Africa",
        description:
          "Africa, the cradle of humanity, boasts wild safaris in Maasai Mara and scenic coastlines in Cape Town. Immerse in vibrant cultures, from Maasai dances to South African winelands. The continent's diverse landscapes range from savannahs to mountains.\nTravel tip: Pack lightweight clothing and sunscreen, and book safaris during the dry season for optimal wildlife viewing.",
        image: "/images/discover-africa.webp",
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

  const slides = [
    {
      image: "/images/africa.webp",
      title: "Discover the World's Wonders",
      subtitle: "Adventure Awaits",
    },
    {
      image: "/images/discover-africa.webp",
      title: "Wild African Adventures",
      subtitle: "Safari and Beyond",
    },
    {
      image: "/images/explore-asia.jpeg",
      title: "Exotic Asian Escapes",
      subtitle: "Tradition Meets Tranquility",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#152523] text-foreground overflow-hidden">
      <Carousel slides={slides} autoplay delay={6000} />

      {/* Animated background accents */}
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

      {/* Regions Overview */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24 md:space-y-20">
          {regions.map((region, idx) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-stretch overflow-hidden rounded-3xl
          ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""} 
          bg-white/5 backdrop-blur-xl shadow-[0_8px_50px_rgba(0,0,0,0.45)]`}
            >
              {/* Image Section */}
              <motion.div
                className="
            relative w-full 
            h-[40vh]                /* Mobile: 40% of viewport height */
            md:h-auto md:flex-1     /* Desktop: takes full available height */
            group
          "
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
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20 group-hover:opacity-60 transition-opacity" />
              </motion.div>

              {/* Text Section */}
              <motion.div
                className="relative flex flex-col justify-center w-full md:w-3/5 p-4 md:p-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                <div className="mb-6">
                  <motion.h3
                    className="font-heading text-2xl md:text-5xl text-wanderer-ivory tracking-tight"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {region.name}
                  </motion.h3>
                  <motion.div
                    className="h-[1px] w-24 bg-gradient-to-r from-[#212e25] to-teal-400 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>

                <p className="text-white dark:text-neutral-200/90 text-sm md:text-base leading-relaxed mb-8">
                  {region.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {destinations[region.name].map((dest) => (
                    <motion.button
                      key={dest.name}
                      onClick={() => setSelectedDestination(dest)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-1 bg-neutral-200 font-medium px-1 py-1 rounded-2xl shadow-sm shadow-black/50 transition-all duration-300 text-xs md:text-sm md:border-dotted md:hover:border-solid md:border-2 md:border-black md:bg-transparent md:group-hover:bg-wanderer-moss/10"
                    >
                      <span className="text-xs md:text-base">📍</span>
                      <span className="whitespace-nowrap ">{dest.name}</span>
                    </motion.button>
                  ))}
                </div>

                <Link href={region.link}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative inline-flex bg-wanderer-ivory text-wanderer-mahogany items-center justify-center px-2 md:px-5 py-1 md:py-2 rounded-full font-semibold overflow-hidden transition-all duration-300"
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
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
                aria-label="Close"
              >
                ✕
              </button>
              <Image
                src={selectedDestination.image}
                alt={selectedDestination.name}
                width={600}
                height={300}
                className="rounded-xl mb-4 object-cover w-full h-64"
              />
              <h3 className="text-2xl font-bold text-wanderer-ivory mb-2">
                {selectedDestination.name}
              </h3>
              <p className="text-neutral-300 mb-4">
                {selectedDestination.description}
              </p>
              <ul className="text-sm space-y-2 text-neutral-400">
                <li>
                  <strong>Locations:</strong> {selectedDestination.locations}
                </li>
                <li>
                  <strong>Activities:</strong> {selectedDestination.activities}
                </li>
                <li>
                  <strong>Cost:</strong> {selectedDestination.cost}
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
