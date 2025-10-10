"use client";
import Image from "next/image";

const testimonials = [
  {
    name: "Peter Biko",
    location: "Luanda, Angola",
    text: "I recently booked a trip to Thailand with Wanderer-Tribe and I could not have been happier with my experience.",
    image: "/images/Avatar1.png",
  },
  {
    name: "Jennifer and Mark",
    location: "San Francisco",
    text: "My husband and I have been using Wanderer Tribe for 2 years now and they have never disappointed us.",
    image: "/images/Avatar2.png",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 px-6 md:px-12">
      {/* ✅ Background image with Next.js <Image /> */}
      <div className="absolute inset-0">
        <Image
          src="/images/testimonial-back.jpg"
          alt="Cape Town background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
        <h2 className="md: pb-4 font-bold mb-4">
         Do not Just Take our Word For It
        </h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg mb-12">
          Our customer&apos;s feedback is essential in building a great reputation
          and maintaining excellent service. By listening to our customer&apos;s
          needs, we can improve our offerings and provide an exceptional travel
          experience.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white text-gray-800 p-6 md:p-8 rounded-xl shadow-lg relative"
            >
              <p className="text-base md:text-lg italic mb-6">{t.text}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-wanderer-bronze">{t.name}</p>
                  <p className="text-sm text-wanderer-rust">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
