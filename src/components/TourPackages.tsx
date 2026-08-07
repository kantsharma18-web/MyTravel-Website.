import React, { useState, useMemo } from 'react';
import { TourPackage, Region, PackageCategory } from '../types';
import { TOUR_PACKAGES } from '../data/mockData';
import { PackageDetailModal } from './PackageDetailModal';
import { Star, Clock, MapPin, Calendar, Check, Compass, ChevronRight, Sparkles } from 'lucide-react';

interface TourPackagesProps {
  onBookPackage: (pkg: TourPackage) => void;
  searchFilter?: { destination: string; month: string; category: string } | null;
}

export const TourPackages: React.FC<TourPackagesProps> = ({ onBookPackage, searchFilter }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory | 'All'>('All');
  const [activePackageModal, setActivePackageModal] = useState<TourPackage | null>(null);

  const filteredPackages = useMemo(() => {
    return TOUR_PACKAGES.filter((pkg) => {
      if (selectedRegion !== 'All' && pkg.region !== selectedRegion) return false;
      if (selectedCategory !== 'All' && pkg.category !== selectedCategory) return false;
      if (searchFilter?.category && searchFilter.category !== 'All Categories' && pkg.category !== searchFilter.category) {
        return false;
      }
      if (searchFilter?.destination) {
        const query = searchFilter.destination.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(query);
        const matchesRegion = pkg.region.toLowerCase().includes(query);
        const matchesCity = pkg.startingCity.toLowerCase().includes(query);
        const matchesHighlights = pkg.highlights.some(h => h.toLowerCase().includes(query));
        if (!matchesTitle && !matchesRegion && !matchesCity && !matchesHighlights) return false;
      }
      return true;
    });
  }, [selectedRegion, selectedCategory, searchFilter]);

  const regions: (Region | 'All')[] = ['All', 'North', 'South', 'East', 'West', 'Northeast'];
  const categories: (PackageCategory | 'All')[] = [
    'All',
    'Royal & Heritage',
    'Spiritual & Pilgrimage',
    'Himalayan & Trekking',
    'Backwaters & Coastal',
    'Wildlife & Safari',
  ];

  return (
    <section id="tour-packages" className="py-12 bg-zinc-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Title & Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs uppercase tracking-widest font-bold">
            <Compass className="w-3.5 h-3.5" /> Handcrafted Expeditions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Domestic Luxury Tour Packages
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base">
            Featuring private AC luxury sedans, 5-star heritage palace stays, fast-track monument entry, and dedicated cultural historians.
          </p>
        </div>

        {/* Region & Category Filter Tabs - Bento Pills */}
        <div className="space-y-4">
          {/* Category Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Region Sub-Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mr-2">Region:</span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedRegion === reg
                    ? 'bg-slate-900 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {reg} {reg !== 'All' && 'India'}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid - Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white border border-zinc-200/80 rounded-[28px] overflow-hidden hover:border-indigo-300 transition-all shadow-sm hover:shadow-md flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-sm">
                    {pkg.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-900 border border-zinc-200 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {pkg.rating} ({pkg.reviewCount})
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-bold text-white flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Starting from {pkg.startingCity} • {pkg.region} India
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs font-serif italic text-zinc-500 mt-1">
                    "{pkg.tagline}"
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-zinc-600 border-y border-zinc-100 py-2.5">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Clock className="w-4 h-4 text-indigo-600" /> {pkg.duration}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5 font-bold">
                      <Calendar className="w-4 h-4 text-indigo-600" /> {pkg.bestTime}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-4 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Key Highlights</div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {pkg.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-4 border-t border-zinc-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">All-Inclusive Luxury</span>
                      <span className="text-2xl font-extrabold text-slate-900">{pkg.priceFormatted}</span>
                      <span className="text-xs text-zinc-400 font-normal"> / guest</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActivePackageModal(pkg)}
                      className="w-full py-2.5 px-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-slate-900 font-bold text-xs transition-all flex items-center justify-center gap-1"
                    >
                      <span>Itinerary</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>
                    <button
                      onClick={() => onBookPackage(pkg)}
                      className="w-full py-2.5 px-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-1"
                    >
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="mt-12 text-center p-12 bg-white rounded-[28px] border border-zinc-200/80">
            <Compass className="w-12 h-12 text-indigo-600 mx-auto animate-bounce mb-3" />
            <h3 className="text-xl font-bold text-slate-900">No Tour Packages Found</h3>
            <p className="text-zinc-500 text-sm mt-1">Try adjusting your region or tour style filters above.</p>
            <button
              onClick={() => { setSelectedRegion('All'); setSelectedCategory('All'); }}
              className="mt-4 px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Package Detail Modal */}
      <PackageDetailModal
        pkg={activePackageModal}
        onClose={() => setActivePackageModal(null)}
        onBook={(p) => {
          setActivePackageModal(null);
          onBookPackage(p);
        }}
      />
    </section>
  );
};
