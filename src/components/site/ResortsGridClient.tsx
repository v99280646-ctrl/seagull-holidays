"use client";

import { useQuery } from "@tanstack/react-query";
import { ResortCard } from "@/components/site/ResortCard";
import { CardGridSkeleton } from "@/components/site/CardGridSkeleton";
import { getResortCards } from "@/lib/resorts-api";

export function ResortsGridClient() {
  const { data, isLoading } = useQuery({
    queryKey: ["resortCards"],
    queryFn: getResortCards,
  });

  if (isLoading || !data) return <CardGridSkeleton kind="resort" />;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {data.map((resort) => (
        <ResortCard key={resort.slug} resort={resort} />
      ))}
    </div>
  );
}
