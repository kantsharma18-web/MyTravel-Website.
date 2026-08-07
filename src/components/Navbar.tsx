import React, { useState } from 'react';
import { Compass, Phone, Calendar, Menu, X, Sparkles, MapPin, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: (pkgId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'ai-planner', label: 'AI Trip Planner', badge: 'Gemini AI' },
    { id: 'blog', label: 'Heritage Journal' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'photography', label: 'Photography Studio' },
    { id: 'booking', label: 'Booking Hub' },
    { id: 'about', label: 'About Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md text-slate-900 border-b border-zinc-200/80 shadow-sm">
      {/* Top Bar with Ministry Accreditation & Quick Contact */}
      <div className="bg-zinc-900 text-zinc-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Ministry of Tourism Approved
            </span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden md:inline text-zinc-300">Reg No: MOT/IND/2026/8841</span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden lg:inline text-zinc-400">25+ Years of Excellence in Indian Luxury Tourism</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a href="tel:+919115164366" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-indigo-400" /> +91 9115164366
            </a>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300 flex items-center gap-1 font-sans">
              <MapPin className="w-3 h-3 text-indigo-400" /> Chakki, Opp. Police Station, Haryal, Pathankot, Punjab
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              All India Tour & Travel
            </div>
            <div className="text-[10px] tracking-widest uppercase text-indigo-600 font-bold">
              Bespoke Indian Expeditions
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links - Bento Pill Style */}
        <nav className="hidden xl:flex items-center gap-1 bg-zinc-100/80 p-1.5 rounded-2xl border border-zinc-200/60">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative flex items-center gap-1.5 ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              {item.label}
              {item.badge && (
                <span className={`px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-extrabold rounded-full flex items-center gap-0.5 ${
                  activeTab === item.id ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <Sparkles className="w-2.5 h-2.5" />
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Call To Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('ai-planner')}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-100 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI Assistant
          </button>
          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2.5 text-xs uppercase tracking-wider font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-md flex items-center gap-2 transform active:scale-95"
          >
            <Calendar className="w-4 h-4 text-indigo-400" /> Book Trip
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="sm:hidden px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 text-white shadow-sm"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-zinc-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-zinc-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full flex items-center gap-1 ${
                  activeTab === item.id ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-4 border-t border-zinc-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('ai-planner')}
              className="w-full py-3 rounded-xl bg-indigo-50 text-indigo-600 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" /> Plan with Gemini AI Assistant
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-indigo-400" /> Customized Booking Request
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
