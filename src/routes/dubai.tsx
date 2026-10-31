import { createFileRoute } from "@tanstack/react-router";
import { CityPage } from "@/components/city-page";
import { images } from "@/lib/venues";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/dubai")({
  head: () =>
    createSeoMeta({
      title: "Dubai VIP Nightlife & Table Booking | Dubai VIP Booking",
      description:
        "Explore premier nightclubs, beachfront clubs, and skyline lounges across Palm Jumeirah, JBR, Downtown, and Business Bay. Reserve VIP tables via WhatsApp.",
      path: "/dubai",
    }),
  component: () => {
    const breadcrumbs = buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Dubai", path: "/dubai" },
    ]);

    return (
      <>
        <JsonLd schema={breadcrumbs} />
        <CityPage
          city="dubai"
          title="Dubai"
          image={images.rooftop}
          sub="From Palm Jumeirah beach clubs to Downtown skyline lounges — discover curated nightlife across the city."
          districts={["Palm Jumeirah", "JBR", "Downtown Dubai", "Business Bay", "Meydan"]}
        />
      </>
    );
  },
});
