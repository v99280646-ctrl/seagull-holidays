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
          alt={`${pkg.title} — ${pkg.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {pkg.badge && (
          <Badge className="absolute left-3 top-3 bg-gradient-coral text-accent-foreground border-0">{pkg.badge}</Badge>
        )}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          {pkg.rating}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground sm:text-xs">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{pkg.location}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pkg.nights}N/{pkg.days}D</span>
        </div>
        <h3 className="mt-2 text-[17px] font-bold leading-tight text-foreground sm:text-lg">
          <Link href={`/packages/${pkg.slug}`} className="hover:text-primary">{pkg.title}</Link>
        </h3>
        <p className="mt-1.5 hidden line-clamp-2 flex-1 text-sm leading-5 text-muted-foreground sm:block">{pkg.summary}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            {pkg.oldPrice && <div className="text-[11px] text-muted-foreground line-through sm:text-xs">{inr(pkg.oldPrice)}</div>}
            <div className="flex items-end gap-1">
              <span className="text-lg font-bold text-primary sm:text-xl">{inr(pkg.price)}</span>
              <span className="text-[11px] text-muted-foreground sm:text-xs"> /person</span>
            </div>
          </div>
          <Button asChild size="sm" variant="coral" className="shrink-0 px-4 text-xs sm:px-5">
            <Link href={`/packages/${pkg.slug}`}>View</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
