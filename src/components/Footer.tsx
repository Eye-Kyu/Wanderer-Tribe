"use client";
import { Twitter, Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-white py-16 px-6 md:px-20 overflow-hidden">
      {/* ✅ Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg's/zebra.svg" // <-- Replace with your actual footer image
          alt="Footer Background"
          fill
          quality={100}
          className="object-cover object-center -webkit-filter grayscale-0 contrast-25"
          priority
        />
        {/* ✅ Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* ✅ Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold mb-4">Wanderer Tribe</h2>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Wanderer logo 1.png"
              alt="wanderer-tribe-logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Destinations */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Destinations</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Asia</li>
            <li>Africa</li>
            <li>Europe</li>
            <li>Middle East</li>
            <li>South America</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <p className="text-gray-300 text-sm flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4" /> contact@wanderertribe.com
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Twitter className="w-5 h-5 hover:text-blue-400 transition" />
            <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
            <Facebook className="w-5 h-5 hover:text-blue-600 transition" />
            <Linkedin className="w-5 h-5 hover:text-blue-500 transition" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-gray-400 text-xs text-center relative z-10">
        &copy; {currentYear} Wanderer Tribe. All rights reserved. Prices subject
        to change. Weather-dependent activities. See terms for details.
      </div>
    </footer>
  );
}
