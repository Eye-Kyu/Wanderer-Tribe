import type Lenis from "lenis";

// The one Lenis instance, shared so menus, dialogs and page transitions can pause it.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Pause smooth scroll (open menu or dialog), and give it back. */
export const lockScroll = (locked: boolean) => {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.classList.toggle("scroll-locked", locked);
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
