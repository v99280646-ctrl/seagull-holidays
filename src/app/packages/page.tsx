import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { PackagesGridClient } from "@/components/site/PackagesGridClient";

export const metadata: Metadata = {
  title: "Holiday Packages | Seagull Holidays",
  description: "Browse customized Lakshadweep and Kerala tour packages with Seagull Holidays.",
};

export default async function PackagesPage() {
  return (
    <div>
      <PageHero title="Holiday Packages" subtitle="Handcrafted island itineraries for every kind of traveller." />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PackagesGridClient />
      </div>
    </div>
  );
}
