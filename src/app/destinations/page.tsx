import type { Metadata } from "next";
import { destinations } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { DestinationCard } from "@/components/site/DestinationCard";

export const metadata: Metadata = {
  title: "Destinations | Seagull Holidays",
  description: "Explore Lakshadweep and Kerala destinations curated by Seagull Holidays.",
};

export default function DestinationsPage() {
  return (
    <div>
      <PageHero title="Destinations" subtitle="Explore Lakshadweep and Kerala's most scenic holiday spots." />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {destinations.map((dest) => (
          <DestinationCard key={dest.slug} dest={dest} />
        ))}
      </div>
    </div>
  );
}
