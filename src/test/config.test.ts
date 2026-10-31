import { describe, expect, it } from "vitest";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, brand, waLink } from "@/lib/config";
import {
  WHATSAPP_NUMBER as VENUES_WHATSAPP,
  brand as venuesBrand,
  waLink as venuesWaLink,
} from "@/lib/venues";

describe("Centralized WhatsApp & Company Configuration", () => {
  it("uses the official business WhatsApp number in international format", () => {
    expect(WHATSAPP_NUMBER).toBe("971504713452");
    expect(WHATSAPP_DISPLAY).toBe("+971 50 471 3452");
    expect(brand.phone).toBe("+971 50 471 3452");
  });

  it("re-exports matching values from venues.ts for backward compatibility", () => {
    expect(VENUES_WHATSAPP).toBe("971504713452");
    expect(venuesBrand.phone).toBe("+971 50 471 3452");
  });

  it("generates correct click-to-WhatsApp URLs preserving pre-filled messages", () => {
    const defaultMsg = "Hi Dubai VIP Booking, I'd like to book a night out.";
    expect(waLink(defaultMsg)).toBe(
      "https://wa.me/971504713452?text=Hi%20Dubai%20VIP%20Booking%2C%20I'd%20like%20to%20book%20a%20night%20out.",
    );
    expect(venuesWaLink(defaultMsg)).toBe(waLink(defaultMsg));

    const specialMsg = "Enquiry: Table #1 & VIP (ref: ABC-123)?";
    expect(waLink(specialMsg)).toBe(
      `https://wa.me/971504713452?text=${encodeURIComponent(specialMsg)}`,
    );
  });

  it("contains verified company and operator licensing information", () => {
    expect(brand.company.copyright).toBe("© 2026 Dubai VIP Booking. All rights reserved.");
    expect(brand.company.operator).toBe(
      "Dubai VIP Booking is operated by WaltX Limited, licensed by Masdar City Free Zone, Abu Dhabi, UAE (Licence No. MC 14979).",
    );
    expect(brand.company.disclaimer).toBe(
      "Dubai VIP Booking promotes nightlife experiences and is not the venue operator.",
    );
  });
});
