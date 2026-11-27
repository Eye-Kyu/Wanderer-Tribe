import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Smaller files for the same photos: AVIF first, then WebP
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        // Sanity image CDN (content managed in /studio)
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
