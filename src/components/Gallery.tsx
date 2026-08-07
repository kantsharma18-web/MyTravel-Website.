import React, { useState } from 'react';
import { GalleryItem, Region } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';
import { Camera, MapPin, X, Share2, Eye, Sliders, Maximize2, Download } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedRegion === 'All' || item.region === selectedRegion
  );

  const regions: (Region | 'All')[] = ['All', 'North', 'South', 'East', 'West', 'Northeast'];

  return (
    <section id="photo-gallery" className="py-12 bg-zinc-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs uppercase tracking-widest font-bold">
            <Camera className="w-3.5 h-3.5 text-indigo-600" /> Visual Archive
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            High-Resolution Photo Gallery
          </h2>
          <p className="text-zinc-500 text-sm">
            Capturing the ethereal morning light, architectural geometry, and vibrant human spirit across the Indian subcontinent.
          </p>
        </div>

        {/* Filter Region Tabs - Bento Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedRegion === reg
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80'
              }`}
            >
              {reg} {reg !== 'All' && 'India'}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="bg-white border border-zinc-200/80 rounded-[28px] overflow-hidden hover:border-indigo-300 transition-all cursor-pointer group shadow-sm hover:shadow-md relative"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-indigo-600 border border-zinc-200 shadow-sm">
                    {item.state}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full text-slate-900 shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1 text-white">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-zinc-200">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {item.location}, {item.region} India
                    </span>
                    <span className="text-[10px] text-zinc-300 font-mono">
                      {item.cameraSettings.shutter} • {item.cameraSettings.aperture}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white border border-zinc-200/80 rounded-[32px] max-w-4xl w-full text-slate-900 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 bg-zinc-100 text-slate-900 p-2 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-md"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 bg-zinc-950 flex items-center justify-center p-4">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl"
                />
              </div>

              <div className="lg:col-span-4 p-6 space-y-6 bg-white flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-indigo-600 font-bold mb-1">
                      {lightboxItem.location}, {lightboxItem.state}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {lightboxItem.title}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {lightboxItem.description}
                  </p>

                  {/* Camera Specs */}
                  <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80 space-y-2">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                      <Sliders className="w-4 h-4 text-indigo-600" /> Shooting Parameters
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-600">
                      <div><span className="text-zinc-400 font-sans">Camera:</span> {lightboxItem.cameraSettings.camera}</div>
                      <div><span className="text-zinc-400 font-sans">Lens:</span> {lightboxItem.cameraSettings.lens}</div>
                      <div><span className="text-zinc-400 font-sans">ISO:</span> {lightboxItem.cameraSettings.iso}</div>
                      <div><span className="text-zinc-400 font-sans">Aperture:</span> {lightboxItem.cameraSettings.aperture}</div>
                      <div><span className="text-zinc-400 font-sans">Shutter:</span> {lightboxItem.cameraSettings.shutter}</div>
                      <div><span className="text-zinc-400 font-sans">Credit:</span> {lightboxItem.photographer}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lightboxItem.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-indigo-50 text-[10px] text-indigo-600 font-bold border border-indigo-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    onClick={() => setLightboxItem(null)}
                    className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-slate-900"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => alert(`Photo "${lightboxItem.title}" saved to your travel inspiration board!`)}
                    className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-indigo-100"
                  >
                    <Download className="w-3.5 h-3.5 text-white" /> Save Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
