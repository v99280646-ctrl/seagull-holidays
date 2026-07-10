export function GET() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://www.seagulholidays.com/sitemap.xml
`,
    {
      headers: { "Content-Type": "text/plain" },
    },
  );
}
