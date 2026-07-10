import { destinations as fallbackDestinations, type Destination } from "@/data/site";

type ApiItem = {
  _id?: string;
  slug?: string;
  name?: string;
  title?: string;
  region?: string;
  location?: string;
  image?: string;
  thumbnail?: string;
  images?: string[];
  packages?: number | Array<unknown>;
  tag?: string;
  description?: string;
  featured?: boolean;
  category?: {
    name?: string;
  };
};

type ApiResponse = {
  success?: boolean;
  data?: ApiItem[] | { items?: ApiItem[]; rows?: ApiItem[]; results?: ApiItem[] };
  items?: ApiItem[];
  rows?: ApiItem[];
  results?: ApiItem[];
};

const API_URL =
  "https://backbin.colaber.in/business_website/catalogue/service/get_catalogue_service_items_for_public?subdomain=seagulholidays.com&slug=Destinations&page=1&limit=20&search=";

function normalizeItem(item: ApiItem, index: number): Destination {
  const packageCount = Array.isArray(item.packages) ? item.packages.length : Number(item.packages ?? 0);
  const image = item.image ?? item.thumbnail ?? item.images?.[0] ?? fallbackDestinations[index % fallbackDestinations.length]?.image;

  return {
    slug: item.slug ?? item._id ?? `destination-${index}`,
    name: item.name ?? item.title ?? "Destination",
    region: item.region ?? item.location ?? item.category?.name ?? "Travel",
    image,
    packages: packageCount,
    tag: item.tag ?? (item.featured ? "Featured" : "Destination"),
    description: item.description ?? "",
  };
}

function extractItems(payload: ApiResponse): ApiItem[] {
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && typeof payload.data === "object") {
    const nested = payload.data.items ?? payload.data.rows ?? payload.data.results;
    if (Array.isArray(nested)) return nested;
  }
  return payload.items ?? payload.rows ?? payload.results ?? [];
}

export async function getDestinationCards(): Promise<Destination[]> {
  try {
    const url = new URL(API_URL);
    url.searchParams.set("hostname", "www.seagulholidays.com");
    url.searchParams.set("accountTypeId", "1");

    const response = await fetch(url.toString(), {
      headers: { accept: "application/json" },
    });

    if (!response.ok) return fallbackDestinations;

    const payload = (await response.json()) as ApiResponse;
    const items = extractItems(payload);
    if (!items.length) return fallbackDestinations;

    return items.map(normalizeItem).filter(Boolean);
  } catch {
    return fallbackDestinations;
  }
}
