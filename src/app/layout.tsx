import "./globals.css";
import "./base.css";
import { SITE_URL } from "@/lib/site";
import { DEFAULT_OG_IMAGE, organizationJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { Metadata } from "next";
import Script from "next/script";
import { Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Wanderer Tribe | Discover Wonders Across Africa, Asia & The Middle East",
    template: "%s | Wanderer Tribe",
  },
  description:
    "Tailored trips across Africa, Asia and the Middle East: safaris, cultural journeys, wellness retreats and luxury escapes, planned day by day by Wanderer Tribe.",
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
  authors: [{ name: "Wanderer Tribe" /* url: SITE_URL */ }],
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
  openGraph: {
    title: "Wanderer Tribe | Discover Wonders Across Africa, Asia & The Middle East",
    description:
      "Tailored trips across Africa, Asia and the Middle East: safaris, cultural journeys, wellness retreats and luxury escapes.",
    url: "/",
    siteName: "Wanderer Tribe",
    images: [DEFAULT_OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wanderer Tribe | Discover Wonders Across Africa, Asia & The Middle East",
    description:
      "Tailored trips across Africa, Asia and the Middle East: safaris, cultural journeys, wellness retreats and luxury escapes.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  category: "Travel & Tourism",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  referrer: "origin-when-cross-origin",
};

// New viewport export function (required for viewport metadata)
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preload"
          href="/fonts/Stardom_Complete/Fonts/OTF/Stardom-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X1F9CWD7MR"
          strategy="afterInteractive"
        />

        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X1F9CWD7MR', { send_page_view: true });
            `,
          }}
        />

        <JsonLd data={organizationJsonLd()} />


        {/* Manually add theme-color and color-scheme meta tags */}
        <meta name="theme-color" content="#254D32" />
        <meta name="color-scheme" content="light" />
      </head>

      <body className={instrument.variable}>
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
