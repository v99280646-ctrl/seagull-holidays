import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import { type Package, inr } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { imageSrc } from "@/lib/media";

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc(pkg.image)}
          alt={`${pkg.title} â€” ${pkg.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {pkg.badge && <Badge className="absolute left-2 top-2 border-0 bg-gradient-coral text-accent-foreground text-[10px] sm:left-3 sm:top-3 sm:text-xs">{pkg.badge}</Badge>}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[10px] font-semibold sm:right-3 sm:top-3 sm:text-xs">
          <Star className="h-3 w-3 fill-gold text-gold" />
          {pkg.rating}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground sm:gap-3 sm:text-xs">
          <span className="flex min-w-0 items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{pkg.location}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {pkg.nights}N/{pkg.days}D
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-tight text-foreground sm:text-lg sm:font-bold">
          <Link href={`/packages/${pkg.slug}`} className="hover:text-primary">
            {pkg.title}
          </Link>
        </h3>

        <p className="mt-1.5 hidden line-clamp-2 flex-1 text-xs leading-5 text-muted-foreground sm:block sm:text-sm">
          {pkg.summary}
        </p>

        <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            {pkg.oldPrice && <div className="text-[10px] text-muted-foreground line-through sm:text-xs">{inr(pkg.oldPrice)}</div>}
            <div className="flex items-end gap-1">
              <span className="text-base font-bold text-primary sm:text-xl">{inr(pkg.price)}</span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">/person</span>
            </div>
          </div>
          <Button asChild size="sm" variant="coral" className="w-full shrink-0 px-3 text-[11px] sm:w-auto sm:px-5 sm:text-xs">
            <Link href={`/packages/${pkg.slug}`}>View</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
