import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  Download, 
  Upload, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  Clock, 
  Check, 
  MapPin, 
  Building2,
  DollarSign,
  TrendingUp,
  MessageCircle,
  FileSpreadsheet
} from 'lucide-react';
import { Property, PropertyStatus } from '../types/property';
import { formatPrice, formatNumber } from '../utils/formatters';
import { INITIAL_PROPERTIES } from '../data/defaultProperties';

interface ListingManagerProps {
  properties: Property[];
  onAddListing: () => void;
  onEditListing: (property: Property) => void;
  onDeleteListing: (id: string) => void;
  onUpdateStatus: (id: string, status: PropertyStatus) => void;
  onToggleFeatured: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onRestoreDefaults: () => void;
  onImportListings: (imported: Property[]) => void;
}

export const ListingManager: React.FC<ListingManagerProps> = ({
  properties,
  onAddListing,
  onEditListing,
  onDeleteListing,
  onUpdateStatus,
  onToggleFeatured,
  onSelectProperty,
  onRestoreDefaults,
  onImportListings,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PropertyStatus>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Computed Portfolio Metrics
  const totalListings = properties.length;
  const availableCount = properties.filter((p) => p.status === 'available').length;
  const soldRentedCount = properties.filter((p) => p.status === 'sold' || p.status === 'rented').length;
  const totalValue = properties.reduce((acc, curr) => acc + curr.price, 0);
  const totalInquiries = properties.reduce((acc, curr) => acc + curr.inquiriesCount, 0);

  // Filtered Properties
  const filtered = properties.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export JSON handler
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(properties, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `georant_properties_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON handler
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onImportListings(parsed);
          alert(`Successfully imported ${parsed.length} property listings!`);
        } else {
          alert('Invalid property backup file format.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Title */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold mb-3 border border-blue-400/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>Agent & Management Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Listing Management & Inventory Tools
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Add new land lots and housing properties, adjust prices, toggle sold/available status, and track buyer inquiry volume in real-time.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={onAddListing}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Listing</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Backup (JSON)</span>
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Import Listings</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (confirm('Restore demo catalog of properties? This will reset custom additions.')) {
                onRestoreDefaults();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-slate-400 hover:text-slate-200 text-xs transition-colors ml-auto"
            title="Reset to default catalog"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Inventory
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
            {totalListings} <span className="text-xs font-normal text-slate-400">properties</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            {availableCount} currently active
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Portfolio Value
          </div>
          <div className="text-2xl font-black text-blue-950 font-mono tabular-nums">
            KSh {formatNumber(Math.round(totalValue / 1000000))}M+
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Combined listing capital
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Inquiries
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums flex items-center gap-2">
            <span>{totalInquiries}</span>
            <MessageCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            WhatsApp & phone calls initiated
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Closed / Rented
          </div>
          <div className="text-2xl font-black text-indigo-900 font-mono tabular-nums">
            {soldRentedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Successful transactions
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by title, ref code or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs bg-transparent focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {(['all', 'available', 'under_offer', 'sold', 'rented'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Featured</th>
                <th className="py-3.5 px-3 text-center">Inquiries</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No listings found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Property Title & Image */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images[0] || '/public/assets/aistudio/WhatsApp_Image_2026-10-28_at_1.49.22_AM_6a8f664e.jpeg'}
                            alt={item.title}
                            className="w-12 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="max-w-xs">
                            <div className="font-bold text-slate-900 truncate hover:text-blue-900 cursor-pointer" onClick={() => onSelectProperty(item)}>
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                              <span className="font-mono font-bold text-blue-700">{item.refNumber}</span>
                              <span>·</span>
                              <span>{item.location.neighborhood}</span>
                              <span>·</span>
                              <span>{item.size}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-700 capitalize">
                          {item.category}
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {item.listingType === 'sale' ? 'Sale' : 'Rent'}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-3">
                        <div className="font-bold font-mono text-slate-900 tabular-nums">
                          {formatPrice(item.price, item.listingType, item.period)}
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-3">
                        <select
                          value={item.status}
                          onChange={(e) => onUpdateStatus(item.id, e.target.value as PropertyStatus)}
                          className={`px-2 py-1 rounded-md text-[11px] font-bold border cursor-pointer focus:outline-none ${
                            item.status === 'available'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : item.status === 'under_offer'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-slate-100 text-slate-800 border-slate-300'
                          }`}
                        >
                          <option value="available">Available</option>
                          <option value="under_offer">Under Offer</option>
                          <option value="sold">Sold</option>
                          <option value="rented">Rented</option>
                        </select>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => onToggleFeatured(item.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            item.featured 
                              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                              : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                          }`}
                          title={item.featured ? 'Featured on Spotlight' : 'Click to feature'}
                        >
                          <Star className={`w-4 h-4 ${item.featured ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      {/* Inquiries */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-mono font-bold text-slate-700">
                          {item.inquiriesCount}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectProperty(item)}
                            className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Preview Listing"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onEditListing(item)}
                            className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {deleteConfirmId === item.id ? (
                            <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-lg border border-rose-200">
                              <span className="text-[10px] text-rose-700 font-semibold px-1">Delete?</span>
                              <button
                                onClick={() => {
                                  onDeleteListing(item.id);
                                  setDeleteConfirmId(null);
                                }}
                                className="px-1.5 py-0.5 bg-rose-600 text-white text-[10px] rounded font-bold hover:bg-rose-700"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-0.5 bg-slate-200 text-slate-700 text-[10px] rounded hover:bg-slate-300"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
