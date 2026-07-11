import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plane, Hotel, Map, Headset, ArrowRight } from "lucide-react";
import { images, packages, activities, site, inr } from "@/data/site";
import { PackageCard } from "@/components/site/PackageCard";
import { DestinationCard } from "@/components/site/DestinationCard";
import { ReelsMarquee } from "@/components/site/ReelsMarquee";
import { Button } from "@/components/ui/button";
import { getDestinationCards } from "@/lib/destinations-api";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  { icon: Map, title: "Custom Packages", text: "Tailor-made island itineraries" },
  { icon: Plane, title: "Flight Booking", text: "Best fares to your getaway" },
  { icon: Hotel, title: "Hotels & Resorts", text: "Handpicked beachfront stays" },
  { icon: Headset, title: "24/7 Support", text: "Expert guidance, always" },
];

function Home() {
  const { data: destinationCards = [] } = useQuery({
    queryKey: ["destinationCards"],
    queryFn: getDestinationCards,
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images.hero})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/55 to-slate-900/25" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-primary-foreground drop-shadow sm:text-5xl lg:text-6xl">
              Discover the untouched islands of Lakshadweep
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/90">
              Customized holiday packages, island resorts and unforgettable tours — crafted personally by Seagull Holidays to make every journey memorable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="xl" variant="coral">
                <Link to="/packages">Explore Packages <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="xl" variant="hero" className="bg-background/15 text-primary-foreground ring-1 ring-white/30 backdrop-blur-sm hover:bg-background/25">
                <Link to="/destinations">View Destinations</Link>
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-ocean text-ocean-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular packages */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Holiday Packages"
          title="Popular island getaways"
          subtitle="Our most-loved packages, curated for beach lovers, honeymooners and adventurers."
          to="/packages"
          linkLabel="All packages"
        />
        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 3).map((p) => <PackageCard key={p.slug} pkg={p} />)}
        </div>
      </section>

      {/* Top destinations */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Destinations"
          title="Top destinations to explore"
          subtitle="From private atolls to Kerala's backwaters — find your perfect escape."
          to="/destinations"
          linkLabel="All destinations"
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-4 grid-cols-2">
            {destinationCards.slice(0, 4).map((d) => <DestinationCard key={d.slug} dest={d} />)}
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Travel beyond borders</p>
            <div className="mt-5 space-y-5">
              <div className="space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Explore the world's most breathtaking destinations with Seagull Holidays. From the crystal-clear lagoons of Lakshadweep and the luxury resorts of the Maldives to the vibrant cityscapes of Singapore, the cultural charm of Malaysia, the tropical beaches of Thailand, the iconic attractions of Dubai, the serene beauty of Bali, and the rich heritage of Vietnam, we offer carefully crafted holiday experiences for every traveler.
              </p>
              <p>
                Whether you're planning a romantic honeymoon, a family vacation, an adventure-filled escape, or a relaxing beach holiday, our customized travel packages ensure a seamless and memorable journey. With expert planning, trusted accommodations, and personalized service, Seagull Holidays turns your dream destination into an unforgettable reality.
              </p>
              </div>
              <ul className="grid gap-3 text-base font-medium text-foreground sm:grid-cols-2">
                <li>🌍 Domestic & International</li>
                <li>💑 Honeymoon & Romantic</li>
                <li>🏝️ Handpicked Holidays</li>
                <li>✈️ Flight & Hotel Bookings</li>
                <li>🛂 Visa Assistance</li>
                <li>🎒 Customized Travel Packages</li>
                <li>👨‍👩‍👧‍👦 Family & Group Packages</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reels & moments */}
      <section className="bg-secondary/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Reels & Moments" title="Moments from our travellers" subtitle="Real snapshots from island journeys — scrolling on autopilot." />
        </div>
        <div className="mt-8">
          <ReelsMarquee />
        </div>
      </section>

      {/* Popular activities */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Experiences" title="Popular activities" subtitle="Dive, paddle and cruise your way through paradise." />
        <div className="mt-8 grid gap-5 grid-cols-2">
          {activities.map((a) => (
            <figure key={a.title} className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft">
              <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                <h3 className="text-lg font-bold">{a.title}</h3>
                <p className="text-sm text-primary-foreground/85">{a.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* About / CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-ocean px-6 py-12 text-center text-ocean-foreground shadow-glow sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">Ready to plan your dream island holiday?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ocean-foreground/90">{site.about}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="xl" variant="coral"><Link to="/contact">Talk to an Expert</Link></Button>
            <Button asChild size="xl" variant="hero" className="bg-background/15 ring-1 ring-white/30 hover:bg-background/25"><Link to="/packages">Browse Packages</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  to,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  to?: "/packages" | "/destinations" | "/resorts";
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</span>
        <h2 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted-foreground max-sm:hidden">{subtitle}</p>}
      </div>
      {to && linkLabel && (
        <Link to={to} className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
          {linkLabel} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
