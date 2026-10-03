import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { destinationsData } from '../data/travelData';
import { Bookmark, ArrowRight, Sparkles, MapPin, Calendar, DollarSign, Heart } from 'lucide-react';

export default function FeaturedDestinations() {
  const { toggleSaveTrip, isSaved, setActiveDestination } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterTabs = ['All', 'Europe', 'Asia', 'Americas'];

  const filteredDestinations = selectedFilter === 'All' 
    ? destinationsData 
    : destinationsData.filter(d => d.region === selectedFilter);

  // Featured main highlight (first destination)
  const heroCard = destinationsData[0]; // Amalfi
  const secondCard = destinationsData[1]; // Kyoto
  const thirdCard = destinationsData[2]; // Santorini
  const fourthCard = destinationsData[3]; // Bali
  const fifthCard = destinationsData[4]; // Swiss Alps
  const sixthCard = destinationsData[5]; // Cappadocia

  return (
    <section id="destinations" className="py-20 lg:py-28 bg-[#FFF9F4] relative overflow-hidden subtle-grain">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blush-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-lavender-200/45 rounded-full blur-3xl pointer-events-none -z-10 animate-float-delayed" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-paleyellow-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle map coordinates and compass watermark */}
      <div className="absolute top-12 right-12 text-right opacity-20 pointer-events-none hidden md:block">
        <span className="font-mono text-xs tracking-widest text-charcoal block">40°38′N 14°36′E</span>
        <span className="font-serif italic text-xs text-charcoal/70">Positano • Ravello • Amalfi</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 text-charcoal text-[11px] font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-blush-400" />
              <span>Curated Dossier</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight">
              Places Worth Getting Lost In
            </h2>

            <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed font-normal">
              An editorial anthology of extraordinary landscapes, quiet villages, and cinematic shores that linger long after you return home.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 border border-lavender-200/60 shadow-xs self-start md:self-end overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                  selectedFilter === tab
                    ? 'bg-charcoal text-cream shadow-xs'
                    : 'text-charcoal/70 hover:text-charcoal hover:bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Asymmetric Magazine Layout */}
        {selectedFilter === 'All' ? (
          <div className="space-y-8">
            
            {/* Row 1: Large Wide Hero Magazine Feature (Amalfi Coast) + Tall Portrait Feature (Kyoto) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Amalfi Coast (Span 7) */}
              <div 
                onClick={() => setActiveDestination(heroCard)}
                className="lg:col-span-7 group relative rounded-[2.5rem] overflow-hidden bg-white shadow-soft-lg hover:shadow-soft-xl transition-all duration-500 cursor-pointer editorial-hover-lift flex flex-col justify-between min-h-[460px] sm:min-h-[500px]"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={heroCard.heroImage}
                    alt={heroCard.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-charcoal shadow-sm">
                    {heroCard.badge}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveTrip(heroCard.id);
                    }}
                    className={`p-3 rounded-full backdrop-blur-md transition-all ${
                      isSaved(heroCard.id)
                        ? 'bg-blush-300 text-charcoal shadow-xs scale-105'
                        : 'bg-white/80 hover:bg-white text-charcoal'
                    }`}
                    aria-label="Save trip"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved(heroCard.id) ? 'fill-charcoal' : ''}`} />
                  </button>
                </div>

                {/* Bottom Content Overlay */}
                <div className="relative z-10 p-6 sm:p-8 text-white space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-cream/90 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5 text-blush-300" />
                    <span>{heroCard.country} • {heroCard.recommendedStay}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    {heroCard.name}
                  </h3>

                  <p className="text-sm text-cream/85 max-w-xl line-clamp-2 leading-relaxed">
                    {heroCard.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/20">
                    <div className="flex items-center gap-6 text-xs text-cream/90">
                      <div>
                        <span className="block text-[10px] uppercase text-cream/60">Best Time</span>
                        <span className="font-semibold">{heroCard.bestTimeToVisit}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-cream/60">Starting Budget</span>
                        <span className="font-serif font-bold text-base">{heroCard.startingBudget}</span>
                      </div>
                    </div>

                    <button className="px-5 py-2.5 rounded-full bg-white text-charcoal text-xs font-semibold tracking-wider uppercase hover:bg-cream transition-colors flex items-center gap-2 group-hover:gap-3">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Kyoto (Span 5: Tall Magazine Portrait) */}
              <div
                onClick={() => setActiveDestination(secondCard)}
                className="lg:col-span-5 group relative rounded-[2.5rem] overflow-hidden bg-white shadow-soft-lg hover:shadow-soft-xl transition-all duration-500 cursor-pointer editorial-hover-lift flex flex-col justify-between min-h-[460px] sm:min-h-[500px]"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={secondCard.heroImage}
                    alt={secondCard.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-charcoal shadow-sm">
                    {secondCard.badge}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveTrip(secondCard.id);
                    }}
                    className={`p-3 rounded-full backdrop-blur-md transition-all ${
                      isSaved(secondCard.id)
                        ? 'bg-mint-300 text-charcoal shadow-xs scale-105'
                        : 'bg-white/80 hover:bg-white text-charcoal'
                    }`}
                    aria-label="Save trip"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved(secondCard.id) ? 'fill-charcoal' : ''}`} />
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-6 sm:p-8 text-white space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-cream/90 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5 text-mint-300" />
                    <span>{secondCard.country} • {secondCard.recommendedStay}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                    {secondCard.name}
                  </h3>

                  <p className="text-sm text-cream/85 line-clamp-2 leading-relaxed">
                    {secondCard.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/20 text-xs">
                    <div>
                      <span className="block text-[10px] uppercase text-cream/60">From</span>
                      <span className="font-serif font-bold text-base">{secondCard.startingBudget}</span>
                    </div>

                    <button className="px-5 py-2.5 rounded-full bg-white text-charcoal text-xs font-semibold tracking-wider uppercase hover:bg-cream transition-colors flex items-center gap-2">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Row 2: Four Balanced Editorial Magazine Cards (Santorini, Bali, Swiss Alps, Cappadocia) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[thirdCard, fourthCard, fifthCard, sixthCard].map((dest, i) => (
                <div
                  key={dest.id}
                  onClick={() => setActiveDestination(dest)}
                  className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500 cursor-pointer editorial-hover-lift flex flex-col justify-between border border-lavender-100"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[4/3.2] overflow-hidden">
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${dest.badgeColor} shadow-xs`}>
                          {dest.badge}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveTrip(dest.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-md transition-all ${
                            isSaved(dest.id)
                              ? 'bg-blush-300 text-charcoal shadow-xs scale-105'
                              : 'bg-white/80 hover:bg-white text-charcoal/70'
                          }`}
                          aria-label="Save trip"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved(dest.id) ? 'fill-charcoal' : ''}`} />
                        </button>
                      </div>

                      {/* Title over image bottom */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-cream/90">
                          {dest.country}
                        </span>
                        <h4 className="font-serif text-xl font-bold leading-tight">
                          {dest.name}
                        </h4>
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="p-5 space-y-3">
                      <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs border-t border-charcoal/5">
                        <div>
                          <span className="block text-[10px] uppercase text-charcoal/40">Best Season</span>
                          <span className="font-medium text-charcoal text-[11px] truncate block max-w-[120px]">
                            {dest.bestTimeToVisit.split('&')[0]}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] uppercase text-charcoal/40">Starting</span>
                          <span className="font-serif font-bold text-charcoal text-sm">
                            {dest.startingBudget}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-5 pt-0">
                    <button className="w-full py-2.5 rounded-xl bg-cream hover:bg-lavender-100 text-charcoal font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-lavender-200/50">
                      <span>Explore Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          /* Filtered standard responsive grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => setActiveDestination(dest)}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500 cursor-pointer editorial-hover-lift flex flex-col justify-between border border-lavender-100"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${dest.badgeColor} shadow-xs`}>
                        {dest.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveTrip(dest.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          isSaved(dest.id)
                            ? 'bg-blush-300 text-charcoal shadow-xs scale-105'
                            : 'bg-white/80 hover:bg-white text-charcoal/70'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved(dest.id) ? 'fill-charcoal' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-xs uppercase tracking-wider font-semibold text-cream/90">
                        {dest.country}
                      </span>
                      <h4 className="font-serif text-2xl font-bold leading-tight">
                        {dest.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs text-charcoal/70 line-clamp-3 leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="pt-3 flex items-center justify-between text-xs border-t border-charcoal/5">
                      <div>
                        <span className="block text-[10px] uppercase text-charcoal/40">Best Time</span>
                        <span className="font-medium text-charcoal">{dest.bestTimeToVisit}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] uppercase text-charcoal/40">Budget</span>
                        <span className="font-serif font-bold text-base text-charcoal">{dest.startingBudget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button className="w-full py-2.5 rounded-xl bg-cream hover:bg-lavender-100 text-charcoal font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-lavender-200/50">
                    <span>Explore Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
