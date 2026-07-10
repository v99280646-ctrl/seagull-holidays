import { packages as fallbackPackages, type Package } from "@/data/site";

type ApiPackageOption = {
  name?: string;
  type?: string;
  price?: number;
  duration?: string;
  inclusions?: string[];
};

type ApiItem = {
  _id?: string;
  slug?: string;
  name?: string;
  description?: string;
  images?: string[];
  location?: string;
  button?: string;
  featured?: boolean;
  status?: string;
  packages?: ApiPackageOption[];
  category?: { name?: string };
};

type ApiResponse = {
  success?: boolean;
  data?: ApiItem | ApiItem[];
  items?: ApiItem[];
  rows?: ApiItem[];
  results?: ApiItem[];
};

const API_URL =
  "https://backbin.colaber.in/business_website/catalogue/service/get_catalogue_service_items_for_public?subdomain=seagulholidays.com&slug=tour-packages&page=1&limit=20&search=";
const DETAILS_URL =
  "https://backbin.colaber.in/business_website/catalogue/service/get_catalogue_service_details_for_public?subdomain=seagulholidays.com";

function parseDuration(duration?: string) {
  if (!duration) return { days: 0, nights: 0 };
  const match = duration.match(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i);
  if (!match) return { days: 0, nights: 0 };
  return { days: Number(match[1]), nights: Number(match[2]) };
}

function normalizeItem(item: ApiItem, index: number): Package {
  const firstOption = item.packages?.[0];
  const fallback = fallbackPackages[index % fallbackPackages.length];
  const packageOptions =
    item.packages?.length
      ? item.packages.map((pkg, pkgIndex) => {
          const { days, nights } = parseDuration(pkg.duration);
          const fallbackOption = fallback.packageOptions?.[pkgIndex % (fallback.packageOptions?.length || 1)];
          return {
            name: pkg.name ?? pkg.type ?? fallbackOption?.name ?? `Option ${pkgIndex + 1}`,
            price: pkg.price ?? fallbackOption?.price ?? fallback.price,
            duration: pkg.duration ?? fallbackOption?.duration ?? `${fallback.days} Days / ${fallback.nights} Nights`,
            inclusions: pkg.inclusions ?? fallbackOption?.inclusions ?? fallback.inclusions,
            days,
            nights,
          };
        })
      : fallback.packageOptions;
  const primaryOption = packageOptions?.[0];
  const { days, nights } = parseDuration(primaryOption?.duration);
  const price = primaryOption?.price ?? fallback.price;

  return {
    slug: item.slug ?? item._id ?? `package-${index}`,
    title: item.name ?? fallback.title,
    location: item.location ?? item.category?.name ?? fallback.location,
    image: item.images?.[0] ?? fallback.image,
    days: days || fallback.days,
    nights: nights || fallback.nights,
    price,
    oldPrice: fallback.oldPrice,
    rating: fallback.rating,
    reviews: fallback.reviews,
    category: item.category?.name ?? fallback.category,
    badge: item.featured ? "Featured" : fallback.badge,
    summary: item.description?.split("\n")[0] ?? fallback.summary,
    highlights: fallback.highlights,
    inclusions: primaryOption?.inclusions ?? fallback.inclusions,
    exclusions: fallback.exclusions,
    itinerary: fallback.itinerary,
    packageOptions,
  };
}

function extractItems(payload: ApiResponse): ApiItem[] {
  if (payload.data && !Array.isArray(payload.data) && typeof payload.data === "object") return [payload.data];
  return payload.data ?? payload.items ?? payload.rows ?? payload.results ?? [];
}

export async function getPackageCards(): Promise<Package[]> {
  try {
    const response = await fetch(API_URL, {
      headers: { accept: "application/json" },
    });

    if (!response.ok) return fallbackPackages;

    const payload = (await response.json()) as ApiResponse;
    const items = extractItems(payload);
    if (!items.length) return fallbackPackages;

    return items.map(normalizeItem);
  } catch {
    return fallbackPackages;
  }
}

export async function getPackageDetail(serviceSlug: string): Promise<Package | null> {
  try {
    const url = new URL(DETAILS_URL);
    url.searchParams.set("serviceSlug", serviceSlug);

    const response = await fetch(url.toString(), {
      headers: { accept: "application/json" },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as ApiResponse;
    const item = extractItems(payload)[0];
    if (!item) return null;

    return normalizeItem(item, 0);
  } catch {
    return null;
  }
}
