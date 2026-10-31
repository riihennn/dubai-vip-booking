import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { images, venues } from "@/lib/venues";
import { CtaBand, PageHero, Section, VenueCard } from "@/components/site";
import { cn } from "@/lib/utils";
import { createSeoMeta, buildBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/venues/")({
  head: () =>
    createSeoMeta({
      title: "Dubai & Abu Dhabi Nightlife Venues Directory | Dubai VIP Booking",
      description:
        "Browse verified nightclubs, luxury beach clubs, and rooftop lounges across Dubai and Abu Dhabi. Verified opening hours, dress codes, and VIP table bookings.",
      path: "/venues",
    }),
  component: Venues,
});

function Venues() {
  const [city, setCity] = useState<"all" | "dubai" | "abu-dhabi">("all");
  const [q, setQ] = useState("");
  const list = venues.filter(
    (v) =>
      (city === "all" || v.city === city) &&
      (v.name + v.type + v.area).toLowerCase().includes(q.toLowerCase()),
  );

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Venues", path: "/venues" },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <PageHero
        eyebrow="The Collection"
        title={
          <>
            Every room <span className="text-gold">worth entering.</span>
          </>
        }
        sub="Explore curated nightlife venues across Dubai and Abu Dhabi with verified locations, opening hours, and WhatsApp table booking."
        image={images.techno}
      />
      <Section className="pt-10 md:pt-14">
        <div className="sticky top-16 z-30 -mx-5 flex flex-col gap-3 border-b border-border bg-background/85 px-5 py-4 backdrop-blur-xl md:top-20 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {(
              [
                ["all", "All"],
                ["dubai", "Dubai"],
                ["abu-dhabi", "Abu Dhabi"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setCity(k)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  city === k
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-full border border-border px-4 py-2 md:w-72">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search venue, vibe, area"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search venues by name, vibe, or area"
            />
          </label>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v, i) => (
            <VenueCard key={v.slug} venue={v} index={i} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            No venues match your search query. Message our concierge on WhatsApp for tailored
            suggestions.
          </p>
        )}
      </Section>
      <CtaBand
        title={
          <>
            Can't decide? <span className="text-gold">Let us help.</span>
          </>
        }
        message="Hi Dubai VIP Booking, I'd like a personalized venue recommendation."
      />
    </>
  );
}
