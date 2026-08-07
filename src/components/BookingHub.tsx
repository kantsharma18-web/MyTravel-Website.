import React, { useState, useEffect } from 'react';
import { BookingFormState, TourPackage } from '../types';
import { TOUR_PACKAGES } from '../data/mockData';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { Calendar, Users, Car, Building, CheckSquare, Sparkles, ShieldCheck, DollarSign, Mail, Phone, User, MessageSquare } from 'lucide-react';

interface BookingHubProps {
  prefilledPackage?: TourPackage | null;
  prefilledItinerary?: { destination: string; durationDays: number; notes: string } | null;
}

export const BookingHub: React.FC<BookingHubProps> = ({ prefilledPackage, prefilledItinerary }) => {
  const [destinationName, setDestinationName] = useState(
    prefilledPackage ? prefilledPackage.title : prefilledItinerary ? prefilledItinerary.destination : 'Golden Triangle Classic (Delhi, Agra, Jaipur)'
  );
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    return today.toISOString().split('T')[0];
  });
  const [durationDays, setDurationDays] = useState(
    prefilledPackage ? prefilledPackage.durationDays : prefilledItinerary ? prefilledItinerary.durationDays : 6
  );
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [vehiclePreference, setVehiclePreference] = useState<BookingFormState['vehiclePreference']>(
    'Luxury SUV (Innova Crysta)'
  );
  const [hotelPreference, setHotelPreference] = useState<BookingFormState['hotelPreference']>(
    '5-Star Heritage Palace'
  );
  const [specialAddons, setSpecialAddons] = useState<string[]>([
    'Private Monument Historian & Guide',
  ]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState(
    prefilledItinerary ? prefilledItinerary.notes : ''
  );

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmedData, setConfirmedData] = useState<BookingFormState | null>(null);
  const [voucherNumber, setVoucherNumber] = useState('');

  useEffect(() => {
    if (prefilledPackage) {
      setDestinationName(prefilledPackage.title);
      setDurationDays(prefilledPackage.durationDays);
    } else if (prefilledItinerary) {
      setDestinationName(prefilledItinerary.destination);
      setDurationDays(prefilledItinerary.durationDays);
      setSpecialRequests(prefilledItinerary.notes);
    }
  }, [prefilledPackage, prefilledItinerary]);

  const addonOptions = [
    { id: 'historian', label: 'Private Monument Historian & Guide', priceINR: 4500 },
    { id: 'transfer', label: 'Airport VIP Chauffeur Transfer', priceINR: 2500 },
    { id: 'boat', label: 'Sunset Private Ganges / Pichola Boat Cruise', priceINR: 3500 },
    { id: 'massage', label: '60-Min Abhyanga Ayurvedic Massage Session', priceINR: 3000 },
    { id: 'photographer', label: 'Professional Photography Companion Escort', priceINR: 5000 },
  ];

  const toggleAddon = (label: string) => {
    if (specialAddons.includes(label)) {
      setSpecialAddons(specialAddons.filter((a) => a !== label));
    } else {
      setSpecialAddons([...specialAddons, label]);
    }
  };

  // Estimate Calculation
  const baseRatePerDay = hotelPreference === '5-Star Heritage Palace' ? 6500 : hotelPreference === 'Boutique Resort' ? 4500 : 3200;
  const vehicleRatePerDay = vehiclePreference.includes('Innova') ? 2500 : vehiclePreference.includes('Sedan') ? 3500 : 4500;
  const addonsTotal = specialAddons.reduce((sum, itemLabel) => {
    const found = addonOptions.find((a) => a.label === itemLabel);
    return sum + (found ? found.priceINR : 0);
  }, 0);

  const estimatedTotalINR = (baseRatePerDay * durationDays * adults) + (vehicleRatePerDay * durationDays) + addonsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerEmail || !customerPhone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    const newBooking: BookingFormState = {
      destinationName,
      startDate,
      durationDays,
      adults,
      children,
      vehiclePreference,
      hotelPreference,
      specialAddons,
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
    };

    const randomVoucher = 'AITT-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedData(newBooking);
    setVoucherNumber(randomVoucher);
    setConfirmationOpen(true);
  };

  return (
    <section id="booking-hub" className="py-12 bg-zinc-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs uppercase tracking-widest font-bold">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Booking Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Plan & Reserve Your Indian Odyssey
          </h2>
          <p className="text-zinc-500 text-sm">
            Customize dates, guest numbers, private luxury vehicle preference, and special cultural add-ons with instant transparent pricing estimates.
          </p>
        </div>

        {/* Main Booking Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side - Bento Panel */}
          <div className="lg:col-span-8 bg-white border border-zinc-200/80 p-6 sm:p-8 rounded-[32px] shadow-sm space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Destination & Dates */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-zinc-100 pb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">1</span>
                  Select Circuit & Travel Dates
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Destination / Package Name
                    </label>
                    <select
                      value={destinationName}
                      onChange={(e) => setDestinationName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {TOUR_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.title}>
                          {pkg.title} ({pkg.duration})
                        </option>
                      ))}
                      <option value="Custom Pan-India Tailor-Made Circuit">Custom Pan-India Tailor-Made Circuit</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Proposed Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={30}
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Adults
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Children (&lt;12)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Transport & Accommodations */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-zinc-100 pb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">2</span>
                  Vehicle & Accommodation Preference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-indigo-600" /> Private AC Chauffeur Vehicle
                    </label>
                    <select
                      value={vehiclePreference}
                      onChange={(e) => setVehiclePreference(e.target.value as any)}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Luxury SUV (Innova Crysta)">Luxury SUV (Toyota Innova Crysta)</option>
                      <option value="Luxury Sedan (Camry/Mercedes)">Luxury Sedan (Toyota Camry / Mercedes-Benz)</option>
                      <option value="Tempo Traveller (12-Seater)">Tempo Traveller (12-Seater Executive Coach)</option>
                      <option value="Vintage Heritage Coach">Vintage Heritage Coach</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-indigo-600" /> Accommodation Category
                    </label>
                    <select
                      value={hotelPreference}
                      onChange={(e) => setHotelPreference(e.target.value as any)}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="5-Star Heritage Palace">5-Star Heritage Palaces (Taj / Oberoi / Leela)</option>
                      <option value="Boutique Resort">Boutique Resorts & Heritage Haveli Stays</option>
                      <option value="Standard 4-Star Comfort">Standard 4-Star Comfort Hotels</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Special Addons */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 border-b border-zinc-100 pb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">3</span>
                  Optional Cultural Enhancements
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addonOptions.map((addon) => {
                    const isChecked = specialAddons.includes(addon.label);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.label)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between text-xs font-medium ${
                          isChecked
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-bold'
                            : 'bg-zinc-50 border-zinc-200/80 text-zinc-600 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-indigo-600 focus:ring-0"
                          />
                          <span>{addon.label}</span>
                        </div>
                        <span className="font-mono text-indigo-600 font-bold">+₹{addon.priceINR}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-zinc-100 pb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">4</span>
                  Traveler Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-indigo-600" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Khanna"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-indigo-600" /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-indigo-600" /> WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9115164366"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" /> Special Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Pure Jain vegetarian meals required, wheelchair assistance needed..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 transform active:scale-98"
              >
                <span>Generate Instant Booking Voucher & Quote</span>
              </button>
            </form>
          </div>

          {/* Pricing Calculation Summary Sidebar - Bento Card */}
          <div className="lg:col-span-4 bg-white border border-zinc-200/80 p-6 sm:p-8 rounded-[32px] space-y-6 sticky top-24 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 border-b border-zinc-100 pb-3">
              Estimated Tour Cost
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Selected Circuit:</span>
                <span className="font-bold text-slate-900 text-right max-w-[180px]">{destinationName}</span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>Duration & Guests:</span>
                <span className="font-bold text-slate-900">{durationDays} Days / {adults} Guests</span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>Hotel Category:</span>
                <span className="font-bold text-slate-900">{hotelPreference.split('(')[0]}</span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>Vehicle Preference:</span>
                <span className="font-bold text-slate-900">{vehiclePreference.split('(')[0]}</span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>Add-ons Total:</span>
                <span className="font-mono font-bold text-indigo-600">+₹{addonsTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">Total Estimated Quote</span>
                  <span className="text-[10px] text-zinc-400">Includes GST & Chauffeur</span>
                </div>
                <span className="text-2xl font-extrabold text-slate-900">
                  ₹{estimatedTotalINR.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-xs text-indigo-900 space-y-1.5">
              <div className="font-bold text-indigo-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Price Guarantee Promise
              </div>
              <p className="text-[11px] text-zinc-600 leading-relaxed font-normal">
                Zero hidden charges. Toll taxes, interstate parking fees, driver night allowance, and daily breakfasts included.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Voucher Modal */}
      <BookingConfirmationModal
        bookingData={confirmedData}
        voucherNumber={voucherNumber}
        estimatedTotalINR={estimatedTotalINR}
        onClose={() => setConfirmationOpen(false)}
      />
    </section>
  );
};
