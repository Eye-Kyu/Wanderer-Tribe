"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // smoother scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    });

    // Store the callback so we can remove it later
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    };

    // GSAP ticker instead of requestAnimationFrame
    gsap.ticker.add(tickerCallback);

    gsap.ticker.lagSmoothing(0); // prevents GSAP from skipping frames on lags

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
