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

export interface Design {
  slug: string;
  title: string;
  description: string;
  cover: string;
  gallery: string[];
  tags: string[];
  materials: string[];
  subcategory: string;
  category: string;
  featured?: boolean;
}

export interface Subcategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
  subcategories: Subcategory[];
  designs: Design[];
}

const RESIDENTIAL: Category = {
  slug: "residential",
  name: "Residential",
  tagline: "Homes designed to live in.",
  description: "Duplex Houses · Apartments · Independent Houses",
  cover: svcKitchen,
  subcategories: [
    { slug: "kitchens", name: "Kitchens" },
    { slug: "bedrooms", name: "Bedrooms" },
    { slug: "living-rooms", name: "Living Rooms" },
    { slug: "wardrobes", name: "Wardrobes" },
    { slug: "ceilings", name: "Ceilings & Walls" },
    { slug: "home-theatre", name: "Home Theatre" },
  ],
  designs: [
    {
      slug: "modern-modular-kitchen",
      title: "Modern Modular Kitchen",
      description: "Sleek modular kitchen with smart storage, soft-close drawers and premium quartz countertops.",
      cover: svcKitchen,
      gallery: [svcKitchen, svcCabinets, svcCrockery],
      tags: ["Modern", "Modular"],
      materials: ["Quartz countertop", "Acrylic shutters", "Stainless steel fittings"],
      subcategory: "kitchens",
      category: "residential",
    },
    {
      slug: "island-chef-kitchen",
      title: "Island Chef Kitchen",
      description: "Open-plan kitchen island with breakfast counter, built-in appliances and pendant lighting.",
      cover: svcCabinets,
      gallery: [svcCabinets, svcKitchen, svcCeiling],
      tags: ["Luxury", "Open-plan"],
      materials: ["Marble island", "Walnut veneer", "Brass handles"],
      subcategory: "kitchens",
      category: "residential",
    },
    {
      slug: "hydraulic-master-bed",
      title: "Hydraulic Master Bed",
      description: "Space-saving hydraulic storage bed finished in fluted veneer with integrated bedside lighting.",
      cover: svcBed,
      gallery: [svcBed, svcWardrobe, svcWallpaper],
      tags: ["Modern", "Storage"],
      materials: ["Fluted veneer", "Hydraulic mechanism", "Boucle headboard"],
      subcategory: "bedrooms",
      category: "residential",
    },
    {
      slug: "minimal-guest-bedroom",
      title: "Minimal Guest Bedroom",
      description: "Calming neutral palette with linen drapes, soft lighting and a discreet wardrobe wall.",
      cover: svcCurtains,
      gallery: [svcCurtains, svcBed, svcWallpaper],
      tags: ["Minimal", "Calm"],
      materials: ["Linen drapery", "Oak veneer", "Wool rug"],
      subcategory: "bedrooms",
      category: "residential",
    },
    {
      slug: "terracotta-living-lounge",
      title: "Terracotta Living Lounge",
      description: "Warm lounge with deep-seat sofa, sculptural lighting and a statement media wall.",
      cover: svcSofa,
      gallery: [svcSofa, svcTvUnit, svcCeiling],
      tags: ["Warm", "Luxury"],
      materials: ["Boucle upholstery", "Smoked oak", "Antique brass"],
      subcategory: "living-rooms",
      category: "residential",
    },
    {
      slug: "media-wall-tv-unit",
      title: "Media Wall TV Unit",
      description: "Floor-to-ceiling media wall with concealed storage, integrated lighting and acoustic panels.",
      cover: svcTvUnit,
      gallery: [svcTvUnit, svcCeiling, svcWallpaper],
      tags: ["Modern", "Media"],
      materials: ["MDF veneer", "LED cove lighting", "Acoustic felt"],
      subcategory: "living-rooms",
      category: "residential",
    },
    {
      slug: "walk-in-wardrobe",
      title: "Walk-In Wardrobe",
      description: "Bespoke walk-in wardrobe with glass shutters, soft LED interiors and a central island.",
      cover: svcWardrobe,
      gallery: [svcWardrobe, svcCabinets, svcBed],
      tags: ["Luxury", "Bespoke"],
      materials: ["Tinted glass", "Walnut interior", "LED profiles"],
      subcategory: "wardrobes",
      category: "residential",
    },
    {
      slug: "sliding-door-wardrobe",
      title: "Sliding Door Wardrobe",
      description: "Floor-to-ceiling sliding wardrobe with mirror finish and integrated dresser.",
      cover: svcCabinets,
      gallery: [svcCabinets, svcWardrobe, svcBed],
      tags: ["Modern", "Compact"],
      materials: ["Mirror laminate", "Aluminium track", "Soft-close hinges"],
      subcategory: "wardrobes",
      category: "residential",
    },
    {
      slug: "layered-false-ceiling",
      title: "Layered False Ceiling",
      description: "Multi-layered gypsum ceiling with concealed cove lighting and decorative trims.",
      cover: svcCeiling,
      gallery: [svcCeiling, svcWallpaper, svcPartition],
      tags: ["Lighting", "Architectural"],
      materials: ["Gypsum board", "LED cove", "POP cornice"],
      subcategory: "ceilings",
      category: "residential",
    },
    {
      slug: "bespoke-wallpaper-feature",
      title: "Bespoke Wallpaper Feature",
      description: "Imported textured wallpaper as a feature wall with complementary lighting.",
      cover: svcWallpaper,
      gallery: [svcWallpaper, svcCeiling, svcCurtains],
      tags: ["Texture", "Feature"],
      materials: ["Imported wallpaper", "Wood trim", "Wall sconces"],
      subcategory: "ceilings",
      category: "residential",
    },
    {
      slug: "premium-home-theatre",
      title: "Premium Home Theatre",
      description: "Cinematic home theatre with custom acoustics, recliner seating, ambient lighting and large screen.",
      cover: svcTheatre,
      gallery: [svcTheatre, svcCeiling, svcSofa],
      tags: ["Premium", "Cinematic"],
      materials: ["Acoustic panels", "Recliner seating", "Star ceiling"],
      subcategory: "home-theatre",
      category: "residential",
      featured: true,
    },
  ],
};

const COMMERCIAL: Category = {
  slug: "commercial",
  name: "Commercial",
  tagline: "Spaces that work as hard as you do.",
  description: "Restaurants · Hotels · Offices",
  cover: svcRestaurant,
  subcategories: [
    { slug: "restaurants", name: "Restaurants" },
    { slug: "hotels", name: "Hotels" },
    { slug: "interiors", name: "Interiors & Joinery" },
  ],
  designs: [
    {
      slug: "warm-fine-dining",
      title: "Warm Fine-Dining Restaurant",
      description: "Atmospheric dining room with banquette seating, layered lighting and timber detailing.",
      cover: svcRestaurant,
      gallery: [svcRestaurant, svcSofa, svcCeiling],
      tags: ["Hospitality", "Warm"],
      materials: ["Velvet banquettes", "Brass pendants", "Oak panelling"],
      subcategory: "restaurants",
      category: "commercial",
    },
    {
      slug: "cafe-lounge-bar",
      title: "Café Lounge & Bar",
      description: "Casual café and bar interior with custom millwork, statement bar and feature lighting.",
      cover: svcCrockery,
      gallery: [svcCrockery, svcRestaurant, svcWallpaper],
      tags: ["Casual", "Vibrant"],
      materials: ["Terrazzo bar", "Rattan seating", "Pendant lights"],
      subcategory: "restaurants",
      category: "commercial",
    },
    {
      slug: "boutique-hotel-lobby",
      title: "Boutique Hotel Lobby",
      description: "Welcoming hotel lobby with sculptural reception, lounge seating and curated artwork.",
      cover: svcHotel,
      gallery: [svcHotel, svcSofa, svcCeiling],
      tags: ["Luxury", "Hospitality"],
      materials: ["Travertine", "Bouclé seating", "Brass fittings"],
      subcategory: "hotels",
      category: "commercial",
    },
    {
      slug: "executive-hotel-suite",
      title: "Executive Hotel Suite",
      description: "Refined hotel suite with bespoke joinery, layered lighting and luxe drapery.",
      cover: svcCurtains,
      gallery: [svcCurtains, svcBed, svcHotel],
      tags: ["Premium", "Suite"],
      materials: ["Heavy drapery", "Walnut joinery", "Marble vanity"],
      subcategory: "hotels",
      category: "commercial",
    },
    {
      slug: "fluted-partition-system",
      title: "Fluted Partition System",
      description: "Architectural fluted wood partitions that define zones without dividing the space.",
      cover: svcPartition,
      gallery: [svcPartition, svcCeiling, svcCabinets],
      tags: ["Architectural", "Modern"],
      materials: ["Fluted oak", "Black metal frame"],
      subcategory: "interiors",
      category: "commercial",
    },
    {
      slug: "back-of-house-storage",
      title: "Back-of-House Storage",
      description: "Functional yet beautifully detailed cabinetry for restaurants and hotel back-of-house.",
      cover: svcCabinets,
      gallery: [svcCabinets, svcKitchen, svcPartition],
      tags: ["Functional", "Bespoke"],
      materials: ["Laminate", "Stainless steel", "Soft-close hardware"],
      subcategory: "interiors",
      category: "commercial",
    },
  ],
};

export const CATEGORIES: Category[] = [RESIDENTIAL, COMMERCIAL];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getDesign(slug: string): Design | undefined {
  for (const c of CATEGORIES) {
    const d = c.designs.find((x) => x.slug === slug);
    if (d) return d;
  }
  return undefined;
}