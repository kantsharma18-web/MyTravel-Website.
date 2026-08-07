import React, { useState } from 'react';
import { AiItinerary } from '../types';
import { Sparkles, MapPin, Calendar, Clock, DollarSign, Users, Compass, CheckCircle, Lightbulb, Building, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface AiPlannerProps {
  onImportToBooking: (itineraryData: { destination: string; durationDays: number; notes: string }) => void;
}

export const AiPlanner: React.FC<AiPlannerProps> = ({ onImportToBooking }) => {
  const [destination, setDestination] = useState('Rajasthan');
  const [durationDays, setDurationDays] = useState(6);
  const [travelStyle, setTravelStyle] = useState('Luxury Royal Heritage');
  const [budget, setBudget] = useState('Mid-Luxury (₹35k-50k)');
  const [groupSize, setGroupSize] = useState('2 Guests (Couple)');
  const [interests, setInterests] = useState<string[]>(['Architecture', 'Photography', 'Local Cuisine']);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedItinerary, setGeneratedItinerary] = useState<AiItinerary | null>(null);

  const interestOptions = [
    'Architecture & Forts',
    'Local Street Food & Fine Dining',
    'Photography & Golden Hour',
    'Spiritual Rituals & Meditation',
    'Wildlife Safaris',
    'Ayurvedic Wellness',
    'Artisan Crafts & Textiles',
    'Offbeat Village Trails',
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          durationDays,
          travelStyle,
          interests,
          budget,
          groupSize,
        }),
      });

      const data = await response.json();

      if (data.success && data.itinerary) {
        setGeneratedItinerary(data.itinerary);
      } else {
        setError(data.error || 'Failed to generate itinerary. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Connection error while contacting AI Planner. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-planner" className="py-16 bg-amber-950/40 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> Gemini AI Smart Itinerary Planner
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Instant Custom Tour Generator
          </h2>
          <p className="text-amber-200/80 text-base font-sans">
            Specify your dream Indian region, interests, and budget style. Our AI assistant trained on 25 years of All India Tour & Travel route logs will build a personalized day-by-day plan in seconds.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-stone-900 border border-amber-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto space-y-6">
          <form onSubmit={handleGenerateItinerary} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Destination */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-amber-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Target Region / City
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-800/80 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="Rajasthan (Jaipur, Jodhpur, Udaipur, Jaisalmer)">Rajasthan Royalty & Forts</option>
                  <option value="Golden Triangle (Delhi, Agra, Jaipur)">Golden Triangle Heritage</option>
                  <option value="Kerala (Kochi, Munnar, Alleppey)">Kerala Backwaters & Tea Hills</option>
                  <option value="Ladakh (Leh, Nubra, Pangong Tso)">High Altitude Ladakh Safari</option>
                  <option value="Varanasi & Spiritual North (Kashi, Sarnath, Ayodhya)">Varanasi & Sacred Ganges</option>
                  <option value="Northeast (Kaziranga, Assam Tea, Shillong)">Northeast Wildlife & Monasteries</option>
                  <option value="Hampi & Badami Heritage (Karnataka)">Hampi & South Empire Monoliths</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-amber-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Duration
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full bg-stone-950 border border-amber-800/80 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value={3}>3 Days (Short Escape)</option>
                  <option value={5}>5 Days (Classic Tour)</option>
                  <option value={7}>7 Days (Deep Explorer)</option>
                  <option value={10}>10 Days (Grand Odyssey)</option>
                  <option value={14}>14 Days (Pan-India Expedition)</option>
                </select>
              </div>

              {/* Travel Style */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-amber-300 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-400" /> Travel Style
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-800/80 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="Luxury Royal Heritage">Luxury Royal Heritage</option>
                  <option value="Boutique & Cultural Focus">Boutique & Cultural Focus</option>
                  <option value="Spiritual & Slow Travel">Spiritual & Slow Travel</option>
                  <option value="Adventure & Photography">Adventure & Photography</option>
                  <option value="Comfort Family Vacation">Comfort Family Vacation</option>
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-amber-300 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Budget Level
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-800/80 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="Standard Comfort (₹25k - ₹35k / person)">Standard Comfort (₹25k - ₹35k)</option>
                  <option value="Mid-Luxury (₹35k - ₹50k / person)">Mid-Luxury (₹35k - ₹50k)</option>
                  <option value="Ultra Royal Luxury (₹65k+ / person)">Ultra Royal Luxury (₹65k+)</option>
                </select>
              </div>

              {/* Group Size */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-amber-300 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-400" /> Travelers
                </label>
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-800/80 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="1 Guest (Solo Traveler)">1 Guest (Solo)</option>
                  <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                  <option value="3-5 Guests (Family/Small Group)">3-5 Guests (Family)</option>
                  <option value="6+ Guests (Private Delegation)">6+ Guests (Private Group)</option>
                </select>
              </div>
            </div>

            {/* Interest Pills Selection */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-amber-300 block">
                Select Your Key Interests (Select multiple):
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((item) => {
                  const isSelected = interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 font-bold shadow'
                          : 'bg-stone-950 text-amber-300/80 border border-amber-900/60 hover:text-amber-100'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Curating Private Itinerary with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate AI Itinerary Now</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Generated Itinerary Result Display */}
        {generatedItinerary && (
          <div className="bg-stone-900 border border-amber-700/80 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto space-y-8 shadow-2xl animate-fadeIn">
            {/* Itinerary Banner */}
            <div className="border-b border-amber-800/80 pb-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-stone-950">
                  Custom AI Generated Tour
                </span>
                <span className="text-xs text-amber-300/90 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> {generatedItinerary.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {generatedItinerary.title}
              </h3>

              <p className="text-amber-200/90 text-sm font-serif italic">
                "{generatedItinerary.tagline}"
              </p>

              <p className="text-amber-100/80 text-sm font-sans leading-relaxed">
                {generatedItinerary.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs font-semibold text-amber-300">
                <div className="bg-stone-950 p-3 rounded-xl border border-amber-900/60">
                  <span className="text-amber-400 block">Est. Cost Per Guest:</span>
                  <span className="text-lg font-serif font-bold text-amber-200">{generatedItinerary.estimatedPricePerPerson}</span>
                </div>
                <div className="bg-stone-950 p-3 rounded-xl border border-amber-900/60">
                  <span className="text-amber-400 block">Recommended Best Season:</span>
                  <span className="text-lg font-serif font-bold text-amber-200">{generatedItinerary.recommendedBestSeason}</span>
                </div>
              </div>
            </div>

            {/* Cultural Trivia Box */}
            {generatedItinerary.culturalTrivia && (
              <div className="bg-amber-950/60 p-5 rounded-2xl border border-amber-800/60 text-xs text-amber-200 space-y-1">
                <div className="font-serif font-bold text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" /> Cultural Historian Trivia
                </div>
                <p className="italic leading-relaxed">{generatedItinerary.culturalTrivia}</p>
              </div>
            )}

            {/* Day by Day Breakdown */}
            <div className="space-y-6">
              <h4 className="text-xl font-serif font-bold text-amber-300">Day-by-Day Customized Experience</h4>
              <div className="space-y-4">
                {generatedItinerary.days.map((day) => (
                  <div key={day.dayNumber} className="bg-stone-950 p-5 rounded-2xl border border-amber-900/60 space-y-3">
                    <div className="flex items-center justify-between border-b border-amber-900/40 pb-2">
                      <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-xs">
                        DAY {day.dayNumber}
                      </span>
                      <span className="text-xs text-amber-400/80 font-semibold flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-amber-400" /> {day.stayRecommendation}
                      </span>
                    </div>

                    <h5 className="text-lg font-serif font-bold text-amber-100">{day.title}</h5>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-amber-200/90 pt-1">
                      <div className="bg-stone-900/80 p-3 rounded-lg border border-amber-900/40">
                        <span className="font-bold text-amber-400 block mb-1">Morning</span>
                        {day.morning}
                      </div>
                      <div className="bg-stone-900/80 p-3 rounded-lg border border-amber-900/40">
                        <span className="font-bold text-amber-400 block mb-1">Afternoon</span>
                        {day.afternoon}
                      </div>
                      <div className="bg-stone-900/80 p-3 rounded-lg border border-amber-900/40">
                        <span className="font-bold text-amber-400 block mb-1">Evening</span>
                        {day.evening}
                      </div>
                    </div>

                    {day.insiderTip && (
                      <div className="text-[11px] text-amber-300/90 bg-amber-900/20 p-2.5 rounded-lg border border-amber-800/30">
                        <span className="font-bold text-amber-400">Insider Secret: </span>
                        {day.insiderTip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Import Into Booking Hub Action */}
            <div className="pt-6 border-t border-amber-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-white">Like This Itinerary?</div>
                <div className="text-xs text-amber-300/80">Import this generated plan directly into our Booking Hub for a guaranteed price quote.</div>
              </div>
              <button
                onClick={() =>
                  onImportToBooking({
                    destination: generatedItinerary.title,
                    durationDays: durationDays,
                    notes: `AI Generated Itinerary requested: ${generatedItinerary.title}. Highlights: ${generatedItinerary.keyHighlights.join(', ')}`,
                  })
                }
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Import Into Booking Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
