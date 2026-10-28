import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  PlusCircle, 
  Heart, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';
import { getWhatsAppUrl, getTelUrl } from '../utils/formatters';

interface HeaderProps {
  currentTab: 'all' | 'sale' | 'rent' | 'land' | 'manage';
  onSelectTab: (tab: 'all' | 'sale' | 'rent' | 'land' | 'manage') => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  favoritesCount,
  onOpenFavorites,
  onOpenAddModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phonePrimary = "0728221098";
  const phoneSecondary = "0101100875";
  const tiktokHandle = "githinji’s Homes n Lots";

  const handleNavClick = (tab: 'all' | 'sale' | 'rent' | 'land' | 'manage') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Contact Strip */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            {/* WhatsApp */}
            <a 
              href={getWhatsAppUrl(phonePrimary, "Hello Georant Properties, I'm reaching out from your website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: <strong>0728 221 098</strong></span>
            </a>

            <span className="text-slate-600 hidden sm:inline">·</span>

            {/* Direct Calls */}
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-400">Call Us:</span>
              <a href={getTelUrl(phonePrimary)} className="hover:text-blue-300 transition-colors font-medium">
                0728 221 098
              </a>
              <span className="text-slate-600">/</span>
              <a href={getTelUrl(phoneSecondary)} className="hover:text-blue-300 transition-colors font-medium">
                0101 100 875
              </a>
            </div>
          </div>

          {/* TikTok & Verified badge */}
          <div className="flex items-center gap-3">
            <a 
              href="https://www.tiktok.com/search?q=githinji%E2%80%99s%20Homes%20n%20Lots"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              title="Visit TikTok page"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 9.22 5.58 6.3 6.3 0 0 0 3.59-5.58V8.18a8.28 8.28 0 0 0 4.84 1.54V6.27a4.82 4.82 0 0 1-1.06-.02z"/>
              </svg>
              <span>TikTok: <strong>{tiktokHandle}</strong></span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Conforms to Top Bar Contract: 3 zones separated by gap-8) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <button 
            onClick={() => handleNavClick('all')} 
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
          >
            <img 
              src="/public/assets/aistudio/WhatsApp_Image_2026-10-28_at_1.49.22_AM_6a8f664e.jpeg" 
              alt="Georant Home Lots and Properties Logo" 
              className="w-10 h-10 rounded-full object-cover border border-blue-600/30 shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-blue-950 uppercase leading-none font-mono">
                GEORANT
              </span>
              <span className="text-[10px] tracking-wider text-blue-700 font-semibold uppercase leading-tight mt-0.5">
                Home Lots & Properties
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <button
              onClick={() => handleNavClick('all')}
              className={`whitespace-nowrap transition-colors hover:text-blue-900 ${
                currentTab === 'all' ? 'text-blue-900 border-b-2 border-blue-900 pb-1 font-bold' : ''
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => handleNavClick('sale')}
              className={`whitespace-nowrap transition-colors hover:text-blue-900 ${
                currentTab === 'sale' ? 'text-blue-900 border-b-2 border-blue-900 pb-1 font-bold' : ''
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => handleNavClick('rent')}
              className={`whitespace-nowrap transition-colors hover:text-blue-900 ${
                currentTab === 'rent' ? 'text-blue-900 border-b-2 border-blue-900 pb-1 font-bold' : ''
              }`}
            >
              For Rent
            </button>
            <button
              onClick={() => handleNavClick('land')}
              className={`whitespace-nowrap transition-colors hover:text-blue-900 ${
                currentTab === 'land' ? 'text-blue-900 border-b-2 border-blue-900 pb-1 font-bold' : ''
              }`}
            >
              Land & Lots
            </button>
            <button
              onClick={() => handleNavClick('manage')}
              className={`whitespace-nowrap transition-colors hover:text-blue-900 ${
                currentTab === 'manage' ? 'text-blue-900 border-b-2 border-blue-900 pb-1 font-bold' : ''
              }`}
            >
              Manage Listings
            </button>
          </nav>

          {/* Zone 3: Primary Action + Favorites */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="Saved Properties"
              aria-label="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAddModal}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 text-blue-200" />
              <span>List Property</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col gap-2 pb-2">
            <button
              onClick={() => handleNavClick('all')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'all' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => handleNavClick('sale')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'sale' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => handleNavClick('rent')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'rent' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              For Rent
            </button>
            <button
              onClick={() => handleNavClick('land')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'land' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Land & Lots (50x100, Acres)
            </button>
            <button
              onClick={() => handleNavClick('manage')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'manage' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Listing Management Tools
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddModal();
              }}
              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 bg-blue-900 text-white rounded-xl text-sm font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List a New Property</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
