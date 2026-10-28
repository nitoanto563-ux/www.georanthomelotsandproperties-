import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  MessageCircle, 
  Phone, 
  Share2, 
  Heart, 
  Calendar, 
  Check, 
  Calculator,
  ExternalLink,
  Info
} from 'lucide-react';
import { Property } from '../types/property';
import { formatPrice, formatNumber, getWhatsAppUrl, createPropertyWhatsAppMessage, getTelUrl } from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  // Viewing scheduler form state
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [viewingSubmitted, setViewingSubmitted] = useState(false);

  // Mortgage Calculator state
  const isSale = property.listingType === 'sale';
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(13); // standard Kenya mortgage rate ~12-14%
  const [loanTermYears, setLoanTermYears] = useState(15);

  const loanAmount = property.price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;
  const monthlyPayment = isSale && monthlyRate > 0 && numPayments > 0
    ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : 0;

  const whatsappMsg = createPropertyWhatsAppMessage(property);
  const whatsappUrl = getWhatsAppUrl(property.agent.whatsapp, whatsappMsg);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: `Check out ${property.title} with Georant Properties: ${formatPrice(property.price, property.listingType)}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      }
    } catch {
      // ignore aborts
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setViewingSubmitted(true);
    // Auto-launch WhatsApp with viewing details
    const customMsg = `Hello Georant Properties, I would like to book a site viewing for "${property.title}" (Ref: ${property.refNumber}). My Name: ${visitorName}, Phone: ${visitorPhone}, Preferred Date: ${preferredDate}.`;
    window.open(getWhatsAppUrl(property.agent.whatsapp, customMsg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-slate-200">
        
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-900 rounded-md">
              Ref: {property.refNumber}
            </span>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              {property.location.neighborhood}, {property.location.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleFavorite(property.id, e)}
              className={`p-2 rounded-xl border transition-colors ${
                isFavorite 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-rose-600'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl transition-colors relative"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          
          {/* Visual Showcase Gallery */}
          <div>
            <div className="relative aspect-[16/9] w-full bg-slate-900 rounded-2xl overflow-hidden shadow-md">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 text-xs font-bold bg-slate-950/80 text-white rounded-md backdrop-blur-md">
                  {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
                <span className="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-md backdrop-blur-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {property.titleDeed}
                </span>
              </div>
            </div>

            {/* Thumbnail Row if multiple images */}
            {property.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-blue-900 ring-2 ring-blue-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Grid: Details Left, Contiguous Contact Card Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Specs, Description, Amenities */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                  {property.category} Property · {property.location.neighborhood}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  {property.title}
                </h2>
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{property.location.address}, {property.location.city}</span>
                </div>
              </div>

              {/* Price Highlight */}
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase font-bold text-slate-500">
                    {property.listingType === 'sale' ? 'Sale Price' : 'Monthly Rental Rate'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-950 font-mono tabular-nums">
                    {formatPrice(property.price, property.listingType, property.period)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Title
                  </span>
                  <div className="text-[11px] text-slate-500 mt-1">Ready for transfer / occupation</div>
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-200 text-xs">
                {property.bedrooms !== undefined && property.bedrooms > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="text-slate-400 font-medium mb-1 flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-slate-500" />
                      <span>Bedrooms</span>
                    </div>
                    <div className="text-base font-bold text-slate-900">{property.bedrooms} Ensuite</div>
                  </div>
                )}
                {property.bathrooms !== undefined && property.bathrooms > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="text-slate-400 font-medium mb-1 flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-slate-500" />
                      <span>Bathrooms</span>
                    </div>
                    <div className="text-base font-bold text-slate-900">{property.bathrooms} Baths</div>
                  </div>
                )}
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-slate-400 font-medium mb-1 flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Plot / Area Size</span>
                  </div>
                  <div className="text-base font-bold text-slate-900">{property.size}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-slate-400 font-medium mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                    <span>Documentation</span>
                  </div>
                  <div className="text-base font-bold text-emerald-700 truncate">{property.titleDeed}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Property Overview</h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Infrastructure & Amenities */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">Key Amenities & Utilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mortgage Calculator for Sales */}
              {isSale && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-blue-900" />
                      <h4 className="text-sm font-bold text-slate-900">Mortgage & Financing Estimator</h4>
                    </div>
                    <span className="text-[11px] text-slate-500">Estimates only</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Down Payment ({downPaymentPercent}%)
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full accent-blue-900"
                      />
                      <div className="text-xs font-mono text-slate-800 mt-1">
                        KSh {formatNumber(property.price * (downPaymentPercent / 100))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Interest Rate ({interestRate}%)
                      </label>
                      <input
                        type="range"
                        min="9"
                        max="18"
                        step="0.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full accent-blue-900"
                      />
                      <div className="text-xs font-mono text-slate-800 mt-1">{interestRate}% p.a.</div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Loan Term ({loanTermYears} Yrs)
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="5"
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(Number(e.target.value))}
                        className="w-full accent-blue-900"
                      />
                      <div className="text-xs font-mono text-slate-800 mt-1">{loanTermYears} Years</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-blue-200 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-medium text-slate-500">Estimated Monthly Installment:</div>
                      <div className="text-lg font-black text-blue-900 font-mono tabular-nums">
                        KSh {formatNumber(Math.round(monthlyPayment))} <span className="text-xs font-normal text-slate-500">/ mo</span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-500">
                      Loan: KSh {formatNumber(Math.round(loanAmount))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Contiguous Purchase / Contact Module */}
            <div className="space-y-5">
              
              {/* Agent & Direct WhatsApp Card */}
              <div className="bg-white rounded-2xl border-2 border-blue-900/10 shadow-lg p-5 sticky top-20">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <img
                    src="/public/assets/aistudio/WhatsApp_Image_2026-10-28_at_1.49.22_AM_6a8f664e.jpeg"
                    alt="Georant Agent"
                    className="w-12 h-12 rounded-full object-cover border border-blue-600 shadow-sm"
                  />
                  <div>
                    <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Verified Agent
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">
                      Githinji · Georant Properties
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Home Lots & Properties Representative
                    </div>
                  </div>
                </div>

                {/* Primary Direct Actions */}
                <div className="mt-4 space-y-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-98"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp: 0728 221 098</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={getTelUrl(property.agent.phonePrimary)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call 0728 221 098</span>
                    </a>
                    <a
                      href={getTelUrl(property.agent.phoneSecondary)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call 0101 100 875</span>
                    </a>
                  </div>

                  {/* TikTok Direct Card */}
                  <a
                    href="https://www.tiktok.com/search?q=githinji%E2%80%99s%20Homes%20n%20Lots"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 fill-current text-rose-400" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 9.22 5.58 6.3 6.3 0 0 0 3.59-5.58V8.18a8.28 8.28 0 0 0 4.84 1.54V6.27a4.82 4.82 0 0 1-1.06-.02z"/>
                      </svg>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase">TikTok Channel</div>
                        <div className="font-bold">githinji’s Homes n Lots</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </a>
                </div>

                {/* Book Site Visit Form */}
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-900" />
                    <span>Book a Guided Site Visit</span>
                  </h4>

                  {viewingSubmitted ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                      <div className="text-emerald-800 text-xs font-bold mb-1">Viewing Inquiry Launched!</div>
                      <p className="text-[11px] text-emerald-700">
                        We have prepared your WhatsApp message to 0728 221 098. Our team will confirm the appointment.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleScheduleSubmit} className="space-y-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Mwangi"
                          value={visitorName}
                          onChange={(e) => setVisitorName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Your Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0712 345 678"
                          value={visitorPhone}
                          onChange={(e) => setVisitorPhone(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Preferred Date</label>
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-900"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Request Site Viewing
                      </button>
                    </form>
                  )}
                </div>

                {/* Office Location Notice */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Physical visits arranged Monday to Saturday. Transport provided for designated plot inspections.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
