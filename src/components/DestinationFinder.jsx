import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { destinationsData } from '../data/travelData';
import { Sparkles, Compass, Bookmark, ArrowRight, Check, RotateCcw, Heart } from 'lucide-react';

export default function DestinationFinder() {
  const { toggleSaveTrip, isSaved, setActiveDestination } = useApp();

  // Filter criteria states
  const [selectedMood, setSelectedMood] = useState('Relax');
  const [selectedTripType, setSelectedTripType] = useState("Couple's Getaway");
  const [selectedClimate, setSelectedClimate] = useState('Mild');
  const [hasSearched, setHasSearched] = useState(false);

  const moods = [
    { label: 'Relax', icon: '🌿', desc: 'Slow pace, spas & serenity' },
    { label: 'Adventure', icon: '🧗‍♀️', desc: 'Hikes, peaks & thrills' },
    { label: 'Romance', icon: '🥂', desc: 'Sunset views & candlelit dinners' },
    { label: 'Culture', icon: '🏛️', desc: 'Ancient temples, art & cuisine' },
    { label: 'Nature', icon: '🌲', desc: 'Pristine fjords & quiet forests' },
    { label: 'Nightlife', icon: '🍸', desc: 'Rooftop bars & evening energy' }
  ];

  const tripTypes = [
    { label: 'Weekend Escape', icon: '🎒' },
    { label: 'Solo Adventure', icon: '🧭' },
    { label: "Couple's Getaway", icon: '🕊️' },
    { label: 'Family Trip', icon: '🏡' },
    { label: 'Luxury Escape', icon: '✨' }
  ];

  const climates = [
    { label: 'Tropical', icon: '🌴' },
    { label: 'Cold', icon: '❄️' },
    { label: 'Mild', icon: '⛅' },
    { label: "Doesn't Matter", icon: '🌍' }
  ];

  // Matched destinations logic with scoring
  const matchedDestinations = useMemo(() => {
    return destinationsData.map(dest => {
      let score = 50; // base score
      let matchReasons = [];

      if (dest.mood.includes(selectedMood)) {
        score += 25;
        matchReasons.push(`Matches your ${selectedMood} mood`);
      }
      if (dest.tripType.includes(selectedTripType)) {
        score += 15;
        matchReasons.push(`Ideal for a ${selectedTripType}`);
      }
      if (selectedClimate === "Doesn't Matter" || dest.climate === selectedClimate) {
        score += 10;
        matchReasons.push(`${dest.climate} climate`);
      }

      return {
        ...dest,
        matchScore: Math.min(score, 99),
        primaryReason: matchReasons[0] || 'Curated recommendation'
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);
  }, [selectedMood, selectedTripType, selectedClimate]);

  const handleDiscover = (e) => {
    e.preventDefault();
    setHasSearched(true);
    // Smooth scroll down to the results within finder
    const resultsEl = document.getElementById('finder-results');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleReset = () => {
    setSelectedMood('Relax');
    setSelectedTripType("Couple's Getaway");
    setSelectedClimate('Mild');
    setHasSearched(false);
  };

  return (
    <section id="finder" className="py-20 lg:py-28 bg-[#FFFDFB] relative overflow-hidden bg-topographic">
      {/* Delicate background elements with Mediterranean sunset and turquoise sea hues */}
      <div className="absolute top-10 right-[-5%] w-[450px] h-[450px] bg-gradient-to-br from-[#F9D5CA]/40 to-[#D4EEF2]/40 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-10 left-[-5%] w-[420px] h-[420px] bg-gradient-to-tr from-mint-100/60 to-lavender-100/60 rounded-full blur-3xl pointer-events-none -z-10 animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-paleyellow-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-100 text-charcoal text-[11px] font-semibold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-charcoal/70" />
            <span>Interactive Matchmaker</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-tight">
            Where do you want to go?
          </h2>
          
          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed font-normal">
            Choose how you wish to feel, who you are traveling with, and your preferred climate. We'll curate your bespoke destination match.
          </p>
        </div>

        {/* Finder Interactive Wizard Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-6 sm:p-10 shadow-soft-lg border border-lavender-200/50 mb-12">
          
          {/* 1. Travel Mood */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal/60">
                01. Select Travel Mood
              </span>
              <span className="text-xs text-charcoal/40 font-serif italic">
                {selectedMood}
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {moods.map((mood) => {
                const isSelected = selectedMood === mood.label;
                return (
                  <button
                    key={mood.label}
                    type="button"
                    onClick={() => {
                      setSelectedMood(mood.label);
                      setHasSearched(true);
                    }}
                    className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 relative ${
                      isSelected
                        ? 'bg-charcoal text-cream shadow-soft scale-[1.03] ring-2 ring-blush-200'
                        : 'bg-white/80 hover:bg-white text-charcoal/80 hover:shadow-xs border border-charcoal/5'
                    }`}
                  >
                    <span className="text-2xl mb-1.5">{mood.icon}</span>
                    <span className="text-xs font-semibold">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Trip Type */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal/60">
                02. Who is Traveling?
              </span>
              <span className="text-xs text-charcoal/40 font-serif italic">
                {selectedTripType}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {tripTypes.map((type) => {
                const isSelected = selectedTripType === type.label;
                return (
                  <button
                    key={type.label}
                    type="button"
                    onClick={() => {
                      setSelectedTripType(type.label);
                      setHasSearched(true);
                    }}
                    className={`px-4 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-blush-300 text-charcoal shadow-soft font-bold scale-[1.02]'
                        : 'bg-white/80 hover:bg-white text-charcoal/80 border border-charcoal/5'
                    }`}
                  >
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Climate */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal/60">
                03. Preferred Climate
              </span>
              <span className="text-xs text-charcoal/40 font-serif italic">
                {selectedClimate}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {climates.map((climate) => {
                const isSelected = selectedClimate === climate.label;
                return (
                  <button
                    key={climate.label}
                    type="button"
                    onClick={() => {
                      setSelectedClimate(climate.label);
                      setHasSearched(true);
                    }}
                    className={`px-4 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-mint-300 text-charcoal shadow-soft font-bold scale-[1.02]'
                        : 'bg-white/80 hover:bg-white text-charcoal/80 border border-charcoal/5'
                    }`}
                  >
                    <span>{climate.icon}</span>
                    <span>{climate.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-charcoal/10">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-charcoal/60 hover:text-charcoal flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>

            <button
              onClick={handleDiscover}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-charcoal text-cream hover:bg-charcoal/90 text-xs font-semibold uppercase tracking-wider shadow-soft hover:shadow-soft-lg active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-paleyellow-300 group-hover:rotate-12 transition-transform" />
              <span>Discover My Destination</span>
            </button>
          </div>
        </div>

        {/* Results Showcase Section */}
        <div id="finder-results" className="pt-4">
          <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
            <div className="flex items-baseline gap-3">
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">
                Recommended For You
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-mint-100 text-charcoal">
                {matchedDestinations.length} Curated Matches
              </span>
            </div>
            
            <p className="hidden sm:block text-xs text-charcoal/50 font-serif italic">
              Tailored for {selectedMood} • {selectedTripType}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchedDestinations.map((dest, idx) => {
              const saved = isSaved(dest.id);
              return (
                <div
                  key={dest.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500 border border-lavender-100 flex flex-col justify-between editorial-hover-lift"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-charcoal shadow-xs">
                          {dest.matchScore}% Match
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveTrip(dest.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-md transition-all ${
                            saved 
                              ? 'bg-blush-300 text-charcoal shadow-xs scale-110' 
                              : 'bg-white/80 hover:bg-white text-charcoal/70 hover:text-charcoal'
                          }`}
                          aria-label={saved ? "Remove from saved" : "Save destination"}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-charcoal' : ''}`} />
                        </button>
                      </div>

                      {/* Bottom Image Overlay text */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <span className="text-[11px] font-medium tracking-wide uppercase opacity-90">
                          {dest.country}
                        </span>
                        <h4 className="font-serif text-xl font-bold leading-tight">
                          {dest.name}
                        </h4>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-charcoal/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
                        <span className="font-medium text-[11px] truncate">
                          {dest.primaryReason}
                        </span>
                      </div>

                      <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs border-t border-charcoal/5">
                        <div>
                          <span className="block text-[10px] uppercase text-charcoal/40">Best Season</span>
                          <span className="font-medium text-charcoal">{dest.bestTimeToVisit.split('&')[0]}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] uppercase text-charcoal/40">From</span>
                          <span className="font-serif font-bold text-charcoal">{dest.startingBudget}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => setActiveDestination(dest)}
                      className="w-full py-2.5 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-charcoal font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
