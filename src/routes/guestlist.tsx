import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { images, venues, waLink } from "@/lib/venues";
import { PageHero, Reveal, Section, meta } from "@/components/site";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/guestlist")({
  head: () => meta("Join the Guestlist — Dubai VIP Booking Dubai", "Free guestlist access to Dubai and Abu Dhabi's top clubs. Pick your venue and night, confirm on WhatsApp."),
  component: Guestlist,
});

const field = "w-full border-b border-border bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function Guestlist() {
  const [f, setF] = useState({ name: "", venue: venues[0]?.name ?? "", date: "", guests: "2", ladies: "1" });
  const nights = ["Thu", "Fri", "Sat"];
  const [night, setNight] = useState("Fri");
  const msg = `Guestlist request\nName: ${f.name}\nVenue: ${f.venue}\nNight: ${f.date || night}\nGuests: ${f.guests} (ladies: ${f.ladies})`;
  return (
    <>
      <PageHero eyebrow="Complimentary access" title={<>On the list. <span className="text-gold">Past the line.</span></>} sub="Free entry for mixed groups at selected venues. Fill in the details — we'll confirm on WhatsApp." image={images.hero} />
      <Section className="grid gap-16 pt-12 md:grid-cols-2 md:pt-16">
        <Reveal>
          <p className="eyebrow">How guestlist works</p>
          <ol className="mt-6 space-y-8">
            {["Choose a venue and night", "Send your request on WhatsApp", "Receive your name on the door"].map((s, i) => (
              <li key={s} className="flex gap-6"><span className="font-display text-5xl font-extrabold text-primary">0{i + 1}</span><span className="pt-3 text-xl">{s}</span></li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-muted-foreground">Entry subject to venue discretion and capacity. 21+ with valid ID.</p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-sm border border-border bg-card p-6 md:p-10">
          <form onSubmit={(e) => { e.preventDefault(); window.open(waLink(msg), "_blank"); }} className="space-y-6">
            <input className={field} placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required />
            <select className={cn(field, "bg-card")} value={f.venue} onChange={(e) => setF({ ...f, venue: e.target.value })}>
              {venues.map((v) => <option key={v.slug}>{v.name}</option>)}
            </select>
            <div>
              <p className="eyebrow mb-3">Night</p>
              <div className="flex gap-2">
                {nights.map((n) => <button type="button" key={n} onClick={() => setNight(n)} className={cn("flex-1 rounded-full border py-3 text-sm transition-colors", night === n ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>{n}</button>)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <input className={field} type="number" min={1} placeholder="Guests" value={f.guests} onChange={(e) => setF({ ...f, guests: e.target.value })} />
              <input className={field} type="number" min={0} placeholder="Ladies" value={f.ladies} onChange={(e) => setF({ ...f, ladies: e.target.value })} />
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-4 font-semibold text-whatsapp-foreground transition-all hover:-translate-y-0.5 hover:shadow-glow">
              <MessageCircle className="size-4" /> Send request on WhatsApp
            </button>
          </form>
        </Reveal>
      </Section>
    </>
  );
}
