import React from 'react';
import { useApp } from '../context/AppContext';
import { destinationsData } from '../data/travelData';
import { 
  X, Bookmark, Trash2, ArrowRight, Compass, Sparkles, 
  Printer, Share2, MapPin, Calendar, Check 
} from 'lucide-react';

export default function SavedTripsDrawer() {
  const { 
    isSavedDrawerOpen, 
    setIsSavedDrawerOpen, 
    savedTripIds, 
    customItineraries, 
    toggleSaveTrip, 
    removeCustomItinerary,
    setActiveDestination,
    scrollToSection,
    showToast
  } = useApp();

  if (!isSavedDrawerOpen) return null;

  const savedDestinations = destinationsData.filter(d => savedTripIds.includes(d.id));

  const handleOpenDestination = (dest) => {
    setIsSavedDrawerOpen(false);
    setActiveDestination(dest);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const handleShareList = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Travel journal dossier copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSavedDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDFB] shadow-2xl border-l border-lavender-200/60 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-lavender-200/50 bg-cream/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blush-400" />
              <div>
                <h3 className="font-brand text-2xl font-medium text-charcoal leading-tight">
                  L<span className="text-[#E28A7A] font-serif font-bold">’</span>Trave Journal
                </h3>
                <p className="text-[11px] text-charcoal/60">
                  {savedTripIds.length} Destinations • {customItineraries.length} Custom Plans
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSavedDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-white text-charcoal transition-colors"
              aria-label="Close saved drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Custom Planned Itineraries Section */}
            {customItineraries.length > 0 && (
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-paleyellow-500" />
                  <span>Custom Itineraries ({customItineraries.length})</span>
                </span>

                <div className="space-y-3">
                  {customItineraries.map((itin) => (
                    <div
                      key={itin.id}
                      className="p-4 rounded-2xl bg-white border border-charcoal/10 shadow-xs space-y-2 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-charcoal">
                          {itin.destinationName}
                        </span>
                        <button
                          onClick={() => removeCustomItinerary(itin.id)}
                          className="p-1 rounded-md text-charcoal/40 hover:text-red-500 transition-colors"
                          title="Remove itinerary"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-charcoal/65">
                        <span>{itin.duration}</span>
                        <span>•</span>
                        <span>{itin.style}</span>
                      </div>

                      <div className="pt-1 flex items-center justify-between text-[11px] text-charcoal/50 border-t border-charcoal/5">
                        <span>Created {itin.createdDate}</span>
                        <span className="font-medium text-mint-600">Ready to travel</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bookmarked Destinations Section */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-blush-400" />
                <span>Saved Escapes ({savedDestinations.length})</span>
              </span>

              {savedDestinations.length === 0 ? (
                <div className="text-center py-10 px-4 bg-cream/70 rounded-3xl border border-dashed border-charcoal/15">
                  <Compass className="w-8 h-8 text-charcoal/30 mx-auto mb-2" />
                  <p className="font-serif text-base text-charcoal font-semibold">Your journal is currently empty</p>
                  <p className="text-xs text-charcoal/60 mt-1 mb-4">
                    Explore destinations and click the bookmark icon to save places to your itinerary.
                  </p>
                  <button
                    onClick={() => {
                      setIsSavedDrawerOpen(false);
                      scrollToSection('destinations');
                    }}
                    className="px-4 py-2 rounded-full bg-charcoal text-cream text-xs font-semibold uppercase tracking-wider"
                  >
                    Browse Destinations
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      className="p-3.5 rounded-2xl bg-white border border-lavender-100 shadow-xs flex items-center gap-3.5 group hover:shadow-soft transition-all"
                    >
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 cursor-pointer"
                        onClick={() => handleOpenDestination(dest)}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/50">
                            {dest.country}
                          </span>
                          <button
                            onClick={() => toggleSaveTrip(dest.id)}
                            className="text-charcoal/40 hover:text-red-500 p-1"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 
                          onClick={() => handleOpenDestination(dest)}
                          className="font-serif text-base font-bold text-charcoal truncate cursor-pointer hover:text-blush-400"
                        >
                          {dest.name}
                        </h4>

                        <div className="flex items-center justify-between text-xs text-charcoal/70 mt-0.5">
                          <span>From {dest.startingBudget}</span>
                          <button
                            onClick={() => handleOpenDestination(dest)}
                            className="text-[11px] font-semibold text-charcoal/80 hover:text-charcoal flex items-center gap-0.5"
                          >
                            <span>View</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Footer Controls */}
          {savedDestinations.length > 0 && (
            <div className="p-6 border-t border-lavender-200/50 bg-cream/90 space-y-3">
              <div className="flex items-center justify-between text-xs text-charcoal/70">
                <span>Total Saved Places</span>
                <span className="font-serif font-bold text-sm text-charcoal">{savedDestinations.length}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePrintDossier}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-cream text-charcoal border border-charcoal/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>

                <button
                  onClick={handleShareList}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-cream text-charcoal border border-charcoal/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Journal</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsSavedDrawerOpen(false);
                  scrollToSection('planner');
                }}
                className="w-full py-3 rounded-full bg-charcoal text-cream hover:bg-charcoal/90 text-xs font-bold uppercase tracking-wider shadow-soft transition-all text-center block"
              >
                Plan Multi-City Journey →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
