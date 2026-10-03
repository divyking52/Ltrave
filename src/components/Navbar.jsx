import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bookmark, Compass, Menu, X, Sparkles, Heart } from 'lucide-react';

export default function Navbar() {
  const { 
    savedTripIds, 
    customItineraries, 
    setIsSearchOpen, 
    setIsSavedDrawerOpen, 
    scrollToSection 
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalSavedCount = savedTripIds.length + customItineraries.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinations', id: 'destinations' },
    { name: 'Experiences', id: 'experiences' },
    { name: 'Trip Planner', id: 'planner' },
    { name: 'Travel Stories', id: 'stories' },
    { name: 'Travel Journal', id: 'journal' },
    { name: 'About', id: 'about' },
  ];

  const handleLinkClick = (id) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'glass-nav py-3.5 shadow-soft'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Name */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group flex flex-col justify-center py-1"
            >
              <span className="font-brand text-2xl sm:text-[28px] font-semibold tracking-tight text-charcoal leading-none group-hover:opacity-85 transition-opacity">
                L<span className="text-[#E28A7A] font-serif font-bold mx-[0.5px]">’</span>Trave
              </span>
              <span className="text-[8.5px] uppercase tracking-[0.28em] font-sans font-semibold text-charcoal/60 mt-0.5">
                Go Somewhere Beautiful
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 text-[13px] tracking-wide font-medium text-charcoal/80">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="hover:text-charcoal transition-colors relative py-1 group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-charcoal transition-all duration-300 group-hover:w-full rounded-full"></span>
                </button>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center space-x-2.5 sm:space-x-3.5">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-white/80 active:scale-95 transition-all text-charcoal/75 hover:text-charcoal flex items-center gap-1.5"
                title="Search destinations (Ctrl+K)"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-xs text-charcoal/50 font-normal border border-charcoal/15 px-1.5 py-0.5 rounded-md text-[10px]">
                  ⌘K
                </span>
              </button>

              {/* Saved Trips Icon with Live Badge */}
              <button
                onClick={() => setIsSavedDrawerOpen(true)}
                className="p-2.5 rounded-full hover:bg-white/80 active:scale-95 transition-all relative text-charcoal/75 hover:text-charcoal"
                title="View Saved Trips Journal"
                aria-label="Saved Trips"
              >
                <Bookmark className="w-4 h-4" />
                {totalSavedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blush-300 text-charcoal font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream shadow-xs animate-pulse-subtle">
                    {totalSavedCount}
                  </span>
                )}
              </button>

              {/* "Plan My Trip" CTA */}
              <button
                onClick={() => handleLinkClick('planner')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-charcoal bg-gradient-to-r from-blush-200 via-paleyellow-200 to-mint-200 hover:opacity-95 shadow-sm hover:shadow-soft active:scale-95 transition-all duration-300 border border-white/60"
              >
                <Sparkles className="w-3.5 h-3.5 text-charcoal/80" />
                <span>Plan My Trip</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="md:hidden p-2.5 rounded-full text-charcoal hover:bg-white/80 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-between bg-cream/98 backdrop-blur-xl animate-fadeIn p-6">
          <div className="flex items-center justify-between border-b border-lavender/40 pb-4">
            <div className="flex flex-col">
              <span className="font-brand text-2xl font-semibold tracking-tight text-charcoal leading-none">
                L<span className="text-[#E28A7A] font-serif font-bold mx-[0.5px]">’</span>Trave
              </span>
              <span className="text-[8.5px] uppercase tracking-[0.25em] font-sans font-semibold text-charcoal/60 mt-0.5">
                Go Somewhere Beautiful
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-lavender/30 text-charcoal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 py-8">
            <span className="text-[11px] uppercase tracking-widest text-charcoal/50 font-medium">
              Navigation Journal
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left font-serif text-2xl text-charcoal hover:text-blush-400 py-1 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-lavender/40">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSavedDrawerOpen(true);
                }}
                className="flex items-center gap-2 text-sm font-medium text-charcoal/80"
              >
                <Bookmark className="w-4 h-4 text-blush-400" />
                <span>Saved Journal ({totalSavedCount})</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center gap-2 text-sm font-medium text-charcoal/80"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            <button
              onClick={() => handleLinkClick('planner')}
              className="w-full py-3.5 rounded-full text-center text-sm font-semibold tracking-wider uppercase text-charcoal bg-gradient-to-r from-blush-200 via-paleyellow-200 to-mint-200 shadow-sm"
            >
              Plan My Trip →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
