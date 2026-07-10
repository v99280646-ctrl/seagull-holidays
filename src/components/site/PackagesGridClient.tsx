"use client";

import { useQuery } from "@tanstack/react-query";
import { PackageCard } from "@/components/site/PackageCard";
import { CardGridSkeleton } from "@/components/site/CardGridSkeleton";
import { getPackageCards } from "@/lib/packages-api";

export function PackagesGridClient({ limit }: { limit?: number } = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ["packageCards"],
    queryFn: getPackageCards,
  });

  if (isLoading || !data) return <CardGridSkeleton kind="package" />;

  const items = limit ? data.slice(0, limit) : data;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {items.map((pkg) => (
        <PackageCard key={pkg.slug} pkg={pkg} />
      ))}
    </div>
  );
}
