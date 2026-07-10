import { packages, resorts } from "@/data/site";

export function GET() {
  const base = "https://www.seagulholidays.com";
  const urls = [
    "",
    "/packages",
    "/destinations",
    "/resorts",
    "/contact",
    ...packages.map((p) => `/packages/${p.slug}`),
    ...resorts.map((r) => `/resorts/${r.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => `  <url><loc>${base}${path}</loc></url>`)
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
