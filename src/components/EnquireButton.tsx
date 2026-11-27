"use client";
import { useCtaModal } from "@/context/CTAModalContext";

/** Opens the enquiry with this trip already named in the details. */
export default function EnquireButton({ trip, className = "btn btn-primary" }: { trip: string; className?: string }) {
  const { openCta } = useCtaModal();
  return (
    <button type="button" className={className} onClick={() => openCta({ details: `I am interested in ${trip}.` })}>
      Enquire about this trip
    </button>
  );
}
