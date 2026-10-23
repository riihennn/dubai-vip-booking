import { createFileRoute } from "@tanstack/react-router";
import { CityPage } from "@/components/city-page";
import { meta } from "@/components/site";
import { images } from "@/lib/venues";

export const Route = createFileRoute("/dubai")({
  head: () => meta("Dubai Nightlife & VIP Tables — Dubai VIP Booking", "The best nightclubs, rooftops, beach clubs and supper clubs in Dubai. Book VIP tables and guestlists on WhatsApp."),
  component: () => (
    <CityPage city="dubai" title="Dubai" image={images.rooftop} sub="From DIFC rooftops to Palm beach clubs — the city that never asks you to go home." districts={["DIFC", "Downtown", "Palm Jumeirah", "Business Bay", "Marina", "Al Quoz"]} />
  ),
});
