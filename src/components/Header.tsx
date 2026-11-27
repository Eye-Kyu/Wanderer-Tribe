"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { getLenis, lockScroll, prefersReducedMotion } from "@/lib/smooth";
import { useCtaModal } from "@/context/CTAModalContext";
import { REGIONS } from "@/lib/travel";

const MENUS = [
  {
    href: "/Destinations",
    label: "Destinations",
    children: REGIONS.map((r) => ({ href: r.href, label: r.label })),
  },
  {
    href: "/Experiences",
    label: "Experiences",
    children: [
      { href: "/Experiences/wellness", label: "Wellness Retreats" },
      { href: "/Experiences/adventure", label: "Adventure Travel" },
      { href: "/Experiences/luxury", label: "Luxury Escapes" },
    ],
  },
] as const;

const LINKS = [
  { href: "/About", label: "About" },
  { href: "/Contact", label: "Contact" },
] as const;

/* ---------- A disclosure menu: opens on click, and on hover where hover exists ---------- */

function NavMenu({ menu, active }: { menu: (typeof MENUS)[number]; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="nav-link"
        data-active={active || undefined}
      >
        {menu.label}
        <ChevronDown aria-hidden="true" size={16} />
      </button>
      <div id={id} hidden={!open} className="nav-panel">
        <ul className="grid gap-1">
          <li>
            <Link href={menu.href} className="nav-panel-link" onClick={() => setOpen(false)}>
              All {menu.label.toLowerCase()}
            </Link>
          </li>
          {menu.children.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="nav-panel-link" onClick={() => setOpen(false)}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* ---------- The bar ---------- */

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCta } = useCtaModal();
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // The enquiry form lives on the home page; elsewhere the dialog opens
  const handleTravelEnquiry = () => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const ctaSection = document.getElementById("cta");
      if (ctaSection) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(ctaSection, { offset: -88 });
        else ctaSection.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    openCta();
  };

  // The sheet's choreography: it opens as a circle from the menu button, lines rise out of masks
  useEffect(() => {
    const sheet = sheetRef.current;
    const burger = burgerRef.current;
    if (!sheet || !burger) return;
    const [top, bottom] = Array.from(burger.children);
    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        gsap.set(sheet, { visibility: "hidden" });
      },
    });
    tl.set(sheet, { visibility: "visible" })
      .fromTo(
        sheet,
        { clipPath: "circle(0% at 92% 0%)" },
        { clipPath: "circle(150% at 92% 0%)", duration: 0.75, ease: "power4.inOut" },
      )
      .to(top, { y: 5, rotate: 45, duration: 0.35, ease: "power3.inOut" }, 0)
      .to(bottom, { y: -5, rotate: -45, duration: 0.35, ease: "power3.inOut" }, 0)
      .from(sheet.querySelectorAll(".menu-line"), { yPercent: 110, duration: 0.6, ease: "power3.out", stagger: 0.05 }, 0.3)
      .from(sheet.querySelectorAll(".menu-fade"), { opacity: 0, y: 12, duration: 0.4, ease: "power2.out" }, 0.55);
    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    lockScroll(mobileMenuOpen);
    if (prefersReducedMotion()) {
      tl.progress(mobileMenuOpen ? 1 : 0).pause();
      if (!mobileMenuOpen) gsap.set(sheetRef.current, { visibility: "hidden" });
    } else if (mobileMenuOpen) {
      tl.timeScale(1).play();
    } else if (tl.progress() > 0) {
      tl.timeScale(1.7).reverse();
    }
    if (mobileMenuOpen) {
      sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [mobileMenuOpen]);

  useEffect(() => setMobileMenuOpen(false), [pathname]);
  useEffect(() => () => lockScroll(false), []);

  const close = () => setMobileMenuOpen(false);

  return (
    <>
    <header className="site-header">
      <nav aria-label="Main" className="container flex h-full items-center gap-6">
        <Link href="/" aria-label="Wanderer Tribe, home" className="flex shrink-0 items-center gap-3">
          <Image src="/images/Wanderer logo 1.png" alt="" width={48} height={48} priority />
          <span className="wordmark">Wanderer Tribe</span>
        </Link>

        <ul className="ml-auto hidden lg:flex items-center gap-1">
          {MENUS.map((m) => (
            <NavMenu key={m.href} menu={m} active={isActive(m.href)} />
          ))}
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="nav-link"
                aria-current={isActive(l.href) ? "page" : undefined}
                data-active={isActive(l.href) || undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button type="button" onClick={handleTravelEnquiry} className="btn btn-quiet ml-auto lg:ml-2 hidden sm:inline-flex">
          Plan a trip
        </button>

        <button
          type="button"
          className="icon-btn lg:hidden ml-auto sm:ml-0"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close the menu" : "Open the menu"}
          onClick={() => setMobileMenuOpen((o) => !o)}
        >
          <span ref={burgerRef} className="burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>
    </header>

      {/* Outside the header: its scroll transform would otherwise trap this fixed sheet */}
      <div id="mobile-menu" ref={sheetRef} className="mobile-menu field lg:hidden" data-lenis-prevent>
        <div className="container flex min-h-full flex-col gap-10 py-10">
          {MENUS.map((m) => (
            <div key={m.href} className="flex flex-col gap-3">
              <span className="menu-mask">
                <Link href={m.href} className="menu-line menu-big" onClick={close}>
                  {m.label}
                </Link>
              </span>
              <ul className="grid gap-1">
                {m.children.map((c) => (
                  <li key={c.href} className="menu-mask">
                    <Link href={c.href} className="menu-line menu-small" onClick={close}>
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="grid gap-2 border-t border-rule pt-8">
            {LINKS.map((l) => (
              <li key={l.href} className="menu-mask">
                <Link href={l.href} className="menu-line menu-big" onClick={close}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-fade mt-auto flex flex-col gap-4">
            <button type="button" onClick={handleTravelEnquiry} className="btn btn-primary">
              Plan a trip
            </button>
            <a href="https://wa.me/31613227086" className="menu-small">WhatsApp +31 6 1322 7086</a>
          </div>
        </div>
      </div>
    </>
  );
}
