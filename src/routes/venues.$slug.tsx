import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Calendar, Music, Shirt, Users } from "lucide-react";
import { getVenue, venues } from "@/lib/venues";
import { PageHero, Reveal, Section, VenueCard, WhatsAppButton } from "@/components/site";

export const Route = createFileRoute("/venues/$slug")({
  loader: ({ params }) => {
    const venue = getVenue(params.slug);
    if (!venue) throw notFound();
    return { venue };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.venue;
    const title = v ? `${v.name} ${v.area} — VIP Tables | Dubai VIP Booking` : "Venue — Dubai VIP Booking";
    const desc = v ? `${v.tagline}. Book VIP tables and guestlist at ${v.name} via WhatsApp.` : "Venue details";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => (
    <Section className="pt-40 text-center"><h1 className="display-lg">Venue not found</h1><Link to="/venues" className="mt-6 inline-block text-primary">Back to venues</Link></Section>
  ),
  component: VenueDetail,
});

function VenueDetail() {
  const { venue: v } = Route.useLoaderData();
  const others = venues.filter((x) => x.city === v.city && x.slug !== v.slug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={`${v.type} · ${v.area}`} title={v.name} sub={v.tagline} image={v.image} />
      <Section className="grid gap-14 pt-12 md:grid-cols-[1.4fr_1fr] md:pt-16">
        <div>
          <Reveal><p className="text-2xl leading-relaxed text-foreground/85 md:text-3xl">{v.description}</p></Reveal>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
            {[[Calendar, "Open", v.nights.join(" · ")], [Music, "Sound", v.music], [Shirt, "Dress code", v.dress], [Users, "Min. spend", `${v.minSpend} · ${v.capacity}`]].map(([I, l, val]) => {
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
          <Reveal className="mt-16">
            <p className="eyebrow">Table options</p>
            <h2 className="display-lg mt-3">Pick your position.</h2>
            <div className="mt-8 grid gap-4">
              {v.tables.map((t, i) => (
                <div key={t.name} className="group flex flex-col justify-between gap-4 rounded-sm border border-border p-6 transition-all duration-500 hover:border-primary hover:bg-card sm:flex-row sm:items-center">
                  <div className="flex items-center gap-5">
                    <span className="font-display text-4xl font-extrabold text-foreground/20 transition-colors group-hover:text-primary">0{i + 1}</span>
                    <div><p className="text-xl font-bold">{t.name}</p><p className="text-sm text-muted-foreground">{t.guests} · min. {t.spend}</p></div>
                  </div>
                  <WhatsAppButton size="sm" message={`Hi Dubai VIP Booking, I'd like the ${t.name} at ${v.name}.`}>Enquire</WhatsAppButton>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <aside className="md:sticky md:top-28 md:self-start">
          <div className="rounded-sm border border-border bg-card p-6 md:p-8">
            <p className="eyebrow">Book {v.name} <span className="ml-2 rounded-full border border-primary/40 px-2 py-0.5 text-[9px]">Demo venue</span></p>
            <p className="mt-3 font-display text-3xl font-bold">Reserve in one message</p>
            <p className="mt-3 text-sm text-muted-foreground">Tell us your date, group size and vibe. A concierge replies within minutes.</p>
            <div className="mt-6 space-y-3 text-sm">
              {["Date", "Guests", "Table preference"].map((f) => <div key={f} className="flex justify-between border-b border-border pb-3"><span className="text-muted-foreground">{f}</span><span>—</span></div>)}
            </div>
            <WhatsAppButton size="lg" className="mt-6 w-full" message={`Hi Dubai VIP Booking, I'd like to book ${v.name}.`} />
            <Link to="/guestlist" className="mt-3 block text-center text-sm text-primary hover:underline">Or join the guestlist</Link>
          </div>
        </aside>
      </Section>
      {others.length > 0 && (
        <Section className="pt-0 md:pt-0">
          <h2 className="display-lg">Also tonight.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{others.map((o, i) => <VenueCard key={o.slug} venue={o} index={i} />)}</div>
        </Section>
      )}
    </>
  );
}
