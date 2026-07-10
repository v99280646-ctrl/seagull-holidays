import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DestinationCard } from "@/components/site/DestinationCard";
import { PageHero } from "@/components/site/PageHero";
import { getDestinationCards } from "@/lib/destinations-api";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Seagull Holidays | Lakshadweep & Kerala" },
      {
        name: "description",
        content:
          "Explore top destinations with Seagull Holidays — Agatti, Bangaram, Kavaratti, Minicoy islands and Kerala's Alleppey backwaters. Find your perfect island escape.",
      },
      { property: "og:title", content: "Destinations — Seagull Holidays" },
      { property: "og:description", content: "Top Lakshadweep and Kerala destinations to explore." },
      { property: "og:url", content: "/destinations" },
    ],
    links: [{ rel: "canonical", href: "/destinations" }],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  const { data: destinations = [] } = useQuery({
    queryKey: ["destinationCards"],
    queryFn: getDestinationCards,
  });

  return (
    <div>
      <PageHero
        title="Destinations"
        subtitle="From private coral atolls to Kerala's palm-fringed backwaters — discover where your next adventure begins."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.slug} dest={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
