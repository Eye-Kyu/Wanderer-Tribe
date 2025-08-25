"use client";

import ExperienceHero from "@/components/Experiences/ExperienceHero";
import ExperienceGrid from "@/components/Experiences/ExperienceGrid";

export default function WellnessPage() {
  return (
    <div>
      <ExperienceHero
        title="Wellness Retreats"
        subtitle="Reconnect, rejuvenate, and find inner balance in breathtaking destinations."
        image="/images/experiences/wellness-hero.jpg"
      />

      <ExperienceGrid
        experiences={[
          {
            title: "Yoga in Bali",
            description:
              "A transformative yoga retreat amidst rice fields and ocean views.",
            image: "/images/experiences/yoga-bali.jpg",
            tags: ["yoga", "asia", "relaxation"],
          },
          {
            title: "Ayurveda in Kerala",
            description:
              "Discover ancient healing therapies in the lush landscapes of India.",
            image: "/images/experiences/kerala-ayurveda.jpg",
            tags: ["india", "healing", "spiritual"],
          },
          {
            title: "Meditation in Bhutan",
            description:
              "Experience deep mindfulness in serene Himalayan monasteries.",
            image: "/images/experiences/bhutan-meditation.jpg",
            tags: ["bhutan", "spiritual", "mountains"],
          },
          {
            title: "Hot Springs in Iceland",
            description:
              "Soak in the famous Blue Lagoon while surrounded by dramatic volcanic landscapes.",
            image: "/images/experiences/iceland-hot-springs.jpg",
            tags: ["europe", "relaxation", "nature"],
          },
          {
            title: "Spa Escape in Morocco",
            description:
              "Traditional hammams and luxury spa treatments in Marrakech’s riads.",
            image: "/images/experiences/morocco-spa.jpg",
            tags: ["africa", "luxury", "culture"],
          },
          {
            title: "Thai Massage in Chiang Mai",
            description:
              "Revitalize with world-renowned massage therapies in northern Thailand.",
            image: "/images/experiences/thai-massage.jpg",
            tags: ["asia", "healing", "massage"],
          },
          {
            title: "Sound Healing in Sedona",
            description:
              "Harness energy vortexes and sound baths in Arizona’s mystical desert.",
            image: "/images/experiences/sedona-sound.jpg",
            tags: ["usa", "spiritual", "healing"],
          },
        ]}
      />
    </div>
  );
}
