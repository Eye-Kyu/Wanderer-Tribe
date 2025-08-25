"use client";

import { motion } from "framer-motion";

export default function RegionHeader({ title }: { title: string }) {
  return (
    <motion.h1
      className="text-center font-heading text-5xl text-[#D27D2D] py-12"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h1>
  );
}
