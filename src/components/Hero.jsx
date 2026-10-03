import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Compass, Sparkles, MapPin, Calendar, Heart, Search } from 'lucide-react';
import { destinationsData } from '../data/travelData';

export default function Hero() {
  const { scrollToSection, setActiveDestination, setIsSearchOpen } = useApp();

  // Floating search bar state
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedMood, setSelectedMood] = useState('Relax');
  const [selectedDuration, setSelectedDuration] = useState('5-7 Days');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (selectedDestination) {
      const match = destinationsData.find(d => 
        d.id === selectedDestination || 
        d.name.toLowerCase().includes(selectedDestination.toLowerCase())
      );
      if (match) {
        setActiveDestination(match);
        return;
      }
    }
    scrollToSection('destinations');
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24 flex flex-col justify-between overflow-hidden">
      {/* 3D Lavender Glass Wave - animated flowing background with generous overbleed */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Generous overbleed wrapper to guarantee no edges can ever appear */}
        <div className="absolute -inset-x-[15%] -inset-y-[10%] w-[130%] h-[120%]">
          <img
            src="/bg-wave.png"
            alt="L'Trave Wave Background"
            className="w-full h-full object-cover object-center animate-wave-drift transform-gpu"
          />
        </div>

        {/* Soft edge feathering on left & right to guarantee seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F4]/40 via-transparent to-[#FFF9F4]/40 pointer-events-none" />

        {/* Gentle soft ambient gradient overlay so text remains readable without obscuring the wave */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#FFF9F4]/95 pointer-events-none" />
      </div>

      {/* Central Mediterranean Sunset Aura Glow - matching the circular sun in the logo */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[450px] sm:h-[600px] rounded-full sunset-glow-aura pointer-events-none z-0 animate-aura-breathe" />

      {/* Soft decorative ambient blurred pastel blobs */}
      <div className="absolute top-10 left-[-6%] w-[420px] h-[420px] rounded-full bg-blush-200/30 blur-3xl pointer-events-none z-0 animate-float-slow" />
      <div className="absolute top-1/4 right-[-5%] w-[480px] h-[480px] rounded-full bg-lavender-200/40 blur-3xl pointer-events-none z-0 animate-float-delayed" />
      <div className="absolute bottom-16 left-1/3 w-96 h-96 rounded-full bg-babyblue-200/25 blur-3xl pointer-events-none z-0" />

      {/* Floating birds silhouettes in sky matching the logo */}
      <div className="absolute top-24 right-1/4 opacity-25 pointer-events-none hidden md:block z-0 animate-bird-glide">
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15 Q 15 5, 25 15 Q 35 5, 45 15" stroke="#29272A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M25 8 Q 32 1, 40 8 Q 47 1, 55 8" stroke="#29272A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Subtle curved flight trail line across the hero backdrop */}
      <div className="absolute top-36 left-10 right-10 pointer-events-none opacity-20 hidden lg:block z-0">
        <svg className="w-full h-40" viewBox="0 0 1200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 140 C 350 20, 750 180, 1150 40" stroke="#E28A7A" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Main Hero Grid: Left Editorial Typography & Right Layered Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-2 lg:pt-0">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 z-10 text-center lg:text-left">
            
            {/* Prominent Brand Logo Showcase */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group inline-block">
                {/* Gentle pastel radiance halo behind logo */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blush-200/60 via-paleyellow-200/50 to-mint-200/60 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                
                <img
                  src="/logo-transparent.png"
                  alt="L'Trave — Go Somewhere Beautiful"
                  className="relative max-w-[280px] sm:max-w-[360px] md:max-w-[400px] w-full h-auto object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blush-300/40 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blush-300 animate-ping" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-charcoal/80 uppercase">
                EXPLORE • ESCAPE • EXPERIENCE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.1] tracking-tight text-charcoal">
              Go Somewhere <br className="hidden sm:inline" />
              <span className="italic font-normal relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-charcoal via-[#563C4A] to-charcoal">
                Beautiful.
                <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blush-300 via-paleyellow-300 to-mint-300 rounded-full"></span>
              </span>
            </h1>

            {/* Handwritten stamp note */}
            <p className="font-handwriting text-2xl sm:text-3xl text-charcoal/70 rotate-[-1.5deg] pt-0.5">
              “Your next story starts here…”
            </p>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-charcoal/75 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover extraordinary places, hidden gems, and unforgettable experiences designed around the way you love to travel.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollToSection('destinations')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-charcoal bg-charcoal text-cream hover:bg-charcoal/90 hover:scale-[1.02] active:scale-95 shadow-soft transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-blush-200" />
              </button>

              <button
                onClick={() => scrollToSection('finder')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-charcoal bg-white/80 hover:bg-white hover:scale-[1.02] active:scale-95 border border-lavender-300/60 shadow-soft transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-charcoal/70" />
                <span>Find My Perfect Trip</span>
              </button>
            </div>

            {/* Subtle editorial trust proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-charcoal/60">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base font-bold text-charcoal">45+</span>
                <span>Bespoke Guides</span>
              </div>
              <span className="text-charcoal/20">•</span>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base font-bold text-charcoal">100%</span>
                <span>Editorial Curation</span>
              </div>
              <span className="text-charcoal/20">•</span>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base font-bold text-charcoal">0%</span>
                <span>Generic Tourist Traps</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Collage */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0 flex justify-center items-center">
            <div className="relative w-full max-w-[520px] aspect-[4/4.8] sm:aspect-[4/4.5]">
              
              {/* Primary Central Photo Card (Amalfi / Mediterranean) */}
              <div className="absolute inset-x-6 top-4 bottom-14 sm:inset-x-12 sm:top-6 sm:bottom-16 rounded-[2.2rem] overflow-hidden shadow-soft-xl border-[6px] border-white z-20 group">
                <img
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
                  alt="Amalfi Coast Cliffside Villa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-80" />
                
                {/* Floating caption within primary card */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/25 backdrop-blur-md mb-1.5">
                    Amalfi Coast • Italy
                  </span>
                  <p className="font-serif text-xl sm:text-2xl leading-tight">
                    Where cliffs embrace the sea
                  </p>
                </div>
              </div>

              {/* Top-Right Secondary Card (Kyoto Bamboo / Shrine) */}
              <div className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 w-40 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden shadow-soft-lg border-4 border-white z-30 rotate-[5deg] hover:rotate-0 transition-transform duration-500 hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"
                  alt="Kyoto Japan Pagoda"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs py-1 px-2 rounded-md text-[11px] font-medium text-charcoal">
                  🌸 Kyoto, Japan
                </div>
              </div>

              {/* Bottom-Left Secondary Card (Santorini White Architecture) */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-44 sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-lg border-4 border-white z-30 rotate-[-4deg] hover:rotate-0 transition-transform duration-500 hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80"
                  alt="Santorini Caldera"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs py-1 px-2 rounded-md text-[11px] font-medium text-charcoal flex items-center justify-between">
                  <span>🇬🇷 Santorini</span>
                  <span className="text-[10px] text-charcoal/60">Sunset 7:42 PM</span>
                </div>
              </div>

              {/* Floating Vintage Travel Stamp / Badge */}
              <div className="absolute top-1/2 -left-6 z-40 bg-paleyellow-200/95 backdrop-blur-md stamp-border p-3 rounded-xl shadow-soft rotate-[-12deg] hidden sm:block">
                <div className="text-center font-brand text-sm font-semibold tracking-normal text-charcoal leading-none mb-1">
                  L<span className="text-[#E28A7A]">’</span>Trave
                </div>
                <div className="text-[8.5px] uppercase tracking-widest text-charcoal/60 border-t border-charcoal/20 pt-1">
                  JOURNAL N° 26
                </div>
              </div>

              {/* Floating "Editor's Pick" Pill */}
              <div className="absolute top-1/4 -right-4 z-40 bg-blush-100/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-soft flex items-center gap-1.5 text-xs font-semibold text-charcoal border border-white rotate-[8deg]">
                <Sparkles className="w-3.5 h-3.5 text-blush-400" />
                <span>Curated Escapes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Travel Search Card Near Bottom of Hero */}
        <div className="mt-14 lg:mt-16 w-full max-w-5xl mx-auto z-20">
          <form 
            onSubmit={handleHeroSearch}
            className="glass-card rounded-3xl p-3 sm:p-4 shadow-soft-xl border border-white/90 flex flex-col md:flex-row items-center gap-3"
          >
            {/* Destination Selection */}
            <div className="w-full md:w-1/3 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/70 hover:bg-white transition-colors border border-charcoal/5">
              <MapPin className="w-5 h-5 text-blush-400 flex-shrink-0" />
              <div className="flex-1 text-left">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-charcoal/50">
                  Where to?
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-charcoal focus:outline-hidden cursor-pointer"
                >
                  <option value="">Anywhere Dreamy...</option>
                  {destinationsData.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}, {d.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Mood Selector */}
            <div className="w-full md:w-1/3 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/70 hover:bg-white transition-colors border border-charcoal/5">
              <Sparkles className="w-5 h-5 text-paleyellow-400 flex-shrink-0" />
              <div className="flex-1 text-left">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-charcoal/50">
                  Travel Mood
                </label>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-charcoal focus:outline-hidden cursor-pointer"
                >
                  <option value="Relax">Relax & Unwind 🌿</option>
                  <option value="Romance">Romance & Sunset 🥂</option>
                  <option value="Adventure">Adventure & Trails 🧗‍♀️</option>
                  <option value="Culture">Art & Culture 🏛️</option>
                  <option value="Nature">Nature Sanctuaries 🌲</option>
                  <option value="Nightlife">Vibrant Nightlife 🍸</option>
                </select>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="w-full md:w-1/4 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/70 hover:bg-white transition-colors border border-charcoal/5">
              <Calendar className="w-5 h-5 text-mint-400 flex-shrink-0" />
              <div className="flex-1 text-left">
                <label className="block text-[10px] uppercase font-bold tracking-wider text-charcoal/50">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-charcoal focus:outline-hidden cursor-pointer"
                >
                  <option value="Weekend">Weekend (3-4 Days)</option>
                  <option value="5-7 Days">Golden Week (5-7 Days)</option>
                  <option value="10-14 Days">Grand Voyage (10-14 Days)</option>
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-charcoal text-cream hover:bg-charcoal/90 active:scale-95 transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-lg flex-shrink-0"
            >
              <Search className="w-4 h-4 text-blush-200" />
              <span>Discover</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
