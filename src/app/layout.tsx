import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import { CtaModalProvider } from "@/context/CTAModalContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://wanderertribe.ke"),
  title: {
    default:
      "Wanderer Tribe | Discover Wonders Across Africa, Asia & The Middle East",
    template: "%s | Wanderer Tribe",
  },
  description:
    "Wanderer Tribe curates life-changing journeys across Africa, Asia, and the Middle East. Explore luxury escapes, cultural adventures, and offbeat destinations crafted for the modern explorer.",
  keywords: [
    "Wanderer Tribe",
    "luxury travel",
    "adventure tourism",
    "Africa travel",
    "Asia travel",
    "Middle East travel",
    "cultural tours",
    "safari experiences",
    "eco travel",
    "wanderlust destinations",
    "guided tours",
    "travel experiences",
  ],
  authors: [{ name: "Wanderer Tribe", url: "https://wanderertribe.ke" }],
  creator: "Wanderer Tribe",
  publisher: "Wanderer Tribe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://wanderertribe.ke",
  },
  openGraph: {
    title:
      "Wanderer Tribe | Discover Wonders Across Africa, Asia & The Middle East",
    description:
      "Discover extraordinary destinations and authentic adventures across Africa, Asia, and the Middle East with Wanderer Tribe — where culture meets luxury.",
    url: "https://wanderertribe.ke",
    siteName: "Wanderer Tribe",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wanderer Tribe — Explore Africa, Asia & The Middle East",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Wanderer Tribe | Discover Wonders Across Africa, Asia & The Middle East",
    description:
      "Travel deeper. Explore farther. Experience unforgettable adventures with Wanderer Tribe.",
    site: "@wanderertribe",
    creator: "@wanderertribe",
    images: ["/images/og-image.jpg"],
  },
  category: "Travel & Tourism",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  themeColor: "#008080",
  colorScheme: "light dark",
  referrer: "origin-when-cross-origin",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  verification: {
    google: "YOUR-GOOGLE-SITE-VERIFICATION-CODE", // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X1F9CWD7MR"
        />
        <Script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X1F9CWD7MR');
        `,
          }}
        />
      </head>
      <body className={inter.className}>
        <CtaModalProvider>
          <LenisProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LenisProvider>
        </CtaModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
