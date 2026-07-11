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
      <section className="relative isolate flex min-h-[72vh] items-center overflow-hidden text-ocean-foreground sm:min-h-[88vh]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${imageSrc(images.hero)})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/55 to-slate-900/25" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="flex max-w-2xl flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ocean-foreground/75 sm:text-sm sm:tracking-[0.3em]">Seagull Holidays</p>
            <h1 className="mt-3 max-w-2xl text-[2rem] font-extrabold leading-tight drop-shadow-sm sm:mt-4 sm:text-5xl lg:text-6xl">
              Curated island holidays with seamless planning and premium stays.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ocean-foreground/85 sm:mt-4 sm:text-lg sm:leading-7">
              Customized Lakshadweep and Kerala packages, trusted resort bookings, and personalized travel support for every journey.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
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

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <ReelsMarquee />
      </section>

      <SectionTitle
        title="Holiday Packages"
        link="/packages"
        cta="View all"
        subtitle="Our most-loved packages, curated for beach lovers, honeymooners and adventurers."
      />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <PackagesGridClient limit={3} />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
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
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-6 lg:grid-cols-3 lg:px-8">
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
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1.5 max-w-3xl text-xs leading-5 text-muted-foreground sm:mt-2 sm:text-base">{subtitle}</p>}
        </div>
        <Link href={link} className="hidden items-center gap-1 text-sm font-semibold text-primary md:inline-flex">
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-3 lg:px-8">{children}</div>;
}
