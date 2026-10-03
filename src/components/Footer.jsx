import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ArrowUp, Instagram, Youtube, Heart, Globe, Plane } from 'lucide-react';

export default function Footer() {
  const { scrollToSection, replayIntroLoader } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="bg-[#29272A] text-[#FFF9F4] pt-20 pb-12 border-t border-charcoal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-cream/10">
          
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <div 
              onClick={scrollToTop}
              className="cursor-pointer inline-flex items-center gap-3.5 group mb-2"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3 py-1.5 inline-flex items-center shadow-soft border border-white/40 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/logo-transparent.png" 
                  alt="L'Trave — Go Somewhere Beautiful" 
                  className="h-10 sm:h-11 w-auto object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-brand text-2xl sm:text-3xl font-medium tracking-tight text-cream leading-none">
                  L<span className="text-blush-300 font-serif font-bold mx-[0.5px]">’</span>Trave
                </span>
                <span className="text-[8.5px] uppercase tracking-[0.28em] font-sans font-semibold text-cream/60 mt-1">
                  Go Somewhere Beautiful
                </span>
              </div>
            </div>

            <p className="font-serif italic text-2xl text-cream/90">
              “Go Somewhere Beautiful.”
            </p>

            <p className="text-xs sm:text-sm text-cream/70 max-w-sm leading-relaxed font-normal">
              An independent travel discovery journal celebrating mindful escapes, authentic architecture, and slow voyages across earth's most evocative landscapes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-cream/60 font-medium">Follow along:</span>
              <a href="#instagram" className="p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#youtube" className="p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#pinterest" className="p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors text-xs font-bold" title="Pinterest">
                P
              </a>
              <a href="#tiktok" className="p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors text-xs font-bold" title="TikTok">
                Tk
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cream/40">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/80">
              <li>
                <button onClick={() => scrollToSection('destinations')} className="hover:text-blush-200 transition-colors">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('experiences')} className="hover:text-blush-200 transition-colors">
                  Experiences
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('journal')} className="hover:text-blush-200 transition-colors">
                  Travel Journal
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('planner')} className="hover:text-blush-200 transition-colors">
                  Trip Planner
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('finder')} className="hover:text-blush-200 transition-colors">
                  Destination Matcher
                </button>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cream/40">
              About
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/80">
              <li>
                <a href="#our-story" className="hover:text-blush-200 transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#about-ltrave" className="hover:text-blush-200 transition-colors">
                  About L’Trave
                </a>
              </li>
              <li>
                <a href="#editorial-ethics" className="hover:text-blush-200 transition-colors">
                  Editorial Ethics
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blush-200 transition-colors">
                  Contact Curators
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-blush-200 transition-colors">
                  Careers & Fellowships
                </a>
              </li>
            </ul>
          </div>

          {/* Edition / Preferences Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cream/40">
              Edition & Region
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream/5 border border-cream/10 text-xs text-cream/80">
                <Globe className="w-3.5 h-3.5 text-mint-300" />
                <span>Global English (USD $)</span>
              </div>
              <p className="text-[11px] text-cream/50 leading-relaxed">
                Handcrafted with care in Zurich, Tokyo & Positano. Published quarterly in print and daily online.
              </p>
              
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={replayIntroLoader}
                  className="inline-flex items-center gap-2 text-xs font-medium text-cream/70 hover:text-blush-200 transition-colors text-left group"
                >
                  <Plane className="w-3.5 h-3.5 text-blush-200 group-hover:rotate-12 transition-transform" />
                  <span>Replay Flight Intro</span>
                </button>

                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 text-xs font-medium text-blush-200 hover:text-white transition-colors"
                >
                  <span>Return to top</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream/50">
          <p>© {new Date().getFullYear()} L’TRAVE Publishing Group Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-cream transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-cream transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
