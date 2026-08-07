import React from 'react';
import { Camera, Sun, Moon, Sparkles, MapPin, Compass, ShieldCheck, Calendar } from 'lucide-react';

interface PhotographyStudioProps {
  onBookPhotoTour: () => void;
}

export const PhotographyStudio: React.FC<PhotographyStudioProps> = ({ onBookPhotoTour }) => {
  const goldenHourSchedule = [
    {
      landmark: 'Taj Mahal (Agra)',
      bestTime: '6:15 AM - 7:00 AM',
      angle: 'East Gate Garden Pool Reflection',
      recommendation: 'Use f/8 for sharpness, 24mm wide angle to capture the full dome symmetry.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    },
    {
      landmark: 'Stone Chariot & Hemakuta (Hampi)',
      bestTime: '5:45 PM - 6:30 PM',
      angle: 'Hemakuta Hill Sunset vantage looking over Virupaksha',
      recommendation: 'Graduate ND filter to balance granite dark tones with golden twilight skies.',
      image: 'https://images.unsplash.com/photo-1600100397608-f010e423b961?auto=format&fit=crop&w=600&q=80',
    },
    {
      landmark: 'Ganga Evening Aarti (Varanasi)',
      bestTime: '6:30 PM - 7:15 PM',
      angle: 'Wooden boat 15 meters off Dashashwamedh Ghat',
      recommendation: 'Prime 50mm f/1.4, ISO 1600, 1/125s shutter to freeze brass lamp flame motion.',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    },
    {
      landmark: 'Stargazing in Thar Desert (Jaisalmer)',
      bestTime: '10:00 PM - 2:00 AM',
      angle: 'Sam Sand Dunes looking towards North Horizon',
      recommendation: '20-second long exposure, f/2.8, ISO 3200 for Milky Way core over sand dunes.',
      image: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="photography-studio" className="py-12 bg-zinc-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs uppercase tracking-widest font-bold">
            <Camera className="w-3.5 h-3.5 text-indigo-600" /> Photo Expeditions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            The Photographer’s Studio & Guide
          </h2>
          <p className="text-zinc-500 text-sm">
            Expert lighting timetables, camera positioning maps, and dedicated photo-expedition chauffeurs who know the exact minute the sun hits every monument.
          </p>
        </div>

        {/* Golden Hour Schedule Grid - Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goldenHourSchedule.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200/80 rounded-[28px] p-6 flex flex-col sm:flex-row gap-5 items-center hover:border-indigo-300 transition-all shadow-sm hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.landmark}
                className="w-full sm:w-36 h-36 object-cover rounded-2xl border border-zinc-200 flex-shrink-0"
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                  <Sun className="w-4 h-4 text-amber-500" /> Golden Hour: {item.bestTime}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.landmark}</h3>
                <div className="text-xs text-zinc-600 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" /> Vantage: {item.angle}
                </div>
                <p className="text-xs text-zinc-500 pt-2 border-t border-zinc-100 leading-relaxed font-normal">
                  <span className="font-bold text-indigo-600">Pro Tip: </span>{item.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Photography Tour Callout Banner - Bento Style */}
        <div className="bg-indigo-600 text-white p-8 sm:p-12 rounded-[32px] text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Camera className="w-64 h-64 text-white" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white inline-block">
              Tailored Photo Expeditions
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Travel With A Private Photography Companion Driver
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
              Our specialized drivers are trained to reach every monument 30 minutes before dawn, carry extra battery power banks, and handle drone/tripod clearance permissions seamlessly.
            </p>
            <div className="pt-2">
              <button
                onClick={onBookPhotoTour}
                className="px-8 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 text-slate-900 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                Book A Custom Photography Expedition
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
