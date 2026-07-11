import Link from "next/link";
import { MapPin } from "lucide-react";
import { type Destination } from "@/data/site";
import { imageSrc } from "@/lib/media";

export function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link
      href="/packages"
      className="group relative block aspect-square overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:shadow-card"
    >
      <img
        src={imageSrc(dest.image)}
        alt={`${dest.name}, ${dest.region}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent" />
      <span className="absolute left-2 top-2 rounded-full bg-background/90 px-2 py-1 text-[10px] font-semibold text-primary sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
        {dest.tag}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3 text-primary-foreground sm:p-5">
        <p className="flex items-center gap-1 text-[10px] text-primary-foreground/80 sm:text-xs">
          <MapPin className="h-3.5 w-3.5" />
          {dest.region}
        </p>
        <h3 className="mt-1 text-sm font-semibold leading-tight sm:text-xl sm:font-bold">{dest.name}</h3>
        <p className="mt-1 text-[10px] text-primary-foreground/85 sm:text-sm">{dest.packages} packages available</p>
      </div>
    </Link>
  );
}
