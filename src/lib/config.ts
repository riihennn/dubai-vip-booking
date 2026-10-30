/**
 * Centralized site configuration for Dubai VIP Booking.
 * Update business contact information, WhatsApp numbers, and company details here.
 */

// Official business WhatsApp contact number
// Format: international number for WhatsApp click-to-chat (digits only, no '+' or spaces)
export const WHATSAPP_NUMBER = "971504713452";

// Formatted display number for user interfaces
export const WHATSAPP_DISPLAY = "+971 50 471 3452";

export const brand = {
  name: "Dubai VIP Booking",
  website: "dubaivipbooking.com",
  tagline: "Your Night. Your City.",
  description:
    "Discover premium nightlife venues, VIP table experiences, and guestlist access across Dubai and Abu Dhabi.",
  phone: WHATSAPP_DISPLAY,
  email: "hello@example.com",
  hours: "Daily, 6:00 PM – 2:00 AM",
  company: {
    copyright: "© 2026 Dubai VIP Booking. All rights reserved.",
    operator:
      "Dubai VIP Booking is operated by WaltX Limited, licensed by Masdar City Free Zone, Abu Dhabi, UAE (Licence No. MC 14979).",
    disclaimer:
      "Dubai VIP Booking promotes nightlife experiences and is not the venue operator.",
  },
};

/**
 * Click-to-WhatsApp URL generator.
 * Encodes the pre-filled message and targets the official WhatsApp business number.
 */
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

