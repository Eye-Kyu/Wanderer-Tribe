import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description: "Contact Wanderer Tribe by email, phone or WhatsApp, or send a message to plan a tailored trip to Africa, Asia or the Middle East.",
  path: "/Contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
