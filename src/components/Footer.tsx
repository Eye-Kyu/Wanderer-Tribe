"use client";
import { Twitter, Instagram, Facebook, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-700 text-white py-16 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Wanderer Tribe</h2>
          <p className="text-gray-400 text-sm">
            Curating exclusive journeys across Asia, Africa, and Europe. Luxury
            travel experiences, tailored for you.
          </p>
        </div>

        {/* Destinations */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Destinations</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
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
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <p className="text-gray-400 text-sm flex items-center gap-2 mb-3">
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
      <div className="border-t border-gray-700 mt-10 pt-6 text-gray-500 text-sm text-center">
        &copy; {currentYear} Wanderer Tribe. All rights reserved. Prices subject
        to change. Weather-dependent activities. See terms for details.
      </div>
    </footer>
  );
}
