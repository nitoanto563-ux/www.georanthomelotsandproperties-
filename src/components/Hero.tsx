import React from 'react';
import { Search, MapPin, Building2, Tag, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { PropertyFilterState, PropertyCategory, ListingType } from '../types/property';
import { NEIGHBORHOODS } from '../data/defaultProperties';
import { getWhatsAppUrl } from '../utils/formatters';

interface HeroProps {
  filters: PropertyFilterState;
  onUpdateFilters: (updates: Partial<PropertyFilterState>) => void;
  onSearchClick: () => void;
  totalPropertiesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onUpdateFilters,
  onSearchClick,
  totalPropertiesCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-12 md:py-20">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_modern_villa_1793173267060.jpg"
          alt="Luxury modern property showcase"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold mb-4 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Verified Title Deeds & Authentic Plots</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 [text-wrap:balance]">
            Prime Homes, Commercial Spaces & Strategic Lots
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Specializing in verified residential 50x100 plots, modern family townhouses, luxury apartments, and commercial leasing across Nairobi and Kiambu county.
          </p>

          {/* Quick Contact & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href={getWhatsAppUrl("0728221098", "Hello Georant Properties, I would like to inquire about available plots and houses.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (0728 221 098)</span>
            </a>
            <a
              href="https://www.tiktok.com/search?q=githinji%E2%80%99s%20Homes%20n%20Lots"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-sm font-semibold backdrop-blur-sm transition-all"
            >
              <span>Watch Video Walkthroughs on TikTok</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Search Engine Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900 border border-slate-100 max-w-5xl">
          {/* Segmented Filter Mode Buttons */}
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 overflow-x-auto">
            <button
              onClick={() => onUpdateFilters({ listingType: 'all', category: 'all' })}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                filters.listingType === 'all' && filters.category === 'all'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              All Listings ({totalPropertiesCount})
            </button>
            <button
              onClick={() => onUpdateFilters({ listingType: 'sale', category: 'all' })}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                filters.listingType === 'sale' && filters.category === 'all'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Buy Homes & Land
            </button>
            <button
              onClick={() => onUpdateFilters({ listingType: 'rent', category: 'all' })}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                filters.listingType === 'rent'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              For Rent
            </button>
            <button
              onClick={() => onUpdateFilters({ category: 'land' })}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                filters.category === 'land'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Plots & Lots (50x100 / Acres)
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 items-center">
            {/* Keyword Input */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Keyword or Property Ref
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Karen Villa, 50x100, Ruiru..."
                  value={filters.searchQuery}
                  onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
                  className="w-full text-xs text-slate-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Neighborhood Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Neighborhood / Corridor
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 transition-all">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={filters.neighborhood}
                  onChange={(e) => onUpdateFilters({ neighborhood: e.target.value })}
                  className="w-full text-xs text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  {NEIGHBORHOODS.map((loc) => (
                    <option key={loc} value={loc === "All Neighborhoods" ? "" : loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 transition-all">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={filters.category}
                  onChange={(e) => onUpdateFilters({ category: e.target.value as any })}
                  className="w-full text-xs text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="land">Land & Residential Lots</option>
                  <option value="villa">Luxury Villas</option>
                  <option value="townhouse">Townhouses</option>
                  <option value="apartment">Modern Apartments</option>
                  <option value="commercial">Commercial Space</option>
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="pt-5 md:pt-0">
              <button
                onClick={onSearchClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-blue-900 hover:bg-blue-800 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>Search Listings</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Trust Highlights Below Search */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Ready Title Deeds & Beacon Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant Direct WhatsApp to Agents</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Prime Nairobi, Kiambu & Thika Hubs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Free On-Site Guided Viewing Tours</span>
          </div>
        </div>
      </div>
    </section>
  );
};
