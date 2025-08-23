import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wanderer Tribe - Your Journey, Our Passion",
  description: "Tailor-made travel packages for Asia, Europe, and Africa.",
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
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
