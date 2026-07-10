import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { site } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Contact | Seagull Holidays",
  description: "Contact Seagull Holidays for customized tours, resorts, and travel planning.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero title="Contact Us" subtitle="Planning a trip? Reach our travel experts on call or WhatsApp." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-5">
          <InfoRow icon={Phone} title="Call us">
            {site.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-primary">{p}</a>
            ))}
          </InfoRow>
          <InfoRow icon={Mail} title="Email us">
            <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
          </InfoRow>
          <InfoRow icon={Clock} title="Business hours">
            <span>{site.hours}</span>
          </InfoRow>
          <InfoRow icon={MapPin} title="Address">
            <span>{site.address}</span>
          </InfoRow>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-8">
          <h2 className="text-2xl font-bold">Send on WhatsApp</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Save our number and message us directly for quotes and availability.
          </p>
          <a
            href={`https://wa.me/919744779695?text=${encodeURIComponent("Hi Seagull Holidays, I would like to know more about your packages and resorts.")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700"
          >
            WhatsApp +91 97447 79695
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, title, children }: { icon: typeof Phone; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
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
