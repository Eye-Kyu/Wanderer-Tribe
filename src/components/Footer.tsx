"use client";
import { Instagram, Facebook, Mail } from "lucide-react";
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
          <div className="space-y-3 flex flex-col">
            <Link href="/Destinations/africa">
              <p>Africa</p>
            </Link>
            <Link href="/Destinations/europe">
              <p>Middle East</p>
            </Link>
            <Link href="/Destinations/asia">
              <p>Asia</p>
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>

          <div className="space-y-3 flex flex-col">
            <Link href="/About">
              <p>About Us</p>
            </Link>
            <Link href="/Terms">
              <p>Terms & Conditions</p>
            </Link>
            <Link href="/Privacy">
              <p>Privacy Policy</p>
            </Link>
          </div>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <Link href="/Contact">
            <p className="text-gray-300 text-sm flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4" /> contact@wanderertribe.com
            </p>
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <Link
              href="https://www.instagram.com/wanderer_tribe_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
            </Link>
            <Link
              href="https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1H7rxXcKD2%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio&e=AT3TDyq78eMIS9YHH9YihTm3FGkVekPmA7VxLOIE1VeKgFoH100EpLjaFE3zLpHlGX0uxeyX8ZSdE-APtUrm-3kbJw8pL8TQa9Emk_89gA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 hover:text-blue-600 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-gray-400 text-xs text-center relative z-10">
        &copy; {currentYear} Wanderer Tribe. All rights reserved. Prices subject
        to change. Weather-dependent activities. See terms for details.
      </div>
    </footer>
  );
}
