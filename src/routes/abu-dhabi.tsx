import { createFileRoute } from "@tanstack/react-router";
import { CityPage } from "@/components/city-page";
import { images } from "@/lib/venues";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/abu-dhabi")({
  head: () =>
    createSeoMeta({
      title: "Abu Dhabi VIP Nightlife & Table Booking | Dubai VIP Booking",
      description:
        "Discover luxury beach clubs, high-energy lounges, and clubs across Yas Island, Saadiyat Island, and Corniche. Reserve VIP tables on WhatsApp.",
      path: "/abu-dhabi",
    }),
  component: () => {
    const breadcrumbs = buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Abu Dhabi", path: "/abu-dhabi" },
    ]);

    return (
      <>
        <JsonLd schema={breadcrumbs} />
        <CityPage
          city="abu-dhabi"
          title="Abu Dhabi"
          image={images.abudhabi}
          sub="The capital after dark — refined coastal beach clubs, Yas Island lounges, and premier nightlife."
          districts={["Yas Island", "Saadiyat Island", "Corniche", "Hudayriyat Island"]}
        />
      </>
    );
  },
});
