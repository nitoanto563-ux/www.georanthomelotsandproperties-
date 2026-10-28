import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Map as MapIcon, 
  Grid3X3, 
  Columns2, 
  PlusCircle, 
  MessageCircle, 
  Phone, 
  Sparkles, 
  Filter, 
  ShieldCheck, 
  CheckCircle2,
  Building,
  ArrowRight
} from 'lucide-react';
import { Property, PropertyFilterState, PropertyStatus } from './types/property';
import { 
  loadPropertiesFromStorage, 
  savePropertiesToStorage, 
  loadFavoritesFromStorage, 
  saveFavoritesToStorage,
  getWhatsAppUrl,
  getTelUrl
} from './utils/formatters';
import { INITIAL_PROPERTIES } from './data/defaultProperties';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AdvancedFilters } from './components/AdvancedFilters';
import { PropertyCard } from './components/PropertyCard';
import { PropertyMap } from './components/PropertyMap';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ListingManager } from './components/ListingManager';
import { ListingFormModal } from './components/ListingFormModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Footer } from './components/Footer';

export default function App() {
  // Master Properties State with LocalStorage
  const [properties, setProperties] = useState<Property[]>(() => loadPropertiesFromStorage());
  const [favorites, setFavorites] = useState<string[]>(() => loadFavoritesFromStorage());
  
  // Navigation & View Mode
  const [currentTab, setCurrentTab] = useState<'all' | 'sale' | 'rent' | 'land' | 'manage'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'split' | 'map'>('grid');

  // Modals & Drawers
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Search & Filter State
  const initialFilterState: PropertyFilterState = {
    searchQuery: '',
    listingType: 'all',
    category: 'all',
    neighborhood: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any',
    bathrooms: 'any',
    minPlotSize: 'any',
    titleDeed: 'any',
    selectedFeatures: [],
    sortBy: 'featured',
  };

  const [filters, setFilters] = useState<PropertyFilterState>(initialFilterState);

  // Ref to browse section for smooth scroll on search
  const browseSectionRef = useRef<HTMLDivElement>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    savePropertiesToStorage(properties);
  }, [properties]);

  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  // Adjust filters when user changes main nav tab
  const handleNavSelectTab = (tab: 'all' | 'sale' | 'rent' | 'land' | 'manage') => {
    setCurrentTab(tab);
    if (tab === 'sale') {
      setFilters(prev => ({ ...prev, listingType: 'sale', category: 'all' }));
    } else if (tab === 'rent') {
      setFilters(prev => ({ ...prev, listingType: 'rent', category: 'all' }));
    } else if (tab === 'land') {
      setFilters(prev => ({ ...prev, category: 'land', listingType: 'all' }));
    } else if (tab === 'all') {
      setFilters(prev => ({ ...prev, listingType: 'all', category: 'all' }));
    }
  };

  const handleUpdateFilters = (updates: Partial<PropertyFilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  const handleSearchClick = () => {
    if (currentTab === 'manage') {
      setCurrentTab('all');
    }
    browseSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle favorite property
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Listing Management Actions
  const handleSaveListing = (savedProp: Property) => {
    setProperties(prev => {
      const existsIndex = prev.findIndex(p => p.id === savedProp.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = savedProp;
        return updated;
      } else {
        return [savedProp, ...prev];
      }
    });
  };

  const handleDeleteListing = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setFavorites(prev => prev.filter(fId => fId !== id));
  };

  const handleUpdateStatus = (id: string, status: PropertyStatus) => {
    setProperties(prev => 
      prev.map(p => p.id === id ? { ...p, status } : p)
    );
  };

  const handleToggleFeatured = (id: string) => {
    setProperties(prev => 
      prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p)
    );
  };

  const handleRestoreDefaults = () => {
    setProperties(INITIAL_PROPERTIES);
  };

  const handleImportListings = (imported: Property[]) => {
    setProperties(imported);
  };

  const handleOpenAddListing = () => {
    setEditingProperty(null);
    setIsListingFormOpen(true);
  };

  const handleOpenEditListing = (prop: Property) => {
    setEditingProperty(prop);
    setIsListingFormOpen(true);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.listingType !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.neighborhood) count++;
    if (filters.minPrice !== '') count++;
    if (filters.maxPrice !== '') count++;
    if (filters.bedrooms !== 'any') count++;
    if (filters.minPlotSize !== 'any') count++;
    if (filters.titleDeed !== 'any') count++;
    count += filters.selectedFeatures.length;
    return count;
  }, [filters]);

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Search Query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesText = 
          prop.title.toLowerCase().includes(query) ||
          prop.refNumber.toLowerCase().includes(query) ||
          prop.location.neighborhood.toLowerCase().includes(query) ||
          prop.location.city.toLowerCase().includes(query) ||
          prop.description.toLowerCase().includes(query);
        if (!matchesText) return false;
      }

      // Listing Type (Sale / Rent)
      if (filters.listingType !== 'all' && prop.listingType !== filters.listingType) {
        return false;
      }

      // Category
      if (filters.category !== 'all' && prop.category !== filters.category) {
        return false;
      }

      // Neighborhood
      if (filters.neighborhood && prop.location.neighborhood !== filters.neighborhood) {
        return false;
      }

      // Price Range
      if (filters.minPrice !== '' && prop.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice !== '' && prop.price > Number(filters.maxPrice)) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'any') {
        const required = parseInt(filters.bedrooms);
        if (!prop.bedrooms || prop.bedrooms < required) {
          return false;
        }
      }

      // Title Deed
      if (filters.titleDeed !== 'any' && prop.titleDeed !== filters.titleDeed) {
        return false;
      }

      // Plot / Lot Size filter
      if (filters.minPlotSize !== 'any') {
        const lowerSize = prop.size.toLowerCase();
        if (filters.minPlotSize === '50x100' && !lowerSize.includes('50') && !lowerSize.includes('1/8')) {
          return false;
        }
        if (filters.minPlotSize === 'quarter' && !lowerSize.includes('1/4') && !lowerSize.includes('quarter')) {
          return false;
        }
        if (filters.minPlotSize === 'half' && !lowerSize.includes('1/2') && !lowerSize.includes('half')) {
          return false;
        }
        if (filters.minPlotSize === 'one_plus' && !lowerSize.includes('1 acre') && !lowerSize.includes('1.00 acre')) {
          return false;
        }
      }

      // Selected Features
      if (filters.selectedFeatures.length > 0) {
        const hasAllFeatures = filters.selectedFeatures.every((f) => 
          prop.features.includes(f)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
  }, [properties, filters]);

  // Saved Properties List
  const favoriteProperties = useMemo(() => {
    return properties.filter((p) => favorites.includes(p.id));
  }, [properties, favorites]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleNavSelectTab}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAddModal={handleOpenAddListing}
      />

      {/* Main Content Area */}
      {currentTab === 'manage' ? (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <ListingManager
            properties={properties}
            onAddListing={handleOpenAddListing}
            onEditListing={handleOpenEditListing}
            onDeleteListing={handleDeleteListing}
            onUpdateStatus={handleUpdateStatus}
            onToggleFeatured={handleToggleFeatured}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onRestoreDefaults={handleRestoreDefaults}
            onImportListings={handleImportListings}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section with Quick Search */}
          <Hero
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            onSearchClick={handleSearchClick}
            totalPropertiesCount={properties.length}
          />

          {/* Properties Browsing Section */}
          <div ref={browseSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Filter Controls */}
            <AdvancedFilters
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />

            {/* Results Header: Count & View Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Available Properties & Residential Lots
                </h2>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>Showing <strong>{filteredProperties.length}</strong> matching listings</span>
                  <span aria-hidden="true">·</span>
                  <span>Direct WhatsApp contact: 0728 221 098</span>
                </div>
              </div>

              {/* View Mode Buttons (Grid, Split, Map Only) */}
              <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>

                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'split'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Split Map + List View"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Split View</span>
                </button>

                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'map'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Map View"
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>
            </div>

            {/* Dynamic View Layouts */}
            {viewMode === 'grid' && (
              <div className="space-y-10">
                {filteredProperties.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
                    <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800 mb-1">No Matching Properties Found</h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Try broadening your price range, choosing another neighborhood, or resetting your filter options.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-5 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        isFavorite={favorites.includes(prop.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectProperty={(p) => setSelectedProperty(p)}
                        onViewOnMap={(p) => {
                          setSelectedProperty(p);
                          setViewMode('split');
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Inline Map preview below grid for spatial convenience */}
                {filteredProperties.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Property Geolocation Map
                        </h3>
                        <p className="text-xs text-slate-500">
                          Browse properties geographically across Nairobi and Kiambu metropolitan corridors.
                        </p>
                      </div>
                      <button
                        onClick={() => setViewMode('split')}
                        className="text-xs font-bold text-blue-900 hover:text-blue-700 inline-flex items-center gap-1"
                      >
                        <span>Open Side-by-Side View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <PropertyMap
                      properties={filteredProperties}
                      selectedProperty={selectedProperty}
                      onSelectProperty={(prop) => setSelectedProperty(prop)}
                      heightClass="h-[460px]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Split View (Map on Left / Top, Properties on Right) */}
            {viewMode === 'split' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Sticky Map Container */}
                <div className="lg:col-span-6 sticky top-28">
                  <PropertyMap
                    properties={filteredProperties}
                    selectedProperty={selectedProperty}
                    onSelectProperty={(prop) => setSelectedProperty(prop)}
                    heightClass="h-[620px]"
                  />
                </div>

                {/* Properties Scroll Column */}
                <div className="lg:col-span-6 space-y-4 max-h-[620px] overflow-y-auto pr-1">
                  {filteredProperties.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                      No properties found matching filters.
                    </div>
                  ) : (
                    filteredProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        isFavorite={favorites.includes(prop.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectProperty={(p) => setSelectedProperty(p)}
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Map Only View */}
            {viewMode === 'map' && (
              <div className="space-y-4">
                <PropertyMap
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={(prop) => setSelectedProperty(prop)}
                  heightClass="h-[680px]"
                />
              </div>
            )}
          </div>
        </main>
      )}

      {/* Floating Quick WhatsApp Action Button (always easily accessible) */}
      <aside aria-label="Floating WhatsApp contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={getWhatsAppUrl("0728221098", "Hello Georant Properties, I'm visiting your website and have an inquiry about available properties.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-bold border-2 border-white"
          title="Chat directly with Githinji on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">WhatsApp (0728 221 098)</span>
        </a>
      </aside>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setFilters(prev => ({ ...prev, category: cat }));
          setCurrentTab('all');
          browseSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenListingManager={() => {
          setCurrentTab('manage');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Listing Add / Edit Form Modal */}
      <ListingFormModal
        isOpen={isListingFormOpen}
        onClose={() => {
          setIsListingFormOpen(false);
          setEditingProperty(null);
        }}
        onSave={handleSaveListing}
        initialProperty={editingProperty}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProperties}
        onRemoveFavorite={(id) => setFavorites(prev => prev.filter(fId => fId !== id))}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onClearAll={() => setFavorites([])}
      />

    </div>
  );
}
