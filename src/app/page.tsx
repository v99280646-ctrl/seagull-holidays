import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { destinations, resorts, site, images } from "@/data/site";
import { ResortCard } from "@/components/site/ResortCard";
import { DestinationCard } from "@/components/site/DestinationCard";
import { ReelsMarquee } from "@/components/site/ReelsMarquee";
import { PackagesGridClient } from "@/components/site/PackagesGridClient";
import { imageSrc } from "@/lib/media";

export const metadata: Metadata = {
  title: "Seagull Holidays | Lakshadweep & Kerala Travel Experts",
  description:
    "Explore handpicked holiday packages, resorts, destinations and curated island experiences with Seagull Holidays.",
};

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-hero py-16 text-ocean-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ocean-foreground/75">Seagull Holidays</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Curated island holidays with seamless planning and premium stays.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ocean-foreground/85 sm:text-lg">
              Customized Lakshadweep and Kerala packages, trusted resort bookings, and personalized travel support for every journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/packages" className="inline-flex items-center justify-center rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-background/90">
                Explore Packages
              </Link>
              <a href={`tel:${site.phones[1].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-ocean-foreground/30 px-5 py-3 text-sm font-semibold text-ocean-foreground transition-colors hover:bg-ocean-foreground/10">
                <Phone className="h-4 w-4" />
                {site.phones[1]}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-card sm:row-span-2">
              <img src={imageSrc(images.hero)} alt="Seagull Holidays hero" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-3xl bg-card p-6 text-foreground shadow-card">
              <p className="text-sm font-semibold text-primary">Why choose us</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Domestic & international tours</li>
                <li>Honeymoon & romantic getaways</li>
                <li>Handpicked holidays and resort stays</li>
                <li>Flight & hotel bookings</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-card p-6 text-foreground shadow-card">
              <p className="text-sm font-semibold text-primary">Trusted support</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Visa assistance, custom packages, family trips and round-the-clock guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionTitle
        title="Holiday Packages"
        link="/packages"
        cta="View all"
        subtitle="Our most-loved packages, curated for beach lovers, honeymooners and adventurers."
      />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <PackagesGridClient limit={6} />
      </div>

      <SectionTitle
        title="Featured resorts"
        link="/resorts"
        cta="Browse resorts"
        subtitle="From private atolls to Kerala's backwaters, find your perfect escape."
      />
      <Grid>
        {resorts.slice(0, 6).map((resort) => (
          <ResortCard key={resort.slug} resort={resort} />
        ))}
      </Grid>

      <SectionTitle title="Destinations" link="/destinations" cta="Explore" subtitle="Choose your next island or backwater adventure." />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {destinations.slice(0, 6).map((dest) => (
          <DestinationCard key={dest.slug} dest={dest} />
        ))}
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Reels & Moments</h2>
            <p className="mt-2 text-sm text-muted-foreground">Real snapshots from island journeys — scrolling on autopilot.</p>
          </div>
        </div>
        <ReelsMarquee />
      </section>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
  link,
  cta,
}: {
  title: string;
  subtitle?: string;
  link: "/packages" | "/resorts" | "/destinations";
  cta: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
        </div>
        <Link href={link} className="hidden items-center gap-1 text-sm font-semibold text-primary md:inline-flex">
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">{children}</div>;
}
