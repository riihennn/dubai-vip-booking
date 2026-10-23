import hero from "@/assets/hero.jpg";
import rooftop from "@/assets/rooftop.jpg";
import vip from "@/assets/vip.jpg";
import beach from "@/assets/beach.jpg";
import supper from "@/assets/supper.jpg";
import techno from "@/assets/techno.jpg";
import yacht from "@/assets/yacht.jpg";
import abudhabi from "@/assets/abudhabi.jpg";

export const images = { hero, rooftop, vip, beach, supper, techno, yacht, abudhabi };

// DEMO DATA — placeholder contact details, not active. Replace with verified info.
export const WHATSAPP_NUMBER = "971500000000";
export const brand = {
  name: "Dubai VIP Booking",
  website: "dubaivipbooking.com",
  tagline: "Your Night. Your City.",
  description: "Discover premium nightlife venues, VIP table experiences, and guestlist access across Dubai and Abu Dhabi.",
  phone: "+971 50 000 0000",
  email: "hello@example.com",
  hours: "Daily, 6:00 PM – 2:00 AM",
};
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export type City = "dubai" | "abu-dhabi";
export type Venue = {
  slug: string; name: string; city: City; area: string; type: string; image: string;
  tagline: string; description: string; nights: string[]; music: string; dress: string;
  minSpend: string; capacity: string;
  tables: { name: string; guests: string; spend: string }[];
};

// DEMO DATA — fictional venues, prices and details. Replace with verified information.
const tables = (base: number, cap: number) => [
  { name: "Standard Table", guests: `Up to ${cap}`, spend: `AED ${base.toLocaleString()}` },
  { name: "Premium Booth", guests: `Up to ${cap + 4}`, spend: `AED ${(base * 2).toLocaleString()}` },
  { name: "Signature VIP", guests: `Up to ${cap + 8}`, spend: `AED ${(base * 4).toLocaleString()}` },
];
const v = (slug: string, name: string, city: City, area: string, type: string, image: string, tagline: string, description: string, nights: string[], _n: string, music: string, dress: string, base: number, cap: number): Venue =>
  ({ slug, name, city, area, type, image, tagline, description, nights, music, dress, minSpend: `From AED ${base.toLocaleString()}`, capacity: `Up to ${cap} guests`, tables: tables(base, cap) });

export const venues: Venue[] = [
  v("noir-social", "NOIR Social", "dubai", "Dubai Marina", "Luxury Nightclub", hero, "Marina nights, turned all the way up", "A high-energy club on the Marina with laser-lit dance floors, resident DJs and bottle-service tables overlooking the water.", ["Thu", "Fri", "Sat"], "", "House · Commercial", "Smart elegant", 2000, 6),
  v("velvet-room", "VELVET Room", "dubai", "Downtown Dubai", "Premium Lounge", supper, "Velvet, candlelight and Burj views", "An intimate Downtown lounge with live sets, signature cocktails and plush booths made for long conversations.", ["Wed", "Thu", "Fri", "Sat"], "", "Lounge · Live Jazz", "Smart casual", 3500, 8),
  v("azure-house", "AZURE House", "dubai", "Palm Jumeirah", "Luxury Lounge", beach, "Sunset on the Palm, until late", "Ocean-facing terraces, poolside cabanas and a golden-hour soundtrack that drifts into the night.", ["Thu", "Fri", "Sat", "Sun"], "", "Afro House · Melodic", "Elegant evening wear", 5000, 10),
  v("luma-nights", "LUMA Nights", "dubai", "Business Bay", "Nightlife Lounge", rooftop, "Skyline lounge above the canal", "A sleek rooftop lounge in Business Bay with skyline views, deep-house nights and a relaxed late crowd.", ["Thu", "Fri", "Sat"], "", "Deep House", "Smart casual", 2500, 6),
  v("white-sands", "WHITE Sands", "abu-dhabi", "Yas Bay", "Premium Nightlife Venue", yacht, "Waterfront glamour on Yas Bay", "A waterfront venue where elegant dinners give way to DJ sets and celebration tables by the bay.", ["Fri", "Sat"], "", "Open Format · R&B", "Smart elegant", 3000, 8),
  v("ember-lounge", "EMBER Lounge", "abu-dhabi", "Abu Dhabi", "Luxury Lounge", vip, "Sparklers, champagne, the capital", "A warm, gold-lit lounge known for sparkler parades, champagne service and weekly guest DJs.", ["Thu", "Fri", "Sat"], "", "Hip-Hop · House", "Smart elegant", 2000, 6),
];

export const getVenue = (slug: string) => venues.find((v) => v.slug === slug);
export const byCity = (c: City) => venues.filter((v) => v.city === c);
