const items = [
  "✈️ Book Your Dream Vacation Today",
  "🌴 Explore Lakshadweep Paradise",
  "🇸🇬 Discover Singapore",
  "🇲🇾 Experience Malaysia",
  "💑 Romantic Honeymoon Packages",
  "🏝️ Beach Holidays",
  "🏨 Premium Resort Stays",
  "🛂 Hassle-Free Visa Assistance",
  "🎒 Personalized Travel Plans",
  "⭐ Best Prices Guaranteed",
  "📞 24/7 Travel Support",
  "🌍 Your Journey Begins with Seagull Holidays",
];

export function PromoScrollBar() {
  const loop = [...items, ...items];

  return (
    <div className="sticky top-16 z-40 border-b border-blue-700/20 bg-blue-600 text-white shadow-md">
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-6 px-4 py-2 text-sm font-semibold tracking-wide">
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className="whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
