import { Property } from '../types/property';

export const DEFAULT_CONTACT = {
  name: "Githinji - Georant Properties",
  phonePrimary: "0728221098",
  phoneSecondary: "0101100875",
  whatsapp: "0728221098",
  tiktok: "githinji’s Homes n Lots",
  email: "info@georantproperties.co.ke",
  address: "Thika Superhighway Office Suites, Nairobi & Kiambu Hub",
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    refNumber: "GR-8041",
    title: "Executive 5-Bedroom Contemporary Villa with Infinity Pool",
    listingType: "sale",
    category: "villa",
    price: 68500000,
    location: {
      address: "Miotoni Woods, Karen",
      city: "Nairobi",
      neighborhood: "Karen",
      lat: -1.3197,
      lng: 36.7065
    },
    bedrooms: 5,
    bathrooms: 6,
    size: "0.50 Acre Lot (6,800 sq ft Built)",
    lotDimension: "1/2 Acre Private Compound",
    titleDeed: "Ready Title Deed",
    description: "Architectural masterpiece nestled in the tranquil enclave of Karen Miotoni. Featuring floor-to-ceiling glass facades, private temperature-regulated pool, imported Italian kitchen, ensuite master wing with walk-in dressing gallery, backup solar power, and self-contained 2-room staff quarters.",
    features: [
      "Ready Title Deed",
      "Gated Community",
      "Perimeter Wall & Electric Fence",
      "Swimming Pool",
      "Borehole Water Backup",
      "Solar Power Backup",
      "CCTV Surveillance",
      "Cabro Paved Driveway"
    ],
    images: [
      "/src/assets/images/hero_modern_villa_1793173267060.jpg",
      "/src/assets/images/prop_modern_townhouse_1793173268930.jpg"
    ],
    featured: true,
    status: "available",
    agent: DEFAULT_CONTACT,
    createdAt: "2026-10-15",
    viewsCount: 1420,
    inquiriesCount: 38
  },
  {
    id: "prop-2",
    refNumber: "GR-4022",
    title: "Prime 50 x 100 ft Gated Residential Lots with Ready Title",
    listingType: "sale",
    category: "land",
    price: 3200000,
    location: {
      address: "Mugutha Phase 2, Ruiru",
      city: "Kiambu",
      neighborhood: "Ruiru",
      lat: -1.1448,
      lng: 36.9634
    },
    bedrooms: 0,
    bathrooms: 0,
    size: "50 x 100 ft (1/8 Acre)",
    lotDimension: "50 ft by 100 ft",
    titleDeed: "Ready Title Deed",
    description: "Highly sought-after, shovel-ready 50x100 residential plots situated in a fast-growing, controlled-development gated neighborhood just 3.5km off Thika Superhighway. Water on site, electricity connected, graded murram access roads, and individual ready freehold title deeds issued upon clearance.",
    features: [
      "Ready Title Deed",
      "Freehold Title",
      "Gated Community",
      "Perimeter Wall",
      "Electricity On-Site",
      "Borehole Water Connection",
      "Beaconed Boundaries",
      "Controlled Development"
    ],
    images: [
      "/src/assets/images/prop_residential_lots_1793173269594.jpg"
    ],
    featured: true,
    status: "available",
    agent: DEFAULT_CONTACT,
    createdAt: "2026-10-20",
    viewsCount: 2310,
    inquiriesCount: 84
  },
  {
    id: "prop-3",
    refNumber: "GR-3095",
    title: "Modern 4-Bedroom All-Ensuite Townhouse in Controlled Estate",
    listingType: "sale",
    category: "townhouse",
    price: 38000000,
    location: {
      address: "Fourways Junction Enclave, Kiambu Road",
      city: "Kiambu / Nairobi",
      neighborhood: "Kiambu Road",
      lat: -1.2215,
      lng: 36.8378
    },
    bedrooms: 4,
    bathrooms: 5,
    size: "0.125 Acre (3,400 sq ft)",
    lotDimension: "50 x 100 ft Gated Plot",
    titleDeed: "Ready Title Deed",
    description: "Immaculate 4-bedroom townhouse situated along serene Kiambu Road. Highlights include an expansive lounge with dining recess, high-ceiling family room, sunlit garden patio, dedicated study room, separate DSQ, and 2-car covered parking bay.",
    features: [
      "Ready Title Deed",
      "Gated Community",
      "Perimeter Wall & Electric Fence",
      "Cabro Paved Driveway",
      "Solar Water Heating",
      "Children Play Area",
      "24/7 Security Patrols"
    ],
    images: [
      "/src/assets/images/prop_modern_townhouse_1793173268930.jpg",
      "/src/assets/images/hero_modern_villa_1793173267060.jpg"
    ],
    featured: true,
    status: "available",
    agent: DEFAULT_CONTACT,
    createdAt: "2026-10-18",
    viewsCount: 1890,
    inquiriesCount: 52
  },
  {
    id: "prop-4",
    refNumber: "GR-7110",
    title: "Luxury 3-Bedroom Sky Apartment with Panoramic City Views",
    listingType: "rent",
    category: "apartment",
    price: 185000,
    period: "per month",
    location: {
      address: "Rose Avenue, Kilimani",
      city: "Nairobi",
      neighborhood: "Kilimani",
      lat: -1.2918,
      lng: 36.7865
    },
    bedrooms: 3,
    bathrooms: 3,
    size: "2,250 sq ft",
    lotDimension: "High-Rise 14th Floor",
    titleDeed: "Sectional Title",
    description: "Sophisticated luxury apartment located in vibrant Kilimani. Boasting generous natural light, expansive wrap-around balcony, modern open-plan kitchen with fitted appliances, rooftop infinity pool, fully equipped gymnasium, high-speed elevators, and biometric access control.",
    features: [
      "Swimming Pool",
      "Full Backup Generator",
      "High Speed Elevators",
      "Borehole Water Backup",
      "Fitted Kitchen Appliances",
      "Gym & Fitness Center",
      "2 Covered Parking Slots",
      "24/7 Concierge"
    ],
    images: [
      "/src/assets/images/prop_luxury_apartment_1793173268084.jpg"
    ],
    featured: true,
    status: "available",
    agent: DEFAULT_CONTACT,
    createdAt: "2026-10-22",
    viewsCount: 970,
    inquiriesCount: 29
  },
  {
    id: "prop-5",
    refNumber: "GR-9002",
    title: "Grade A Commercial Plaza Offices & Ground Floor Showrooms",
    listingType: "rent",
    category: "commercial",
    price: 260000,
    period: "per month",
    location: {
      address: "Upper Hill Commercial Corridor, Nairobi",
      city: "Nairobi",
      neighborhood: "Upper Hill",
      lat: -1.2985,
      lng: 36.8189
    },
    bedrooms: 0,
    bathrooms: 4,
    size: "3,800 sq ft Open Plan",
    lotDimension: "Commercial Floor Wing",
    titleDeed: "Leasehold (99 Yrs)",
    description: "Prime Grade-A commercial workspace ideal for corporate headquarters, financial advisory firms, tech offices, or high-end medical clinics. Acoustic double-glazed curtain wall facade, raised floors, 3 high-speed Otis elevators, optical fiber backbone, and 6 allocated basement parking bays.",
    features: [
      "Grade A Commercial",
      "Full Backup Generator",
      "High Speed Fiber",
      "Basement Parking",
      "24/7 Security & CCTV",
      "Borehole Water Connection",
      "Fire Fighting Systems",
      "Biometric Access"
    ],
    images: [
      "/src/assets/images/prop_commercial_plaza_1793173268568.jpg"
    ],
    featured: false,
    status: "available",
    agent: DEFAULT_CONTACT,
    createdAt: "2026-10-10",
    viewsCount: 760,
    inquiriesCount: 19
  },
  {
    id: "prop-6",
    refNumber: "GR-5120",
    title: "Strategic 1/4 Acre Commercial Plot on Thika Superhighway Corridor",
    listingType: "sale",
    category: "land",
    price: 7800000,
    location: {
      address: "Juja Metro Zone, Near High Point",
      city: "Kiambu",
      neighborhood: "Juja",
      lat: -1.1098,
      lng: 37.0142
    },
    bedrooms: 0,
    bathrooms: 0,
    size: "1/4 Acre (100 x 100 ft)",
    lotDimension: "100 ft x 100 ft Corner Plot",
    titleDeed: "Ready Title Deed",
    description: "Exceptional commercial-cum-residential land parcel ideal for high-density modern rental apartments, hardware store, institutional facility, or commercial depot. High pedestrian and vehicle traffic, level red-soil terrain, and clear title free of encumbrances.",
    features: [
      "Ready Title Deed",
      "Freehold Title",
      "Corner Plot",
      "Electricity On-Site",
      "Main Sewer Connection Nearby",
      "High Growth Potential",
      "Murram Access Road"
    ],
    images: [
      "/src/assets/images/prop_residential_lots_1793173269594.jpg"
    ],
    featured: false,
    status: "available",
    agent: DEFAULT_CONTACT,
    createdAt: "2026-10-12",
    viewsCount: 1650,
    inquiriesCount: 47
  },
  {
    id: "prop-7",
    refNumber: "GR-2188",
    title: "Executive 2-Bedroom Furnished Apartment with Rooftop Terrace",
    listingType: "rent",
    category: "apartment",
    price: 95000,
    period: "per month",
    location: {
      address: "Westlands Pride Court, Rhapta Road",
      city: "Nairobi",
      neighborhood: "Westlands",
      lat: -1.2642,
      lng: 36.7995
    },
    bedrooms: 2,
    bathrooms: 2,
    size: "1,450 sq ft",
    lotDimension: "6th Floor Balcony Suite",
    titleDeed: "Sectional Title",
    description: "Chic and modern fully furnished 2-bedroom apartment situated in central Westlands, walking distance to Sarit Centre and Westgate Mall. High-end contemporary furnishings, smart TV, fast WiFi, rooftop lounge, and 24-hour guarded security.",
    features: [
      "Furnished",
      "Swimming Pool",
      "Gym & Fitness Center",
      "Backup Generator",
      "High Speed Elevators",
      "Borehole Water Backup",
      "Dedicated Parking"
    ],
    images: [
      "/src/assets/images/prop_luxury_apartment_1793173268084.jpg"
    ],
    featured: false,
    status: "available",
    agent: DEFAULT_CONTACT,
    createdAt: "2026-10-24",
    viewsCount: 1120,
    inquiriesCount: 31
  },
  {
    id: "prop-8",
    refNumber: "GR-6304",
    title: "Spectacular 1-Acre Agricultural & Suburban Estate Lot",
    listingType: "sale",
    category: "land",
    price: 16500000,
    location: {
      address: "Tigoni Scenic Ridge, Limuru",
      city: "Kiambu",
      neighborhood: "Limuru / Tigoni",
      lat: -1.1394,
      lng: 36.6872
    },
    bedrooms: 0,
    bathrooms: 0,
    size: "1.00 Acre",
    lotDimension: "Full 1 Acre parcel",
    titleDeed: "Ready Title Deed",
    description: "Breathtaking 1-acre parcel nestled among lush tea farmlands and cool highland breezes. Ideal for building an exclusive countryside manor or eco-retreat. Fertile red volcanic soil, serene valley views, and clean documentation.",
    features: [
      "Ready Title Deed",
      "Freehold Title",
      "Scenic Highland Views",
      "Fertile Red Soil",
      "Clean Spring Water Access",
      "Electricity Nearby",
      "Matured Trees"
    ],
    images: [
      "/src/assets/images/prop_residential_lots_1793173269594.jpg"
    ],
    featured: false,
    status: "available",
    agent: DEFAULT_CONTACT,
    createdAt: "2026-10-08",
    viewsCount: 890,
    inquiriesCount: 22
  }
];

export const NEIGHBORHOODS = [
  "All Neighborhoods",
  "Karen",
  "Ruiru",
  "Kiambu Road",
  "Kilimani",
  "Westlands",
  "Upper Hill",
  "Juja",
  "Limuru / Tigoni",
  "Thika Road Corridor"
];

export const AMENITIES_LIST = [
  "Ready Title Deed",
  "Gated Community",
  "Perimeter Wall & Electric Fence",
  "Swimming Pool",
  "Borehole Water Backup",
  "Solar Power Backup",
  "Full Backup Generator",
  "High Speed Fiber",
  "Cabro Paved Driveway",
  "24/7 Security Patrols"
];
