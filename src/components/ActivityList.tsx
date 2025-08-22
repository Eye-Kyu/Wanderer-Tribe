"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const ActivityList: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="activities"
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading text-gray-900 mb-6">
          Handpicked Experiences
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          From luxury safaris in Africa to cultural explorations in Asia and
          romantic getaways in Europe — each journey is designed to immerse you
          in unforgettable memories.
        </p>

        {/* Grid of activities */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/images/safari.jpg"
                alt="African Safari"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">African Safaris</h3>
            <p className="text-gray-600">
              Witness the Big Five in their natural habitat with luxury lodges
              under the starlit skies.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/images/asia-temple.jpg"
                alt="Asian Culture"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cultural Journeys</h3>
            <p className="text-gray-600">
              Explore ancient temples, bustling markets, and serene landscapes
              across Asia.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="relative w-full h-56 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/images/europe.jpg"
                alt="European Romance"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">European Romance</h3>
            <p className="text-gray-600">
              Indulge in vineyard tours, Mediterranean coastlines, and historic
              city escapes.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ActivityList;
