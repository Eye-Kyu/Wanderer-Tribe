"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import TripPlanner from "./TripPlanner";

/**
 * Counter hero: the owner's footage fills the screen under the nav; the head, one sentence
 * and the trip planner sit on a paper plate at its base.
 */
const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect screen size on client
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Under reduced motion the footage starts paused on its poster
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, [isMobile]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <video
          key={isMobile ? "mobile" : "desktop"}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={isMobile ? "/images/hero-poster-mobile.webp" : "/images/hero-poster.webp"}
          src={isMobile ? "/videos/mobile-landing.webm" : "/videos/Landing-page.webm"}
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-plate">
          <h1 id="hero-title">Discover wonders with Wanderer Tribe</h1>
          <p className="lead text-ink-2">
            Explore breathtaking destinations and unique experiences around the world.
          </p>
          <TripPlanner />
        </div>

        <button
          type="button"
          onClick={toggle}
          className="icon-btn hero-pause"
          aria-label={playing ? "Pause the video" : "Play the video"}
        >
          {playing ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
        </button>
      </div>
    </section>
  );
};

export default Hero;
