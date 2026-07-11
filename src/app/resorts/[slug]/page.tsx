import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, MapPin, Phone, Star } from "lucide-react";
import { resorts as fallbackResorts, inr, site } from "@/data/site";
import { getResortDetail } from "@/lib/resorts-api";
import { imageSrc } from "@/lib/media";
import { WhatsAppResortRequest } from "@/components/site/WhatsAppResortRequest";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resort = (await getResortDetail(slug)) ?? fallbackResorts.find((r) => r.slug === slug);
  if (!resort) return { title: "Resort not found | Seagull Holidays" };
  return {
    title: `${resort.name} | Seagull Holidays`,
    description: resort.summary,
  };
}

export default async function ResortDetailPage({ params }: PageProps) {
  const { slug } = await params;
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

        <aside className="space-y-4">
          <WhatsAppResortRequest
            whatsappNumber="919744779695"
            resortName={resort.name}
            resortLocation={resort.location}
            pricePerNight={resort.pricePerNight}
            options={options}
          />

          <a
            href={`tel:${site.phones[1].replace(/\s/g, "")}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-input px-5 py-3 font-semibold"
          >
            <Phone className="h-4 w-4" /> Call to book
          </a>
        </aside>
      </div>
    </div>
  );
}
