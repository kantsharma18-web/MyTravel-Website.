import React from 'react';
import { Award, ShieldCheck, MapPin, Phone, Mail, Clock, Users, Building, Compass, Star } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="py-12 bg-zinc-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs uppercase tracking-widest font-bold">
            <Award className="w-3.5 h-3.5 text-indigo-600" /> Our 25+ Year Legacy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            About All India Tour & Travel
          </h2>
          <p className="text-zinc-500 text-sm">
            Founded in 1998 in New Delhi, we are a Ministry of Tourism recognized luxury DMC committed to showcasing the soul of India through authentic, personalized travel experiences.
          </p>
        </div>

        {/* Legacy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Preserving Cultural Authenticity Across 28 States & 8 Union Territories
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed font-normal">
              For over a quarter-century, All India Tour & Travel has operated with a singular mission: to connect global and domestic travelers with India’s rich architectural heritage, living spiritual traditions, and breathtaking landscapes in complete comfort and security.
            </p>
            <p className="text-zinc-600 text-sm leading-relaxed font-normal">
              Unlike automated booking engines, every itinerary we curate is backed by our in-house team of senior historians, regional guides, and a dedicated fleet of GPS-tracked private luxury vehicles with seasoned drivers.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200">
              <div>
                <div className="text-2xl font-extrabold text-slate-900">250,000+</div>
                <div className="text-xs text-zinc-500 font-medium">Happy Travelers Hosted</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900">100%</div>
                <div className="text-xs text-zinc-500 font-medium">Private AC Fleet</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900">4.9 / 5</div>
                <div className="text-xs text-zinc-500 font-medium">Average Traveler Rating</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900">24/7</div>
                <div className="text-xs text-zinc-500 font-medium">On-Trip Support Helpline</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] overflow-hidden border border-zinc-200/80 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80"
                alt="Rajasthan Palace Heritage"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200 text-xs space-y-1 shadow-lg">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Ministry of Tourism Recognition
                </div>
                <p className="text-zinc-600">
                  License No: MOT/IND/2026/8841. Member of IATO (Indian Association of Tour Operators) & TAAI.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Headquarters Cards */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 text-center tracking-tight">
            Our Corporate Headquarters & Regional Hubs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-zinc-200/80 p-6 rounded-[28px] space-y-3 shadow-sm hover:border-indigo-300 transition-all">
              <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  PB
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Headquarters & Main Office</h4>
                  <div className="text-xs text-indigo-600 font-medium">North India Operations Command</div>
                </div>
              </div>
              <div className="space-y-2 text-xs text-zinc-600 font-normal">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Chakki , Opposite Police Station, Haryal Pathankot punjab</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>+91 9115164366</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>info@allindiatourtravel.com</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 p-6 rounded-[28px] space-y-3 shadow-sm hover:border-indigo-300 transition-all">
              <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  BOM
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Mumbai Regional Office</h4>
                  <div className="text-xs text-indigo-600 font-medium">West & South Concierge Hub</div>
                </div>
              </div>
              <div className="space-y-2 text-xs text-zinc-600 font-normal">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Tower 3, Bandra Kurla Complex (BKC), Mumbai, Maharashtra - 400051</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>+91 9115164366</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>mumbai@allindiatourtravel.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
