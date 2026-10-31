import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import venuesData from "@/data/venues.json";

describe("Sitemap & Robots Validation", () => {
  it("verifies public/sitemap.xml exists and is well-formed XML", () => {
    const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const content = fs.readFileSync(sitemapPath, "utf-8");
    expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(content).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(content).toContain("</urlset>");
  });

  it("verifies all active venues are present in sitemap and closed venues are excluded", () => {
    const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
    const content = fs.readFileSync(sitemapPath, "utf-8");

    const activeVenues = venuesData.filter((v) => v.active && v.operatingStatus === "open");
    const closedVenues = venuesData.filter((v) => !v.active || v.operatingStatus !== "open");

    expect(activeVenues.length).toBeGreaterThanOrEqual(15);
    for (const v of activeVenues) {
      expect(content).toContain(`https://dubaivipbooking.com/venues/${v.slug}`);
    }

    // Armani Prive is temporarily closed and must NOT be in sitemap
    for (const v of closedVenues) {
      expect(content).not.toContain(`https://dubaivipbooking.com/venues/${v.slug}`);
    }
  });

  it("verifies all core public pages exist in sitemap", () => {
    const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
    const content = fs.readFileSync(sitemapPath, "utf-8");

    const requiredPages = [
      "https://dubaivipbooking.com/",
      "https://dubaivipbooking.com/dubai",
      "https://dubaivipbooking.com/abu-dhabi",
      "https://dubaivipbooking.com/venues",
      "https://dubaivipbooking.com/guestlist",
      "https://dubaivipbooking.com/how-it-works",
      "https://dubaivipbooking.com/faq",
      "https://dubaivipbooking.com/contact",
      "https://dubaivipbooking.com/partner",
      "https://dubaivipbooking.com/terms",
      "https://dubaivipbooking.com/privacy",
      "https://dubaivipbooking.com/cookies",
    ];

    for (const page of requiredPages) {
      expect(content).toContain(`<loc>${page}</loc>`);
    }
  });

  it("verifies public/robots.txt references the canonical sitemap.xml", () => {
    const robotsPath = path.resolve(process.cwd(), "public/robots.txt");
    expect(fs.existsSync(robotsPath)).toBe(true);

    const content = fs.readFileSync(robotsPath, "utf-8");
    expect(content).toContain("User-agent: *");
    expect(content).toContain("Allow: /");
    expect(content).toContain("Sitemap: https://dubaivipbooking.com/sitemap.xml");
  });
});

