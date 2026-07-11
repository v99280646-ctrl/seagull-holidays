const services = [
  "🌴 Lakshadweep Holiday Packages",
  "🇸🇬 Singapore Tour Packages",
  "🇲🇾 Malaysia Getaways",
  "💑 Honeymoon Special Packages",
  "✈️ Flight Ticket Booking",
  "🏨 Hotel & Resort Reservations",
  "🛂 Visa Assistance",
  "🚤 Island Hopping Tours",
  "🤿 Scuba Diving & Water Sports",
  "👨‍👩‍👧 Family Vacation Packages",
  "👥 Group Tour Packages",
  "🚖 Airport Transfers",
  "🎉 Customized Holiday Packages",
  "🌍 Domestic & International Tours",
  "⭐ Trusted Travel Partner",
];

export function ServiceMarquee() {
  const loop = [...services, ...services];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="animate-marquee flex w-max items-center gap-4 px-4">
        {loop.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="whitespace-nowrap rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
