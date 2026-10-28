import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Check, 
  MapPin, 
  Building, 
  ShieldCheck, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { Property, ListingType, PropertyCategory, TitleDeedStatus } from '../types/property';
import { AMENITIES_LIST, NEIGHBORHOODS, DEFAULT_CONTACT } from '../data/defaultProperties';

interface ListingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (property: Property) => void;
  initialProperty?: Property | null;
}

const STOCK_IMAGE_PRESETS = [
  { label: "Modern Villa & Pool", url: "/src/assets/images/hero_modern_villa_1793173267060.jpg" },
  { label: "Residential Land & Lots", url: "/src/assets/images/prop_residential_lots_1793173269594.jpg" },
  { label: "Townhouse / Maisonette", url: "/src/assets/images/prop_modern_townhouse_1793173268930.jpg" },
  { label: "Luxury High-Rise Apartment", url: "/src/assets/images/prop_luxury_apartment_1793173268084.jpg" },
  { label: "Commercial Office Plaza", url: "/src/assets/images/prop_commercial_plaza_1793173268568.jpg" },
];

export const ListingFormModal: React.FC<ListingFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProperty,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [listingType, setListingType] = useState<ListingType>('sale');
  const [category, setCategory] = useState<PropertyCategory>('land');
  const [price, setPrice] = useState<number | ''>('');
  const [period, setPeriod] = useState<'per month' | 'per year'>('per month');
  const [neighborhood, setNeighborhood] = useState('Ruiru');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Kiambu');
  const [lat, setLat] = useState(-1.1448);
  const [lng, setLng] = useState(36.9634);
  const [bedrooms, setBedrooms] = useState<number | ''>('');
  const [bathrooms, setBathrooms] = useState<number | ''>('');
  const [size, setSize] = useState('50 x 100 ft (1/8 Acre)');
  const [lotDimension, setLotDimension] = useState('50 ft by 100 ft');
  const [titleDeed, setTitleDeed] = useState<TitleDeedStatus>('Ready Title Deed');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>([
    "Ready Title Deed",
    "Perimeter Wall",
    "Electricity On-Site",
    "Borehole Water Connection"
  ]);
  const [images, setImages] = useState<string[]>([STOCK_IMAGE_PRESETS[1].url]);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (initialProperty) {
      setTitle(initialProperty.title);
      setRefNumber(initialProperty.refNumber);
      setListingType(initialProperty.listingType);
      setCategory(initialProperty.category);
      setPrice(initialProperty.price);
      setPeriod(initialProperty.period || 'per month');
      setNeighborhood(initialProperty.location.neighborhood);
      setAddress(initialProperty.location.address);
      setCity(initialProperty.location.city);
      setLat(initialProperty.location.lat);
      setLng(initialProperty.location.lng);
      setBedrooms(initialProperty.bedrooms ?? '');
      setBathrooms(initialProperty.bathrooms ?? '');
      setSize(initialProperty.size);
      setLotDimension(initialProperty.lotDimension || '');
      setTitleDeed(initialProperty.titleDeed);
      setDescription(initialProperty.description);
      setFeatures(initialProperty.features);
      setImages(initialProperty.images.length > 0 ? initialProperty.images : [STOCK_IMAGE_PRESETS[0].url]);
      setFeatured(initialProperty.featured);
    } else {
      // Auto-generate fresh ref number
      const randomRef = `GR-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefNumber(randomRef);
      setTitle('');
      setPrice('');
      setDescription('');
    }
  }, [initialProperty]);

  const toggleFeature = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  const addCustomImage = () => {
    if (customImageUrl.trim()) {
      setImages([...images, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleQuickPresetLocation = (neigh: string) => {
    setNeighborhood(neigh);
    if (neigh === 'Karen') {
      setCity('Nairobi');
      setLat(-1.3197);
      setLng(36.7065);
      setAddress('Miotoni Road, Karen');
    } else if (neigh === 'Ruiru') {
      setCity('Kiambu');
      setLat(-1.1448);
      setLng(36.9634);
      setAddress('Off Thika Superhighway, Ruiru');
    } else if (neigh === 'Juja') {
      setCity('Kiambu');
      setLat(-1.1098);
      setLng(37.0142);
      setAddress('Near High Point, Juja Metro');
    } else if (neigh === 'Kiambu Road') {
      setCity('Kiambu');
      setLat(-1.2215);
      setLng(36.8378);
      setAddress('Fourways Enclave, Kiambu Road');
    } else if (neigh === 'Kilimani') {
      setCity('Nairobi');
      setLat(-1.2918);
      setLng(36.7865);
      setAddress('Rose Avenue, Kilimani');
    } else if (neigh === 'Westlands') {
      setCity('Nairobi');
      setLat(-1.2642);
      setLng(36.7995);
      setAddress('Rhapta Road, Westlands');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const savedProperty: Property = {
      id: initialProperty ? initialProperty.id : `prop-${Date.now()}`,
      refNumber: refNumber || `GR-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      listingType,
      category,
      price: Number(price),
      period: listingType === 'rent' ? period : undefined,
      location: {
        address: address || `${neighborhood}, ${city}`,
        city,
        neighborhood,
        lat: Number(lat) || -1.25,
        lng: Number(lng) || 36.85
      },
      bedrooms: bedrooms !== '' ? Number(bedrooms) : undefined,
      bathrooms: bathrooms !== '' ? Number(bathrooms) : undefined,
      size: size || '50 x 100 ft',
      lotDimension,
      titleDeed,
      description: description || 'Prime property listed with Georant Home Lots and Properties.',
      features,
      images,
      featured,
      status: initialProperty ? initialProperty.status : 'available',
      agent: DEFAULT_CONTACT,
      createdAt: initialProperty ? initialProperty.createdAt : new Date().toISOString().split('T')[0],
      viewsCount: initialProperty ? initialProperty.viewsCount : 1,
      inquiriesCount: initialProperty ? initialProperty.inquiriesCount : 0
    };

    onSave(savedProperty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" />
              <span>{initialProperty ? 'Edit Property Listing' : 'Create New Property Listing'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Listing will be immediately live on the marketplace and map with direct WhatsApp inquiries.
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 text-slate-900">
          
          {/* Section 1: Listing Type & Basics */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider pb-1 border-b border-slate-200">
              1. Basic Information & Classification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Listing Intent *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setListingType('sale')}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      listingType === 'sale'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    For Sale
                  </button>
                  <button
                    type="button"
                    onClick={() => setListingType('rent')}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      listingType === 'rent'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    For Rent
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                >
                  <option value="land">Land & Residential Lots</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="townhouse">Townhouse / Maisonette</option>
                  <option value="apartment">Modern Apartment</option>
                  <option value="commercial">Commercial Space</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reference Code
                </label>
                <input
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="e.g. GR-5520"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900 font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Property Headline / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Prime 50x100 Residential Plot with Ready Freehold Title Deed"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
              />
            </div>
          </div>

          {/* Section 2: Pricing & Title Deed */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider pb-1 border-b border-slate-200">
              2. Financials & Title Documentation
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price in KSh (Kenya Shillings) *
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 3500000"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900 font-mono font-bold text-blue-950"
                />
              </div>

              {listingType === 'rent' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rental Period
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                  >
                    <option value="per month">Per Month</option>
                    <option value="per year">Per Year</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title Deed Documentation *
                </label>
                <select
                  value={titleDeed}
                  onChange={(e) => setTitleDeed(e.target.value as TitleDeedStatus)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                >
                  <option value="Ready Title Deed">Ready Title Deed</option>
                  <option value="Freehold">Freehold Title</option>
                  <option value="Sectional Title">Sectional Title (Apt)</option>
                  <option value="Leasehold (99 Yrs)">Leasehold (99 Yrs)</option>
                </select>
              </div>

              <div className="flex items-center pt-6">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-blue-900 w-4 h-4 focus:ring-blue-900"
                  />
                  <span>Feature on Homepage Spotlight</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Location & Coordinates for Map Pin */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                3. Location & Map Pin Coordinates
              </h4>
              <span className="text-[11px] text-slate-500">Powers interactive Leaflet pin</span>
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-slate-500">Quick Corridors:</span>
              {['Ruiru', 'Juja', 'Karen', 'Kiambu Road', 'Kilimani', 'Westlands'].map((neigh) => (
                <button
                  key={neigh}
                  type="button"
                  onClick={() => handleQuickPresetLocation(neigh)}
                  className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 rounded-md font-medium transition-colors"
                >
                  {neigh}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Neighborhood / Area *
                </label>
                <input
                  type="text"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. Ruiru, Karen, Kiambu"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / County *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Kiambu or Nairobi"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Physical Address / Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 2.5km off Thika Superhighway"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={lng}
                  onChange={(e) => setLng(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Dimensions & Description */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider pb-1 border-b border-slate-200">
              4. Dimensions, Rooms & Description
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lot / Area Size *
                </label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g. 50 x 100 ft, 1/4 Acre"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lot Dimensions
                </label>
                <input
                  type="text"
                  value={lotDimension}
                  onChange={(e) => setLotDimension(e.target.value)}
                  placeholder="e.g. 50 ft by 100 ft"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                />
              </div>

              {category !== 'land' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value ? Number(e.target.value) : '')}
                      placeholder="e.g. 4"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value ? Number(e.target.value) : '')}
                      placeholder="e.g. 5"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Property Overview & Details
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe access road quality, water/power availability, neighborhood amenities, neighborhood security..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900 leading-relaxed"
              />
            </div>
          </div>

          {/* Section 5: Features & Amenities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider pb-1 border-b border-slate-200">
              5. Amenities & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {AMENITIES_LIST.map((amenity) => {
                const isSelected = features.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleFeature(amenity)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: Photos & Imagery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider pb-1 border-b border-slate-200">
              6. Photos & Showcase Imagery
            </h4>

            {/* Quick Presets */}
            <div>
              <span className="text-[11px] text-slate-500 block mb-1">Select from high-resolution catalog photos:</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {STOCK_IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!images.includes(preset.url)) {
                        setImages([...images, preset.url]);
                      }
                    }}
                    className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] text-left hover:border-blue-600 transition-colors"
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/60 p-1 flex items-end">
                      <span className="text-[10px] text-white font-semibold leading-tight">{preset.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL addition */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or paste external image URL..."
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
              />
              <button
                type="button"
                onClick={addCustomImage}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg"
              >
                Add Image
              </button>
            </div>

            {/* Selected Images List */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                  <img src={img} alt="chosen" className="w-full h-full object-cover" />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full hover:bg-rose-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              {initialProperty ? 'Save Changes' : 'Publish Property Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
