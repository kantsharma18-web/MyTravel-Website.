import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Calendar, Users, Award, ShieldCheck, Star, Compass } from 'lucide-react';

interface HeroProps {
  onSearch: (query: { destination: string; month: string; category: string }) => void;
  onOpenAiPlanner: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenAiPlanner, onOpenBooking }) => {
  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('October - March');
  const [category, setCategory] = useState('All Categories');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, month, category });
  };

  return (
    <div className="py-6 sm:py-10 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Bento Card (Col Span 8) */}
          <div className="lg:col-span-8 bg-zinc-900 text-white rounded-[32px] p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col justify-between min-h-[520px]">
            {/* Background Image with Dark Mask */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=85"
                alt="Taj Mahal Agra"
                className="w-full h-full object-cover object-center filter brightness-40 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/80 to-zinc-900/30" />
            </div>

            {/* Top Eyebrow Tag */}
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-300 text-xs font-bold w-max shadow-sm">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Ministry of Tourism Accredited • Regd 1998</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Discover <span className="text-indigo-400">Incredible India</span> in Unmatched Luxury
              </h1>

              <p className="text-zinc-300 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
                Private chauffeur tours, royal palace stays, spiritual Ganges boat cruises, and high-Himalayan safaris curated with authentic cultural depth.
              </p>
            </div>

            {/* Integrated Bento Search Widget */}
            <div className="relative z-10 mt-8 bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 rounded-[24px]">
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                {/* Destination Input */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-indigo-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Circuit / Region
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">All Destinations</option>
                    <option value="Golden Triangle">Golden Triangle (Delhi, Agra, Jaipur)</option>
                    <option value="Rajasthan">Royal Rajasthan (Udaipur, Jodhpur, Jaisalmer)</option>
                    <option value="Kerala">Kerala Backwaters & Munnar Tea Hills</option>
                    <option value="Ladakh">Ladakh & Himalayan High Passes</option>
                    <option value="Varanasi">Spiritual Varanasi & Sacred Ganges</option>
                    <option value="Northeast">Kaziranga & Northeast Wildlife</option>
                  </select>
                </div>

                {/* Preferred Season */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-indigo-200 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Travel Season
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="October - March">Peak Season (Oct - Mar)</option>
                    <option value="April - June">Summer Hills (Apr - Jun)</option>
                    <option value="July - September">Monsoon Ghats (Jul - Sep)</option>
                    <option value="Year Round">Flexible Year-Round</option>
                  </select>
                </div>

                {/* Tour Category */}
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-indigo-200 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-indigo-400" /> Tour Style
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="All Categories">All Tour Styles</option>
                    <option value="Royal & Heritage">Royal & Heritage Palaces</option>
                    <option value="Spiritual & Pilgrimage">Spiritual & Pilgrimage</option>
                    <option value="Himalayan & Trekking">Himalayan Safaris</option>
                    <option value="Backwaters & Coastal">Kerala Backwaters</option>
                    <option value="Wildlife & Safari">Wildlife Safaris</option>
                  </select>
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Search className="w-4 h-4" /> Search Tours
                </button>
              </form>
            </div>
          </div>

          {/* Right Side Stacked Bento Cards (Col Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Top Accent AI Bento Card */}
            <div className="bg-indigo-600 text-white rounded-[32px] p-8 flex flex-col justify-between shadow-xl shadow-indigo-200/50 relative overflow-hidden flex-1">
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-[11px] font-bold text-indigo-100 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" /> Gemini AI Engine
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Instant Custom Itineraries
                </h3>
                <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed font-normal">
                  Type your dates and preferences, and our Gemini AI assistant will curate day-by-day routes and boutique palace stays instantly.
                </p>
              </div>

              <div className="pt-6 relative z-10">
                <button
                  onClick={onOpenAiPlanner}
                  className="w-full py-3.5 px-5 rounded-2xl bg-white text-indigo-600 font-bold text-xs uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" /> Plan Trip With AI &rarr;
                </button>
              </div>

              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Bottom Metrics Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-zinc-200/80 rounded-[28px] p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-all">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">25+</div>
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Years Legacy</div>
              </div>

              <div className="bg-white border border-zinc-200/80 rounded-[28px] p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-all">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 flex items-center gap-1">
                  4.9 <Star className="w-5 h-5 fill-indigo-600 text-indigo-600" />
                </div>
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">1,200+ Reviews</div>
              </div>
            </div>

          </div>

        </div>

        {/* Feature Trust Badges Bento Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-white border border-zinc-200/80 p-4 rounded-[24px] flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
              250k+
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">250,000+ Guests</div>
              <div className="text-[10px] text-zinc-400">Trusted Since 1998</div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 p-4 rounded-[24px] flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Govt Accredited</div>
              <div className="text-[10px] text-zinc-400">Ministry of Tourism</div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 p-4 rounded-[24px] flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Private Chauffeurs</div>
              <div className="text-[10px] text-zinc-400">Air-Conditioned Sedans</div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 p-4 rounded-[24px] flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">24/7 Dedicated Support</div>
              <div className="text-[10px] text-zinc-400">On-Trip Concierge</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
