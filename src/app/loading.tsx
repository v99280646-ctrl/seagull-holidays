export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">Loading</p>
          <p className="mt-2 text-base font-medium text-foreground">Please wait while we fetch the page</p>
        </div>
      </div>
    </div>
  );
}
