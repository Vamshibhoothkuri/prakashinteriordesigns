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

export interface TreeType {
  name: string;
  cover: string;
  /** sample images shipped with the site */
  samples?: string[];
}

export interface TreeSection {
  name: string;
  cover: string;
  premium?: boolean;
  types: TreeType[];
}

export interface TreeCategory {
  slug: "residential" | "commercial" | "home-theatre";
  name: string;
  icon: string;
  tagline: string;
  cover: string;
  sections: TreeSection[];
}

export const CATEGORY_TREE: TreeCategory[] = [
  {
    slug: "residential",
    name: "Residential",
    icon: "🏠",
    tagline: "Homes designed to live in.",
    cover: svcBed,
    sections: [
      {
        name: "Bedroom",
        cover: svcBed,
        types: [
          { name: "Master Bedroom", cover: svcBed, samples: [svcBed, svcWardrobe] },
          { name: "Small Bedroom", cover: svcBed, samples: [svcBed, svcCurtains] },
          { name: "Kids Bedroom", cover: svcBed, samples: [svcBed, svcWallpaper] },
          { name: "Guest Bedroom", cover: svcCurtains, samples: [svcCurtains, svcBed] },
        ],
      },
      {
        name: "Kitchen",
        cover: svcKitchen,
        types: [
          { name: "Modular Kitchen", cover: svcKitchen, samples: [svcKitchen, svcCabinets] },
          { name: "L-Shape Kitchen", cover: svcKitchen, samples: [svcKitchen, svcCrockery] },
          { name: "U-Shape Kitchen", cover: svcCabinets, samples: [svcCabinets, svcKitchen] },
          { name: "Open Kitchen", cover: svcCabinets, samples: [svcCabinets, svcSofa] },
          { name: "Commercial Style Home Kitchen", cover: svcKitchen, samples: [svcKitchen] },
        ],
      },
      {
        name: "Living Room",
        cover: svcSofa,
        types: [
          { name: "Sofa & Seating Setup", cover: svcSofa, samples: [svcSofa] },
          { name: "TV Unit Design", cover: svcTvUnit, samples: [svcTvUnit] },
          { name: "Partition Design", cover: svcPartition, samples: [svcPartition] },
          { name: "False Ceiling", cover: svcCeiling, samples: [svcCeiling] },
          { name: "Wallpaper & Wall Design", cover: svcWallpaper, samples: [svcWallpaper] },
        ],
      },
      {
        name: "Wardrobe & Storage",
        cover: svcWardrobe,
        types: [
          { name: "Sliding Wardrobe", cover: svcCabinets, samples: [svcCabinets, svcWardrobe] },
          { name: "Swing Wardrobe", cover: svcWardrobe, samples: [svcWardrobe] },
          { name: "Walk-in Wardrobe", cover: svcWardrobe, samples: [svcWardrobe, svcCabinets] },
          { name: "Cabinets & Storage Units", cover: svcCabinets, samples: [svcCabinets] },
        ],
      },
      {
        name: "Crockery & Display",
        cover: svcCrockery,
        types: [
          { name: "Crockery Unit", cover: svcCrockery, samples: [svcCrockery] },
          { name: "Display Cabinet", cover: svcCabinets, samples: [svcCabinets, svcCrockery] },
          { name: "Pooja Unit", cover: svcPartition, samples: [svcPartition] },
        ],
      },
      {
        name: "Furnishings",
        cover: svcCurtains,
        types: [
          { name: "Curtains & Blinds", cover: svcCurtains, samples: [svcCurtains] },
          { name: "Hydraulic Beds", cover: svcBed, samples: [svcBed] },
          { name: "Sofas & Recliners", cover: svcSofa, samples: [svcSofa] },
        ],
      },
      {
        name: "Property Types",
        cover: svcHotel,
        types: [
          { name: "Duplex House", cover: svcSofa, samples: [svcSofa, svcCeiling] },
          { name: "Apartment", cover: svcCurtains, samples: [svcCurtains, svcBed] },
          { name: "Independent House", cover: svcHotel, samples: [svcHotel] },
        ],
      },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial",
    icon: "🏢",
    tagline: "Spaces that work as hard as you do.",
    cover: svcRestaurant,
    sections: [
      {
        name: "Restaurant",
        cover: svcRestaurant,
        types: [
          { name: "Fine Dining Interior", cover: svcRestaurant, samples: [svcRestaurant] },
          { name: "Café & Casual Dining", cover: svcCrockery, samples: [svcCrockery, svcRestaurant] },
          { name: "Fast Food Outlet", cover: svcRestaurant, samples: [svcRestaurant] },
          { name: "Bar & Lounge Design", cover: svcSofa, samples: [svcSofa, svcRestaurant] },
        ],
      },
      {
        name: "Hotel",
        cover: svcHotel,
        types: [
          { name: "Hotel Lobby & Reception", cover: svcHotel, samples: [svcHotel] },
          { name: "Hotel Room Interior", cover: svcCurtains, samples: [svcCurtains, svcBed] },
          { name: "Hotel Suite Design", cover: svcCurtains, samples: [svcCurtains, svcHotel] },
          { name: "Banquet & Event Hall", cover: svcCeiling, samples: [svcCeiling, svcHotel] },
        ],
      },
      {
        name: "Common Commercial Elements",
        cover: svcPartition,
        types: [
          { name: "Commercial Kitchen", cover: svcKitchen, samples: [svcKitchen] },
          { name: "Partitions & Cabins", cover: svcPartition, samples: [svcPartition] },
          { name: "False Ceiling", cover: svcCeiling, samples: [svcCeiling] },
          { name: "Wallpapers & Wall Treatments", cover: svcWallpaper, samples: [svcWallpaper] },
          { name: "Curtains & Blinds", cover: svcCurtains, samples: [svcCurtains] },
          { name: "Crockery & Display Units", cover: svcCrockery, samples: [svcCrockery] },
          { name: "Sofa & Seating", cover: svcSofa, samples: [svcSofa] },
          { name: "TV & Entertainment Units", cover: svcTvUnit, samples: [svcTvUnit] },
        ],
      },
    ],
  },
];

export function findType(categorySlug: string, sectionName: string, typeName: string) {
  const cat = CATEGORY_TREE.find((c) => c.slug === categorySlug);
  const section = cat?.sections.find((s) => s.name === sectionName);
  const type = section?.types.find((t) => t.name === typeName);
  return { cat, section, type };
}

export function normalizeTag(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}