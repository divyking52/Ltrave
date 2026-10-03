import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { destinationsData, journalArticlesData, experiencesData } from '../data/travelData';
import { Search, X, MapPin, BookOpen, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function SearchModal() {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    setActiveDestination, 
    setActiveArticle 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedDestinations = q 
    ? destinationsData.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.country.toLowerCase().includes(q) || 
        d.description.toLowerCase().includes(q) ||
        d.mood.some(m => m.toLowerCase().includes(q))
      )
    : [];

  const matchedArticles = q
    ? journalArticlesData.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
      )
    : [];

  const matchedExperiences = q
    ? experiencesData.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      )
    : [];

  const popularTags = ['Amalfi', 'Kyoto', 'Santorini', 'Romance', 'Mountains', 'Hidden Gems', 'Solo'];

  const handleSelectDest = (dest) => {
    setIsSearchOpen(false);
    setActiveDestination(dest);
  };

  const handleSelectArticle = (article) => {
    setIsSearchOpen(false);
    setActiveArticle(article);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#FFFDFB] rounded-[2rem] shadow-soft-xl border border-white overflow-hidden z-10">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-lavender-200/60 bg-cream flex items-center gap-3">
          <Search className="w-5 h-5 text-charcoal/50 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, moods, stories, or field guides..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-charcoal placeholder:text-charcoal/40 focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-white text-charcoal/40"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase font-bold tracking-wider px-2 py-1 rounded-md text-charcoal/50 hover:bg-white transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content / Results */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-6">
          
          {/* Quick Filter Tag Pills */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/45 block">
                Popular Inquiries
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-cream hover:bg-lavender-100 text-charcoal text-xs font-medium border border-lavender-200/60 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Destination Results */}
          {matchedDestinations.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/45 block">
                Destinations ({matchedDestinations.length})
              </span>
              <div className="space-y-2">
                {matchedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => handleSelectDest(dest)}
                    className="p-3 rounded-2xl bg-white hover:bg-cream border border-lavender-100 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm text-charcoal group-hover:text-blush-400">
                            {dest.name}
                          </h4>
                          <span className="text-[10px] text-charcoal/50 uppercase font-semibold">
                            {dest.country}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal/60 line-clamp-1 max-w-md">
                          {dest.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:text-charcoal group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Journal Article Results */}
          {matchedArticles.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/45 block">
                Travel Guides & Articles ({matchedArticles.length})
              </span>
              <div className="space-y-2">
                {matchedArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleSelectArticle(article)}
                    className="p-3 rounded-2xl bg-white hover:bg-cream border border-lavender-100 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <span className="text-[10px] text-charcoal/50 uppercase font-semibold block">
                          {article.category} • {article.readTime}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-charcoal group-hover:text-blush-400 line-clamp-1">
                          {article.title}
                        </h4>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:text-charcoal group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results Fallback */}
          {query && matchedDestinations.length === 0 && matchedArticles.length === 0 && matchedExperiences.length === 0 && (
            <div className="text-center py-10 space-y-2">
              <Compass className="w-8 h-8 text-charcoal/30 mx-auto" />
              <p className="font-serif text-lg text-charcoal">No destinations found matching “{query}”</p>
              <p className="text-xs text-charcoal/60">
                Try searching for “Italy”, “Japan”, “Mountains”, or “Romance”.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
