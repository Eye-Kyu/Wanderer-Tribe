import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaModalProvider } from "@/context/CTAModalContext";
import PageLoader from "@/components/PageLoader";
import WhatsAppWidget from "@/components/WhatsAppWidget";

// Public website chrome. Kept out of the root layout so /studio renders clean.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLoader>
      <CtaModalProvider>
        <Navbar />

        <WhatsAppWidget />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </CtaModalProvider>
    </PageLoader>
  );
}
