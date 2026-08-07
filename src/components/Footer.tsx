import React, { useState } from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck, Heart, Send } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-100 text-slate-900 border-t border-zinc-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Newsletter & Callout Grid - Bento Banner */}
        <div className="bg-white border border-zinc-200/80 p-6 sm:p-8 rounded-[28px] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Subscribe to Cultural Horizons Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500">
              Receive seasonal festival calendars, secret photography spot coordinates, and private tour deals.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full lg:w-auto max-w-md">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Subscribe
            </button>
          </form>

          {subscribed && (
            <div className="text-xs font-bold text-emerald-600 text-center w-full">
              ✓ Thank you! You are now subscribed to our Heritage Dispatch.
            </div>
          )}
        </div>

        {/* 4-Column Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs sm:text-sm">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-base font-bold text-slate-900">All India Tour & Travel</span>
            </div>
            <p className="text-zinc-500 leading-relaxed text-xs">
              Ministry of Tourism Approved Luxury Destination Management Company. Curating bespoke Indian travel odysseys since 1998.
            </p>
            <div className="pt-2 text-xs text-indigo-600 font-bold space-y-1">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Govt Reg: MOT/IND/2026/8841
              </div>
              <div className="text-zinc-500 font-medium">IATO & TAAI Accredited Member</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-zinc-600 text-xs font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-indigo-600 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('packages')} className="hover:text-indigo-600 transition-colors">
                  Domestic Tour Packages
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-planner')} className="hover:text-indigo-600 transition-colors">
                  Gemini AI Itinerary Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-indigo-600 transition-colors">
                  Heritage & Horizons Journal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="hover:text-indigo-600 transition-colors">
                  Incredible India Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('photography')} className="hover:text-indigo-600 transition-colors">
                  Photographer’s Studio Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Circuits */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Popular Circuits
            </h4>
            <ul className="space-y-2 text-zinc-600 text-xs font-medium">
              <li>Golden Triangle Classic (Delhi - Agra - Jaipur)</li>
              <li>Royal Rajasthan Odyssey (Udaipur - Jodhpur - Jaisalmer)</li>
              <li>Kerala Backwaters & Tea Plantations</li>
              <li>High Altitude Ladakh Himalayan Safari</li>
              <li>Spiritual Varanasi & Sacred Ganges Pilgrimage</li>
              <li>Sundarbans & Northeast Wildlife Trail</li>
            </ul>
          </div>

          {/* Col 4: Contact & Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              24/7 Travel Concierge
            </h4>
            <div className="space-y-2 text-zinc-600 text-xs font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>24/7 Helpline: +91 9115164366</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>concierge@allindiatourtravel.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>Chakki , Opposite Police Station, Haryal Pathankot punjab</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-2 w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              Book Custom Package
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <div>
            © {new Date().getFullYear()} All India Tour & Travel. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Terms of Service</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Ministry Accreditation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
