import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Calendar, Music, Shirt, Users, MapPin, ExternalLink } from "lucide-react";
import { getVenue, venues } from "@/lib/venues";
import { PageHero, Reveal, Section, VenueCard, WhatsAppButton } from "@/components/site";
import { BookingForm } from "@/components/booking-form";
import { createSeoMeta, buildBreadcrumbSchema, buildVenueSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const Route = createFileRoute("/venues/$slug")({
  loader: ({ params }) => {
    const venue = getVenue(params.slug);
    if (!venue) throw notFound();
    return { venue };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.venue;
    const title = v
      ? `${v.name} ${v.area} — VIP Tables & Reservations | Dubai VIP Booking`
      : "Venue — Dubai VIP Booking";
    const desc = v
      ? `${v.tagline}. Verified opening hours, dress code, and WhatsApp VIP table bookings for ${v.name} in ${v.area}, ${v.city === "dubai" ? "Dubai" : "Abu Dhabi"}.`
      : "Venue details";
    const path = v ? `/venues/${v.slug}` : "/venues";
    const ogImage = v?.image;
    return createSeoMeta({ title, description: desc, path, ogImage });
  },
  notFoundComponent: () => (
    <Section className="pt-40 text-center">
      <h1 className="display-lg">Venue not found</h1>
      <p className="mt-4 text-muted-foreground">
        The venue you are looking for is currently unavailable or inactive.
      </p>
      <Link
        to="/venues"
        className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Back to all venues
      </Link>
    </Section>
  ),
  component: VenueDetail,
});

function VenueDetail() {
  const { venue: v } = Route.useLoaderData();
  const others = venues.filter((x) => x.city === v.city && x.slug !== v.slug).slice(0, 3);

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Venues", path: "/venues" },
    {
      name: v.city === "dubai" ? "Dubai" : "Abu Dhabi",
      path: v.city === "dubai" ? "/dubai" : "/abu-dhabi",
    },
    { name: v.name, path: `/venues/${v.slug}` },
  ]);

  const venueSchema = buildVenueSchema(v);

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      <JsonLd schema={venueSchema} />

      <PageHero eyebrow={`${v.type} · ${v.area}`} title={v.name} sub={v.tagline} image={v.image} />
      <Section className="grid gap-14 pt-12 md:grid-cols-[1.4fr_1fr] md:pt-16">
        <div>
          <Reveal>
            <p className="text-2xl leading-relaxed text-foreground/85 md:text-3xl">
              {v.description}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
            {[
              [Calendar, "Open", v.nights.join(" · ")],
              [Music, "Sound", v.music],
              [Shirt, "Dress code", v.dress],
              [Users, "Min. spend", v.capacity ? `${v.minSpend} · ${v.capacity}` : v.minSpend],
            ].map(([I, l, val]) => {
              const Icon = I as typeof Calendar;
              return (
                <div key={l as string} className="bg-background p-6">
                  <Icon className="size-5 text-primary" />
                  <p className="eyebrow mt-4">{l as string}</p>
                  <p className="mt-1 font-semibold">{val as string}</p>
                </div>
              );
            })}
          </div>

          {v.address && (
            <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-primary mt-0.5" />
              <div>
                <span className="font-semibold text-foreground/85">Address: </span>
                {v.googleMapsUrl ? (
                  <a
                    href={v.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-primary underline"
                  >
                    <span>{v.address}</span>
                    <ExternalLink className="size-3" />
                  </a>
                ) : (
                  <span>{v.address}</span>
                )}
              </div>
            </div>
          )}

          <Reveal className="mt-16">
            <p className="eyebrow">Table options</p>
            <h2 className="display-lg mt-3">Pick your position.</h2>
            <div className="mt-8 grid gap-4">
              {v.tables.map((t, i) => (
                <div
                  key={t.name}
                  className="group flex flex-col justify-between gap-4 rounded-sm border border-border p-6 transition-all duration-500 hover:border-primary hover:bg-card sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-display text-4xl font-extrabold text-foreground/20 transition-colors group-hover:text-primary">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-xl font-bold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.guests ? `${t.guests} · ` : ""}
                        {t.spend.startsWith("AED") ? `min. ${t.spend}` : t.spend}
                      </p>
                    </div>
                  </div>
                  <WhatsAppButton
                    size="sm"
                    message={`Hi Dubai VIP Booking, I'd like to enquire about the ${t.name} at ${v.name}.`}
                  >
                    Enquire Table
                  </WhatsAppButton>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 rounded-sm border border-border bg-card/60 p-6 text-xs text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground">Venue Policy & Reservation Notice:</p>
            <p className="mt-1">
              Table positions and minimum spends are determined by venue management based on the
              night, headlining performers, and capacity. Admission is strictly 21+ with original
              identification. Final spend is settled directly with the venue operator.
            </p>
          </div>
        </div>

        <aside className="md:sticky md:top-28 md:self-start">
          <BookingForm
            initialCity={v.city}
            initialVenue={v.name}
            initialBudget="Standard Table (Spend on enquiry)"
            title={`Reserve ${v.name}`}
            subtitle="Coordinate your table request with our concierge on WhatsApp."
            compact
          />
          <div className="mt-4 text-center">
            <Link to="/guestlist" className="text-xs text-primary hover:underline font-semibold">
              Or request complimentary guestlist access →
            </Link>
          </div>
        </aside>
      </Section>

      {others.length > 0 && (
        <Section className="pt-0 md:pt-0">
          <h2 className="display-lg">Also in {v.city === "dubai" ? "Dubai" : "Abu Dhabi"}.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <VenueCard key={o.slug} venue={o} index={i} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
