import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { experiencesData } from '../data/travelData';
import { Sparkles, ArrowRight, Compass, CheckCircle2 } from 'lucide-react';

export default function TravelExperiences() {
  const { scrollToSection } = useApp();
  const [activeExp, setActiveExp] = useState(experiencesData[0]);

  return (
    <section id="experiences" className="py-20 lg:py-28 bg-[#FFFDFB] relative overflow-hidden">
      {/* Soft decorative background circles */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-mint-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blush-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paleyellow-100 text-charcoal text-[11px] font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-paleyellow-400" />
            <span>Curated Themes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight">
            Travel Your Way
          </h2>

          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed font-normal">
            Whether you crave the slow serenity of Aegean beaches, high-altitude alpine ridges, or centuries-old culinary secrets, let your passion guide your next chapter.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiencesData.map((exp, idx) => (
            <div
              key={exp.id}
              onMouseEnter={() => setActiveExp(exp)}
              className="group relative rounded-[2rem] overflow-hidden bg-white shadow-soft hover:shadow-soft-xl transition-all duration-500 border border-lavender-100 flex flex-col justify-between cursor-pointer editorial-hover-lift"
            >
              {/* Card Image Container with gentle hover zoom */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-70" />

                {/* Top Badge: Experience Icon + Title */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                    <span className="text-base">{exp.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      {exp.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-charcoal/80">
                    {exp.count}
                  </span>
                </div>

                {/* Subtitle bottom left on image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-serif text-lg font-bold leading-tight drop-shadow-xs">
                    {exp.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Pastel Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Signature Spots Pill List */}
                <div className="space-y-2 pt-2 border-t border-charcoal/5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal/50 block">
                    Signature Destinations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.popularSpots.map((spot, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-lg ${exp.tagBg} border border-charcoal/5`}
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection('destinations')}
                    className="w-full py-2.5 rounded-xl bg-cream group-hover:bg-charcoal group-hover:text-cream text-charcoal font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 border border-lavender-200/60"
                  >
                    <span>Explore {exp.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
