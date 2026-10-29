import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { waLink, type Venue } from "@/lib/venues";
import { ThemeToggle } from "./theme-toggle";

const mainNav = [
  { to: "/dubai", label: "Dubai" },
  { to: "/abu-dhabi", label: "Abu Dhabi" },
  { to: "/venues", label: "Venues" },
  { to: "/guestlist", label: "Guestlist" },
] as const;

const footerNav = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/partner", label: "Partner" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2">
      <span className="relative grid size-7 place-items-center rounded-full border border-primary">
        <span className="size-2 rounded-full bg-primary transition-transform duration-500 group-hover:scale-150" />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">DUBAI VIP<span className="ml-1 font-sans text-[10px] font-semibold tracking-[0.3em] text-primary">BOOKING</span></span>
    </Link>
  );
}

export function WhatsAppButton({
  message,
  children = "Book on WhatsApp",
  className,
  size = "md",
}: { message?: string | undefined; children?: ReactNode; className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <a
      href={waLink(message ?? "Hi Dubai VIP Booking, I'd like to book a night out.")}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-whatsapp-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        className,
      )}
    >
      <MessageCircle className="size-4" />
      {children}
    </a>
  );
}

export function GhostLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary",
        className
      )}
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl shadow-xs text-foreground"
          : "bg-transparent text-white",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {mainNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled
                  ? "text-foreground/75 hover:text-foreground"
                  : "text-white/85 hover:text-white"
              )}
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <WhatsAppButton size="sm" className="hidden sm:inline-flex">
            Book
          </WhatsAppButton>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle compact />
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "grid size-9 place-items-center rounded-full border transition-colors",
                scrolled
                  ? "border-border bg-card/60 text-foreground"
                  : "border-white/30 bg-black/40 text-white"
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-5 py-8 lg:hidden"
          >
            <div className="space-y-1">
              {mainNav.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link to={n.to} className="block py-3 font-display text-4xl font-bold" activeProps={{ className: "text-primary" }}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="my-6 border-t border-border pt-6">
              <p className="eyebrow mb-3 text-muted-foreground">Information</p>
              <div className="grid grid-cols-2 gap-3">
                {footerNav.map((n) => (
                  <Link key={n.to} to={n.to} className="py-2 text-base text-foreground/75 hover:text-primary" activeProps={{ className: "text-primary font-semibold" }}>
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <span className="text-sm font-semibold text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <WhatsAppButton size="lg" className="mt-6 w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <p className="display-lg max-w-4xl">
          The night is <span className="text-gold">already waiting.</span>
        </p>
        <div className="mt-10">
          <WhatsAppButton size="lg">Message the concierge</WhatsAppButton>
        </div>
        <div className="mt-16 grid gap-10 border-t border-border pt-10 text-sm md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-muted-foreground">Your Night. Your City. Premium nightlife across Dubai & Abu Dhabi.</p>
          </div>
          {[
            ["Cities", [["/dubai", "Dubai"], ["/abu-dhabi", "Abu Dhabi"], ["/venues", "All venues"]]],
            ["Book", [["/guestlist", "Guestlist"], ["/how-it-works", "How it works"], ["/faq", "FAQ"]]],
            ["Company", [["/partner", "Partner with us"], ["/contact", "Contact"]]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <p className="eyebrow mb-4">{title as string}</p>
              <ul className="space-y-2">
                {(links as [string, string][]).map(([to, l]) => (
                  <li key={to}>
                    <Link to={to} className="text-foreground/70 hover:text-primary">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 rounded-sm border border-primary/30 bg-primary/5 p-4 text-xs text-foreground/70"><span className="eyebrow mr-2">Demo data</span>All venues, prices, contact details and figures on this site are fictional placeholders. The WhatsApp number +971 50 000 0000 is not active.</p>
        <p className="mt-6 text-xs text-muted-foreground">© 2026 Dubai VIP Booking · dubaivipbooking.com. 21+ only. Please drink responsibly.</p>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hi Dubai VIP Booking, I'd like to book a night out.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-glow transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-30" />
      <MessageCircle className="relative size-6" />
    </a>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, sub, image }: { eyebrow: string; title: ReactNode; sub?: string; image?: string }) {
  return (
    <section className={cn("grain relative flex min-h-[70vh] items-end overflow-hidden pb-16 pt-32", image && "text-white")}>
      {image && (
        <motion.img
          src={image}
          alt=""
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 size-full object-cover"
        />
      )}
      {image && <div className="absolute inset-0 bg-fade" />}
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="eyebrow text-primary">
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn("display-xl mt-4", image ? "text-white" : "text-foreground")}
        >
          {title}
        </motion.h1>
        {sub && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className={cn("mt-6 max-w-xl text-lg", image ? "text-white/80" : "text-foreground/75")}>
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function VenueCard({ venue, index = 0, tall = false }: { venue: Venue; index?: number; tall?: boolean }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link
        to="/venues/$slug"
        params={{ slug: venue.slug }}
        className={cn(
          "group relative block overflow-hidden rounded-sm bg-card border border-border transition-all duration-300 hover:shadow-xl [html.light_&]:shadow-sm",
          tall ? "aspect-[3/4.4]" : "aspect-[4/5]"
        )}
      >
        <img
          src={venue.image}
          alt={venue.name}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur font-semibold">
            {venue.type}
          </span>
          <span className="rounded-full bg-primary px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-primary-foreground shadow-xs">Demo</span>
        </div>
        <div className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="eyebrow text-primary">{venue.area}</p>
          <h3 className="mt-2 text-3xl font-bold md:text-4xl text-white">{venue.name}</h3>
          <p className="mt-1 text-sm text-white/80">{venue.tagline}</p>
          <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4 text-xs text-white/80">
                <span>{venue.nights.join(" · ")} · {venue.capacity}</span>
                <span className="text-primary font-semibold">From {venue.minSpend}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export { ThemeToggle };

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-ink py-5">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-bold uppercase text-foreground/80 md:text-4xl">
            {t}
            <span className="size-2 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32", className)}>{children}</section>;
}

export function CtaBand({ title, message }: { title: ReactNode; message?: string }) {
  return (
    <Section>
      <Reveal className="relative overflow-hidden rounded-sm border border-border bg-card p-8 md:p-16">
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-gold opacity-20 blur-3xl" />
        <p className="eyebrow">Concierge · Daily 6 PM – 2 AM</p>
        <h2 className="display-lg relative mt-4 max-w-3xl">{title}</h2>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <WhatsAppButton size="lg" message={message} />
          <GhostLink to="/venues">Explore venues</GhostLink>
        </div>
      </Reveal>
    </Section>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
