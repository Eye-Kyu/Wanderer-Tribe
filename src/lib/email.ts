// Every email address the site shows or sends from, in one place.
// The sending domain must be verified in Resend (resend.com/domains) for mail to go out.

export const MAIL_DOMAIN = "wanderertribe.org";

export const EMAIL = {
  /** Shown in the footer and beside the enquiry form */
  contact: `contact@${MAIL_DOMAIN}`,
  /** Contact page; receives contact-form messages and booking copies */
  info: `info@${MAIL_DOMAIN}`,
  /** Sends and receives booking enquiries */
  booking: `booking@${MAIL_DOMAIN}`,
  /** Terms & Conditions questions */
  support: `support@${MAIL_DOMAIN}`,
  /** Privacy Policy questions and data requests */
  privacy: `privacy@${MAIL_DOMAIN}`,
} as const;

/** "Wanderer Tribe <booking@wanderertribe.org>" */
export const sender = (address: string) => `Wanderer Tribe <${address}>`;
