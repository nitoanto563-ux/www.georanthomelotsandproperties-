import React from 'react';
import { X, Trash2, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { Property } from '../types/property';
import { formatPrice, getWhatsAppUrl } from '../utils/formatters';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onClearAll: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectProperty,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handleWhatsAppAll = () => {
    if (favorites.length === 0) return;
    const titles = favorites.map((p) => `• ${p.title} (Ref: ${p.refNumber}, ${formatPrice(p.price, p.listingType)})`).join('\n');
    const msg = `Hello Georant Properties, I have saved the following ${favorites.length} properties from your website and would like to arrange viewings:\n\n${titles}\n\nPlease let me know their current availability.`;
    window.open(getWhatsAppUrl("0728221098", msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h3 className="font-bold text-base">Saved Properties ({favorites.length})</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favorites.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Heart className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700 mb-1">No Saved Properties Yet</h4>
                <p className="text-xs text-slate-500">
                  Click the heart icon on any villa, apartment, or land lot to save it for quick review.
                </p>
              </div>
            ) : (
              favorites.map((prop) => (
                <div
                  key={prop.id}
                  className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200 transition-colors flex items-center gap-3 relative group"
                >
                  <img
                    src={prop.images[0] || '/public/assets/aistudio/WhatsApp_Image_2026-10-28_at_1.49.22_AM_6a8f664e.jpeg'}
                    alt={prop.title}
                    className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div 
                      className="text-xs font-bold text-slate-900 truncate cursor-pointer hover:text-blue-900"
                      onClick={() => {
                        onSelectProperty(prop);
                        onClose();
                      }}
                    >
                      {prop.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {prop.location.neighborhood} · {prop.size}
                    </div>
                    <div className="text-xs font-extrabold text-blue-950 font-mono tabular-nums mt-0.5">
                      {formatPrice(prop.price, prop.listingType, prop.period)}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFavorite(prop.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Actions */}
          {favorites.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
              <button
                onClick={handleWhatsAppAll}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire All via WhatsApp</span>
              </button>

              <button
                onClick={onClearAll}
                className="w-full py-2 text-xs text-slate-500 hover:text-rose-600 transition-colors"
              >
                Clear All Favorites
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
