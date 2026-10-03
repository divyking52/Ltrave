import React from 'react';
import { useApp } from '../context/AppContext';
import { travelStoriesData } from '../data/travelData';
import { Sparkles, ArrowRight, Quote, Clock, MapPin, Heart } from 'lucide-react';

export default function TravelStories() {
  const { setActiveStory } = useApp();

  const featuredStory = travelStoriesData[0]; // Mia Carter, Kyoto
  const secondaryStories = travelStoriesData.slice(1);

  return (
    <section id="stories" className="py-20 lg:py-28 bg-[#FFFDFB] relative overflow-hidden">
      {/* Background delicate glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-lavender-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 text-charcoal text-[11px] font-semibold uppercase tracking-widest">
            <Quote className="w-3 h-3 text-blush-400" />
            <span>Voices of Wanderers</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight">
            Stories From The Road
          </h2>

          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed font-normal">
            Intimate travel dispatches, serendipitous encounters, and the quiet moments that stay with you long after the journey ends.
          </p>
        </div>

        {/* Magazine Editorial Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Large Editorial Feature Story (Kyoto) */}
          <div 
            onClick={() => setActiveStory(featuredStory)}
            className="lg:col-span-7 bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500 cursor-pointer border border-lavender-100 flex flex-col justify-between group editorial-hover-lift"
          >
            {/* Story Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={featuredStory.coverImage}
                alt={featuredStory.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-charcoal shadow-xs">
                  Cover Essay
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-cream/90 uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5 text-blush-300" />
                  <span>{featuredStory.location}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  “{featuredStory.title}”
                </h3>
              </div>
            </div>

            {/* Story Body */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                {/* Pull Quote */}
                <p className="font-serif italic text-lg sm:text-xl text-charcoal/90 leading-snug border-l-2 border-blush-300 pl-4 py-1 mb-4">
                  {featuredStory.quote}
                </p>

                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-normal">
                  {featuredStory.excerpt}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-charcoal/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredStory.avatar}
                    alt={featuredStory.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <span className="font-serif font-bold text-sm text-charcoal block">
                      {featuredStory.author}
                    </span>
                    <span className="text-[11px] text-charcoal/50">
                      {featuredStory.date} • {featuredStory.readTime}
                    </span>
                  </div>
                </div>

                <button className="px-4 py-2 rounded-full bg-cream group-hover:bg-charcoal group-hover:text-cream text-charcoal text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Secondary Editorial Stories */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {secondaryStories.map((story) => (
              <div
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-soft-xl transition-all duration-500 cursor-pointer border border-lavender-100 flex flex-col sm:flex-row gap-5 group editorial-hover-lift"
              >
                {/* Thumbnail */}
                <div className="sm:w-36 aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 text-[9px] font-bold uppercase tracking-wider text-charcoal">
                    {story.location.split(',')[0]}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-charcoal/50 mb-1">
                      <span>{story.location}</span>
                      <span>•</span>
                      <span>{story.readTime}</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-charcoal leading-snug group-hover:text-blush-400 transition-colors">
                      {story.title}
                    </h4>

                    <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed mt-1">
                      {story.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-charcoal/5">
                    <div className="flex items-center gap-2">
                      <img
                        src={story.avatar}
                        alt={story.author}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-charcoal">
                        by {story.author}
                      </span>
                    </div>

                    <span className="text-xs text-charcoal/60 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Travel Community Submission Prompt Card */}
            <div className="bg-gradient-to-br from-lavender-100 via-cream to-blush-100 rounded-3xl p-6 border border-white shadow-soft flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">
                  Open Submissions
                </span>
                <h5 className="font-serif text-lg font-bold text-charcoal">
                  Have a story that changed you?
                </h5>
                <p className="text-xs text-charcoal/70">
                  Submit your travel dispatch for our upcoming print anthology.
                </p>
              </div>
              <button 
                onClick={() => alert("Thank you for your interest! Submissions for Volume 12 are open via submissions@ltrave.com")}
                className="px-4 py-2 rounded-full bg-charcoal text-cream text-xs font-semibold uppercase tracking-wider flex-shrink-0 hover:bg-charcoal/90 transition-colors shadow-xs"
              >
                Submit Story
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
