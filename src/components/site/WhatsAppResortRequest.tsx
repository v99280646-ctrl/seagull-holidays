"use client";

import { useMemo, useState } from "react";
import { Calendar, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inr } from "@/data/site";

type ResortOption = {
  name: string;
  price: number;
  duration: string;
  inclusions: string[];
};

type Props = {
  whatsappNumber: string;
  resortName: string;
  resortLocation: string;
  pricePerNight: number;
  options: ResortOption[];
};

export function WhatsAppResortRequest({
  whatsappNumber,
  resortName,
  resortLocation,
  pricePerNight,
  options,
}: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState("0");

  const selectedOption = useMemo(
    () => options[Number(selectedOptionIndex)] ?? options[0],
    [options, selectedOptionIndex],
  );

  const message = useMemo(() => {
    const selected = selectedOption ?? options[0];
    return [
      "New resort enquiry from Seagull Holidays website:",
      `Resort: ${resortName}`,
      `Selected option: ${selected?.name ?? resortName}`,
      `Nightly price: ${inr(selected?.price ?? pricePerNight)}`,
      `Check-in: ${checkIn || "Not selected"}`,
      `Check-out: ${checkOut || "Not selected"}`,
      `Guests: ${guests}`,
      `Location: ${resortLocation}`,
    ].join("\n");
  }, [checkIn, checkOut, guests, options, pricePerNight, resortLocation, resortName, selectedOption]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
      <h2 className="text-xl font-bold">Check Availability on WhatsApp</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Share your stay dates and guest count for a quicker response.
      </p>

      <div className="mt-5 rounded-2xl bg-secondary/60 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Selected room</p>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              {selectedOption?.name ?? resortName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-extrabold text-primary">
              {inr(selectedOption?.price ?? pricePerNight)}
            </p>
            <p className="text-xs text-muted-foreground">/night</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block text-sm font-medium">
          <span className="mb-1 block text-muted-foreground">Resort</span>
          <div className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            {resortName}
          </div>
        </label>

        <label className="block text-sm font-medium">
          <span className="mb-1 block text-muted-foreground">Room / stay option</span>
          <select
            value={selectedOptionIndex}
            onChange={(e) => setSelectedOptionIndex(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {options.map((option, index) => (
              <option key={`${option.name}-${index}`} value={String(index)}>
                {option.name} - {inr(option.price)}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            <span className="mb-1 flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> Check-in
            </span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="block text-sm font-medium">
            <span className="mb-1 flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> Check-out
            </span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          <span className="mb-1 flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" /> Guests
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={String(n)}>
                {n} guest{n > 1 ? "s" : ""}
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
