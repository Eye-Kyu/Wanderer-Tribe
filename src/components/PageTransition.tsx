"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { getLenis, prefersReducedMotion } from "@/lib/smooth";

/**
 * A forest curtain between routes: it rises over the page on an internal link,
 * the route changes behind it, then it lifts away to reveal the new page.
 * Native navigation is untouched under reduced motion, for modified clicks and for anchors.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const failsafe = useRef<number | null>(null);

  // Cover, then navigate
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (prefersReducedMotion() || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page: let anchors and hashes be
      if (url.pathname.startsWith("/studio")) return;

      e.preventDefault();
      const el = curtain.current;
      if (!el || covering.current) return;
      covering.current = true;
      getLenis()?.stop();

      gsap.set(el, { visibility: "visible", transformOrigin: "50% 100%" });
      gsap
        .timeline({ onComplete: () => router.push(url.pathname + url.search + url.hash) })
        .fromTo(el, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power4.inOut" })
        .fromTo(el.querySelector(".curtain-mark"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.15");

      // Never leave the curtain down if the route does not change
      failsafe.current = window.setTimeout(reveal, 4000);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Lift it away once the new route has rendered
  const reveal = () => {
    const el = curtain.current;
    if (failsafe.current) window.clearTimeout(failsafe.current);
    if (!el || !covering.current) return;
    const lenis = getLenis();
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    lenis?.start();

    gsap.set(el, { transformOrigin: "50% 0%" });
    gsap
      .timeline({
        delay: 0.08,
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
          covering.current = false;
        },
      })
      .to(el.querySelector(".curtain-mark"), { opacity: 0, y: -12, duration: 0.2, ease: "power2.in" })
      .to(el, { scaleY: 0, duration: 0.6, ease: "power4.inOut" }, "-=0.05");
  };

  useEffect(() => {
    reveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div ref={curtain} className="curtain" aria-hidden="true">
      <span className="curtain-mark wordmark">Wanderer Tribe</span>
    </div>
  );
}
