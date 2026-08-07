import React from 'react';
import { BookingFormState } from '../types';
import { ShieldCheck, CheckCircle2, Download, Printer, X, MapPin, Calendar, Users, Car, Building, Phone, Mail } from 'lucide-react';

interface BookingConfirmationModalProps {
  bookingData: BookingFormState | null;
  voucherNumber: string;
  estimatedTotalINR: number;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  bookingData,
  voucherNumber,
  estimatedTotalINR,
  onClose,
}) => {
  if (!bookingData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white border border-zinc-200 rounded-[32px] max-w-2xl w-full text-slate-900 shadow-2xl relative overflow-hidden">
        {/* Top Decorative Border */}
        <div className="h-2.5 bg-indigo-600" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-zinc-100 text-zinc-600 p-2 rounded-full hover:bg-zinc-200 transition-all"
          aria-label="Close voucher"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-zinc-100 pb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="text-xs uppercase tracking-widest text-indigo-600 font-bold">Official Travel Voucher</div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Tour Inquiry & Reservation Confirmed
            </h3>
            <p className="text-xs text-zinc-500">
              Voucher Reference ID: <span className="font-mono font-bold text-slate-900">{voucherNumber}</span>
            </p>
          </div>

          {/* Details Table */}
          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/80 space-y-3.5 text-xs">
            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500 font-bold">Traveler Name:</span>
              <span className="font-bold text-slate-900">{bookingData.customerName}</span>
            </div>

            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500 font-bold">Contact Email & Phone:</span>
              <span className="text-slate-800 font-medium">{bookingData.customerEmail} | {bookingData.customerPhone}</span>
            </div>

            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500 font-bold">Selected Circuit:</span>
              <span className="font-bold text-indigo-600">{bookingData.destinationName}</span>
            </div>

            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500 font-bold">Start Date & Duration:</span>
              <span className="text-slate-800 font-medium">{bookingData.startDate} ({bookingData.durationDays} Days)</span>
            </div>

            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500 font-bold">Party Size:</span>
              <span className="text-slate-800 font-medium">{bookingData.adults} Adults, {bookingData.children} Children</span>
            </div>

            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500 font-bold">Vehicle Preference:</span>
              <span className="text-slate-800 font-medium">{bookingData.vehiclePreference}</span>
            </div>

            <div className="flex justify-between border-b border-zinc-200/60 pb-2">
              <span className="text-zinc-500 font-bold">Accommodation:</span>
              <span className="text-slate-800 font-medium">{bookingData.hotelPreference}</span>
            </div>

            {bookingData.specialAddons.length > 0 && (
              <div className="border-b border-zinc-200/60 pb-2">
                <span className="text-zinc-500 font-bold block mb-1">Requested Add-ons:</span>
                <div className="flex flex-wrap gap-1">
                  {bookingData.specialAddons.map((addon, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-700 font-medium">
                      + {addon}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-between items-baseline">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Estimated Total Quote:</span>
              <span className="text-2xl font-extrabold text-slate-900">
                ₹{estimatedTotalINR.toLocaleString('en-IN')} INR
              </span>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-xs text-indigo-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <span className="text-zinc-600">Our Senior Concierge will call you within 30 minutes to review vehicle choices and issue your official GST invoice.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-slate-900 font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-indigo-600" /> Print Voucher
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-100"
            >
              Done & Return to Main Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
