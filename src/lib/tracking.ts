import { WHATSAPP_NUMBER } from "./config";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export interface BookingEnquiry {
  name: string;
  phone: string;
  date: string;
  partySize: string | number;
  city: string;
  venue: string;
  budget: string;
  tablePreference?: string;
  notes?: string;
}

const STORAGE_KEY_UTM = "dvb_utm_params";

/**
 * Generate a unique Crockford-base32 reference code: e.g. "DVB-7K9A2M"
 */
export function generateReferenceCode(prefix = "DVB"): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${random}`;
}

/**
 * Capture UTM parameters from current URL and persist in sessionStorage.
 */
export function captureUtmParameters(): UtmParams | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const keys: (keyof UtmParams)[] = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ];

    const current: UtmParams = {};
    let hasUtm = false;

    for (const key of keys) {
      const val = params.get(key);
      if (val) {
        current[key] = val.trim();
        hasUtm = true;
      }
    }

    if (hasUtm) {
      sessionStorage.setItem(STORAGE_KEY_UTM, JSON.stringify(current));
      return current;
    }

    const stored = sessionStorage.getItem(STORAGE_KEY_UTM);
    if (stored) {
      return JSON.parse(stored) as UtmParams;
    }
  } catch (_e) {
    // Ignore storage issues in restricted modes
  }
  return null;
}

/**
 * Retrieve any previously captured UTM parameters.
 */
export function getStoredUtmParameters(): UtmParams | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY_UTM);
    if (stored) return JSON.parse(stored) as UtmParams;
  } catch (_e) {
    // Ignore storage issues
  }
  return null;
}

/**
 * Format UTM string for WhatsApp message summary.
 */
export function formatUtmSummary(utm: UtmParams | null): string | null {
  if (!utm) return null;
  const parts: string[] = [];
  if (utm.utm_source) parts.push(`source: ${utm.utm_source}`);
  if (utm.utm_medium) parts.push(`medium: ${utm.utm_medium}`);
  if (utm.utm_campaign) parts.push(`campaign: ${utm.utm_campaign}`);
  if (utm.utm_content) parts.push(`content: ${utm.utm_content}`);
  if (utm.utm_term) parts.push(`term: ${utm.utm_term}`);
  return parts.length > 0 ? parts.join(" | ") : null;
}

/**
 * Format complete, verified VIP Booking Enquiry message for WhatsApp.
 */
export function formatBookingEnquiryMessage(
  enquiry: BookingEnquiry,
  refCode?: string,
  utm?: UtmParams | null,
): { text: string; refCode: string; url: string } {
  const ref = refCode || generateReferenceCode();
  const activeUtm = utm !== undefined ? utm : getStoredUtmParameters();
  const utmText = formatUtmSummary(activeUtm);

  const lines = [
    "VIP TABLE & GUESTLIST ENQUIRY",
    "----------------------------------",
    `Reference: ${ref}`,
    `Full Name: ${enquiry.name.trim()}`,
    `Mobile / Phone: ${enquiry.phone.trim()}`,
    `City: ${enquiry.city.trim()}`,
    `Venue: ${enquiry.venue.trim()}`,
    `Date: ${enquiry.date.trim()}`,
    `Party Size: ${enquiry.partySize}`,
    `Budget / Spend: ${enquiry.budget.trim()}`,
  ];

  if (enquiry.tablePreference) {
    lines.push(`Table Preference: ${enquiry.tablePreference.trim()}`);
  }

  if (enquiry.notes) {
    lines.push(`Notes / Occasion: ${enquiry.notes.trim()}`);
  }

  if (utmText) {
    lines.push("----------------------------------");
    lines.push(`Attribution: ${utmText}`);
  }

  const text = lines.join("\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  return { text, refCode: ref, url };
}

/**
 * Build a quick click-to-WhatsApp link attaching unique reference and UTM tracking.
 */
export function buildQuickWhatsAppLink(
  baseMessage: string,
  extra?: { prefix?: string; venue?: string; city?: string },
): string {
  const ref = generateReferenceCode(extra?.prefix || "DVB");
  const utm = getStoredUtmParameters();
  const utmText = formatUtmSummary(utm);

  let message = `${baseMessage}\n\nRef: ${ref}`;
  if (utmText) {
    message += `\nAttribution: ${utmText}`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
