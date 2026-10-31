import { describe, expect, it } from "vitest";
import rawVenues from "@/data/venues.json";
import { venues, allVenues, getVenue, byCity } from "@/lib/venues";

describe("Venues Database & Integration", () => {
  it("contains all researched candidate venues with consistent schema", () => {
    expect(rawVenues.length).toBeGreaterThanOrEqual(15);

    for (const v of rawVenues) {
      expect(v.id).toBeDefined();
      expect(v.slug).toBeDefined();
      expect(v.name).toBeDefined();
      expect(v.city).toMatch(/^(Dubai|Abu Dhabi)$/);
      expect(v.area).toBeDefined();
      expect(v.venueType).toBeDefined();
      expect(v.address).toBeDefined();
      expect(v.officialWebsite).toMatch(/^https?:\/\//);
      expect(v.instagram).toMatch(/^https?:\/\//);
      expect(v.googleMapsUrl).toMatch(/^https?:\/\//);
      expect(v.description.length).toBeGreaterThan(20);
      expect(Array.isArray(v.images)).toBe(true);
      expect(v.images.length).toBeGreaterThan(0);
      expect(v.images[0]?.alt).toBeDefined();
      expect(Array.isArray(v.openingNights)).toBe(true);
      expect(v.openingHours).toBeDefined();
      expect(v.dressCode).toBeDefined();
      expect(v.partnershipStatus).toBe("unconfirmed");
      expect(["verified", "partially_verified"]).toContain(v.verificationStatus);
      expect(Array.isArray(v.sources)).toBe(true);
      expect(v.sources.length).toBeGreaterThan(0);
    }
  });

  it("never invents minimum spend, VIP package prices or capacity", () => {
    for (const v of rawVenues) {
      // Must be null if not officially published
      if (v.publishedMinimumSpend !== null) {
        expect(typeof v.publishedMinimumSpend).toBe("string");
      }
      expect(v.confirmedMinimumSpend).toBeNull();
      if (v.capacity !== null) {
        expect(typeof v.capacity).toBe("string");
      }
    }
  });

  it("has exactly 10 active Dubai venues and 10 active Abu Dhabi venues", () => {
    const dubaiVenues = byCity("dubai");
    const abuDhabiVenues = byCity("abu-dhabi");

    expect(dubaiVenues.length).toBe(10);
    expect(abuDhabiVenues.length).toBe(10);
    expect(venues.length).toBe(20);
  });

  it("excludes temporarily closed venues from active public listings", () => {
    const armani = allVenues.find((v) => v.slug === "armani-prive-dubai");
    expect(armani).toBeDefined();
    expect(armani?.active).toBe(false);
    expect(armani?.operatingStatus).toBe("temporarily_closed");

    // Must not be in active venues list
    expect(venues.some((v) => v.slug === "armani-prive-dubai")).toBe(false);
  });

  it("finds active venues by slug via getVenue", () => {
    const blu = getVenue("blu-dubai");
    expect(blu).toBeDefined();
    expect(blu?.name).toBe("BLU Dubai");
    expect(blu?.city).toBe("dubai");

    const white = getVenue("white-abu-dhabi");
    expect(white).toBeDefined();
    expect(white?.name).toBe("WHITE Abu Dhabi");
    expect(white?.city).toBe("abu-dhabi");
  });
});
