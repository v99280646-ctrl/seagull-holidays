import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PackageCard } from "@/components/site/PackageCard";
import { PageHero } from "@/components/site/PageHero";
import { getPackageCards } from "@/lib/packages-api";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Holiday Packages — Seagull Holidays | Lakshadweep & Kerala Tours" },
      {
        name: "description",
        content:
          "Browse Seagull Holidays' customized Lakshadweep and Kerala holiday packages — beach escapes, luxury getaways, honeymoons and adventure tours with best prices.",
      },
      { property: "og:title", content: "Holiday Packages — Seagull Holidays" },
      { property: "og:description", content: "Customized Lakshadweep & Kerala tour packages with the best prices." },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

const categories = ["All", "Beach", "Luxury", "Honeymoon", "Backwaters", "Cultural", "Adventure"];

function PackagesPage() {
  const [active, setActive] = useState("All");
  const { data: packages = [] } = useQuery({
    queryKey: ["packageCards"],
    queryFn: getPackageCards,
  });
  const list = active === "All" ? packages : packages.filter((p) => p.category === active);

  return (
    <div>
      <PageHero
        title="Holiday Packages"
        subtitle="Handcrafted island itineraries for every kind of traveller. Pick a package or let us customize one for you."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c
                  ? "bg-gradient-coral text-accent-foreground shadow-soft"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <PackageCard key={p.slug} pkg={p} />)}
        </div>
      </div>
    </div>
  );
}
