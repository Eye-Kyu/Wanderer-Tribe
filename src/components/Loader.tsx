"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <motion.div
        initial={{ scale: 0.92, opacity: 0.75 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ willChange: "transform, opacity" }}
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
