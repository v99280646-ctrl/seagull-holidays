import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src="/white%20log.png"
              alt="Seagull Holidays logo"
              width={372}
              height={111}
              loading="lazy"
              className="h-10 w-auto"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
            Your trusted travel partner for customized island holidays, resorts, flights and tours across Lakshadweep and Kerala.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
            <li><Link href="/packages" className="hover:text-accent">Holiday Packages</Link></li>
            <li><Link href="/destinations" className="hover:text-accent">Destinations</Link></li>
            <li><Link href="/resorts" className="hover:text-accent">Resorts</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">{site.headOffice.label}</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {site.headOffice.lines.map((l) => <li key={l}>{l}</li>)}
          </ul>
          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">{site.branchOffice.label}</h3>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/75">
            {site.branchOffice.lines.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{site.address}</li>
            {site.phones.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-accent">{p}</a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
            </li>
            <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 py-5">
        <p className="mx-auto max-w-7xl px-4 text-center text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
