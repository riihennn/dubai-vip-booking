import hero from "@/assets/hero.jpg";
import rooftop from "@/assets/rooftop.jpg";
import vip from "@/assets/vip.jpg";
import beach from "@/assets/beach.jpg";
import supper from "@/assets/supper.jpg";
import techno from "@/assets/techno.jpg";
import yacht from "@/assets/yacht.jpg";
import abudhabi from "@/assets/abudhabi.jpg";
import rawVenues from "@/data/venues.json";

export const images = { hero, rooftop, vip, beach, supper, techno, yacht, abudhabi };

export { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, brand, waLink } from "./config";

export type City = "dubai" | "abu-dhabi";

export type VenueImage = {
  url: string;
  alt: string;
  source?: string;
};

export type VenueSource = {
  name: string;
  url: string;
  status: string;
};

export type TableOption = {
  name: string;
  guests: string;
  spend: string;
};

export type RawVenue = {
  id: string;
  name: string;
  city: string;
  area: string;
  slug: string;
  venueType: string;
  address: string;
  officialWebsite: string;
  instagram: string;
  googleMapsUrl: string;
  description: string;
  tagline?: string | undefined;
  image?: string | undefined;
  images: VenueImage[];
  openingNights: string[];
  openingHours: string;
  dressCode: string;
  publishedMinimumSpend: string | null;
  confirmedMinimumSpend: string | null;
  capacity: string | null;
  music?: string | undefined;
  reservationContact?: string | undefined;
  partnershipStatus: "unconfirmed" | "confirmed";
  verificationStatus: "verified" | "partially_verified" | "needs_confirmation" | "unavailable";
  operatingStatus: "open" | "temporarily_closed";
  active: boolean;
  sources: VenueSource[];
  tables?: TableOption[] | undefined;
};

export type Venue = {
  id: string;
  slug: string;
  name: string;
  city: City;
  area: string;
  address: string;
  type: string;
  venueType: string;
  officialWebsite: string;
  instagram: string;
  googleMapsUrl: string;
  image: string;
  images: VenueImage[];
  tagline: string;
  description: string;
  nights: string[];
  openingNights: string[];
  openingHours: string;
  music: string;
  dress: string;
  dressCode: string;
  minSpend: string;
  publishedMinimumSpend: string | null;
  confirmedMinimumSpend: string | null;
  capacity: string | null;
  reservationContact?: string | undefined;
  partnershipStatus: "unconfirmed" | "confirmed";
  verificationStatus: "verified" | "partially_verified" | "needs_confirmation" | "unavailable";
  operatingStatus: "open" | "temporarily_closed";
  active: boolean;
  sources: VenueSource[];
  tables: TableOption[];
};

const defaultTables: TableOption[] = [
  { name: "Standard Table", guests: "Main room & dance floor", spend: "Spend on enquiry" },
  { name: "Premium Booth", guests: "Elevated & prime view", spend: "Spend on enquiry" },
  { name: "Signature VIP", guests: "DJ-side / centre-stage", spend: "Spend on enquiry" },
];

const transformVenue = (r: RawVenue): Venue => {
  const citySlug: City = r.city.toLowerCase().includes("abu") ? "abu-dhabi" : "dubai";
  const minSpendText = r.publishedMinimumSpend
    ? `From AED ${r.publishedMinimumSpend}`
    : "Spend on enquiry";

  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    city: citySlug,
    area: r.area,
    address: r.address,
    type: r.venueType,
    venueType: r.venueType,
    officialWebsite: r.officialWebsite,
    instagram: r.instagram,
    googleMapsUrl: r.googleMapsUrl,
    image: r.image || r.images[0]?.url || hero,
    images: r.images,
    tagline: r.tagline || r.venueType,
    description: r.description,
    nights: r.openingNights,
    openingNights: r.openingNights,
    openingHours: r.openingHours,
    music: r.music || "Open Format · Commercial",
    dress: r.dressCode,
    dressCode: r.dressCode,
    minSpend: minSpendText,
    publishedMinimumSpend: r.publishedMinimumSpend,
    confirmedMinimumSpend: r.confirmedMinimumSpend,
    capacity: r.capacity,
    reservationContact: r.reservationContact,
    partnershipStatus: r.partnershipStatus,
    verificationStatus: r.verificationStatus,
    operatingStatus: r.operatingStatus,
    active: r.active,
    sources: r.sources,
    tables: r.tables || defaultTables,
  };
};

export const allVenues: Venue[] = (rawVenues as RawVenue[]).map(transformVenue);

// Only open, active venues are displayed on the public site
export const venues: Venue[] = allVenues.filter((v) => v.active && v.operatingStatus === "open");

export const getVenue = (slug: string) => venues.find((v) => v.slug === slug);
export const getVenueById = (id: string) => allVenues.find((v) => v.id === id);
export const byCity = (c: City) => venues.filter((v) => v.city === c);
