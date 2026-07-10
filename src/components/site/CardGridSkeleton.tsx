export function CardGridSkeleton({ kind = "package" }: { kind?: "package" | "resort" }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
            <div className="aspect-[4/3] bg-[linear-gradient(90deg,theme(colors.secondary)_25%,theme(colors.background)_50%,theme(colors.secondary)_75%)] animate-shimmer" />
            <div className="space-y-3 p-4 sm:p-5">
              <div className="h-3 w-28 rounded-full bg-secondary animate-shimmer" />
              <div className="h-5 w-3/4 rounded-full bg-secondary animate-shimmer" />
              <div className="h-4 w-full rounded-full bg-secondary animate-shimmer" />
              <div className="h-4 w-2/3 rounded-full bg-secondary animate-shimmer" />
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <div className="h-4 w-20 rounded-full bg-secondary animate-shimmer" />
                  <div className="mt-2 h-6 w-24 rounded-full bg-secondary animate-shimmer" />
                </div>
                <div className="h-9 w-16 rounded-full bg-secondary animate-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {kind === "resort" && <div className="sr-only">Loading resorts</div>}
    </div>
  );
}
