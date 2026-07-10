import heroImg from "@/assets/hero.jpg";
import scubaImg from "@/assets/scuba.jpg";
import backwatersImg from "@/assets/backwaters.jpg";
import kayakImg from "@/assets/kayak.jpg";
import honeymoonImg from "@/assets/honeymoon.jpg";
import bangaramImg from "@/assets/dest-bangaram.jpg";
import kavarattiImg from "@/assets/dest-kavaratti.jpg";
import minicoyImg from "@/assets/dest-minicoy.jpg";
import resort1Img from "@/assets/resort1.jpg";
import resort2Img from "@/assets/resort2.jpg";
import resort3Img from "@/assets/resort3.jpg";

import type { StaticImageData } from "next/image";

export const site = {
  name: "Seagull Holidays",
  tagline: "Your trusted island travel partner",
  phones: ["088919 66795", "+91 97447 79695"],
  hours: "Monday – Saturday: 9:00 AM – 8:00 PM",
  availability: "Available 9AM – 8PM (GST) · We respond within 24 hours",
  email: "info@seagullholidays.com",
  address: "Near BRB Club, Agathi Island, Agatti, Lakshadweep 682553",
  headOffice: {
    label: "Head Office",
    lines: [
      "Seagull Holidays Tour & Travels",
      "Near Gas Godown, Airport Road",
      "Agathi Island, Lakshadweep – 682553",
    ],
  },
  branchOffice: {
    label: "Branch Office",
    lines: [
      "Oruma Building, 1st Floor",
      "Puthiyaroad, Karupadanna",
      "Kodungallur, Thrissur, Kerala – 680670",
    ],
  },
  about:
    "Seagull Holidays is your trusted travel partner, offering customized holiday packages, flight bookings, hotel reservations, and tour planning services. Whether you're dreaming of a relaxing beach getaway, an adventurous trek, or a cultural exploration, we make your travel dreams come true with personalized service and expert guidance. Built on quality, reliability, and customer satisfaction, Seagull Holidays is here to make every journey memorable.",
};

export const images = {
  hero: heroImg,
};

export type Package = {
  slug: string;
  title: string;
  location: string;
  image: string | StaticImageData;
  days: number;
  nights: number;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  badge?: string;
  summary: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; detail: string }[];
  packageOptions?: { name: string; price: number; duration: string; inclusions: string[] }[];
};

export const packages: Package[] = [
  {
    slug: "agatti-island-escape",
    title: "Agatti Island Escape",
    location: "Agatti, Lakshadweep",
    image: heroImg,
    days: 4,
    nights: 3,
    price: 24999,
    oldPrice: 31999,
    rating: 4.9,
    reviews: 218,
    category: "Beach",
    badge: "Bestseller",
    summary:
      "Turquoise lagoons, coral reefs and powder-white beaches on the gateway island of Lakshadweep.",
    highlights: [
      "Lagoon snorkelling with reef fish",
      "Sunset dhow cruise",
      "Beachfront cottage stay",
      "Island cycling tour",
    ],
    inclusions: [
      "3 nights beachfront accommodation",
      "Daily breakfast & dinner",
      "Airport transfers & permits",
      "Snorkelling gear & guide",
    ],
    exclusions: ["Airfare to Agatti", "Personal expenses", "Water sports not listed", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrival & lagoon sunset", detail: "Arrive at Agatti, check in to your beachfront cottage and unwind with a sunset walk along the lagoon." },
      { day: 2, title: "Snorkelling & reef day", detail: "Full-day guided snorkelling over vibrant coral gardens followed by a fresh seafood lunch." },
      { day: 3, title: "Island explorer", detail: "Cycle around the island, visit local villages and enjoy an evening dhow cruise." },
      { day: 4, title: "Departure", detail: "Relaxed morning by the beach before your transfer to the airport." },
    ],
  },
  {
    slug: "bangaram-luxury-getaway",
    title: "Bangaram Luxury Getaway",
    location: "Bangaram, Lakshadweep",
    image: bangaramImg,
    days: 5,
    nights: 4,
    price: 42999,
    oldPrice: 49999,
    rating: 4.8,
    reviews: 164,
    category: "Luxury",
    badge: "Premium",
    summary:
      "An uninhabited paradise of teardrop lagoons, private beaches and world-class diving.",
    highlights: [
      "Private island lagoon",
      "Scuba diving experience",
      "Candlelight beach dinner",
      "Glass-bottom boat ride",
    ],
    inclusions: [
      "4 nights premium tented villa",
      "All meals included",
      "Boat transfers from Agatti",
      "One guided scuba dive",
    ],
    exclusions: ["Airfare", "Additional dives", "Spa treatments", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Transfer to Bangaram", detail: "Scenic boat ride from Agatti to the private island and check-in." },
      { day: 2, title: "Discover scuba", detail: "Beginner-friendly guided dive over the house reef." },
      { day: 3, title: "Lagoon leisure", detail: "Kayaking, glass-bottom boat and a candlelight beach dinner." },
      { day: 4, title: "Island hopping", detail: "Excursion to nearby Thinnakara sandbank." },
      { day: 5, title: "Departure", detail: "Morning at leisure and return transfer." },
    ],
  },
  {
    slug: "kavaratti-cultural-voyage",
    title: "Kavaratti Cultural Voyage",
    location: "Kavaratti, Lakshadweep",
    image: kavarattiImg,
    days: 4,
    nights: 3,
    price: 27999,
    rating: 4.7,
    reviews: 132,
    category: "Cultural",
    summary:
      "Discover the capital island's marine aquarium, mosques and calm swimming lagoons.",
    highlights: [
      "Marine aquarium visit",
      "Ujra Mosque heritage walk",
      "Lagoon swimming",
      "Local cuisine tasting",
    ],
    inclusions: ["3 nights stay", "Breakfast & dinner", "Permits & transfers", "Guided island tour"],
    exclusions: ["Airfare", "Lunch", "Water sports", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival", detail: "Arrive at Kavaratti and settle into your lagoon-view stay." },
      { day: 2, title: "Heritage & marine life", detail: "Visit the marine aquarium and historic Ujra Mosque." },
      { day: 3, title: "Lagoon day", detail: "Swimming, kayaking and a local cuisine tasting evening." },
      { day: 4, title: "Departure", detail: "Free morning and transfer to the jetty/airport." },
    ],
  },
  {
    slug: "kerala-backwater-bliss",
    title: "Kerala Backwater Bliss",
    location: "Alleppey, Kerala",
    image: backwatersImg,
    days: 3,
    nights: 2,
    price: 18999,
    oldPrice: 22999,
    rating: 4.8,
    reviews: 289,
    category: "Backwaters",
    badge: "Popular",
    summary:
      "Cruise the emerald backwaters aboard a private houseboat with authentic Kerala cuisine.",
    highlights: [
      "Private houseboat cruise",
      "Village backwater tour",
      "Kathakali performance",
      "Ayurvedic spa session",
    ],
    inclusions: ["2 nights (houseboat + resort)", "All meals on houseboat", "Sightseeing transfers", "Welcome drink"],
    exclusions: ["Airfare/train", "Spa upgrades", "Entry tickets", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Houseboat check-in", detail: "Board your private kettuvallam and cruise the backwaters." },
      { day: 2, title: "Village & culture", detail: "Explore backwater villages and enjoy a Kathakali performance." },
      { day: 3, title: "Departure", detail: "Ayurvedic session before your onward journey." },
    ],
  },
  {
    slug: "minicoy-lighthouse-trail",
    title: "Minicoy Lighthouse Trail",
    location: "Minicoy, Lakshadweep",
    image: minicoyImg,
    days: 5,
    nights: 4,
    price: 38999,
    rating: 4.7,
    reviews: 98,
    category: "Adventure",
    summary:
      "The southernmost island's twin lagoons, historic lighthouse and Maldivian-influenced culture.",
    highlights: [
      "Climb the 1885 lighthouse",
      "Twin lagoon kayaking",
      "Tuna fishing experience",
      "Traditional Lava dance",
    ],
    inclusions: ["4 nights stay", "Breakfast & dinner", "Permits & transfers", "Guided excursions"],
    exclusions: ["Airfare", "Lunch", "Fishing gear upgrades", "Insurance"],
    itinerary: [
      { day: 1, title: "Arrival", detail: "Reach Minicoy and check in near the lagoon." },
      { day: 2, title: "Lighthouse & village", detail: "Climb the historic lighthouse and tour the villages." },
      { day: 3, title: "Lagoon adventures", detail: "Kayaking and snorkelling across the twin lagoons." },
      { day: 4, title: "Fishing & culture", detail: "Tuna fishing trip and traditional Lava dance evening." },
      { day: 5, title: "Departure", detail: "Leisure morning and return transfer." },
    ],
  },
  {
    slug: "honeymoon-island-romance",
    title: "Honeymoon Island Romance",
    location: "Agatti & Bangaram",
    image: honeymoonImg,
    days: 6,
    nights: 5,
    price: 54999,
    oldPrice: 62999,
    rating: 5.0,
    reviews: 176,
    category: "Honeymoon",
    badge: "Couples",
    summary:
      "A romantic island duo with private dinners, sunset cruises and pampering spa moments.",
    highlights: [
      "Private candlelight dinners",
      "Couple sunset cruise",
      "Beach spa for two",
      "Floating breakfast",
    ],
    inclusions: ["5 nights premium stay", "All meals + one private dinner", "Inter-island transfers", "Couple spa session"],
    exclusions: ["Airfare", "Additional excursions", "Premium beverages", "Insurance"],
    itinerary: [
      { day: 1, title: "Welcome to Agatti", detail: "Romantic beachfront check-in with welcome floral décor." },
      { day: 2, title: "Lagoon & spa", detail: "Snorkelling followed by a couple's beach spa." },
      { day: 3, title: "Sail to Bangaram", detail: "Transfer to a private island with a floating breakfast." },
      { day: 4, title: "Sunset romance", detail: "Sunset cruise and candlelight beach dinner." },
      { day: 5, title: "Island leisure", detail: "Kayaking, glass-bottom boat and relaxation." },
      { day: 6, title: "Departure", detail: "Farewell breakfast and transfer home." },
    ],
  },
];

export type Destination = {
  slug: string;
  name: string;
  region: string;
  image: string | StaticImageData;
  packages: number;
  tag: string;
  description: string;
};

export const destinations: Destination[] = [
  { slug: "agatti", name: "Agatti Island", region: "Lakshadweep", image: heroImg, packages: 8, tag: "Gateway island", description: "The only island in Lakshadweep with an airport, ringed by shallow turquoise lagoons perfect for snorkelling." },
  { slug: "bangaram", name: "Bangaram Atoll", region: "Lakshadweep", image: bangaramImg, packages: 5, tag: "Private paradise", description: "An uninhabited teardrop island famed for its private beaches, coral reefs and world-class diving." },
  { slug: "kavaratti", name: "Kavaratti", region: "Lakshadweep", image: kavarattiImg, packages: 6, tag: "Capital charm", description: "The administrative capital, home to a marine aquarium, elegant mosques and calm swimming lagoons." },
  { slug: "minicoy", name: "Minicoy Island", region: "Lakshadweep", image: minicoyImg, packages: 4, tag: "Southern gem", description: "The crescent-shaped southernmost island with twin lagoons and a distinct Maldivian-influenced culture." },
  { slug: "alleppey", name: "Alleppey Backwaters", region: "Kerala", image: backwatersImg, packages: 7, tag: "Backwater bliss", description: "Endless palm-fringed canals best explored aboard a traditional houseboat at sunset." },
  { slug: "thinnakara", name: "Thinnakara Sandbank", region: "Lakshadweep", image: kayakImg, packages: 3, tag: "Water sports", description: "A tiny uninhabited islet with shimmering sandbanks ideal for kayaking and lagoon adventures." },
];

export type Resort = {
  slug: string;
  name: string;
  location: string;
  image: string | StaticImageData;
  gallery: (string | StaticImageData)[];
  pricePerNight: number;
  rating: number;
  reviews: number;
  type: string;
  summary: string;
  amenities: string[];
  roomTypes: { name: string; price: number; details: string }[];
  packageOptions?: { name: string; price: number; duration: string; inclusions: string[] }[];
};

export const resorts: Resort[] = [
  {
    slug: "lagoon-water-villas",
    name: "Lagoon Water Villas",
    location: "Agatti, Lakshadweep",
    image: resort1Img,
    gallery: [resort1Img, honeymoonImg, kayakImg],
    pricePerNight: 14500,
    rating: 4.9,
    reviews: 342,
    type: "Overwater Villa",
    summary: "Elegant overwater villas suspended above a crystal lagoon with private sundeck access to the reef.",
    amenities: ["Private sundeck", "Lagoon access", "All-day dining", "Free snorkelling gear", "Airport transfer", "Wi-Fi"],
    roomTypes: [
      { name: "Lagoon Water Villa", price: 14500, details: "45 sqm · overwater deck · king bed" },
      { name: "Sunset Water Suite", price: 19500, details: "62 sqm · private pool · sunset facing" },
    ],
  },
  {
    slug: "coral-beach-cottages",
    name: "Coral Beach Cottages",
    location: "Bangaram, Lakshadweep",
    image: resort2Img,
    gallery: [resort2Img, bangaramImg, scubaImg],
    pricePerNight: 9800,
    rating: 4.7,
    reviews: 268,
    type: "Beach Cottage",
    summary: "Thatched-roof beachfront cottages nestled among coconut palms, steps from a powder-white beach.",
    amenities: ["Beachfront", "Restaurant & bar", "Dive centre", "Bicycle hire", "Garden view", "Wi-Fi"],
    roomTypes: [
      { name: "Garden Cottage", price: 9800, details: "32 sqm · garden view · twin/king" },
      { name: "Beachfront Cottage", price: 12800, details: "38 sqm · direct beach access" },
    ],
  },
  {
    slug: "sunset-infinity-resort",
    name: "Sunset Infinity Resort",
    location: "Kavaratti, Lakshadweep",
    image: resort3Img,
    gallery: [resort3Img, resort1Img, minicoyImg],
    pricePerNight: 12200,
    rating: 4.8,
    reviews: 301,
    type: "Beach Resort",
    summary: "A refined resort with an ocean-edge infinity pool and sweeping sunset views over the Arabian Sea.",
    amenities: ["Infinity pool", "Spa & wellness", "Multi-cuisine dining", "Water sports desk", "Sea view", "Wi-Fi"],
    roomTypes: [
      { name: "Deluxe Sea View", price: 12200, details: "40 sqm · balcony · sea view" },
      { name: "Pool Suite", price: 17600, details: "58 sqm · private plunge pool" },
    ],
  },
  {
    slug: "palm-grove-retreat",
    name: "Palm Grove Retreat",
    location: "Minicoy, Lakshadweep",
    image: resort2Img,
    gallery: [resort2Img, minicoyImg, kayakImg],
    pricePerNight: 8600,
    rating: 4.6,
    reviews: 154,
    type: "Eco Retreat",
    summary: "A tranquil eco retreat tucked in a coconut grove beside the twin lagoons of Minicoy.",
    amenities: ["Eco cottages", "Organic kitchen", "Kayak rental", "Lagoon access", "Yoga deck", "Wi-Fi"],
    roomTypes: [
      { name: "Grove Cottage", price: 8600, details: "30 sqm · grove view" },
      { name: "Lagoon Cottage", price: 11200, details: "36 sqm · lagoon facing" },
    ],
  },
];

export type Activity = {
  title: string;
  image: string | StaticImageData;
  description: string;
};

export const activities: Activity[] = [
  { title: "Scuba Diving", image: scubaImg, description: "Explore vivid coral reefs with certified guides." },
  { title: "Snorkelling", image: kavarattiImg, description: "Glide over shallow lagoons teeming with fish." },
  { title: "Kayaking", image: kayakImg, description: "Paddle across glassy turquoise waters." },
  { title: "Sunset Cruise", image: resort3Img, description: "Sail into golden-hour horizons." },
  { title: "Backwater Houseboat", image: backwatersImg, description: "Drift through palm-lined Kerala canals." },
  { title: "Island Hopping", image: bangaramImg, description: "Discover secluded sandbanks and atolls." },
];

export type Reel = {
  video: string;
  caption: string;
};

export const reels: Reel[] = [
  { video: "https://www.image2url.com/r2/default/videos/1783675161699-336074bc-01a1-4c88-b5da-15d2d26cbcab.mp4", caption: "Agatti from above" },
  { video: "https://www.image2url.com/r2/default/videos/1783675735009-cc0ff9a9-b7d6-489c-b107-8cf11b149200.mp4", caption: "Reef diving" },
  { video: "https://www.image2url.com/r2/default/videos/1783675769728-6fcbd636-7ed5-4f0e-a84f-d8957b460168.mp4", caption: "Bangaram beach" },
  { video: "https://www.image2url.com/r2/default/videos/1783675809406-26ee66f1-4d2e-4a74-9607-48173b88030e.mp4", caption: "Lagoon kayaking" },
  { video: "https://www.image2url.com/r2/default/videos/1783675941756-55de2bd2-7d5e-49f7-b00c-d3fcf402f11b.mp4", caption: "Kerala sunset" },
  { video: "https://www.image2url.com/r2/default/videos/1783675977443-6d9989fe-5613-40e1-94c7-d1b4392a3273.mp4", caption: "Infinity evenings" },
  { video: "https://www.image2url.com/r2/default/videos/1783676080515-d70baa30-d3ef-4c04-ab4f-19083118cf62.mp4", caption: "Island romance" },
  { video: "https://www.image2url.com/r2/default/videos/1783676117569-3d299590-76db-42ec-be24-931e86dcd652.mp4", caption: "Minicoy lighthouse" },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
