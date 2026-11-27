"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useCtaModal } from "@/context/CTAModalContext";
import { lockScroll } from "@/lib/smooth";
import CallToAction from "./CallToAction";

/** The one enquiry dialog for the whole site: openCta() from anywhere opens it. */
export default function EnquiryModal() {
  const { showCta, prefill, closeCta } = useCtaModal();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (showCta && !d.open) d.showModal();
    if (!showCta && d.open) d.close();
    // Smooth scroll pauses behind the dialog
    lockScroll(showCta);
  }, [showCta]);

  return (
    <dialog
      ref={ref}
      onClose={closeCta}
      onClick={(e) => {
        if (e.target === ref.current) closeCta();
      }}
      aria-labelledby="enquiry-title"
      className="enquiry-dialog"
      data-lenis-prevent
    >
      <div className="flex items-start justify-between gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <h2 id="enquiry-title" className="text-display-s">Plan your trip</h2>
          <p className="text-ink-2">Tell us when, for how long and with whom. We reply by email.</p>
        </div>
        <button type="button" onClick={closeCta} className="icon-btn" aria-label="Close the enquiry form">
          <X aria-hidden="true" size={20} />
        </button>
      </div>
      {showCta && <CallToAction variant="dialog" prefill={prefill} />}
    </dialog>
  );
}
