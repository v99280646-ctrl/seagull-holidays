import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Check, MapPin, Phone, Star, Users } from "lucide-react";
import { resorts as fallbackResorts, inr, site } from "@/data/site";
import { getResortDetail } from "@/lib/resorts-api";
import { imageSrc } from "@/lib/media";

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const resort = (await getResortDetail(slug)) ?? fallbackResorts.find((r) => r.slug === slug);
  if (!resort) return { title: "Resort not found | Seagull Holidays" };
  return {
    title: `${resort.name} | Seagull Holidays`,
    description: resort.summary,
  };
}

export default async function ResortDetailPage({ params }: PageProps) {
  const { slug } = params;
  const resort = (await getResortDetail(slug)) ?? fallbackResorts.find((r) => r.slug === slug);
  if (!resort) notFound();

  const options =
    resort.packageOptions?.length
      ? resort.packageOptions
      : resort.roomTypes.map((room) => ({ name: room.name, price: room.price, duration: room.details, inclusions: [] as string[] }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_.9fr]">
        <div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img src={imageSrc(resort.image)} alt={resort.name} className="aspect-[16/9] w-full object-cover" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{resort.location}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" />{resort.rating} ({resort.reviews} reviews)</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{resort.name}</h1>
          <p className="mt-4 text-muted-foreground">{resort.summary}</p>

          <h2 className="mt-10 text-2xl font-bold">Amenities</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {resort.amenities.map((a) => (
              <div key={a} className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3 text-sm">
                <Check className="h-4 w-4 shrink-0 text-ocean" />
                {a}
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">Room types</h2>
          <div className="mt-4 space-y-3">
            {options.map((option, index) => (
              <div key={`${option.name}-${index}`} className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{option.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{option.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{inr(option.price)}</p>
                    <p className="text-xs text-muted-foreground">/night</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold text-primary">{inr(resort.pricePerNight)}</div>
              <div className="text-sm text-muted-foreground">/night</div>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />{resort.rating}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium">
              <span className="mb-1 flex items-center gap-1 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> Check-in</span>
              <input type="date" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </label>
            <label className="block text-sm font-medium">
              <span className="mb-1 flex items-center gap-1 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> Check-out</span>
              <input type="date" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </label>
          </div>
          <label className="mt-4 block text-sm font-medium">
            <span className="mb-1 flex items-center gap-1 text-muted-foreground"><Users className="h-4 w-4" /> Guests</span>
            <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n}>{n} guest{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </label>
          <a
            href={`https://wa.me/919744779695?text=${encodeURIComponent(`Hi Seagull Holidays, I want to enquire about ${resort.name}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            Check Availability on WhatsApp
          </a>
          <a
            href={`tel:${site.phones[1].replace(/\s/g, "")}`}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-input px-5 py-3 font-semibold"
          >
            <Phone className="h-4 w-4" /> Call to book
          </a>
        </aside>
      </div>
    </div>
  );
}
