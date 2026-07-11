import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock, MapPin, Phone, Star } from "lucide-react";
import { packages as fallbackPackages, inr, site } from "@/data/site";
import { getPackageDetail } from "@/lib/packages-api";
import { imageSrc } from "@/lib/media";
import { WhatsAppPackageRequest } from "@/components/site/WhatsAppPackageRequest";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = (await getPackageDetail(slug)) ?? fallbackPackages.find((p) => p.slug === slug);
  if (!pkg) return { title: "Package not found | Seagull Holidays" };
  return {
    title: `${pkg.title} | Seagull Holidays`,
    description: pkg.summary,
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = (await getPackageDetail(slug)) ?? fallbackPackages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const packageOptions =
    pkg.packageOptions?.length
      ? pkg.packageOptions
      : [{ name: pkg.title, price: pkg.price, duration: `${pkg.nights} Nights / ${pkg.days} Days`, inclusions: pkg.inclusions }];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_.9fr]">
        <div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img src={imageSrc(pkg.image)} alt={pkg.title} className="aspect-[16/9] w-full object-cover" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pkg.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.nights} Nights / {pkg.days} Days</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" />{pkg.rating} ({pkg.reviews} reviews)</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{pkg.title}</h1>
          <p className="mt-4 text-muted-foreground">{pkg.summary}</p>

          <h2 className="mt-10 text-2xl font-bold">Highlights</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pkg.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2 rounded-xl border border-border/70 bg-card p-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />
                {h}
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">Package options</h2>
          <div className="mt-4 space-y-3">
            {packageOptions.map((option, index) => (
              <div key={`${option.name}-${index}`} className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{option.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{option.duration}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{option.inclusions.join(" · ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{inr(option.price)}</p>
                    <p className="text-xs text-muted-foreground">/person</p>
                    <a
                      href={`https://wa.me/919744779695?text=${encodeURIComponent(`Hi Seagull Holidays, I want to book ${pkg.title} - ${option.name} for ${pkg.location}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-full bg-gradient-coral px-4 py-2 text-sm font-semibold text-accent-foreground"
                    >
                      Book on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <WhatsAppPackageRequest
            whatsappNumber="919744779695"
            packageTitle={pkg.title}
            packageLocation={pkg.location}
            packagePrice={pkg.price}
            packageOptions={packageOptions}
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
