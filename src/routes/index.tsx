import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Crown, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { images, venues } from "@/lib/venues";
import {
  CtaBand,
  GhostLink,
  Marquee,
  Reveal,
  Section,
  VenueCard,
  WhatsAppButton,
} from "@/components/site";
import { createSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    createSeoMeta({
      title: "Dubai VIP Booking — Dubai & Abu Dhabi VIP Nightlife Concierge",
      description:
        "Private nightlife concierge for Dubai and Abu Dhabi. Reserve VIP tables, beach club cabanas, and guestlists at premier venues via official WhatsApp.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <section
        ref={ref}
        className="grain relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-28 text-white"
      >
        <motion.img
          src={images.hero}
          alt="Dubai luxury nightlife venue"
          style={{ y }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 size-full object-cover"
          width={1920}
          height={1088}
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-fade" />
        <motion.div
          style={{ opacity: o }}
          className="relative mx-auto w-full max-w-7xl px-5 md:px-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="eyebrow text-primary"
          >
            Dubai · Abu Dhabi · After dark
          </motion.p>
          <h1 className="display-xl mt-5">
            {["Your Night.", "Your City."].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 1 ? "block text-gold" : "block text-white"}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-lg text-white/80">
              Discover premium nightlife venues, VIP table experiences, and guestlist access across
              Dubai and Abu Dhabi.
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton size="lg">Book a table</WhatsAppButton>
              <GhostLink
                to="/guestlist"
                className="border-white/30 text-white hover:border-primary hover:text-primary"
              >
                Join guestlist
              </GhostLink>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Marquee
        items={[
          "VIP Tables",
          "Guestlists",
          "Beach Clubs",
          "Rooftops",
          "Supper Clubs",
          "Yacht Nights",
          "Birthdays",
        ]}
      />

      {/* City selection */}
      <Section>
        <Reveal>
          <p className="eyebrow">Choose your city</p>
          <h2 className="display-lg mt-4">
            Two cities. <span className="text-foreground/40">One booking.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            {
              to: "/dubai",
              name: "Dubai",
              img: images.rooftop,
              n: venues.filter((v) => v.city === "dubai").length,
            },
            {
              to: "/abu-dhabi",
              name: "Abu Dhabi",
              img: images.abudhabi,
              n: venues.filter((v) => v.city === "abu-dhabi").length,
            },
          ].map((c, i) => (
            <Reveal key={c.to} delay={i * 0.1}>
              <Link
                to={c.to}
                className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-border shadow-sm transition-all duration-300 hover:shadow-xl md:aspect-[5/6]"
              >
                <img
                  src={c.img}
                  alt={`${c.name} VIP nightlife guide`}
                  width={1000}
                  height={1200}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-10">
                  <div>
                    <p className="eyebrow text-primary">{c.n} curated venues</p>
                    <h3 className="mt-2 font-display text-5xl font-extrabold text-white md:text-7xl">
                      {c.name}
                    </h3>
                  </div>
                  <span className="grid size-14 place-items-center rounded-full border border-white/40 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-black">
                    <ArrowUpRight />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Venues grid */}
      <Section className="pt-0 md:pt-0">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">Tonight's edit</p>
            <h2 className="display-lg mt-4">Where to be.</h2>
          </Reveal>
          <Link to="/venues" className="hidden text-sm text-primary hover:underline md:block">
            All venues →
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {venues.slice(0, 6).map((v, i) => (
            <div key={v.slug} className={i % 3 === 1 ? "lg:translate-y-12" : ""}>
              <VenueCard venue={v} index={i} />
            </div>
          ))}
        </div>
      </Section>

      {/* VIP showcase */}
      <section className="relative overflow-hidden bg-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-32">
          <Reveal className="relative">
            <img
              src={images.vip}
              alt="VIP table service"
              width={1000}
              height={1250}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
            <div className="absolute -bottom-6 -right-2 rounded-sm border border-border bg-card/90 p-5 backdrop-blur md:-right-8">
              <p className="eyebrow">VIP Bottle Service</p>
              <p className="mt-1 font-display text-2xl font-bold">Prime Positions</p>
              <p className="text-xs text-muted-foreground">
                Verified table placement · Direct venue coordination
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">VIP tables</p>
            <h2 className="display-lg mt-4">
              The table <span className="text-gold">is the show.</span>
            </h2>
            <p className="mt-6 max-w-md text-foreground/70">
              Bottle service, elevated booths, and prime views across the room. We coordinate table
              placement and confirmed minimum spends directly with venue teams based on real-time
              availability.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {[
                ["Standard Table", "Main room & dance floor", "Spend on enquiry"],
                ["Premium Booth", "Elevated & DJ-side", "Spend on enquiry"],
                ["Signature VIP", "Centre-stage & prime position", "Spend on enquiry"],
              ].map(([n, g, p]) => (
                <li
                  key={n}
                  className="group flex items-center justify-between py-5 transition-colors hover:text-primary"
                >
                  <span className="font-display text-xl font-bold md:text-2xl">{n}</span>
                  <span className="text-sm text-muted-foreground">
                    {g} · <span className="text-primary font-semibold">{p}</span>
                  </span>
                </li>
              ))}
            </ul>
            <WhatsAppButton
              size="lg"
              className="mt-8"
              message="Hi Dubai VIP Booking, I'd like to reserve a VIP table."
            >
              Reserve a VIP table
            </WhatsAppButton>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <Section>
        <Reveal>
          <p className="eyebrow">Why Dubai VIP Booking</p>
          <h2 className="display-lg mt-4 max-w-3xl">
            Skip the guesswork. <span className="text-foreground/40">Enjoy the night.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              Crown,
              "Prime Placement",
              "We coordinate table positions, minimum spends, and floor arrangements directly with venue teams.",
            ],
            [
              Clock,
              "Fast WhatsApp Concierge",
              "Reach our concierge directly on WhatsApp, daily 6 PM – 2 AM GST.",
            ],
            [
              ShieldCheck,
              "Direct Venue Payment",
              "Final table spend is settled directly with the venue operator on the night of your visit.",
            ],
            [
              Sparkles,
              "Bespoke Requests",
              "Birthdays, special celebrations, transport, and custom group arrangements.",
            ],
          ].map(([Icon, t, d], i) => {
            const I = Icon as typeof Crown;
            return (
              <Reveal
                key={t as string}
                delay={i * 0.06}
                className="group bg-background p-8 transition-colors hover:bg-card"
              >
                <I className="size-6 text-primary transition-transform group-hover:scale-125" />
                <h3 className="mt-6 text-xl font-bold">{t as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand
        title={
          <>
            One message. <span className="text-gold">The whole night.</span>
          </>
        }
      />
    </>
  );
}
