// The site's public address, in one place. Temporarily on .org; to move back,
// set NEXT_PUBLIC_SITE_URL (e.g. https://wanderertribe.ke) or change the default below.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://wanderertribe.org").replace(/\/$/, "");

/** "wanderertribe.org", for display */
export const SITE_HOST = new URL(SITE_URL).host;

/** The logo as an absolute URL, for emails (they cannot use relative paths) */
export const LOGO_URL = `${SITE_URL}/images/Wanderer%20logo%201.png`;
