import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/data/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/destinations", label: "Destinations" },
  { to: "/resorts", label: "Resorts" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/1765251992779-segal-holidays-logo.png"
            alt="Seagull Holidays logo"
            width={372}
            height={111}
            className="h-9 w-auto"
          />
        </Link>

        <a
          href={`tel:${site.phones[1].replace(/\s/g, "")}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/70"
          aria-label="Call Seagull Holidays"
        >
          <Phone className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

export function DesktopHeader() {
  return (
    <header className="sticky top-0 z-50 hidden border-b border-border/60 bg-background/85 backdrop-blur-md md:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/1765251992779-segal-holidays-logo.png"
            alt="Seagull Holidays logo"
            width={372}
            height={111}
            className="h-10 w-auto"
          />
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map((n) => (
            <Link key={n.to} href={n.to} className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${site.phones[1].replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/70"
        >
          <Phone className="h-4 w-4" />
          {site.phones[1]}
        </a>
      </div>
    </header>
  );
}
