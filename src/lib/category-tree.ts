// Section/legacy covers (kept for sample fallbacks)
import svcBed from "@/assets/svc-bed.jpg";
import svcKitchen from "@/assets/svc-kitchen.jpg";
import svcSofa from "@/assets/svc-sofa.jpg";
import svcWardrobe from "@/assets/svc-wardrobe.jpg";
import svcCrockery from "@/assets/svc-crockery.jpg";
import svcCurtains from "@/assets/svc-curtains.jpg";
import svcRestaurant from "@/assets/svc-restaurant.jpg";
import svcHotel from "@/assets/svc-hotel.jpg";
import svcPartition from "@/assets/svc-partition.jpg";
import svcTheatre from "@/assets/svc-theatre.jpg";

// AI-generated type covers
import imgMasterBedroom from "@/assets/cat/master-bedroom.jpg";
import imgSmallBedroom from "@/assets/cat/small-bedroom.jpg";
import imgKidsBedroom from "@/assets/cat/kids-bedroom.jpg";
import imgGuestBedroom from "@/assets/cat/guest-bedroom.jpg";
import imgModularKitchen from "@/assets/cat/modular-kitchen.jpg";
import imgLShapeKitchen from "@/assets/cat/l-shape-kitchen.jpg";
import imgUShapeKitchen from "@/assets/cat/u-shape-kitchen.jpg";
import imgOpenKitchen from "@/assets/cat/open-kitchen.jpg";
import imgCommercialStyleHomeKitchen from "@/assets/cat/commercial-style-home-kitchen.jpg";
import imgSofaSeating from "@/assets/cat/sofa-seating.jpg";
import imgTvUnit from "@/assets/cat/tv-unit.jpg";
import imgPartition from "@/assets/cat/partition.jpg";
import imgFalseCeiling from "@/assets/cat/false-ceiling.jpg";
import imgWallpaper from "@/assets/cat/wallpaper.jpg";
import imgSlidingWardrobe from "@/assets/cat/sliding-wardrobe.jpg";
import imgSwingWardrobe from "@/assets/cat/swing-wardrobe.jpg";
import imgWalkinWardrobe from "@/assets/cat/walkin-wardrobe.jpg";
import imgCabinetsStorage from "@/assets/cat/cabinets-storage.jpg";
import imgCrockeryUnit from "@/assets/cat/crockery-unit.jpg";
import imgDisplayCabinet from "@/assets/cat/display-cabinet.jpg";
import imgPoojaUnit from "@/assets/cat/pooja-unit.jpg";
import imgCurtainsBlinds from "@/assets/cat/curtains-blinds.jpg";
import imgHydraulicBeds from "@/assets/cat/hydraulic-beds.jpg";
import imgSofasRecliners from "@/assets/cat/sofas-recliners.jpg";
import imgDuplexHouse from "@/assets/cat/duplex-house.jpg";
import imgApartmentInterior from "@/assets/cat/apartment-interior.jpg";
import imgIndependentHouse from "@/assets/cat/independent-house.jpg";
import imgFineDining from "@/assets/cat/fine-dining.jpg";
import imgCafeCasual from "@/assets/cat/cafe-casual.jpg";
import imgFastFood from "@/assets/cat/fast-food-outlet.jpg";
import imgBarLounge from "@/assets/cat/bar-lounge.jpg";
import imgHotelLobby from "@/assets/cat/hotel-lobby.jpg";
import imgHotelRoom from "@/assets/cat/hotel-room.jpg";
import imgHotelSuite from "@/assets/cat/hotel-suite.jpg";
import imgBanquetHall from "@/assets/cat/banquet-hall.jpg";
import imgCommercialKitchen from "@/assets/cat/commercial-kitchen.jpg";
import imgPartitionsCabins from "@/assets/cat/partitions-cabins.jpg";
import imgCommercialCeiling from "@/assets/cat/commercial-ceiling.jpg";
import imgCommercialWallpaper from "@/assets/cat/commercial-wallpaper.jpg";
import imgCommercialCurtains from "@/assets/cat/commercial-curtains.jpg";
import imgCommercialCrockery from "@/assets/cat/commercial-crockery.jpg";
import imgCommercialSofa from "@/assets/cat/commercial-sofa.jpg";
import imgCommercialTv from "@/assets/cat/commercial-tv.jpg";
import imgDedicatedTheatre from "@/assets/cat/dedicated-theatre.jpg";
import imgLivingTheatre from "@/assets/cat/living-theatre.jpg";
import imgMiniTheatre from "@/assets/cat/mini-theatre.jpg";

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
    cover: imgMasterBedroom,
    sections: [
      {
        name: "Bedroom",
        cover: imgMasterBedroom,
        types: [
          { name: "Master Bedroom", cover: imgMasterBedroom, samples: [imgMasterBedroom, svcBed] },
          { name: "Small Bedroom", cover: imgSmallBedroom, samples: [imgSmallBedroom] },
          { name: "Kids Bedroom", cover: imgKidsBedroom, samples: [imgKidsBedroom] },
          { name: "Guest Bedroom", cover: imgGuestBedroom, samples: [imgGuestBedroom] },
        ],
      },
      {
        name: "Kitchen",
        cover: imgModularKitchen,
        types: [
          { name: "Modular Kitchen", cover: imgModularKitchen, samples: [imgModularKitchen, svcKitchen] },
          { name: "L-Shape Kitchen", cover: imgLShapeKitchen, samples: [imgLShapeKitchen] },
          { name: "U-Shape Kitchen", cover: imgUShapeKitchen, samples: [imgUShapeKitchen] },
          { name: "Open Kitchen", cover: imgOpenKitchen, samples: [imgOpenKitchen] },
          { name: "Commercial Style Home Kitchen", cover: imgCommercialStyleHomeKitchen, samples: [imgCommercialStyleHomeKitchen] },
        ],
      },
      {
        name: "Living Room",
        cover: imgSofaSeating,
        types: [
          { name: "Sofa & Seating Setup", cover: imgSofaSeating, samples: [imgSofaSeating, svcSofa] },
          { name: "TV Unit Design", cover: imgTvUnit, samples: [imgTvUnit] },
          { name: "Partition Design", cover: imgPartition, samples: [imgPartition, svcPartition] },
          { name: "False Ceiling", cover: imgFalseCeiling, samples: [imgFalseCeiling] },
          { name: "Wallpaper & Wall Design", cover: imgWallpaper, samples: [imgWallpaper] },
        ],
      },
      {
        name: "Wardrobe & Storage",
        cover: imgSlidingWardrobe,
        types: [
          { name: "Sliding Wardrobe", cover: imgSlidingWardrobe, samples: [imgSlidingWardrobe, svcWardrobe] },
          { name: "Swing Wardrobe", cover: imgSwingWardrobe, samples: [imgSwingWardrobe] },
          { name: "Walk-in Wardrobe", cover: imgWalkinWardrobe, samples: [imgWalkinWardrobe] },
          { name: "Cabinets & Storage Units", cover: imgCabinetsStorage, samples: [imgCabinetsStorage] },
        ],
      },
      {
        name: "Crockery & Display",
        cover: imgCrockeryUnit,
        types: [
          { name: "Crockery Unit", cover: imgCrockeryUnit, samples: [imgCrockeryUnit, svcCrockery] },
          { name: "Display Cabinet", cover: imgDisplayCabinet, samples: [imgDisplayCabinet] },
          { name: "Pooja Unit", cover: imgPoojaUnit, samples: [imgPoojaUnit] },
        ],
      },
      {
        name: "Furnishings",
        cover: imgCurtainsBlinds,
        types: [
          { name: "Curtains & Blinds", cover: imgCurtainsBlinds, samples: [imgCurtainsBlinds, svcCurtains] },
          { name: "Hydraulic Beds", cover: imgHydraulicBeds, samples: [imgHydraulicBeds] },
          { name: "Sofas & Recliners", cover: imgSofasRecliners, samples: [imgSofasRecliners] },
        ],
      },
      {
        name: "Property Types",
        cover: imgIndependentHouse,
        types: [
          { name: "Duplex House", cover: imgDuplexHouse, samples: [imgDuplexHouse] },
          { name: "Apartment", cover: imgApartmentInterior, samples: [imgApartmentInterior] },
          { name: "Independent House", cover: imgIndependentHouse, samples: [imgIndependentHouse] },
        ],
      },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial",
    icon: "🏢",
    tagline: "Spaces that work as hard as you do.",
    cover: imgFineDining,
    sections: [
      {
        name: "Restaurant",
        cover: imgFineDining,
        types: [
          { name: "Fine Dining Interior", cover: imgFineDining, samples: [imgFineDining, svcRestaurant] },
          { name: "Café & Casual Dining", cover: imgCafeCasual, samples: [imgCafeCasual] },
          { name: "Fast Food Outlet", cover: imgFastFood, samples: [imgFastFood] },
          { name: "Bar & Lounge Design", cover: imgBarLounge, samples: [imgBarLounge] },
        ],
      },
      {
        name: "Hotel",
        cover: imgHotelLobby,
        types: [
          { name: "Hotel Lobby & Reception", cover: imgHotelLobby, samples: [imgHotelLobby, svcHotel] },
          { name: "Hotel Room Interior", cover: imgHotelRoom, samples: [imgHotelRoom] },
          { name: "Hotel Suite Design", cover: imgHotelSuite, samples: [imgHotelSuite] },
          { name: "Banquet & Event Hall", cover: imgBanquetHall, samples: [imgBanquetHall] },
        ],
      },
      {
        name: "Common Commercial Elements",
        cover: imgPartitionsCabins,
        types: [
          { name: "Commercial Kitchen", cover: imgCommercialKitchen, samples: [imgCommercialKitchen] },
          { name: "Partitions & Cabins", cover: imgPartitionsCabins, samples: [imgPartitionsCabins] },
          { name: "False Ceiling", cover: imgCommercialCeiling, samples: [imgCommercialCeiling] },
          { name: "Wallpapers & Wall Treatments", cover: imgCommercialWallpaper, samples: [imgCommercialWallpaper] },
          { name: "Curtains & Blinds", cover: imgCommercialCurtains, samples: [imgCommercialCurtains] },
          { name: "Crockery & Display Units", cover: imgCommercialCrockery, samples: [imgCommercialCrockery] },
          { name: "Sofa & Seating", cover: imgCommercialSofa, samples: [imgCommercialSofa] },
          { name: "TV & Entertainment Units", cover: imgCommercialTv, samples: [imgCommercialTv] },
        ],
      },
    ],
  },
  {
    slug: "home-theatre",
    name: "Home Theatre",
    icon: "🎬",
    tagline: "Cinematic experiences at home.",
    cover: imgDedicatedTheatre,
    sections: [
      {
        name: "Theatre Rooms",
        cover: imgDedicatedTheatre,
        premium: true,
        types: [
          { name: "Dedicated Home Theatre Room", cover: imgDedicatedTheatre, samples: [imgDedicatedTheatre, svcTheatre] },
          { name: "Living Room Theatre Setup", cover: imgLivingTheatre, samples: [imgLivingTheatre] },
          { name: "Mini Theatre Design", cover: imgMiniTheatre, samples: [imgMiniTheatre] },
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