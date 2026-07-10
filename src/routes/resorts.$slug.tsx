import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MapPin, Check, Phone, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { resorts, site, inr } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getResortDetail } from "@/lib/resorts-api";

export const Route = createFileRoute("/resorts/$slug")({
  loader: async ({ params }) => {
    const resort = (await getResortDetail(params.slug)) ?? resorts.find((r) => r.slug === params.slug);
    if (!resort) throw notFound();
    return { resort };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Resort not found — Seagull Holidays" }, { name: "robots", content: "noindex" }] };
    }
    const { resort } = loaderData;
    return {
      meta: [
        { title: `${resort.name} — ${resort.location} | Seagull Holidays` },
        { name: "description", content: resort.summary },
        { property: "og:title", content: `${resort.name} — Seagull Holidays` },
        { property: "og:description", content: resort.summary },
        { property: "og:type", content: "product" },
        { property: "og:image", content: resort.image },
        { property: "og:url", content: `/resorts/${params.slug}` },
        { name: "twitter:image", content: resort.image },
      ],
      links: [{ rel: "canonical", href: `/resorts/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            name: resort.name,
            description: resort.summary,
            image: resort.image,
            address: { "@type": "PostalAddress", addressLocality: resort.location },
            aggregateRating: { "@type": "AggregateRating", ratingValue: resort.rating, reviewCount: resort.reviews },
          }),
        },
      ],
    };
  },
  component: ResortDetail,
  notFoundComponent: ResortNotFound,
  errorComponent: ResortError,
});

function ResortDetail() {
  const { resort } = Route.useLoaderData();
  const [guests, setGuests] = useState("2");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const packageOptions = resort.packageOptions?.length
    ? resort.packageOptions
    : resort.roomTypes.map((room) => ({
        name: room.name,
        price: room.price,
        duration: room.details,
        inclusions: [],
      }));
  const [selectedPackageIndex, setSelectedPackageIndex] = useState("0");
  const selectedPackage = packageOptions[Number(selectedPackageIndex)] ?? packageOptions[0];
  const selectedPrice = selectedPackage?.price ?? resort.pricePerNight;
  const images = resort.gallery?.length ? resort.gallery : [resort.image];
  const activeImage = images[activeImageIndex] ?? images[0];
  const whatsappNumber = "919744779695";
  const cleanInclusionText = (value: string) =>
    value
      .replace("Breakfast andOneSetMeal  (choice of lunch or dinner)", "")
      .replace("Breakfast andOneSetMeal (choice of lunch or dinner)", "")
      .replace(/\s{2,}/g, " ")
      .trim();
  const sendToWhatsApp = () => {
    const message = [
      "New resort enquiry from Seagull Holidays website:",
      `Resort: ${resort.name}`,
      `Selected option: ${selectedPackage.name}`,
      `Price: ${inr(selectedPrice)}`,
      `Check-in: ${checkIn || "Not selected"}`,
      `Check-out: ${checkOut || "Not selected"}`,
      `Guests: ${guests}`,
      `Location: ${resort.location}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="mb-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> ·{" "}
          <Link to="/resorts" className="hover:text-primary">Resorts</Link> ·{" "}
          <span className="text-foreground">{resort.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.9fr)]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
            <img src={activeImage} alt={`${resort.name} preview ${activeImageIndex + 1}`} className="h-full w-full object-cover" />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/85 p-2 text-foreground shadow-soft backdrop-blur hover:bg-background"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/85 p-2 text-foreground shadow-soft backdrop-blur hover:bg-background"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${index === activeImageIndex ? "w-6 bg-primary" : "w-2.5 bg-background/80"}`}
                      aria-label={`Show image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="w-full rounded-2xl border border-border/70 bg-card p-6 shadow-card">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-extrabold text-primary">{inr(selectedPrice)}</span>
                <span className="text-sm text-muted-foreground"> /night</span>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />{resort.rating}
              </span>
            </div>

            <label className="mt-4 block text-xs font-medium">
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

            <div className="mt-5 grid grid-cols-2 gap-3">
              <label className="block text-xs font-medium">
                <span className="mb-1 flex items-center gap-1 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> Check-in</span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block text-xs font-medium">
                <span className="mb-1 flex items-center gap-1 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> Check-out</span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            </div>

            <label className="mt-4 block text-xs font-medium">
              <span className="mb-1 block text-muted-foreground">Guests</span>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map((value) => (
                    <SelectItem key={value} value={value}>
                      {value} {value === "1" ? "Guest" : "Guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <Button size="lg" variant="coral" className="mt-5 w-full" onClick={sendToWhatsApp}>Check Availability</Button>
            <a href={`tel:${site.phones[1].replace(/\s/g, "")}`} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-input py-2.5 text-sm font-semibold hover:bg-secondary">
              <Phone className="h-4 w-4" /> Call to book
            </a>
          </aside>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-4 pb-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <Badge className="border-0 bg-primary/90 text-primary-foreground">{resort.type}</Badge>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{resort.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{resort.location}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" />{resort.rating} ({resort.reviews} reviews)</span>
          </div>
          <p className="mt-5 text-muted-foreground">{resort.summary}</p>

          <h2 className="mt-10 text-2xl font-bold">Amenities</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {resort.amenities.map((a: string) => (
              <div key={a} className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3 text-sm">
                <Check className="h-4 w-4 shrink-0 text-ocean" />{a}
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">Room types</h2>
          <div className="mt-4 space-y-3">
            {packageOptions.map((room, index) => (
              <div
                key={`${room.name}-${index}`}
                className={`rounded-xl border p-4 shadow-soft transition-colors ${index === Number(selectedPackageIndex) ? "border-primary bg-primary/5" : "border-border/70 bg-card"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{room.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{room.duration}</p>
                    {room.inclusions.length > 0 && (
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                        {room.inclusions.map(cleanInclusionText).filter((item) => item.length > 0).join(" · ")}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold leading-none text-primary">
                      {inr(room.price)}<span className="text-xs font-normal text-muted-foreground"> /night</span>
                    </p>
                    <Button size="sm" variant="coral" className="mt-2 h-9 px-3 text-xs" onClick={sendToWhatsApp}>
                      Reserve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResortNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Resort not found</h1>
      <p className="mt-2 text-muted-foreground">This resort may have moved or no longer exists.</p>
      <Button asChild variant="coral" className="mt-6"><Link to="/resorts">Browse resorts</Link></Button>
    </div>
  );
}

function ResortError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button variant="coral" className="mt-6" onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
    </div>
  );
}
