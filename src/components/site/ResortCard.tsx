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
          alt={`${resort.name} — ${resort.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 border-0 bg-primary/90 text-primary-foreground">{resort.type}</Badge>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="mt-2 text-[17px] font-bold leading-tight sm:text-lg">
          <Link href={`/resorts/${resort.slug}`} className="hover:text-primary">{resort.name}</Link>
        </h3>
        <div className="mt-1 flex items-center justify-between gap-3 text-[11px] sm:text-sm">
          <span className="flex min-w-0 items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{resort.location}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 font-semibold">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {resort.rating} <span className="text-muted-foreground">({resort.reviews})</span>
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <span className="text-lg font-bold text-primary sm:text-xl">{inr(resort.pricePerNight)}</span>
            <span className="text-[11px] text-muted-foreground sm:text-xs"> /night</span>
          </div>
          <Button asChild size="sm" variant="coral" className="shrink-0 px-4 text-xs sm:px-5">
            <Link href={`/resorts/${resort.slug}`}>View Resort</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
