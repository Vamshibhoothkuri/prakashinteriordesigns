import svcKitchen from "@/assets/svc-kitchen.jpg";
import svcWardrobe from "@/assets/svc-wardrobe.jpg";
import svcCabinets from "@/assets/svc-cabinets.jpg";
import svcBed from "@/assets/svc-bed.jpg";
import svcSofa from "@/assets/svc-sofa.jpg";
import svcTvUnit from "@/assets/svc-tvunit.jpg";
import svcCurtains from "@/assets/svc-curtains.jpg";
import svcCeiling from "@/assets/svc-ceiling.jpg";
import svcWallpaper from "@/assets/svc-wallpaper.jpg";
import svcPartition from "@/assets/svc-partition.jpg";
import svcCrockery from "@/assets/svc-crockery.jpg";
import svcTheatre from "@/assets/svc-theatre.jpg";
import svcRestaurant from "@/assets/svc-restaurant.jpg";
import svcHotel from "@/assets/svc-hotel.jpg";

export interface TypeNode {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
}
export interface SubNode {
  slug: string;
  name: string;
  description: string;
  cover: string;
  types: TypeNode[];
}
export interface CatNode {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  premium?: boolean;
  subcategories: SubNode[];
}

export const PROPERTY_TYPES = [
  { slug: "duplex", name: "Duplex House" },
  { slug: "apartment", name: "Apartment" },
  { slug: "independent", name: "Independent House" },
] as const;

const t = (slug: string, name: string, tagline: string, cover: string, description?: string): TypeNode => ({
  slug,
  name,
  tagline,
  cover,
  description: description ?? `Crafted ${name.toLowerCase()} interiors built by our skilled in-house carpenters and finished with premium materials.`,
});

export const TAXONOMY: CatNode[] = [
  {
    slug: "residential",
    name: "Residential",
    tagline: "Homes designed to live in.",
    description: "Duplex Houses · Apartments · Independent Houses",
    cover: svcKitchen,
    subcategories: [
      {
        slug: "bedroom",
        name: "Bedroom",
        description: "Calming bedrooms tailored to every member of the family.",
        cover: svcBed,
        types: [
          t("master-bedroom", "Master Bedroom", "Luxe retreats with bespoke storage", svcBed),
          t("small-bedroom", "Small Bedroom", "Smart, space-efficient layouts", svcBed),
          t("kids-bedroom", "Kids Bedroom", "Playful, durable & safe", svcWallpaper),
          t("guest-bedroom", "Guest Bedroom", "Warm, hotel-like comfort", svcCurtains),
        ],
      },
      {
        slug: "kitchen",
        name: "Kitchen",
        description: "Modular and bespoke kitchens for every layout.",
        cover: svcKitchen,
        types: [
          t("modular-kitchen", "Modular Kitchen", "Smart storage & soft-close finish", svcKitchen),
          t("l-shape-kitchen", "L-Shape Kitchen", "Efficient corner workflow", svcKitchen),
          t("u-shape-kitchen", "U-Shape Kitchen", "Maximum counter space", svcCabinets),
          t("open-kitchen", "Open Kitchen", "Island-led open layouts", svcCabinets),
          t("commercial-style-kitchen", "Commercial Style Home Kitchen", "Pro-grade home cooking", svcKitchen),
        ],
      },
      {
        slug: "living-room",
        name: "Living Room",
        description: "Inviting lounges with curated detailing.",
        cover: svcSofa,
        types: [
          t("sofa-seating", "Sofa & Seating Setup", "Modular & lounge seating", svcSofa),
          t("tv-unit", "TV Unit Design", "Integrated media walls", svcTvUnit),
          t("partition", "Partition Design", "Define zones beautifully", svcPartition),
          t("false-ceiling", "False Ceiling", "Layered & lit ceilings", svcCeiling),
          t("wallpaper", "Wallpaper & Wall Design", "Statement feature walls", svcWallpaper),
        ],
      },
      {
        slug: "wardrobe",
        name: "Wardrobe & Storage",
        description: "Bespoke wardrobes designed around your wardrobe.",
        cover: svcWardrobe,
        types: [
          t("sliding-wardrobe", "Sliding Wardrobe", "Compact & modern", svcCabinets),
          t("swing-wardrobe", "Swing Wardrobe", "Classic openable doors", svcWardrobe),
          t("walkin-wardrobe", "Walk-in Wardrobe", "Boutique-style dressing rooms", svcWardrobe),
          t("storage-cabinets", "Cabinets & Storage Units", "Tailored storage solutions", svcCabinets),
        ],
      },
      {
        slug: "crockery",
        name: "Crockery & Display",
        description: "Display, faith and storage pieces to anchor your home.",
        cover: svcCrockery,
        types: [
          t("crockery-unit", "Crockery Unit", "Functional & elegant", svcCrockery),
          t("display-cabinet", "Display Cabinet", "Showcase your collection", svcCrockery),
          t("pooja-unit", "Pooja Unit", "Sacred space at home", svcPartition),
        ],
      },
      {
        slug: "furnishings",
        name: "Furnishings",
        description: "Drapes, beds and seating that bring softness to your space.",
        cover: svcCurtains,
        types: [
          t("curtains-blinds", "Curtains & Blinds", "Layered window dressing", svcCurtains),
          t("hydraulic-bed", "Hydraulic Beds", "Storage-rich modern beds", svcBed),
          t("sofas-recliners", "Sofas & Recliners", "Custom-built comfort", svcSofa),
        ],
      },
      {
        slug: "home-theatre",
        name: "Home Theatre",
        description: "Cinematic experiences designed at home — premium acoustics & seating.",
        cover: svcTheatre,
        types: [
          t("dedicated-theatre", "Dedicated Home Theatre Room", "Tiered recliners & star ceiling", svcTheatre),
          t("living-theatre", "Living Room Theatre Setup", "Integrated AV in your lounge", svcSofa),
          t("mini-theatre", "Mini Theatre Design", "Compact cinematic rooms", svcTheatre),
        ],
      },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial",
    tagline: "Spaces that work as hard as you do.",
    description: "Restaurants · Hotels · Offices",
    cover: svcRestaurant,
    subcategories: [
      {
        slug: "restaurant",
        name: "Restaurant",
        description: "Hospitality interiors guests remember.",
        cover: svcRestaurant,
        types: [
          t("fine-dining", "Fine Dining Interior", "Atmospheric, layered detail", svcRestaurant),
          t("cafe-casual", "Café & Casual Dining", "Relaxed everyday charm", svcCrockery),
          t("fast-food", "Fast Food Outlet", "Bright, branded & efficient", svcRestaurant),
          t("bar-lounge", "Bar & Lounge Design", "Moody, statement spaces", svcSofa),
        ],
      },
      {
        slug: "hotel",
        name: "Hotel",
        description: "Lobbies, suites and event halls.",
        cover: svcHotel,
        types: [
          t("hotel-lobby", "Hotel Lobby & Reception", "First-impression interiors", svcHotel),
          t("hotel-room", "Hotel Room Interior", "Comfortable, signature stays", svcCurtains),
          t("hotel-suite", "Hotel Suite Design", "Premium suite experiences", svcCurtains),
          t("banquet-hall", "Banquet & Event Hall", "Versatile event spaces", svcCeiling),
        ],
      },
      {
        slug: "common-commercial",
        name: "Common Commercial Elements",
        description: "Shared joinery, ceilings and finishes for all commercial work.",
        cover: svcPartition,
        types: [
          t("commercial-kitchen", "Commercial Kitchen", "Pro-grade prep zones", svcKitchen),
          t("partitions-cabins", "Partitions & Cabins", "Define zones & privacy", svcPartition),
          t("c-false-ceiling", "False Ceiling", "Architectural ceilings", svcCeiling),
          t("c-wallpaper", "Wallpapers & Wall Treatments", "Branded wall finishes", svcWallpaper),
          t("c-curtains", "Curtains & Blinds", "Layered window dressing", svcCurtains),
          t("c-crockery", "Crockery & Display Units", "Service-side display", svcCrockery),
          t("c-sofa", "Sofa & Seating", "Bespoke commercial seating", svcSofa),
          t("c-tv", "TV & Entertainment Units", "AV-ready joinery", svcTvUnit),
        ],
      },
    ],
  },
];

export function getCat(slug: string): CatNode | undefined {
  return TAXONOMY.find((c) => c.slug === slug);
}
export function getSub(catSlug: string, subSlug: string): SubNode | undefined {
  return getCat(catSlug)?.subcategories.find((s) => s.slug === subSlug);
}
export function getType(catSlug: string, subSlug: string, typeSlug: string): TypeNode | undefined {
  return getSub(catSlug, subSlug)?.types.find((t) => t.slug === typeSlug);
}

/** All types flattened, with parent refs — for filter tabs on /videos etc. */
export function allTypes() {
  return TAXONOMY.flatMap((c) =>
    c.subcategories.flatMap((s) =>
      s.types.map((tp) => ({ cat: c, sub: s, type: tp }))
    )
  );
}

export function findTypePath(typeSlug: string) {
  for (const c of TAXONOMY) {
    for (const s of c.subcategories) {
      const tp = s.types.find((x) => x.slug === typeSlug);
      if (tp) return { cat: c, sub: s, type: tp };
    }
  }
  return undefined;
}