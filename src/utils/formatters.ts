import { Property } from '../types/property';
import { INITIAL_PROPERTIES } from '../data/defaultProperties';

const STORAGE_KEY = 'georant_properties_catalog_v1';
const FAVORITES_KEY = 'georant_properties_favorites_v1';

export function formatPrice(price: number, listingType: 'sale' | 'rent', period?: string): string {
  const formatted = new Intl.NumberFormat('en-KE', {
    maximumFractionDigits: 0
  }).format(price);

  if (listingType === 'rent') {
    return `KSh ${formatted}${period ? ` / mo` : ' / mo'}`;
  }
  return `KSh ${formatted}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-KE').format(num);
}

export function getWhatsAppUrl(phone: string, message: string): string {
  // normalize e.g. 0728221098 -> 254728221098
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '254' + cleanPhone.slice(1);
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function createPropertyWhatsAppMessage(property: Property): string {
  return `Hello Georant Properties, I am interested in "${property.title}" (Ref: ${property.refNumber}) listed at ${formatPrice(property.price, property.listingType, property.period)} in ${property.location.neighborhood}, ${property.location.city}. Please share more details and availability for a site visit/viewing.`;
}

export function getTelUrl(phone: string): string {
  let clean = phone.replace(/[^0-9+]/g, '');
  if (clean.startsWith('0')) {
    clean = '+254' + clean.slice(1);
  }
  return `tel:${clean}`;
}

// Storage helpers
export function loadPropertiesFromStorage(): Property[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
      return INITIAL_PROPERTIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Error reading localStorage for properties:', err);
  }
  return INITIAL_PROPERTIES;
}

export function savePropertiesToStorage(properties: Property[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch (err) {
    console.error('Error saving properties to localStorage:', err);
  }
}

export function loadFavoritesFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading favorites:', err);
  }
  return [];
}

export function saveFavoritesToStorage(favorites: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (err) {
    console.error('Error saving favorites:', err);
  }
}
