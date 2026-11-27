/**
 * Sanity Studio: the content dashboard, available at /studio.
 * Editors sign in with their Sanity account.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div style={{ padding: 40, fontFamily: "system-ui", maxWidth: 560 }}>
        <h1>Sanity Studio is not configured</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code>) in <code>.env.local</code> or your
          hosting provider&apos;s environment variables, then rebuild.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
