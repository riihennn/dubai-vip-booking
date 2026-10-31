import { describe, expect, it } from "vitest";
import {
  generateReferenceCode,
  formatBookingEnquiryMessage,
  buildQuickWhatsAppLink,
  formatUtmSummary,
  type BookingEnquiry,
  type UtmParams,
} from "@/lib/tracking";
import { WHATSAPP_NUMBER } from "@/lib/config";

describe("WhatsApp Booking Flow & Tracking", () => {
  it("generates unique reference codes starting with DVB-", () => {
    const code1 = generateReferenceCode();
    const code2 = generateReferenceCode();

    expect(code1).toMatch(/^DVB-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/);
    expect(code2).toMatch(/^DVB-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/);
    expect(code1).not.toBe(code2);
  });

  it("formats complete booking enquiry with all required fields", () => {
    const enquiry: BookingEnquiry = {
      name: "Marcus Aurelius",
      phone: "+971501234567",
      date: "2026-11-14",
      partySize: 6,
      city: "Dubai",
      venue: "BLING",
      budget: "Standard Table (Spend on enquiry)",
      tablePreference: "VIP dance floor",
      notes: "Birthday celebration",
    };

    const utm: UtmParams = {
      utm_source: "instagram",
      utm_medium: "story_ad",
      utm_campaign: "weekend_vip",
    };

    const result = formatBookingEnquiryMessage(enquiry, "DVB-TEST01", utm);

    expect(result.refCode).toBe("DVB-TEST01");
    expect(result.text).toContain("Reference: DVB-TEST01");
    expect(result.text).toContain("Full Name: Marcus Aurelius");
    expect(result.text).toContain("Mobile / Phone: +971501234567");
    expect(result.text).toContain("City: Dubai");
    expect(result.text).toContain("Venue: BLING");
    expect(result.text).toContain("Date: 2026-11-14");
    expect(result.text).toContain("Party Size: 6");
    expect(result.text).toContain("Budget / Spend: Standard Table (Spend on enquiry)");
    expect(result.text).toContain("Table Preference: VIP dance floor");
    expect(result.text).toContain("Notes / Occasion: Birthday celebration");
    expect(result.text).toContain("source: instagram");
    expect(result.text).toContain("medium: story_ad");
    expect(result.text).toContain("campaign: weekend_vip");

    expect(result.url).toBe(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(result.text)}`,
    );
  });

  it("formats UTM summary string correctly", () => {
    expect(formatUtmSummary(null)).toBeNull();

    const summary = formatUtmSummary({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "dubai_clubs",
    });

    expect(summary).toBe("source: google | medium: cpc | campaign: dubai_clubs");
  });

  it("builds quick WhatsApp link with reference code attached", () => {
    const link = buildQuickWhatsAppLink("Hi Dubai VIP Booking, test message.");
    expect(link).toContain(`https://wa.me/${WHATSAPP_NUMBER}?text=`);
    const decoded = decodeURIComponent(link);
    expect(decoded).toContain("Hi Dubai VIP Booking, test message.");
    expect(decoded).toContain("Ref: DVB-");
  });
});
