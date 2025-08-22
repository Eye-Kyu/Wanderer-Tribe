"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Plane,
  BedDouble,
  Camera,
  Mountain,
  Sun,
  Ship,
  Cable,
} from "lucide-react";

// -------- Types --------
type Activity = {
  text: string;
  icon: React.ElementType;
  color: string;
};

type DayPlan = {
  group: string;
  location: string;
  activities: Activity[];
};

// -------- Data --------
const days: DayPlan[] = [
  {
    group: "Day 1-3",
    location: "Kuala Lumpur",
    activities: [
      {
        text: "Arrival and hotel check-in (arrival by 1400hrs) then rest",
        icon: BedDouble,
        color: "text-blue-500",
      },
      {
        text: "Half-day KL tour, lunch at local restaurant, end with evening firefly tour",
        icon: Camera,
        color: "text-purple-500",
      },
      {
        text: "Genting Highlands day tour with lunch, night dinner at Orbit revolving restaurant",
        icon: Mountain,
        color: "text-green-600",
      },
    ],
  },
  {
    group: "Day 4-6",
    location: "Langkawi",
    activities: [
      {
        text: "Arrival and check-in, free day",
        icon: Sun,
        color: "text-yellow-500",
      },
      {
        text: "Half-day mangrove tour, return for rest in hotel, then sunset dinner cruise",
        icon: Ship,
        color: "text-indigo-500",
      },
      {
        text: "Langkawi cable car tour, return to hotel to enjoy amenities",
        icon: Cable,
        color: "text-red-500",
      },
      {
        text: "Check-out and return to Kenya",
        icon: Plane,
        color: "text-blue-400",
      },
    ],
  },
];

// -------- Animation Variants --------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: i * 0.2 },
  }),
};

// -------- Components --------
function ActivityList({ activities }: { activities: Activity[] }) {
  return (
    <ul className="space-y-3">
      {activities.map((act, idx) => (
        <motion.li
          key={idx}
          className="flex items-center text-gray-700"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
        >
          <act.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${act.color}`} />
          {act.text}
        </motion.li>
      ))}
    </ul>
  );
}

function DayCard({ day, alignRight }: { day: DayPlan; alignRight: boolean }) {
  return (
    <motion.div
      custom={alignRight ? 1 : 0}
      variants={itemVariants}
      className={`relative flex items-center w-full ${
        alignRight ? "justify-end" : "justify-start"
      }`}
    >
      {/* Connector Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#D27D2D] w-6 h-6 rounded-full border-4 border-neutral shadow-lg z-10" />

      {/* Card */}
      <motion.div
        className="bg-white rounded-xl shadow-xl p-6 w-11/12 md:w-2/5 max-w-md"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 15px 40px rgba(210, 125, 45, 0.2)",
        }}
      >
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-4 border-[#D27D2D]">
            <Image
              src={`/images/${day.location.toLowerCase()}.jpg`}
              alt={day.location}
              width={80}
              height={80}
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/fallback.jpg";
              }}
            />
          </div>
          <h3 className="text-xl font-heading text-[#D27D2D]">
            {day.group} – {day.location}
          </h3>
        </div>
        <ActivityList activities={day.activities} />
      </motion.div>
    </motion.div>
  );
}

// -------- Main Component --------
export default function DayItinerary() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-neutral p-6 md:p-10 overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center text-[#D27D2D] mb-12 md:mb-16"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        Journey Through Malaysia's Wonders
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-[#D27D2D] to-[#008080] mx-auto mt-3 rounded"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </motion.h2>

      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#D27D2D] to-[#008080] opacity-30" />

      {/* Timeline items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-12 md:space-y-16 relative"
      >
        {days.map((day, idx) => (
          <DayCard key={idx} day={day} alignRight={idx % 2 !== 0} />
        ))}
      </motion.div>
    </section>
  );
}
