import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Property } from '../types/property';
import { formatPrice } from '../utils/formatters';

interface PropertyMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  heightClass?: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  heightClass = "h-[540px]"
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center roughly around Nairobi Metropolitan (Karen, Ruiru, Juja, Westlands)
    const map = L.map(mapContainerRef.current, {
      center: [-1.25, 36.85],
      zoom: 11,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // Clean, crisp OpenStreetMap basemap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Update Markers when properties change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    if (properties.length === 0) return;

    const bounds: L.LatLngTuple[] = [];

    properties.forEach((prop) => {
      const { lat, lng } = prop.location;
      if (!lat || !lng) return;

      bounds.push([lat, lng]);

      const isSelected = selectedProperty?.id === prop.id;
      const isLand = prop.category === 'land';

      // Price abbreviation e.g. 68.5M or 3.2M or 185k
      const shortPrice = prop.price >= 1000000 
        ? `${(prop.price / 1000000).toFixed(prop.price % 1000000 === 0 ? 0 : 1)}M`
        : `${(prop.price / 1000).toFixed(0)}k`;

      const markerHtml = `
        <div class="relative group cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-110 z-50' : 'hover:scale-105'}">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-md border ${
            isSelected
              ? 'bg-blue-900 text-white border-blue-400 ring-4 ring-blue-500/30'
              : isLand
              ? 'bg-emerald-700 text-white border-emerald-500'
              : 'bg-white text-slate-900 border-slate-300 hover:border-blue-600'
          }">
            <span class="w-2 h-2 rounded-full ${isLand ? 'bg-emerald-300' : 'bg-blue-500'}"></span>
            <span class="whitespace-nowrap font-mono">KSh ${shortPrice}</span>
          </div>
          <div class="w-2 h-2 mx-auto rotate-45 -mt-1 ${
            isSelected ? 'bg-blue-900' : isLand ? 'bg-emerald-700' : 'bg-white'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: markerHtml,
        iconSize: [80, 32],
        iconAnchor: [40, 30],
        popupAnchor: [0, -28]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(markersLayer);

      const popupHtml = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif;" class="w-64 p-0">
          <img src="${prop.images[0] || '/assets/aistudio/WhatsApp_Image_2026-10-28_at_1.49.22_AM_6a8f664e.jpeg'}" 
               alt="${prop.title}" 
               class="w-full h-32 object-cover rounded-t-lg mb-2" />
          <div class="p-2">
            <div class="text-[11px] font-semibold tracking-wider text-blue-700 uppercase mb-0.5">
              ${prop.category} · ${prop.listingType === 'sale' ? 'For Sale' : 'For Rent'}
            </div>
            <div class="text-xs font-bold text-slate-900 leading-snug line-clamp-1 mb-1">
              ${prop.title}
            </div>
            <div class="text-sm font-extrabold text-blue-900 mb-1">
              ${formatPrice(prop.price, prop.listingType, prop.period)}
            </div>
            <div class="text-[11px] text-slate-500 mb-2">
              ${prop.location.neighborhood}, ${prop.location.city} · ${prop.size}
            </div>
            <button 
              id="view-btn-${prop.id}" 
              class="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors text-center block">
              View Details & WhatsApp
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: 'custom-popup-box'
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-btn-${prop.id}`);
        if (btn) {
          btn.onclick = () => onSelectProperty(prop);
        }
      });

      marker.on('click', () => {
        onSelectProperty(prop);
      });
    });

    if (bounds.length > 0 && !selectedProperty) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [properties, selectedProperty, onSelectProperty]);

  // Pan to selected property if chosen
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedProperty) return;
    mapInstanceRef.current.flyTo(
      [selectedProperty.location.lat, selectedProperty.location.lng],
      14,
      { duration: 1.2 }
    );
  }, [selectedProperty]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 ${heightClass}`}>
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Overlay Controls / Legend */}
      <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/80 shadow-md text-xs text-slate-700 pointer-events-auto">
        <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>Properties Map View</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> Homes & Commercial</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span> Land & Lots</span>
          <span className="text-slate-400">·</span>
          <span>{properties.length} shown</span>
        </div>
      </div>
    </div>
  );
};
