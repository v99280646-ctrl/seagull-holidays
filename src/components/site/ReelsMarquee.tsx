import { reels } from "@/data/site";

export function ReelsMarquee() {
  const loop = [...reels, ...reels];
  return (
    <div className="relative overflow-hidden py-2">
      <div className="animate-marquee flex w-max gap-4">
        {loop.map((r, i) => (
          <figure
            key={i}
            className="group relative h-72 w-48 shrink-0 overflow-hidden rounded-2xl shadow-card sm:h-80 sm:w-56"
          >
            <video
              src={r.video}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
            <figcaption className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-primary-foreground">
              {r.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
