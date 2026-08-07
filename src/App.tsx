import React, { useState } from 'react';
import { TourPackage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TourPackages } from './components/TourPackages';
import { HeritageBlog } from './components/HeritageBlog';
import { Gallery } from './components/Gallery';
import { PhotographyStudio } from './components/PhotographyStudio';
import { AiPlanner } from './components/AiPlanner';
import { BookingHub } from './components/BookingHub';
import { AboutUs } from './components/AboutUs';
import { Footer } from './components/Footer';
import { REVIEWS } from './data/mockData';
import { Star, Quote, Award, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchFilter, setSearchFilter] = useState<{ destination: string; month: string; category: string } | null>(null);
  const [prefilledPackage, setPrefilledPackage] = useState<TourPackage | null>(null);
  const [prefilledItinerary, setPrefilledItinerary] = useState<{ destination: string; durationDays: number; notes: string } | null>(null);

  const handleHeroSearch = (query: { destination: string; month: string; category: string }) => {
    setSearchFilter(query);
    setActiveTab('packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookPackage = (pkg: TourPackage) => {
    setPrefilledPackage(pkg);
    setPrefilledItinerary(null);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImportAiItineraryToBooking = (itineraryData: { destination: string; durationDays: number; notes: string }) => {
    setPrefilledPackage(null);
    setPrefilledItinerary(itineraryData);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGeneralBooking = (pkgId?: string) => {
    setPrefilledPackage(null);
    setPrefilledItinerary(null);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-slate-900 selection:bg-indigo-600 selection:text-white flex flex-col">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Main Content Area Based On Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12 pb-12">
            {/* Hero Banner with Bento Search Grid */}
            <Hero
              onSearch={handleHeroSearch}
              onOpenAiPlanner={() => {
                setActiveTab('ai-planner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBooking={() => handleOpenGeneralBooking()}
            />

            {/* Tour Packages Showcase */}
            <TourPackages
              onBookPackage={handleBookPackage}
              searchFilter={searchFilter}
            />

            {/* AI Assistant Callout Bento Card */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="bg-indigo-600 text-white rounded-[32px] p-8 sm:p-12 shadow-xl shadow-indigo-200/50 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="space-y-3 max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-100 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin" /> Gemini AI Smart Itinerary Engine
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                    Need A 100% Custom Tailored Indian Odyssey?
                  </h3>
                  <p className="text-indigo-100 text-sm sm:text-base font-normal leading-relaxed opacity-95">
                    Let our intelligent Gemini AI assistant generate a custom day-by-day itinerary with exact dates, boutique palace stays, and private chauffeur route planning in under 30 seconds.
                  </p>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <button
                    onClick={() => {
                      setActiveTab('ai-planner');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 rounded-2xl bg-white text-indigo-600 font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-indigo-50 transition-all transform active:scale-95 flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-indigo-600" /> Launch AI Tour Planner
                  </button>
                </div>

                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              </div>
            </section>

            {/* Heritage Blog Highlights */}
            <HeritageBlog />

            {/* Photo Gallery Snapshot */}
            <Gallery />

            {/* Customer Testimonials Bento Section */}
            <section className="py-12 bg-zinc-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs uppercase tracking-widest font-bold">
                    <Star className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" /> Verified Guest Experiences
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                    Loved By Global Travelers
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    Read unedited reviews from travelers who experienced India through our private chauffeurs and cultural historians.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {REVIEWS.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white border border-zinc-200/80 p-8 rounded-[28px] space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-indigo-200" />
                        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-serif">
                          "{rev.comment}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-zinc-100 flex items-center gap-3">
                        <img
                          src={rev.avatarUrl}
                          alt={rev.authorName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{rev.authorName}</div>
                          <div className="text-[10px] text-zinc-400 font-medium">{rev.authorCity} • {rev.tourName}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About Us Preview */}
            <AboutUs />
          </div>
        )}

        {activeTab === 'packages' && (
          <TourPackages
            onBookPackage={handleBookPackage}
            searchFilter={searchFilter}
          />
        )}

        {activeTab === 'ai-planner' && (
          <AiPlanner onImportToBooking={handleImportAiItineraryToBooking} />
        )}

        {activeTab === 'blog' && <HeritageBlog />}

        {activeTab === 'gallery' && <Gallery />}

        {activeTab === 'photography' && (
          <PhotographyStudio onBookPhotoTour={() => handleOpenGeneralBooking()} />
        )}

        {activeTab === 'booking' && (
          <BookingHub
            prefilledPackage={prefilledPackage}
            prefilledItinerary={prefilledItinerary}
          />
        )}

        {activeTab === 'about' && <AboutUs />}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenGeneralBooking()}
      />
    </div>
  );
}
