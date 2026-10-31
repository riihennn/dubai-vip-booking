import { describe, expect, it } from "vitest";
import {
  CANONICAL_DOMAIN,
  createCanonicalUrl,
  createSeoMeta,
  buildOrganizationSchema,
  buildWebsiteSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildVenueSchema,
} from "@/lib/seo";
import { venues } from "@/lib/venues";

describe("Technical SEO & Schema Verification", () => {
  it("uses the canonical production domain https://dubaivipbooking.com", () => {
    expect(CANONICAL_DOMAIN).toBe("https://dubaivipbooking.com");
    expect(createCanonicalUrl("/")).toBe("https://dubaivipbooking.com/");
    expect(createCanonicalUrl("/dubai")).toBe("https://dubaivipbooking.com/dubai");
    expect(createCanonicalUrl("venues/bling-dubai")).toBe(
      "https://dubaivipbooking.com/venues/bling-dubai",
    );
  });

  it("creates complete Open Graph, Twitter, and canonical metadata", () => {
    const meta = createSeoMeta({
      title: "Test Title",
      description: "Test Description",
      path: "/test-path",
    });

    const metaNames = meta.meta.map((m) => ("name" in m ? m.name : undefined)).filter(Boolean);
    const metaProperties = meta.meta
      .map((m) => ("property" in m ? m.property : undefined))
      .filter(Boolean);

    expect(metaNames).toContain("description");
    expect(metaNames).toContain("twitter:card");
    expect(metaNames).toContain("twitter:title");
    expect(metaNames).toContain("twitter:description");

    expect(metaProperties).toContain("og:title");
    expect(metaProperties).toContain("og:description");
    expect(metaProperties).toContain("og:url");
    expect(metaProperties).toContain("og:type");
    expect(metaProperties).toContain("og:image");

    expect(meta.links[0]?.rel).toBe("canonical");
    expect(meta.links[0]?.href).toBe("https://dubaivipbooking.com/test-path");
  });

  it("generates valid Organization and WebSite schema without invented claims", () => {
    const org = buildOrganizationSchema();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Dubai VIP Booking");
    expect(org.legalName).toBe("WaltX Limited");
    expect(org.url).toBe("https://dubaivipbooking.com");
    expect(org.contactPoint.telephone).toBe("+971-50-471-3452");

    const web = buildWebsiteSchema();
    expect(web["@type"]).toBe("WebSite");
    expect(web.url).toBe("https://dubaivipbooking.com");
  });

  it("generates valid BreadcrumbList schema", () => {
    const bc = buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Dubai", path: "/dubai" },
    ]);
    expect(bc["@type"]).toBe("BreadcrumbList");
    expect(bc.itemListElement).toHaveLength(2);
    expect(bc.itemListElement[0]?.position).toBe(1);
    expect(bc.itemListElement[0]?.item).toBe("https://dubaivipbooking.com/");
    expect(bc.itemListElement[1]?.position).toBe(2);
    expect(bc.itemListElement[1]?.item).toBe("https://dubaivipbooking.com/dubai");
  });

  it("generates valid FAQPage schema", () => {
    const faqs: [string, string][] = [
      ["Question 1", "Answer 1"],
      ["Question 2", "Answer 2"],
    ];
    const faqSchema = buildFaqSchema(faqs);
    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(faqSchema.mainEntity).toHaveLength(2);
    expect(faqSchema.mainEntity[0]?.name).toBe("Question 1");
    expect(faqSchema.mainEntity[0]?.acceptedAnswer.text).toBe("Answer 1");
  });

  it("generates valid Venue schema with verified fields and NEVER invents ratings or reviews", () => {
    const sampleVenue = venues[0];
    if (!sampleVenue) throw new Error("No venues found");

    const schema = buildVenueSchema(sampleVenue);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["name"]).toBe(sampleVenue.name);
    expect(schema["address"]).toBeDefined();

    // Strict compliance: never invent aggregate rating or reviews
    expect(schema["aggregateRating"]).toBeUndefined();
    expect(schema["review"]).toBeUndefined();
    expect(schema["reviews"]).toBeUndefined();
  });
});
