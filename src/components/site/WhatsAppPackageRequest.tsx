"use client";

import { useMemo, useState } from "react";
import { Calendar, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inr } from "@/data/site";

type PackageOption = {
  name: string;
  price: number;
  duration: string;
  inclusions: string[];
};

type Props = {
  whatsappNumber: string;
  packageTitle: string;
  packageLocation: string;
  packagePrice: number;
  packageOptions: PackageOption[];
};

export function WhatsAppPackageRequest({
  whatsappNumber,
  packageTitle,
  packageLocation,
  packagePrice,
  packageOptions,
}: Props) {
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [selectedPackageIndex, setSelectedPackageIndex] = useState("0");

  const selectedPackage = useMemo(
    () => packageOptions[Number(selectedPackageIndex)] ?? packageOptions[0],
    [packageOptions, selectedPackageIndex],
  );

  const message = useMemo(() => {
    const selected = selectedPackage ?? packageOptions[0];
    return [
      "New package enquiry from Seagull Holidays website:",
      `Package: ${packageTitle}`,
      `Selected option: ${selected?.name ?? packageTitle}`,
      `Price: ${inr(selected?.price ?? packagePrice)}`,
      `Travel date: ${travelDate || "Not selected"}`,
      `Travellers: ${travellers}`,
      `Location: ${packageLocation}`,
    ].join("\n");
  }, [packageLocation, packagePrice, packageTitle, packageOptions, selectedPackage, travelDate, travellers]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
      <h2 className="text-xl font-bold">Request on WhatsApp</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Share your package, date and travellers to get a faster quote.
      </p>

      <div className="mt-5 rounded-2xl bg-secondary/60 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Selected package</p>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              {selectedPackage?.name ?? packageTitle}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-extrabold text-primary">
              {inr(selectedPackage?.price ?? packagePrice)}
            </p>
            <p className="text-xs text-muted-foreground">/person</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block text-sm font-medium">
          <span className="mb-1 block text-muted-foreground">Package</span>
          <div className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            {packageTitle}
          </div>
        </label>

        <label className="block text-sm font-medium">
          <span className="mb-1 block text-muted-foreground">Package option</span>
          <select
            value={selectedPackageIndex}
            onChange={(e) => setSelectedPackageIndex(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {packageOptions.map((option, index) => (
              <option key={`${option.name}-${index}`} value={String(index)}>
                {option.name} - {inr(option.price)}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          <span className="mb-1 flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-4 w-4" /> Travel date
          </span>
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="block text-sm font-medium">
          <span className="mb-1 flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4" /> Travellers
          </span>
          <select
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={String(n)}>
                {n} traveller{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Button size="lg" variant="coral" className="mt-6 w-full" onClick={handleWhatsAppClick}>
        <MessageCircle className="h-4 w-4" />
        Send Request on WhatsApp
      </Button>
    </div>
  );
}
