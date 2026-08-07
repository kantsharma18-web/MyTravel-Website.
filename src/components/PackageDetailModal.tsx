import React, { useState } from 'react';
import { TourPackage } from '../types';
import { X, Calendar, MapPin, CheckCircle, Clock, Star, ShieldCheck, Car, Building, Users, ChevronRight } from 'lucide-react';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBook: (pkg: TourPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({ pkg, onClose, onBook }) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'gallery'>('itinerary');

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white border border-zinc-200/80 rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto text-slate-900 shadow-2xl relative">
        {/* Modal Header Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-[32px]">
          <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 text-slate-900 p-2 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow">
                {pkg.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white flex items-center gap-1">
                <MapPin className="w-3 h-3 text-indigo-300" /> {pkg.region} India
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {pkg.rating} ({pkg.reviewCount} reviews)
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {pkg.title}
            </h2>
            <p className="text-zinc-200 text-sm sm:text-base font-serif italic mt-1">
              "{pkg.tagline}"
            </p>
          </div>
        </div>

        {/* Price & Primary CTA Bar */}
        <div className="bg-zinc-50 p-4 sm:p-6 border-b border-zinc-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Starting From</div>
            <div className="text-3xl font-extrabold text-slate-900 flex items-baseline gap-2">
              {pkg.priceFormatted} <span className="text-xs text-zinc-500 font-normal">/ per person</span>
            </div>
            <div className="text-xs text-zinc-600 mt-0.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-indigo-600" /> Duration: {pkg.duration}
              <span>•</span>
              Starting City: {pkg.startingCity}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onBook(pkg)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-white" /> Book Package Now
            </button>
          </div>
        </div>

        {/* Sub-Nav Tabs */}
        <div className="flex border-b border-zinc-200/80 bg-white px-6 pt-4 gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'itinerary'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" /> Day-by-Day Itinerary ({pkg.itinerary.length} Days)
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'inclusions'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-zinc-400 hover:text-slate-900'
            }`}
          >
            <CheckCircle className="w-4 h-4" /> Inclusions & Services
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-zinc-400 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" /> Tour Highlights
          </button>
        </div>

        {/* Modal Tab Contents */}
        <div className="p-6 space-y-6">
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-xs text-indigo-900 flex items-center gap-2 font-medium">
                <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>All itineraries are 100% customizable with your dedicated private tour curator upon booking.</span>
              </div>

              <div className="space-y-4">
                {pkg.itinerary.map((day) => (
                  <div key={day.dayNumber} className="bg-zinc-50 p-5 rounded-[24px] border border-zinc-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                      <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs">
                        DAY {day.dayNumber}
                      </span>
                      <span className="text-xs text-zinc-600 flex items-center gap-1 font-bold">
                        <Building className="w-3.5 h-3.5 text-indigo-600" /> Stay: {day.stay}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{day.title}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zinc-600 pt-1">
                      <div className="bg-white p-3 rounded-xl border border-zinc-200/80">
                        <span className="font-bold text-indigo-600 block mb-1">Morning Experience</span>
                        {day.morning}
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-zinc-200/80">
                        <span className="font-bold text-indigo-600 block mb-1">Afternoon Excursion</span>
                        {day.afternoon}
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-zinc-200/80">
                        <span className="font-bold text-indigo-600 block mb-1">Evening Leisure & Dinner</span>
                        {day.evening}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-50 p-5 rounded-[24px] border border-zinc-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 border-b border-zinc-200 pb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" /> Included in Package Price
                </h4>
                <ul className="space-y-2 text-xs text-zinc-700">
                  {pkg.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-50 p-5 rounded-[24px] border border-zinc-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 border-b border-zinc-200 pb-2">
                  <X className="w-5 h-5 text-rose-500" /> Excluded From Package
                </h4>
                <ul className="space-y-2 text-xs text-zinc-700">
                  {pkg.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Key Highlights of {pkg.title}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/80 text-xs text-zinc-800 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {pkg.galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${pkg.title} photo ${idx + 1}`}
                    className="w-full h-36 object-cover rounded-2xl border border-zinc-200 hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="p-6 bg-zinc-50 border-t border-zinc-200/80 flex items-center justify-between rounded-b-[32px]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-slate-900"
          >
            Close
          </button>
          <button
            onClick={() => onBook(pkg)}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-indigo-100"
          >
            <span>Reserve Tour With Private Chauffeur</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
