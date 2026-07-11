import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { destinations, resorts, site, images } from "@/data/site";
import { ResortCard } from "@/components/site/ResortCard";
import { DestinationCard } from "@/components/site/DestinationCard";
import { ReelsMarquee } from "@/components/site/ReelsMarquee";
import { ServiceMarquee } from "@/components/site/ServiceMarquee";
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
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden text-ocean-foreground">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${imageSrc(images.hero)})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/55 to-slate-900/25" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex max-w-2xl flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ocean-foreground/75">Seagull Holidays</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight drop-shadow-sm sm:text-5xl lg:text-6xl">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ReelsMarquee />
      </section>

      <SectionTitle
        title="Holiday Packages"
        link="/packages"
        cta="View all"
        subtitle="Our most-loved packages, curated for beach lovers, honeymooners and adventurers."
      />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <PackagesGridClient limit={3} />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ServiceMarquee />
      </section>

      <SectionTitle
        title="Featured resorts"
        link="/resorts"
        cta="Browse resorts"
        subtitle="From private atolls to Kerala's backwaters, find your perfect escape."
      />
      <Grid>
        {resorts.slice(0, 3).map((resort) => (
          <ResortCard key={resort.slug} resort={resort} />
        ))}
      </Grid>

      <SectionTitle title="Destinations" link="/destinations" cta="Explore" subtitle="Choose your next island or backwater adventure." />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {destinations.slice(0, 6).map((dest) => (
          <DestinationCard key={dest.slug} dest={dest} />
        ))}
      </div>

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
