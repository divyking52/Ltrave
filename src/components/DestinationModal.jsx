import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, Bookmark, MapPin, Calendar, Clock, DollarSign, 
  Sparkles, Check, ArrowRight, Share2, Compass 
} from 'lucide-react';

export default function DestinationModal() {
  const { 
    activeDestination, 
    setActiveDestination, 
    toggleSaveTrip, 
    isSaved, 
    scrollToSection,
    showToast 
  } = useApp();

  if (!activeDestination) return null;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const saved = isSaved(activeDestination.id);
  const photos = activeDestination.gallery && activeDestination.gallery.length > 0 
    ? activeDestination.gallery 
    : [activeDestination.heroImage];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Destination link copied to clipboard! 📋', 'success');
    } else {
      showToast('Link ready to share', 'info');
    }
  };

  const handlePlanThis = () => {
    setActiveDestination(null);
    scrollToSection('planner');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setActiveDestination(null)}
      />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-4xl bg-[#FFFDFB] rounded-[2.5rem] shadow-soft-xl border border-white overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 sm:px-8 border-b border-lavender-200/50 bg-cream/90 backdrop-blur-xs flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            <Compass className="w-4 h-4 text-charcoal/70" />
            <span>Editorial Field Guide • {activeDestination.country}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-white text-charcoal/70 hover:text-charcoal transition-colors"
              title="Share destination"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveDestination(null)}
              className="p-2 rounded-full hover:bg-white text-charcoal transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8 flex-1">
          
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-soft border border-charcoal/5">
              <img
                src={photos[activePhotoIdx]}
                alt={activeDestination.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${activeDestination.badgeColor} shadow-xs`}>
                  {activeDestination.badge}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-2.5">
                {photos.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activePhotoIdx === idx 
                        ? 'border-charcoal scale-105 shadow-xs' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Quick Stats */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-charcoal/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-charcoal/50">
                {activeDestination.country} • {activeDestination.coordinates}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
                {activeDestination.name}
              </h2>
              <p className="text-sm font-serif italic text-charcoal/70">
                “{activeDestination.tagline}”
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleSaveTrip(activeDestination.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  saved 
                    ? 'bg-blush-300 text-charcoal shadow-xs' 
                    : 'bg-cream hover:bg-lavender-100 text-charcoal border border-charcoal/15'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-charcoal' : ''}`} />
                <span>{saved ? 'Saved in Journal' : 'Save Destination'}</span>
              </button>

              <button
                onClick={handlePlanThis}
                className="px-5 py-2.5 rounded-full bg-charcoal text-cream hover:bg-charcoal/90 text-xs font-bold uppercase tracking-wider shadow-soft transition-all"
              >
                Plan Trip
              </button>
            </div>
          </div>

          {/* Key Facts Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-cream border border-lavender-200/50">
              <div className="flex items-center gap-1.5 text-charcoal/50 text-[10px] uppercase font-bold mb-1">
                <Calendar className="w-3 h-3 text-blush-400" />
                <span>Best Season</span>
              </div>
              <span className="text-xs font-semibold text-charcoal block truncate">
                {activeDestination.bestTimeToVisit}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream border border-lavender-200/50">
              <div className="flex items-center gap-1.5 text-charcoal/50 text-[10px] uppercase font-bold mb-1">
                <Clock className="w-3 h-3 text-mint-400" />
                <span>Duration</span>
              </div>
              <span className="text-xs font-semibold text-charcoal block">
                {activeDestination.recommendedStay}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream border border-lavender-200/50">
              <div className="flex items-center gap-1.5 text-charcoal/50 text-[10px] uppercase font-bold mb-1">
                <DollarSign className="w-3 h-3 text-paleyellow-500" />
                <span>From</span>
              </div>
              <span className="font-serif font-bold text-sm text-charcoal block">
                {activeDestination.startingBudget}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream border border-lavender-200/50">
              <div className="flex items-center gap-1.5 text-charcoal/50 text-[10px] uppercase font-bold mb-1">
                <Sparkles className="w-3 h-3 text-lavender-400" />
                <span>Travel Mood</span>
              </div>
              <span className="text-xs font-semibold text-charcoal block truncate">
                {activeDestination.mood.join(', ')}
              </span>
            </div>
          </div>

          {/* Long Editorial Story */}
          <div className="space-y-3">
            <h4 className="font-serif text-xl font-bold text-charcoal">
              The Essence of {activeDestination.name}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-normal">
              {activeDestination.longStory}
            </p>
          </div>

          {/* Curated Highlights */}
          <div className="space-y-3">
            <h4 className="font-serif text-xl font-bold text-charcoal">
              Curated Experiences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeDestination.highlights.map((h, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white border border-charcoal/5 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-mint-200 text-charcoal text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-xs text-charcoal/80 leading-relaxed">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Insider Tip & Packing Essentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-paleyellow-100/70 border border-paleyellow-200">
              <h5 className="font-serif text-base font-bold text-charcoal mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-paleyellow-500" />
                <span>Curator's Secret</span>
              </h5>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                {activeDestination.curatedTips}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-mint-100/70 border border-mint-200">
              <h5 className="font-serif text-base font-bold text-charcoal mb-2 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-mint-500" />
                <span>What to Pack</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {activeDestination.packingMustHaves.map((item, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-white/80 text-charcoal font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:px-8 border-t border-lavender-200/50 bg-cream/90 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-charcoal/60 font-serif italic">
            Ready to experience {activeDestination.name}?
          </span>
          <button
            onClick={handlePlanThis}
            className="px-6 py-2.5 rounded-full bg-charcoal text-cream hover:bg-charcoal/90 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <span>Open in Trip Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
