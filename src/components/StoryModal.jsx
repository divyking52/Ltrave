import React from 'react';
import { useApp } from '../context/AppContext';
import { destinationsData } from '../data/travelData';
import { X, Quote, MapPin, Calendar, Clock, ArrowRight, Heart } from 'lucide-react';

export default function StoryModal() {
  const { activeStory, setActiveStory, setActiveDestination } = useApp();

  if (!activeStory) return null;

  const matchedDest = destinationsData.find(d => d.id === activeStory.destinationId);

  const handleOpenDestination = () => {
    if (matchedDest) {
      setActiveStory(null);
      setActiveDestination(matchedDest);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setActiveStory(null)}
      />

      <div className="relative w-full max-w-3xl bg-[#FFFDFB] rounded-[2.5rem] shadow-soft-xl border border-white overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:px-8 border-b border-lavender-200/50 bg-cream/90 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            <Quote className="w-4 h-4 text-blush-400" />
            <span>Traveler's Memoir • {activeStory.location}</span>
          </div>

          <button
            onClick={() => setActiveStory(null)}
            className="p-2 rounded-full hover:bg-white text-charcoal transition-colors"
            aria-label="Close story"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Story Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 flex-1">
          
          {/* Cover Photo */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-soft">
            <img
              src={activeStory.coverImage}
              alt={activeStory.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90 block">
                {activeStory.location}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                {activeStory.title}
              </h2>
            </div>
          </div>

          {/* Author Details */}
          <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
            <div className="flex items-center gap-3">
              <img
                src={activeStory.avatar}
                alt={activeStory.author}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div>
                <span className="font-serif font-bold text-sm text-charcoal block">
                  Written by {activeStory.author}
                </span>
                <span className="text-xs text-charcoal/50">
                  {activeStory.date} • {activeStory.readTime}
                </span>
              </div>
            </div>

            {matchedDest && (
              <button
                onClick={handleOpenDestination}
                className="text-xs font-semibold text-charcoal hover:text-blush-400 flex items-center gap-1"
              >
                <span>View {matchedDest.name} Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Pull Quote */}
          <blockquote className="font-serif italic text-xl sm:text-2xl text-charcoal/90 leading-snug border-l-3 border-blush-300 pl-5 py-2 bg-cream/70 rounded-r-2xl">
            {activeStory.quote}
          </blockquote>

          {/* Full Narrative Text */}
          <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
            <p>{activeStory.fullStory}</p>
            <p>
              When we travel without urgency, ordinary rituals become sacred. The steam rising from a morning ceramic cup, the laughter echoing down a cobbled archway, and the realization that the world is far gentler and more poetic than we often remember.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
