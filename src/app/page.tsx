import Hero from "@/components/Hero";
import DestinationsShowcase from "@/components/DestinationsShowcase";
import ItineraryOptions from "@/components/ItineraryOptions";
import DayItinerary from "@/components/DayItinerary";
import HotelShowcase from "@/components/HotelShowcase";
import ActivityList from "@/components/ActivityList";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Destinations Showcase (Asia, Africa, Europe) */}
      <DestinationsShowcase />

      {/* 3. Featured Tours / Itinerary Highlights */}
      <ItineraryOptions />

      {/* 4. Example Day-by-Day Itinerary */}
      <DayItinerary />

      {/* 5. Hotels & Stays Showcase */}
      <HotelShowcase />

      {/* 6. Experiences & Activities */}
      <ActivityList />

      {/* 7. Testimonials & Reviews */}
      <Testimonials />

      {/* 8. Why Choose Us */}
      <WhyChooseUs />

      {/* 9. Call to Action */}
      <CallToAction />
    </main>
  );
}
