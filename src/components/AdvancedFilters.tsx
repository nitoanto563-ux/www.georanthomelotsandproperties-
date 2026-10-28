import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ShieldCheck,
  Building,
  Home,
  MapPin,
  Tag
} from 'lucide-react';
import { PropertyFilterState, PropertyCategory, ListingType } from '../types/property';
import { NEIGHBORHOODS, AMENITIES_LIST } from '../data/defaultProperties';

interface AdvancedFiltersProps {
  filters: PropertyFilterState;
  onUpdateFilters: (updates: Partial<PropertyFilterState>) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  activeFilterCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFeature = (feature: string) => {
    const current = filters.selectedFeatures;
    if (current.includes(feature)) {
      onUpdateFilters({ selectedFeatures: current.filter((f) => f !== feature) });
    } else {
      onUpdateFilters({ selectedFeatures: [...current, feature] });
    }
  };

  const handlePricePreset = (min: number | '', max: number | '') => {
    onUpdateFilters({ minPrice: min, maxPrice: max });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
      {/* Top Header / Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-900" />
            <span>{isOpen ? 'Hide Advanced Filters' : 'Show Advanced Filters'}</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-900 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Category Tabs */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto text-xs">
            {(['all', 'sale', 'rent'] as const).map((type) => (
              <button
                key={type}
                onClick={() => onUpdateFilters({ listingType: type })}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filters.listingType === type
                    ? 'bg-blue-50 text-blue-900 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {type === 'all' ? 'All Types' : type === 'sale' ? 'For Sale' : 'For Rent'}
              </button>
            ))}
          </div>
        </div>

        {/* Sort & Reset Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Listed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Advanced Filter Controls */}
      {isOpen && (
        <div className="mt-5 pt-5 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Price Budget (KSh)
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => onUpdateFilters({ minPrice: e.target.value ? Number(e.target.value) : '' })}
                  className="w-1/2 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono"
                />
                <span className="text-slate-400 text-xs">to</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => onUpdateFilters({ maxPrice: e.target.value ? Number(e.target.value) : '' })}
                  className="w-1/2 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
              {/* Quick price presets */}
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => handlePricePreset('', 5000000)}
                  className="px-2 py-0.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                >
                  &lt; 5M
                </button>
                <button
                  type="button"
                  onClick={() => handlePricePreset(5000000, 20000000)}
                  className="px-2 py-0.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                >
                  5M - 20M
                </button>
                <button
                  type="button"
                  onClick={() => handlePricePreset(20000000, 50000000)}
                  className="px-2 py-0.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                >
                  20M - 50M
                </button>
                <button
                  type="button"
                  onClick={() => handlePricePreset(50000000, '')}
                  className="px-2 py-0.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                >
                  50M+
                </button>
              </div>
            </div>

            {/* Bedrooms Selection */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Bedrooms (Homes / Apts)
              </label>
              <div className="flex items-center gap-1">
                {['any', '1', '2', '3', '4', '5+'].map((beds) => (
                  <button
                    key={beds}
                    type="button"
                    onClick={() => onUpdateFilters({ bedrooms: beds })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      filters.bedrooms === beds
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {beds === 'any' ? 'Any' : beds}
                  </button>
                ))}
              </div>
            </div>

            {/* Plot / Lot Dimensions */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Plot / Lot Dimension
              </label>
              <select
                value={filters.minPlotSize}
                onChange={(e) => onUpdateFilters({ minPlotSize: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="any">Any Plot Size</option>
                <option value="50x100">50 x 100 ft (1/8 Acre)</option>
                <option value="quarter">1/4 Acre (100x100 ft)</option>
                <option value="half">1/2 Acre</option>
                <option value="one_plus">1 Acre or Larger</option>
              </select>
            </div>

            {/* Title Deed Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Title Deed Documentation
              </label>
              <select
                value={filters.titleDeed}
                onChange={(e) => onUpdateFilters({ titleDeed: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="any">All Documentation Types</option>
                <option value="Ready Title Deed">Ready Freehold Title Deed</option>
                <option value="Sectional Title">Sectional Title (Apartments)</option>
                <option value="Leasehold (99 Yrs)">Leasehold (Commercial)</option>
              </select>
            </div>
          </div>

          {/* Amenities & Infrastructure Features */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Key Features & Infrastructure
            </label>
            <div className="flex flex-wrap gap-2">
              {AMENITIES_LIST.map((amenity) => {
                const isSelected = filters.selectedFeatures.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleFeature(amenity)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-200" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
