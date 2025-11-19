"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 0.9, 1], opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center justify-center"
      >
        <Image
          src="/images/Wanderer logo 1.png" // change to your actual logo
          alt="Loading..."
          width={140}
          height={140}
          priority
        />
      </motion.div>
    </div>
  );
}
