import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaModalProvider } from "@/context/CTAModalContext";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import EnquiryModal from "@/components/EnquiryModal";
import SiteMotion from "@/components/SiteMotion";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

// Public website chrome. Kept out of the root layout so /studio renders clean.
// PageLoader is no longer wrapped around the site: it held every page at opacity 0
// until the video and all images finished loading.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CtaModalProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <WhatsAppWidget />
      <main id="main" className="min-h-dvh">
        {children}
      </main>
      <Footer />
      <EnquiryModal />
      <SmoothScroll />
      <SiteMotion />
      <PageTransition />
    </CtaModalProvider>
  );
}
