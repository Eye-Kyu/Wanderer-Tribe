"use client";
import { useCtaModal } from "@/context/CTAModalContext";

/** The close for listing pages: one line and the enquiry, on the forest field. */
export default function EnquireBand({
  title = "Plan a trip to Africa, Asia or the Middle East",
  line = "Tell us when, for how long and with whom, and we will plan the rest.",
}: {
  title?: string;
  line?: string;
}) {
  const { openCta } = useCtaModal();
  return (
    <section aria-labelledby="enquire-band-title" className="field py-[var(--section-gap-s)]">
      <div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <h2 id="enquire-band-title" className="text-field-ink">{title}</h2>
          <p className="lead text-field-muted">{line}</p>
        </div>
        <button type="button" onClick={() => openCta()} className="btn btn-primary">
          Plan a trip
        </button>
      </div>
    </section>
  );
}
