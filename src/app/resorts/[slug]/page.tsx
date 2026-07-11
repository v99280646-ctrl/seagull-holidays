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
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_.9fr] lg:gap-10">
        <div>
          <div className="overflow-hidden rounded-2xl shadow-card sm:rounded-3xl">
            <img src={imageSrc(resort.image)} alt={resort.name} className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground sm:mt-6 sm:text-sm">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{resort.location}</span>
            <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-gold text-gold sm:h-4 sm:w-4" />{resort.rating} ({resort.reviews} reviews)</span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold leading-tight sm:mt-4 sm:text-4xl">{resort.name}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base">{resort.summary}</p>

          <h2 className="mt-8 text-xl font-bold sm:mt-10 sm:text-2xl">Amenities</h2>
          <div className="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3">
            {resort.amenities.map((a) => (
              <div key={a} className="flex items-center gap-2 rounded-xl border border-border/70 bg-card p-3 text-xs leading-5 sm:text-sm">
                <Check className="h-3.5 w-3.5 shrink-0 text-ocean sm:h-4 sm:w-4" />
                {a}
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-bold sm:mt-10 sm:text-2xl">Room types</h2>
          <div className="mt-3 space-y-3 sm:mt-4">
            {options.map((option, index) => (
              <div key={`${option.name}-${index}`} className="rounded-2xl border border-border/70 bg-card p-3.5 shadow-soft sm:p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold sm:text-base">{option.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{option.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-primary sm:text-lg">{inr(option.price)}</p>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">/night</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="hidden space-y-4 lg:block">
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

        <section className="space-y-4 lg:hidden">
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
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-3 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3">
          <a
            href={`https://wa.me/919744779695?text=${encodeURIComponent(`Hi Seagull Holidays, I want details for ${resort.name} in ${resort.location}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-coral px-4 py-3 text-sm font-semibold text-accent-foreground shadow-soft"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${site.phones[1].replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center rounded-xl border border-input px-4 py-3 text-sm font-semibold"
          >
            Call to book
          </a>
        </div>
      </div>
    </div>
  );
}
