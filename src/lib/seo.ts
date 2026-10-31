import { type Venue } from "./venues";

export const CANONICAL_DOMAIN = "https://dubaivipbooking.com";
export const DEFAULT_OG_IMAGE = `${CANONICAL_DOMAIN}/images/og-default.jpg`;

export interface SeoMetaOptions {
  title: string;
  description: string;
  path: string; // e.g. "/venues" or "/venues/bling-dubai"
  ogImage?: string | undefined;
  type?: "website" | "article" | undefined;
}

export function createCanonicalUrl(path: string): string {
  if (!path || path === "/") return `${CANONICAL_DOMAIN}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  // Standardize: no trailing slash for subpaths
  return `${CANONICAL_DOMAIN}${clean.replace(/\/+$/, "")}`;
}

export function createSeoMeta({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
}: SeoMetaOptions) {
  const canonicalUrl = createCanonicalUrl(path);
  const resolvedOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${CANONICAL_DOMAIN}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:type", content: type },
      { property: "og:image", content: resolvedOgImage },
      { property: "og:site_name", content: "Dubai VIP Booking" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: resolvedOgImage },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}

/**
 * Valid Organization Schema (WaltX Limited / Dubai VIP Booking)
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dubai VIP Booking",
    legalName: "WaltX Limited",
    url: CANONICAL_DOMAIN,
    logo: `${CANONICAL_DOMAIN}/apple-touch-icon.png`,
    description:
      "Private nightlife concierge and VIP table booking service for Dubai and Abu Dhabi.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressRegion: "Abu Dhabi",
      addressCountry: "AE",
      streetAddress: "Masdar City Free Zone",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-50-471-3452",
      contactType: "customer service",
      areaServed: ["AE", "AE-DU", "AE-AZ"],
      availableLanguage: ["English", "Arabic"],
    },
  };
}

/**
 * Valid WebSite Schema with SearchAction
 */
export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dubai VIP Booking",
    url: CANONICAL_DOMAIN,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${CANONICAL_DOMAIN}/venues?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Valid BreadcrumbList Schema
 */
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: createCanonicalUrl(item.path),
    })),
  };
}

/**
 * Valid FAQPage Schema
 */
export function buildFaqSchema(faqs: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/**
 * Valid LocalBusiness / NightClub Schema for individual venue
 * Note: Never includes fake aggregateRating or reviews.
 */
export function buildVenueSchema(venue: Venue) {
  const schemaType = venue.venueType.toLowerCase().includes("nightclub")
    ? "NightClub"
    : venue.venueType.toLowerCase().includes("beach")
      ? "BeachClub"
      : "FoodEstablishment";

  const resolvedImage = venue.image.startsWith("http")
    ? venue.image
    : `${CANONICAL_DOMAIN}${venue.image.startsWith("/") ? venue.image : `/${venue.image}`}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", schemaType],
    name: venue.name,
    description: venue.description,
    image: resolvedImage,
    url: venue.officialWebsite || createCanonicalUrl(`/venues/${venue.slug}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.address,
      addressLocality: venue.area,
      addressRegion: venue.city === "dubai" ? "Dubai" : "Abu Dhabi",
      addressCountry: "AE",
    },
  };

  if (venue.reservationContact) {
    schema["telephone"] = venue.reservationContact;
  }

  return schema;
}
