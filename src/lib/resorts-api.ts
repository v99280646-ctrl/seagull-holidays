import { resorts as fallbackResorts, type Resort } from "@/data/site";

type ApiRoomOption = {
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
  featured?: boolean;
  status?: string;
  packages?: ApiRoomOption[];
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
  "https://backbin.colaber.in/business_website/catalogue/service/get_catalogue_service_items_for_public?subdomain=seagulholidays.com&slug=resorts&page=1&limit=20&search=";
const DETAILS_URL =
  "https://backbin.colaber.in/business_website/catalogue/service/get_catalogue_service_details_for_public?subdomain=seagulholidays.com";

function parseDuration(duration?: string) {
  if (!duration) return "";
  const normalized = duration.trim();
  return normalized;
}

function normalizeItem(item: ApiItem, index: number): Resort {
  const firstOption = item.packages?.[0];
  const fallback = fallbackResorts[index % fallbackResorts.length];
  const pricePerNight = firstOption?.price ?? fallback.pricePerNight;
  const roomLabel = firstOption?.duration ? parseDuration(firstOption.duration) : fallback.type;
  const packageOptions =
    item.packages?.length
      ? item.packages.map((pkg, pkgIndex) => ({
          name: pkg.name ?? pkg.type ?? `Option ${pkgIndex + 1}`,
          price: pkg.price ?? pricePerNight,
          duration: pkg.duration ?? roomLabel,
          inclusions: pkg.inclusions ?? [],
        }))
      : fallback.roomTypes.map((room) => ({
          name: room.name,
          price: room.price,
          duration: room.details,
          inclusions: [],
        }));

  return {
    slug: item.slug ?? item._id ?? `resort-${index}`,
    name: item.name ?? fallback.name,
    location: item.location ?? item.category?.name ?? fallback.location,
    image: item.images?.[0] ?? fallback.image,
    gallery: item.images?.length ? item.images : fallback.gallery,
    pricePerNight,
    rating: fallback.rating,
    reviews: fallback.reviews,
    type: item.featured ? "Featured Resort" : roomLabel || fallback.type,
    summary: item.description?.split("\n")[0] ?? fallback.summary,
    amenities: fallback.amenities,
    roomTypes: firstOption
      ? [
          {
            name: firstOption?.duration ? firstOption.duration : firstOption?.name ?? fallback.roomTypes[0].name,
            price: pricePerNight,
            details: firstOption?.duration ? parseDuration(firstOption.duration) : fallback.roomTypes[0].details,
          },
        ]
      : fallback.roomTypes,
    packageOptions,
  };
}

function extractItems(payload: ApiResponse): ApiItem[] {
  if (payload.data && !Array.isArray(payload.data) && typeof payload.data === "object") return [payload.data];
  return payload.data ?? payload.items ?? payload.rows ?? payload.results ?? [];
}

export async function getResortCards(): Promise<Resort[]> {
  try {
    const response = await fetch(API_URL, {
      headers: { accept: "application/json" },
    });

    if (!response.ok) return fallbackResorts;

    const payload = (await response.json()) as ApiResponse;
    const items = extractItems(payload);
    if (!items.length) return fallbackResorts;

    return items.map(normalizeItem);
  } catch {
    return fallbackResorts;
  }
}

export async function getResortDetail(serviceSlug: string): Promise<Resort | null> {
  try {
    const url = new URL(DETAILS_URL);
    url.searchParams.set("serviceSlug", serviceSlug);

    const response = await fetch(url.toString(), {
      headers: { accept: "application/json" },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as ApiResponse;
    const item = Array.isArray(payload.data) ? payload.data[0] : payload.data ?? payload.items?.[0] ?? payload.rows?.[0] ?? payload.results?.[0];
    if (!item) return null;

    return normalizeItem(item, 0);
  } catch {
    return null;
  }
}
