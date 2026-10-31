/**
 * Centralized site configuration for Dubai VIP Booking.
 * Update business contact information, WhatsApp numbers, and company details here.
 */

// Official business WhatsApp contact number
// Format: international number for WhatsApp click-to-chat (digits only, no '+' or spaces)
export const WHATSAPP_NUMBER = "971504713452";

// Formatted display number for user interfaces
export const WHATSAPP_DISPLAY = "+971 50 471 3452";

// Canonical website base URL
export const CANONICAL_URL = "https://dubaivipbooking.com";

// Configurable contact email:
// Note: Official business email will be configured via VITE_OFFICIAL_EMAIL once finalized by WaltX Limited.
// When undefined/null, the website avoids displaying fake or unverified placeholder email addresses.
export const OFFICIAL_EMAIL: string | null =
  (typeof process !== "undefined" && process.env?.["VITE_OFFICIAL_EMAIL"]) || null;

export const brand = {
  name: "Dubai VIP Booking",
  website: "dubaivipbooking.com",
  canonicalUrl: CANONICAL_URL,
  tagline: "Your Night. Your City.",
  description:
    "Discover premium nightlife venues, VIP table experiences, and guestlist access across Dubai and Abu Dhabi.",
  phone: WHATSAPP_DISPLAY,
  whatsappNumber: WHATSAPP_NUMBER,
  email: OFFICIAL_EMAIL,
  hours: "Daily, 6:00 PM – 2:00 AM GST",
  company: {
    name: "WaltX Limited",
    licence: "Masdar City Free Zone, Abu Dhabi, UAE",
    licenceNo: "MC 14979",
    copyright: "© 2026 Dubai VIP Booking. All rights reserved.",
    operator:
      "Dubai VIP Booking is operated by WaltX Limited, licensed by Masdar City Free Zone, Abu Dhabi, UAE (Licence No. MC 14979).",
    disclaimer: "Dubai VIP Booking promotes nightlife experiences and is not the venue operator.",
  },
};

/**
 * Click-to-WhatsApp URL generator.
 * Encodes the pre-filled message and targets the official WhatsApp business number.
 */
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
