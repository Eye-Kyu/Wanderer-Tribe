import Image from "next/image";
import { EMAIL } from "@/lib/email";
import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";

const COLUMNS = [
  {
    title: "Destinations",
    links: [
      { href: "/Destinations/africa", label: "Africa" },
      { href: "/Destinations/europe", label: "Middle East" },
      { href: "/Destinations/asia", label: "Asia" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { href: "/Experiences/adventure", label: "Adventure Travel" },
      { href: "/Experiences/luxury", label: "Luxury Escapes" },
      { href: "/Experiences/wellness", label: "Wellness Retreats" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/About", label: "About Us" },
      { href: "/Terms", label: "Terms & Conditions" },
      { href: "/Privacy", label: "Privacy Policy" },
    ],
  },
];

/** Index columns over the real sitemap, on the forest field. */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="field footer bg-field-2">
      <div className="container grid gap-x-[var(--gap-columns)] gap-y-12 py-[var(--space-3xl)] lg:grid-cols-12">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <Link href="/" aria-label="Wanderer Tribe, home" className="footer-brand">
            <Image src="/images/Wanderer logo 1.png" alt="" width={64} height={64} />
            <span className="wordmark">Wanderer Tribe</span>
          </Link>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-2 flex flex-col gap-3">
            <h2 className="footer-head">{col.title}</h2>
            <ul className="grid gap-1">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-3 flex flex-col gap-3">
          <h2 className="footer-head">Connect</h2>
          <ul className="grid gap-1">
            <li>
              <Link href="/Contact" className="footer-link inline-flex items-center gap-2">
                <Mail aria-hidden="true" size={16} /> {EMAIL.contact}
              </Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/wanderer_tribe_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link inline-flex items-center gap-2"
              >
                <Instagram aria-hidden="true" size={16} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1H7rxXcKD2%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio&e=AT3TDyq78eMIS9YHH9YihTm3FGkVekPmA7VxLOIE1VeKgFoH100EpLjaFE3zLpHlGX0uxeyX8ZSdE-APtUrm-3kbJw8pL8TQa9Emk_89gA"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link inline-flex items-center gap-2"
              >
                <Facebook aria-hidden="true" size={16} /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <p className="border-t border-rule py-6 text-sm text-field-muted">
          &copy; {currentYear} Wanderer Tribe. All rights reserved. Prices subject
          to change. Weather-dependent activities. See terms for details.
        </p>
      </div>
    </footer>
  );
}
