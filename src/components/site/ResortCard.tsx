import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { type Resort, inr } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { imageSrc } from "@/lib/media";

export function ResortCard({ resort }: { resort: Resort }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link href={`/resorts/${resort.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc(resort.image)}
          alt={`${resort.name} â€” ${resort.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-2 top-2 border-0 bg-primary/90 text-primary-foreground text-[10px] sm:left-3 sm:top-3 sm:text-xs">
          {resort.type}
        </Badge>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="mt-1 text-sm font-semibold leading-tight sm:mt-2 sm:text-lg sm:font-bold">
          <Link href={`/resorts/${resort.slug}`} className="hover:text-primary">
            {resort.name}
          </Link>
        </h3>

        <div className="mt-1 flex items-center justify-between gap-2 text-[10px] sm:gap-3 sm:text-sm">
          <span className="flex min-w-0 items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{resort.location}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 font-semibold">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {resort.rating} <span className="text-muted-foreground">({resort.reviews})</span>
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div>
            <span className="text-base font-bold text-primary sm:text-xl">{inr(resort.pricePerNight)}</span>
            <span className="text-[10px] text-muted-foreground sm:text-xs">/night</span>
          </div>
          <Button asChild size="sm" variant="coral" className="w-full shrink-0 px-3 text-[11px] sm:w-auto sm:px-5 sm:text-xs">
            <Link href={`/resorts/${resort.slug}`}>View Resort</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
