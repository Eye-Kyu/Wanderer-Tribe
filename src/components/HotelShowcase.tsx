"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const hotels = [
  {
    name: "Mara Luxury Camp, Kenya",
    location: "Africa",
    image: "/images/hotel1.jpg",
    highlight: "Private tented suites with panoramic savannah views",
  },
  {
    name: "Dubai Desert Retreat, UAE",
    location: "Middle East",
    image: "/images/luxury/dubai-desert.jpeg",
    highlight: "Luxury desert villas with starlit dune experiences",
  },
  {
    name: "Bali Serenity Resort, Indonesia",
    location: "Asia",
    image: "/images/hotel3.jpg",
    highlight: "Secluded villas surrounded by tropical jungles",
  },
];

export default function HotelShowcase() {
  return (
    <section className="py-16 bg-beige">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl text-[#D2691E] mb-4">
          Stays That Stay With You
        </h2>
        <p className="text-[#333333]/80 max-w-2xl mx-auto">
          Indulge in handpicked hotels & resorts where elegance meets comfort.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
        {hotels.map((hotel, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg group"
          >
            <div className="relative">
              <Image
                src={hotel.image}
                alt={hotel.name}
                width={500}
                height={350}
                className="object-cover w-full h-72 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-wanderer-green text-white px-3 py-1 rounded-full text-xs uppercase shadow-md">
                {hotel.location}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-[#D2691E] mb-2">
                {hotel.name}
              </h3>
              <p className="text-[#333333]/80">{hotel.highlight}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
