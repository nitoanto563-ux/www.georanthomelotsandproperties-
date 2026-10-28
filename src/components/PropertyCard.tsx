import React from 'react';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  MessageCircle, 
  Phone, 
  ShieldCheck,
  Eye
} from 'lucide-react';
import { Property } from '../types/property';
import { formatPrice, getWhatsAppUrl, createPropertyWhatsAppMessage, getTelUrl } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  onViewOnMap?: (property: Property, e: React.MouseEvent) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onViewOnMap,
}) => {
  const isLand = property.category === 'land';
  const whatsappMsg = createPropertyWhatsAppMessage(property);
  const whatsappUrl = getWhatsAppUrl(property.agent.whatsapp, whatsappMsg);

  return (
    <div 
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Property Visual Showcase */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <img
          src={property.images[0] || '/public/assets/aistudio/WhatsApp_Image_2026-10-28_at_1.49.22_AM_6a8f664e.jpeg'}
          alt={property.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Minimal status labels adhering to anti-slop rules */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md shadow-sm bg-slate-900/90 text-white backdrop-blur-sm">
            {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md shadow-sm bg-blue-900/90 text-white backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(property.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 shadow-sm ${
            isFavorite 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600'
          }`}
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle Map Quick View Button overlay on hover */}
        {onViewOnMap && (
          <button
            onClick={(e) => onViewOnMap(property, e)}
            className="absolute bottom-3 right-3 px-2.5 py-1 text-[11px] font-semibold bg-white/90 hover:bg-white text-slate-800 rounded-lg shadow backdrop-blur-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            <span>Map Pin</span>
          </button>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with · separator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 uppercase font-semibold tracking-wider">
            <span>{property.category}</span>
            <span aria-hidden="true">·</span>
            <span>{property.location.neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span className="text-blue-700 font-bold">{property.refNumber}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.location.address}, {property.location.city}</span>
          </div>

          {/* Key Metric Specs with Dot Separators */}
          <div className="flex items-center gap-3 py-2.5 px-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-medium mb-3">
            {!isLand && property.bedrooms !== undefined && property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-slate-500" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {!isLand && property.bathrooms !== undefined && property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-slate-500" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold text-slate-900">{property.size}</span>
            </div>
          </div>

          {/* Title deed trust badge */}
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{property.titleDeed}</span>
          </div>
        </div>

        {/* Footer: Price + Direct WhatsApp & Call Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {property.listingType === 'sale' ? 'Guide Price' : 'Rental Rate'}
            </div>
            <div className="text-lg font-extrabold text-blue-950 font-mono tabular-nums leading-none mt-0.5">
              {formatPrice(property.price, property.listingType, property.period)}
            </div>
          </div>

          {/* Quick Direct Actions */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors"
              title="Chat on WhatsApp (0728221098)"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={getTelUrl(property.agent.phonePrimary)}
              className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl transition-colors"
              title="Call 0728221098"
              aria-label="Call Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => onSelectProperty(property)}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
