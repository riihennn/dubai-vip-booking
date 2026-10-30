import { createFileRoute } from "@tanstack/react-router";
import { CityPage } from "@/components/city-page";
import { meta } from "@/components/site";
import { images } from "@/lib/venues";

export const Route = createFileRoute("/abu-dhabi")({
  head: () => meta("Abu Dhabi Nightlife & VIP Tables — Dubai VIP Booking", "Curated clubs, rooftops and beach clubs across Abu Dhabi. Reserve VIP tables and guestlist spots on WhatsApp."),
  component: () => (
    <CityPage city="abu-dhabi" title="Abu Dhabi" image={images.abudhabi} sub="The capital after dark — refined, coastal and quietly spectacular." districts={["Yas Island", "Saadiyat Island", "Corniche", "Hudayriyat Island"]} />
  ),
});
