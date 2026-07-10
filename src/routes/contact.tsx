import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Seagull Holidays | Agatti, Lakshadweep" },
      {
        name: "description",
        content:
          "Get in touch with Seagull Holidays for customized Lakshadweep and Kerala tour packages. Call +91 97447 79695 or email info@seagullholidays.com. We respond within 24 hours.",
      },
      { property: "og:title", content: "Contact Seagull Holidays" },
      { property: "og:description", content: "Reach our island travel experts in Agatti, Lakshadweep." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const whatsappNumber = "919744779695";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const email = String(formData.get("email") ?? "");
    const interest = String(formData.get("interest") ?? "");
    const message = String(formData.get("message") ?? "");
    const whatsappMessage = [
      "New enquiry from Seagull Holidays website:",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Interested in: ${interest}`,
      `Message: ${message}`,
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Planning a trip or have a question? Our travel experts are here to help — we respond within 24 hours."
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Info */}
        <div className="space-y-5">
          <ContactRow icon={Phone} title="Call us">
            {site.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-primary">{p}</a>
            ))}
            <span className="text-sm text-muted-foreground">{site.availability}</span>
          </ContactRow>

          <ContactRow icon={Mail} title="Email us">
            <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
            <span className="text-sm text-muted-foreground">We respond within 24 hours</span>
          </ContactRow>

          <ContactRow icon={Clock} title="Business hours">
            <span>{site.hours}</span>
          </ContactRow>

          <ContactRow icon={MapPin} title={site.headOffice.label}>
            {site.headOffice.lines.map((l) => <span key={l} className="block">{l}</span>)}
          </ContactRow>

          <ContactRow icon={MapPin} title={site.branchOffice.label}>
            {site.branchOffice.lines.map((l) => <span key={l} className="block">{l}</span>)}
          </ContactRow>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="h-14 w-14 text-ocean" />
              <h2 className="mt-4 text-2xl font-bold">Thank you!</h2>
              <p className="mt-2 text-muted-foreground">Your enquiry has been received. Our team will get back to you within 24 hours.</p>
              <Button variant="coral" className="mt-6" onClick={() => setSent(false)}>Send another</Button>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold">Send us an enquiry</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name"><input name="name" required className="input-field" placeholder="Your name" /></Field>
                <Field label="Phone"><input name="phone" required className="input-field" placeholder="Your phone" /></Field>
              </div>
              <Field label="Email"><input name="email" type="email" required className="input-field" placeholder="you@email.com" /></Field>
              <Field label="Interested in">
                <select name="interest" className="input-field">
                  <option>Holiday Package</option>
                  <option>Resort Booking</option>
                  <option>Flight Booking</option>
                  <option>Custom Tour</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea name="message" rows={4} className="input-field" placeholder="Tell us about your dream trip..." />
              </Field>
              <Button type="submit" size="lg" variant="coral" className="w-full">
                <Send className="h-4 w-4" /> Submit Enquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, title, children }: { icon: typeof Phone; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-ocean text-ocean-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-1 space-y-0.5 text-foreground/90">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
