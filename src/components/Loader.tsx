"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <motion.div
        animate={{ scale: [0.8, 1.1, 0.9, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/Wanderer logo 1.png"
          alt="Loading..."
          width={150}
          height={150}
          priority
        />
      </motion.div>
    </div>
  );
}
