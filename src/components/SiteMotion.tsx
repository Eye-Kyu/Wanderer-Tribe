"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Rows and cards that rise into place, batched so a grid staggers left to right
const RISE = [
  "main .lead:not(.hero-plate .lead):not(.banner-plate .lead)",
  "main .trip-grid > li",
  "main .region-row",
  "main .itinerary-stop",
  "main .chapter-body",
  "main .experience-row > div:last-child",
  "main .tip-row",
  "main .day",
  "main figure",
  "main form",
  "main .contact-row",
  "main .legal section",
].join(", ");

// Photographs that unmask as they arrive
const PHOTOS = "main .photo, main .photo-band-frame";

const skip = (el: Element) =>
  !!el.closest(".hero, .banner, .poster, dialog, .wa, [role='tabpanel'], .camp-rail");

/**
 * GSAP motion for the whole site, run once per route (after the page curtain lifts).
 * Everything is visible without script; GSAP sets start states only when it runs and
 * the visitor has not asked for reduced motion. Transform, opacity and clip-path only.
 */
export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const splits: SplitText[] = [];
      // Wait for the curtain when a page transition is running
      const curtainEl = document.querySelector<HTMLElement>(".curtain");
      const curtainUp = !!curtainEl && Number(gsap.getProperty(curtainEl, "scaleY")) > 0;
      const lead = curtainUp ? 0.55 : 0.1;

      /* 1. The first screen: footage settles, the headline rises word by word out of a mask */
      const media = document.querySelector(".hero-media video, .banner-media img, .poster-media img");
      if (media) gsap.from(media, { scale: 1.08, duration: 1.8, ease: "power2.out", delay: lead - 0.1, clearProps: "transform" });

      const plate = document.querySelector<HTMLElement>(".hero-plate, .banner-plate");
      if (plate) {
        const h1 = plate.querySelector("h1");
        const rest = Array.from(plate.children).filter((c) => c !== h1);
        const tl = gsap.timeline({ delay: lead });
        tl.from(plate, { y: 32, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" });
        if (h1) {
          const split = SplitText.create(h1, { type: "words,lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          tl.from(split.words, { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.06 }, 0.15);
        }
        if (rest.length) tl.from(rest, { y: 18, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, clearProps: "transform,opacity" }, 0.45);
      }

      /* 2. Section heads: lines rise out of a mask as they enter */
      gsap.utils.toArray<HTMLElement>("main h2").filter((h) => !skip(h)).forEach((h) => {
        const split = SplitText.create(h, { type: "lines", mask: "lines", linesClass: "split-line" });
        splits.push(split);
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: h, start: "top 88%", once: true },
        });
      });

      /* 3. Photographs unmask from a tighter crop while their image settles */
      gsap.utils.toArray<HTMLElement>(PHOTOS).filter((p) => !skip(p)).forEach((frame) => {
        const img = frame.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 90%", once: true } });
        tl.fromTo(
          frame,
          { clipPath: "inset(8% 8% 8% 8% round 6px)" },
          { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.2, ease: "power3.inOut", clearProps: "clipPath" },
        );
        if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.4, ease: "power3.out", clearProps: "transform" }, 0);
      });

      /* 4. Rows and cards rise, batched */
      const rise = gsap.utils.toArray<HTMLElement>(RISE).filter((el) => !skip(el));
      gsap.set(rise, { opacity: 0, y: 32 });
      ScrollTrigger.batch(rise, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true, clearProps: "transform,opacity" }),
      });

      /* 5. The safari camps slide in along their rail */
      const rail = document.querySelector(".camp-rail");
      if (rail) {
        gsap.from(rail.children, {
          x: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: rail, start: "top 85%", once: true },
        });
      }

      /* 6. The Thailand route draws itself as you read down the stops */
      const route = document.querySelector<HTMLElement>(".itinerary-progress");
      if (route) {
        gsap.fromTo(
          route,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: route.parentElement, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      }

      ScrollTrigger.refresh();

      return () => splits.forEach((s) => s.revert());
    });

    return () => mm.revert();
  }, [pathname]);

  /* The header tucks away scrolling down and returns scrolling up (all routes, all the time) */
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const show = gsap.quickTo(header, "yPercent", { duration: 0.45, ease: "power3.out" });
      let last = window.scrollY;
      const onScroll = () => {
        const y = window.scrollY;
        const menuOpen = document.documentElement.classList.contains("scroll-locked");
        const focusInside = header.contains(document.activeElement);
        if (menuOpen || focusInside || y < 120 || y < last) show(0);
        else if (y > last + 4) show(-100);
        header.classList.toggle("is-scrolled", y > 24);
        last = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      header.addEventListener("focusin", () => show(0));
      return () => {
        window.removeEventListener("scroll", onScroll);
        gsap.set(header, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);

  return null;
}
