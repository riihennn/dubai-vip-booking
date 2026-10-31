import { Link } from "@tanstack/react-router";
import { byCity, type City } from "@/lib/venues";
import { CtaBand, PageHero, Reveal, Section, VenueCard } from "@/components/site";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CityPage({
  city,
  title,
  sub,
  image,
  districts,
}: {
  city: City;
  title: string;
  sub: string;
  image: string;
  districts: string[];
}) {
  const list = byCity(city);
  const types = ["All", ...Array.from(new Set(list.map((v) => v.type)))];
  const [t, setT] = useState("All");
  const shown = t === "All" ? list : list.filter((v) => v.type === t);
  return (
    <>
      <PageHero eyebrow="City guide" title={title} sub={sub} image={image} />
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-5 md:px-8">
        <Link
          to="/dubai"
          className="rounded-full border border-border px-5 py-2 text-sm"
          activeProps={{ className: "bg-primary text-primary-foreground border-primary" }}
        >
          Dubai
        </Link>
        <Link
          to="/abu-dhabi"
          className="rounded-full border border-border px-5 py-2 text-sm"
          activeProps={{ className: "bg-primary text-primary-foreground border-primary" }}
        >
          Abu Dhabi
        </Link>
      </div>
      <Section className="pt-12 md:pt-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Districts</p>
            <p className="mt-3 max-w-xl text-2xl text-foreground/80">{districts.join(" — ")}</p>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {types.map((x) => (
              <button
                key={x}
                onClick={() => setT(x)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-colors",
                  t === x
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary",
                )}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((v, i) => (
            <VenueCard key={v.slug} venue={v} index={i} />
          ))}
        </div>
      </Section>
      <CtaBand
        title={
          <>
            Your table in {title === "Dubai" ? "Dubai" : "Abu Dhabi"},{" "}
            <span className="text-gold">arranged on WhatsApp.</span>
          </>
        }
        message={`Hi Dubai VIP Booking, I'd like to enquire about table bookings in ${title}.`}
      />
    </>
  );
}
