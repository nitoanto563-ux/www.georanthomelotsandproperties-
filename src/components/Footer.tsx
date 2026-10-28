import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl, getTelUrl } from '../utils/formatters';

interface FooterProps {
  onSelectCategory: (category: any) => void;
  onOpenListingManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenListingManager,
}) => {
  const phonePrimary = "0728221098";
  const phoneSecondary = "0101100875";
  const tiktokHandle = "githinji’s Homes n Lots";

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Monogram Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/public/assets/aistudio/WhatsApp_Image_2026-10-28_at_1.49.22_AM_6a8f664e.jpeg"
                alt="Georant Home Lots and Properties"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-md"
              />
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight uppercase font-mono block">
                  GEORANT
                </span>
                <span className="text-xs tracking-wider text-blue-400 font-semibold uppercase">
                  Home Lots and Properties
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your dependable partner for residential parcels, commercial lots, luxury homes, and rental apartments across Nairobi, Ruiru, Juja, Karen, and the Kiambu Road growth corridors.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Documentation & Ready Title Deeds</span>
            </div>
          </div>

          {/* Direct Contact Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={getWhatsAppUrl(phonePrimary, "Hello Georant Properties, I would like to inquire about listings.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: 0728 221 098</span>
                </a>
              </li>
              <li>
                <a
                  href={getTelUrl(phonePrimary)}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call: 0728 221 098</span>
                </a>
              </li>
              <li>
                <a
                  href={getTelUrl(phoneSecondary)}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call: 0101 100 875</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Nairobi & Kiambu Metropolitan Hubs</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Video Tours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Social Video Tours
            </h4>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-300 font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 fill-current text-rose-400" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 9.22 5.58 6.3 6.3 0 0 0 3.59-5.58V8.18a8.28 8.28 0 0 0 4.84 1.54V6.27a4.82 4.82 0 0 1-1.06-.02z"/>
                </svg>
                <span>TikTok Channel</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Watch continuous on-ground walkthrough videos of land plots and houses on our TikTok:
              </p>
              <a
                href="https://www.tiktok.com/search?q=githinji%E2%80%99s%20Homes%20n%20Lots"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-white font-bold transition-colors"
              >
                <span>@{tiktokHandle}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Property Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('land')}
                  className="hover:text-white text-slate-400 transition-colors"
                >
                  50x100 Residential Lots
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('villa')}
                  className="hover:text-white text-slate-400 transition-colors"
                >
                  Luxury Contemporary Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('apartment')}
                  className="hover:text-white text-slate-400 transition-colors"
                >
                  Rental & Serviced Apartments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('commercial')}
                  className="hover:text-white text-slate-400 transition-colors"
                >
                  Commercial Spaces & Plazas
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenListingManager}
                  className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
                >
                  Agent Listing Manager →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Bar (Conforms to section 1B anti-slop: quiet copyright, no fake engines) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Georant Home Lots and Properties. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct WhatsApp: 0728 221 098</span>
            <span>·</span>
            <span>Call: 0101 100 875</span>
            <span>·</span>
            <span>TikTok: {tiktokHandle}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
