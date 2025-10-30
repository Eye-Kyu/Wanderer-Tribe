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
  title: "Wanderer Tribe - Your Journey, Our Passion",
  description:
    "Tailor-made travel packages for Asia, Africa, and The Middle East.",
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
