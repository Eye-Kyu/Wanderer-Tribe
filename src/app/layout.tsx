import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import { CtaModalProvider } from "@/context/CTAModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wanderer Tribe - Your Journey, Our Passion",
  description: "Tailor-made travel packages for Asia, Africa, and The Middle East.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
           <CtaModalProvider>
        <LenisProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LenisProvider>
        </CtaModalProvider>
      </body>
    </html>
  );
}
