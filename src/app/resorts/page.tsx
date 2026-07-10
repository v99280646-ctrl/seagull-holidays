import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ResortsGridClient } from "@/components/site/ResortsGridClient";

export const metadata: Metadata = {
  title: "Island Resorts | Seagull Holidays",
  description: "Discover handpicked Lakshadweep island resorts and beach stays.",
};

export default async function ResortsPage() {
  return (
    <div>
      <PageHero title="Island Resorts" subtitle="Overwater villas, beach cottages and luxury retreats." />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ResortsGridClient />
      </div>
    </div>
  );
}
