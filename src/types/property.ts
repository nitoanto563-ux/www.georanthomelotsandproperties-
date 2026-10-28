export type ListingType = 'sale' | 'rent';

export type PropertyCategory = 
  | 'villa'
  | 'townhouse'
  | 'apartment'
  | 'land'
  | 'commercial';

export type PropertyStatus = 'available' | 'under_offer' | 'sold' | 'rented';

export type TitleDeedStatus = 'Ready Title Deed' | 'Freehold' | 'Sectional Title' | 'Leasehold (99 Yrs)';

export interface PropertyLocation {
  address: string;
  city: string;
  neighborhood: string;
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  refNumber: string;
  title: string;
  listingType: ListingType;
  category: PropertyCategory;
  price: number; // in KSh
  period?: 'per month' | 'per year';
  location: PropertyLocation;
  bedrooms?: number;
  bathrooms?: number;
  size: string; // e.g. "50 x 100 ft", "1/4 Acre", "3,400 sq ft", "1 Acre"
  lotDimension?: string; // e.g. "0.125 Acre (50x100 ft)"
  titleDeed: TitleDeedStatus;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  status: PropertyStatus;
  agent: {
    name: string;
    phonePrimary: string; // "0728221098"
    phoneSecondary: string; // "0101100875"
    whatsapp: string; // "0728221098"
    tiktok: string; // "githinji’s Homes n Lots"
  };
  createdAt: string;
  viewsCount: number;
  inquiriesCount: number;
}

export interface PropertyFilterState {
  searchQuery: string;
  listingType: 'all' | ListingType;
  category: 'all' | PropertyCategory;
  neighborhood: string;
  minPrice: number | '';
  maxPrice: number | '';
  bedrooms: string; // 'any', '1', '2', '3', '4', '5+'
  bathrooms: string;
  minPlotSize: string; // 'any', '50x100', 'quarter', 'half', 'one_plus'
  titleDeed: string; // 'any' or specific
  selectedFeatures: string[];
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'newest';
}
