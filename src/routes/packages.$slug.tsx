import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Star, MapPin, Clock, Check, X, Phone, Calendar, Users } from "lucide-react";
import { packages, site, inr } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPackageDetail } from "@/lib/packages-api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const Route = createFileRoute("/packages/$slug")({
  loader: async ({ params }) => {
    const pkg = (await getPackageDetail(params.slug)) ?? packages.find((p) => p.slug === params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Package not found — Seagull Holidays" }, { name: "robots", content: "noindex" }] };
    }
    const { pkg } = loaderData;
    return {
      meta: [
        { title: `${pkg.title} — ${pkg.nights}N/${pkg.days}D | Seagull Holidays` },
        { name: "description", content: pkg.summary },
        { property: "og:title", content: `${pkg.title} — Seagull Holidays` },
        { property: "og:description", content: pkg.summary },
        { property: "og:type", content: "product" },
        { property: "og:image", content: pkg.image },
        { property: "og:url", content: `/packages/${params.slug}` },
        { name: "twitter:image", content: pkg.image },
      ],
      links: [{ rel: "canonical", href: `/packages/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: pkg.title,
            description: pkg.summary,
            image: pkg.image,
            offers: { "@type": "Offer", price: pkg.price, priceCurrency: "INR" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: pkg.rating, reviewCount: pkg.reviews },
          }),
        },
      ],
    };
  },
  component: PackageDetail,
  notFoundComponent: PackageNotFound,
  errorComponent: PackageError,
});

function PackageDetail() {
  const { pkg } = Route.useLoaderData();
  const [selectedPackageIndex, setSelectedPackageIndex] = useState("0");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const whatsappNumber = "919744779695";
  const packageOptions = pkg.packageOptions?.length
    ? pkg.packageOptions
    : [
        {
          name: pkg.title,
          price: pkg.price,
          duration: `${pkg.nights} Nights / ${pkg.days} Days`,
          inclusions: pkg.inclusions,
        },
      ];
  const selectedPackage = packageOptions[Number(selectedPackageIndex)] ?? packageOptions[0];
  const related = packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);
  const sendToWhatsApp = () => {
    const message = [
      "New package enquiry from Seagull Holidays website:",
      `Package: ${pkg.title}`,
      `Selected option: ${selectedPackage.name}`,
      `Price: ${inr(selectedPackage.price)}`,
      `Duration: ${selectedPackage.duration}`,
      `Travel date: ${travelDate || "Not selected"}`,
      `Travellers: ${travellers}`,
      `Location: ${pkg.location}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      {/* Hero image */}
      <section className="relative h-[52vh] min-h-[360px] overflow-hidden">
        <img src={pkg.image} alt={`${pkg.title}, ${pkg.location}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <nav className="mb-3 text-sm text-primary-foreground/80">
              <Link to="/" className="hover:text-accent">Home</Link> ·{" "}
              <Link to="/packages" className="hover:text-accent">Packages</Link> ·{" "}
              <span className="text-primary-foreground">{pkg.title}</span>
            </nav>
            {pkg.badge && <Badge className="mb-2 border-0 bg-gradient-coral text-accent-foreground">{pkg.badge}</Badge>}
            <h1 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">{pkg.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/90">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pkg.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.nights} Nights / {pkg.days} Days</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" />{pkg.rating} ({pkg.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="mt-3 text-muted-foreground">{pkg.summary}</p>

          <h2 className="mt-10 text-2xl font-bold">Highlights</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pkg.highlights.map((h: string) => (
              <div key={h} className="flex items-start gap-2 rounded-xl border border-border/70 bg-card p-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />{h}
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">Package options</h2>
          <div className="mt-4 space-y-3">
            {packageOptions.map((option, index) => (
              <button
                key={`${option.name}-${index}`}
                type="button"
                onClick={() => setSelectedPackageIndex(String(index))}
                className={`w-full rounded-2xl border p-4 text-left shadow-soft transition-colors ${
                  index === Number(selectedPackageIndex) ? "border-primary bg-primary/5" : "border-border/70 bg-card hover:border-primary/60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{option.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{option.duration}</p>
                    {option.inclusions.length > 0 && (
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                        {option.inclusions.join(" · ")}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold leading-none text-primary">
                      {inr(option.price)}<span className="text-xs font-normal text-muted-foreground"> /person</span>
                    </p>
                    <span className="mt-2 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {index === Number(selectedPackageIndex) ? "Selected" : "Choose"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">Day-by-day itinerary</h2>
          <ol className="mt-4 space-y-4">
            {pkg.itinerary.map((it: { day: number; title: string; detail: string }) => (
              <li key={it.day} className="relative rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-ocean text-sm font-bold text-ocean-foreground">
                    {it.day}
                  </span>
                  <h3 className="font-semibold">{it.title}</h3>
                </div>
                <p className="mt-2 pl-12 text-sm text-muted-foreground">{it.detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold">What's included</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {pkg.inclusions.map((i: string) => (
                  <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">Not included</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {pkg.exclusions.map((e: string) => (
                  <li key={e} className="flex items-start gap-2 text-muted-foreground"><X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
            <div className="flex items-end justify-between">
              <div>
                {pkg.oldPrice && <span className="mr-1.5 text-sm text-muted-foreground line-through">{inr(pkg.oldPrice)}</span>}
                <span className="text-3xl font-extrabold text-primary">{inr(selectedPackage.price)}</span>
                <span className="text-sm text-muted-foreground"> /person</span>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />{pkg.rating}
              </span>
            </div>

            <label className="mt-5 block text-sm font-medium">
              <span className="mb-1 block text-muted-foreground">Package option</span>
              <Select value={selectedPackageIndex} onValueChange={setSelectedPackageIndex}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose package" />
                </SelectTrigger>
                <SelectContent>
                  {packageOptions.map((option, index) => (
                    <SelectItem key={`${option.name}-${index}`} value={String(index)}>
                      {option.name} - {inr(option.price)} / {option.duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

              <div className="mt-5 space-y-3">
              <label className="block text-sm font-medium">
                <span className="mb-1 flex items-center gap-1.5 text-muted-foreground"><Calendar className="h-4 w-4" /> Travel date</span>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block text-sm font-medium">
                <span className="mb-1 flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4" /> Travellers</span>
                <select value={travellers} onChange={(e) => setTravellers(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n} traveller{n > 1 ? "s" : ""}</option>)}
                </select>
              </label>
            </div>

            <Button size="lg" variant="coral" className="mt-5 w-full" onClick={sendToWhatsApp}>
              Request to Book
            </Button>
            <a
              href={`tel:${site.phones[1].replace(/\s/g, "")}`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-input py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              <Phone className="h-4 w-4" /> Call {site.phones[1]}
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">Free cancellation · Instant confirmation on request</p>
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">You may also like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to="/packages/$slug"
              params={{ slug: p.slug }}
              className="group flex gap-4 rounded-2xl border border-border/70 bg-card p-3 shadow-soft transition hover:shadow-card"
            >
              <img src={p.image} alt={p.title} loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <h3 className="truncate font-semibold group-hover:text-primary">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.location}</p>
                <p className="mt-1 text-sm font-bold text-primary">{inr(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function PackageNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Package not found</h1>
      <p className="mt-2 text-muted-foreground">This package may have moved or no longer exists.</p>
      <Button asChild variant="coral" className="mt-6"><Link to="/packages">Browse packages</Link></Button>
    </div>
  );
}

function PackageError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button variant="coral" className="mt-6" onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
    </div>
  );
}
