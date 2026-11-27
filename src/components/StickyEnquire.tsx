"use client";
import { useEffect, useState } from "react";
import EnquireButton from "./EnquireButton";

/** Phone-only bar that appears once the page's own enquire button has scrolled away. */
export default function StickyEnquire({ trip, watchId }: { trip: string; watchId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div className="sticky-enquire" hidden={!show}>
      <EnquireButton trip={trip} className="btn btn-primary w-full" />
    </div>
  );
}
