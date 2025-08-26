"use client";
import Navbar from "@/components/Header";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

export default function AboutPage() {
  // Parallax and scroll effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -150]);
  const heroRotate = useTransform(scrollY, [0, 600], [0, 5]);

  // Sections as a narrative journey with image alternation
  const chapters = useMemo(() => {
    let imageCount = 0; // Counter for image-bearing sections only
    return [
      {
        id: "vision",
        title: "The Founders' Vision",
        subtitle: "A Dream Born of Wanderlust",
        content:
          "In the shadow of a forgotten Himalayan peak, founders Elena and Rajiv sketched their dream on a weathered map. Inspired by a chance encounter with a nomadic tribe, they vowed to craft journeys that peel back the earth’s secrets—pristine lagoons, ancient caves lit by torchlight, and festivals unseen by outsiders. With Wanderer Tribe, every step is a revelation, tailored to your soul’s curiosity.",
        image: "/images/founders-vision.jpg",
        accentColor: "#D27D2D",
        element: (
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 bg-[url('/images/vintage-map.png')] bg-contain bg-no-repeat opacity-20 rotate-12"
            animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        ),
        imagePosition: imageCount++ % 2 === 0 ? "left" : "right", // Start with left
      },
      {
        id: "philosophy",
        title: "Our Guiding Light",
        subtitle: "Beyond the Beaten Path",
        content:
          "Travel need not be a checklist of monuments. We weave odysseys where you dance with desert winds, sip tea with mountain hermits, and witness the birth of a new day over uncharted horizons. Each Wanderer Tribe journey is a bespoke canvas, painted with rare wonders and intimate moments, crafted solely for you.",
        image: "/images/about-hero.jpg",
        accentColor: "#008080",
        element: null,
        imagePosition: imageCount++ % 2 === 0 ? "left" : "right", // Alternate to right
      },
      {
        id: "experiences",
        title: "Rare Encounters",
        subtitle: "Moments of Majesty",
        content:
          "Imagine a private audience with a Tibetan lama, a midnight trek to a glowing bioluminescent bay, or a feast with a Saharan caravan. Our itineraries unlock these ethereal experiences, blending luxury with the raw beauty of undiscovered realms, ensuring every memory is a masterpiece of exclusivity.",
        image: "/images/about-unique.jpg",
        accentColor: "#D27D2D",
        element: (
          <motion.div
            className="absolute -bottom-16 -right-16 w-48 h-48 bg-teal/10 rounded-full blur-md"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        ),
        imagePosition: imageCount++ % 2 === 0 ? "left" : "right", // Back to left
      },
      {
        id: "tales",
        title: "Traveler Tales",
        subtitle: "Voices of the Journey",
        content: (
          <motion.div className="overflow-hidden">
            {[
              {
                name: "Aisha K.",
                story:
                  "I found a hidden waterfall in Bali that sang with the dawn—Wanderer Tribe made it my secret.",
                image: "/images/traveler-1.jpg",
              },
              {
                name: "Liam P.",
                story:
                  "A Moroccan night under stars with nomads—unforgettable, thanks to their bespoke touch.",
                image: "/images/traveler-2.jpg",
              },
            ].map((tale, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-6 mb-6 p-4 bg-white/10 rounded-xl"
                initial={{ x: idx % 2 === 0 ? -200 : 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                <Image
                  src={tale.image}
                  alt={tale.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-600">{tale.name}</p>
                  <p className="text-gray-700">{tale.story}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ),
        image: null,
        accentColor: "#008080",
        element: null,
        imagePosition: null, // No alternation for text-only
      },
      {
        id: "behind",
        title: "Behind the Odyssey",
        subtitle: "Crafting Your Legend",
        content:
          "Our artisans of adventure—guides, historians, and dreamers—meticulously stitch each itinerary. From scouting a secluded Andean village to negotiating with local shamans, we ensure every detail sings with authenticity. This is the art of Wanderer Tribe, where your journey becomes a legend.",
        image: "/images/behind-scenes.jpg",
        accentColor: "#D27D2D",
        element: (
          <motion.svg
            className="absolute -top-10 -left-10 w-32 h-32 text-teal/20"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </motion.svg>
        ),
        imagePosition: imageCount++ % 2 === 0 ? "left" : "right", // Alternate to right
      },
      {
        id: "previews",
        title: "Exclusive Previews",
        subtitle: "Whispers of What’s Next",
        content:
          "Peek into the future: a lost temple in Cambodia’s jungles, a volcanic island off Iceland, a Himalayan pass blooming with rare orchids. These are the next chapters Wanderer Tribe is unveiling—join us to be among the first to explore.",
        image: null,
        accentColor: "#008080",
        element: (
          <motion.div
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-[url('/images/mystery-preview.jpg')] bg-cover bg-center rounded-lg opacity-50"
            animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        ),
        imagePosition: null, // No alternation for text-only
      },
    ];
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-gray-800 overflow-hidden">
      <Navbar />

      {/* Hero Portal */}
      <section className="relative w-full h-[70vh] overflow-hidden mb-[-10%]">
        <motion.div
          className="relative w-full h-full"
          style={{ y: heroY, rotate: heroRotate }}
        >
          <Image
            src="/images/about-hero.jpg"
            alt="Wanderer Tribe Portal"
            fill
            className="object-cover brightness-110"
          />
          <motion.div
            className="absolute inset-0 bg-gray-200/20 flex items-end pb-20"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="font-heading text-5xl md:text-7xl font-bold text-gray-800 text-center px-6 drop-shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Step Into the Uncharted
            </motion.h1>
          </motion.div>
        </motion.div>
      </section>

      {/* Chapter Sections */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto space-y-40">
        {chapters.map((chapter, idx) => (
          <motion.div
            key={chapter.id}
            className={`relative overflow-hidden rounded-2xl bg-white/80 border border-gray-200/20 backdrop-blur-sm ${
              idx % 2 === 0 ? "pr-10 md:pl-20" : "pl-10 md:pr-20"
            }`}
            initial={{ opacity: 0, skewY: 5 }}
            whileInView={{ opacity: 1, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {chapter.element && chapter.element}
            <div
              className={`relative z-10 flex flex-col md:flex-row items-center gap-12 py-12 ${
                chapter.image && chapter.imagePosition === "right"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >
              {chapter.image && (
                <motion.div
                  className="w-full md:w-1/2 h-96 relative overflow-hidden rounded-xl shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={chapter.image}
                    alt={`${chapter.title} Visual`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300/30 to-transparent" />
                </motion.div>
              )}
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <motion.h3
                    className="font-heading text-4xl md:text-5xl text-[color:var(--accent)] tracking-wide"
                    style={
                      { "--accent": chapter.accentColor } as React.CSSProperties
                    }
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {chapter.title}
                  </motion.h3>
                  <motion.div
                    className="h-2 w-16 bg-gradient-to-r from-[color:var(--accent)] to-teal rounded-full mt-2"
                    style={
                      { "--accent": chapter.accentColor } as React.CSSProperties
                    }
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <p className="text-gray-500 text-sm font-medium mt-1">
                    {chapter.subtitle}
                  </p>
                </div>
                <div
                  className="text-gray-700 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: chapter.content }}
                />
              </div>
            </div>
            {idx < chapters.length - 1 && (
              <motion.div
                className="absolute -bottom-6 left-1/2 w-32 h-32 bg-[url('/images/hand-drawn-divider.png')] bg-contain bg-no-repeat rotate-45 opacity-20"
                animate={{ rotate: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        ))}
      </section>

      {/* Final Call to Action */}
      <section className="relative py-20 px-6 text-center bg-white rounded-t-3xl border-t border-gray-200/20">
        <motion.h2
          className="font-heading text-3xl md:text-5xl mb-6 text-teal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Embark on Your Epic
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let Wanderer Tribe weave your story with threads of rarity and
          wonder—contact us to begin.
        </motion.p>
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#D27D2D" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-[#D27D2D] text-white shadow-lg transition-all duration-300"
          >
            Begin Your Odyssey
          </motion.button>
        </Link>
      </section>
    </div>
  );
}
