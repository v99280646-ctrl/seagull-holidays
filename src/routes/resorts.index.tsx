import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ResortCard } from "@/components/site/ResortCard";
import { PageHero } from "@/components/site/PageHero";
import { getResortCards } from "@/lib/resorts-api";

export const Route = createFileRoute("/resorts/")({
  head: () => ({
    meta: [
      { title: "Island Resorts — Seagull Holidays | Lakshadweep Stays" },
      {
        name: "description",
        content:
          "Book handpicked Lakshadweep island resorts with Seagull Holidays — overwater villas, beach cottages and infinity-pool retreats with best rates and easy booking.",
      },
      { property: "og:title", content: "Island Resorts — Seagull Holidays" },
      { property: "og:description", content: "Handpicked Lakshadweep resorts and beachfront stays." },
      { property: "og:url", content: "/resorts" },
    ],
    links: [{ rel: "canonical", href: "/resorts" }],
  }),
  component: ResortsPage,
});

function ResortsPage() {
  const { data: resorts = [] } = useQuery({
    queryKey: ["resortCards"],
    queryFn: getResortCards,
  });

  return (
    <div>
      <PageHero
        title="Island Resorts"
        subtitle="Overwater villas, beach cottages and luxury retreats — handpicked for comfort with sweeping ocean views."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          {resorts.map((r) => <ResortCard key={r.slug} resort={r} />)}
        </div>
      </div>
    </div>
  );
}
