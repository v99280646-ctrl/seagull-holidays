import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Mail, MapPin, Phone, Clock, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Contact | Seagull Holidays",
  description: "Contact Seagull Holidays for customized tours, resorts, and travel planning.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero title="Contact Us" subtitle="Planning a trip? Reach our travel experts on call, WhatsApp or email." />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="grid gap-5">
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Quick Contact
              </div>
              <h2 className="mt-4 text-2xl font-bold">Talk to a travel expert</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                We’ll help you with package planning, resort bookings, flight support and custom holiday itineraries.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoRow icon={Phone} title="Call us">
                {site.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block font-medium hover:text-primary">{p}</a>
                ))}
                <span className="mt-2 block text-sm text-muted-foreground">{site.availability}</span>
              </InfoRow>
              <InfoRow icon={Mail} title="Email us">
                <a href={`mailto:${site.email}`} className="font-medium hover:text-primary">{site.email}</a>
                <span className="mt-2 block text-sm text-muted-foreground">Replies within 24 hours</span>
              </InfoRow>
              <InfoRow icon={Clock} title="Business hours">
                <span className="font-medium">{site.hours}</span>
              </InfoRow>
              <InfoRow icon={MapPin} title="Our address">
                <span className="font-medium">{site.address}</span>
              </InfoRow>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-bold">Send on WhatsApp</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your travel dates and destination, and we’ll get back to you fast.
            </p>
            <a
              href={`https://wa.me/919744779695?text=${encodeURIComponent("Hi Seagull Holidays, I would like to know more about your packages and resorts.")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700"
            >
              WhatsApp +91 97447 79695
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="mt-6 rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Best for</p>
              <ul className="mt-2 space-y-1.5">
                <li>• Holiday packages</li>
                <li>• Resort and hotel bookings</li>
                <li>• Flight and transfer assistance</li>
                <li>• Custom island itineraries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: typeof Phone; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-ocean text-ocean-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-1 text-foreground/90">{children}</div>
      </div>
    </div>
  );
}
