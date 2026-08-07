import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/mockData';
import { BookOpen, Camera, Clock, MapPin, User, X, Share2, Quote, Sparkles, ChevronRight } from 'lucide-react';

export const HeritageBlog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="heritage-blog" className="py-12 bg-zinc-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs uppercase tracking-widest font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Heritage Journal
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Chronicles of Cultural Splendor
            </h2>
            <p className="text-zinc-500 text-sm mt-2 max-w-2xl">
              In-depth architectural analyses, spiritual histories, and photography guides penned by our team of senior historians and photojournalists.
            </p>
          </div>
        </div>

        {/* Featured Main Story Bento Card */}
        <div>
          {BLOG_POSTS.slice(0, 1).map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white border border-zinc-200/80 rounded-[32px] overflow-hidden hover:border-indigo-300 transition-all cursor-pointer group shadow-sm hover:shadow-md grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 relative min-h-[320px] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-sm">
                    Featured Story
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-bold">
                    <span className="flex items-center gap-1 text-indigo-600">
                      <MapPin className="w-3.5 h-3.5" /> {post.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-zinc-500 text-xs font-serif italic line-clamp-2">
                    "{post.subtitle}"
                  </p>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{post.author.name}</div>
                      <div className="text-[10px] text-zinc-400 font-medium">{post.author.role}</div>
                    </div>
                  </div>

                  <span className="px-4 py-2 rounded-2xl bg-indigo-50 text-indigo-600 font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center gap-1">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Stories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.slice(1).map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white border border-zinc-200/80 rounded-[28px] overflow-hidden hover:border-indigo-300 transition-all cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-indigo-600 border border-zinc-200 shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {post.location}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-bold mb-1">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-zinc-200"
                    />
                    <span className="text-xs font-bold text-slate-900">{post.author.name}</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Story &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Modal Reader */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white border border-zinc-200/80 rounded-[32px] max-w-3xl w-full max-h-[90vh] overflow-y-auto text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="sticky top-4 right-4 ml-auto mr-4 z-20 bg-zinc-100 text-slate-900 p-2 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-md"
              aria-label="Close story"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-10 space-y-6">
              {/* Header Info */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-indigo-600">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">{selectedPost.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-600" /> {selectedPost.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-zinc-400"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                  {selectedPost.title}
                </h2>
                <p className="text-zinc-500 text-base font-serif italic">
                  "{selectedPost.subtitle}"
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-indigo-100"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{selectedPost.author.name}</div>
                    <div className="text-[10px] text-zinc-400">{selectedPost.author.role} • {selectedPost.date}</div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-[24px] overflow-hidden border border-zinc-200">
                <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-80 object-cover" />
              </div>

              {/* Body Content */}
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                {selectedPost.contentParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Key Pull Quote */}
              {selectedPost.keyQuote && (
                <div className="bg-indigo-50 p-6 rounded-[24px] border-l-4 border-indigo-600 my-6 relative space-y-2">
                  <Quote className="w-8 h-8 text-indigo-200 absolute top-4 right-4" />
                  <p className="text-slate-900 font-serif text-base italic font-semibold">
                    "{selectedPost.keyQuote}"
                  </p>
                </div>
              )}

              {/* Photography Pro-Tips Box */}
              {selectedPost.photographyTips && (
                <div className="bg-zinc-50 p-6 rounded-[24px] border border-zinc-200/80 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-indigo-600" /> Photographer’s Field Manual
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div>
                      <span className="font-bold text-slate-900 block">Recommended Gear:</span>
                      {selectedPost.photographyTips.gear}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Best Shooting Hour:</span>
                      {selectedPost.photographyTips.bestHour}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-600 pt-2 border-t border-zinc-200">
                    <span className="font-bold text-indigo-600">Pro Tip: </span>
                    {selectedPost.photographyTips.proTip}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-zinc-200 flex justify-between items-center">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
