"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * A pill that slides between tabs. It moves with x and scaleX (transform only),
 * sized against a 100px base so no width is ever animated.
 * Returns refs for the tablist and the indicator; the list gets .has-indicator once wired.
 */
export function useTabIndicator(active: number) {
  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const first = useRef(true);

  useIso(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const place = (animate: boolean) => {
      const tab = list.querySelectorAll<HTMLElement>('[role="tab"]')[active];
      if (!tab) return;
      const to = { x: tab.offsetLeft, scaleX: tab.offsetWidth / 100 };
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!animate || reduce) gsap.set(pill, to);
      else gsap.to(pill, { ...to, duration: 0.45, ease: "power3.out", overwrite: true });
    };
    list.classList.add("has-indicator");
    place(!first.current);
    first.current = false;
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return { listRef, pillRef };
}
