import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { journalArticlesData } from '../data/travelData';
import { BookOpen, Sparkles, ArrowRight, Clock, Calendar, Tag } from 'lucide-react';

export default function TravelJournal() {
  const { setActiveArticle } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Travel Guides',
    'Budget Travel',
    'Hidden Gems',
    'Food',
    'Photography',
    'Tips & Hacks'
  ];

  const filteredArticles = selectedCategory === 'All'
    ? journalArticlesData
    : journalArticlesData.filter(a => a.category === selectedCategory);

  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
  const gridArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

  return (
    <section id="journal" className="py-20 lg:py-28 bg-[#FFF9F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paleyellow-100 text-charcoal text-[11px] font-semibold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5 text-paleyellow-500" />
              <span>The Editorial Dispatch</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight">
              Travel Journal & Field Guides
            </h2>

            <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed font-normal">
              Practical guides, secret addresses, culinary dispatches, and contemplative essays curated by our international team of travel writers.
            </p>
          </div>

          {/* Category Badges Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 border border-lavender-200/60 shadow-xs self-start md:self-end overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-cream shadow-xs'
                    : 'text-charcoal/70 hover:text-charcoal hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Magazine Article Showcase (if available) */}
        {featuredArticle && (
          <div
            onClick={() => setActiveArticle(featuredArticle)}
            className="mb-12 group bg-white rounded-[2.5rem] overflow-hidden shadow-soft-lg hover:shadow-soft-xl transition-all duration-500 cursor-pointer border border-lavender-100 grid grid-cols-1 lg:grid-cols-12 editorial-hover-lift"
          >
            {/* Image Column */}
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full bg-paleyellow-200 text-charcoal text-[11px] font-bold uppercase tracking-wider shadow-xs">
                  ★ Featured Editorial
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/50 uppercase tracking-widest">
                  <span className="px-2.5 py-0.5 rounded-md bg-lavender-100 text-charcoal">
                    {featuredArticle.category}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal leading-tight group-hover:text-blush-400 transition-colors">
                  {featuredArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-normal">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-charcoal/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-charcoal block">
                    {featuredArticle.author}
                  </span>
                  <span className="text-[11px] text-charcoal/50">
                    {featuredArticle.date}
                  </span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Smaller Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500 cursor-pointer border border-lavender-100 flex flex-col justify-between group editorial-hover-lift"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/90 text-charcoal text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-charcoal/50">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-charcoal leading-snug group-hover:text-blush-400 transition-colors line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-charcoal/5 text-xs">
                <span className="text-charcoal/60 font-medium">By {article.author}</span>
                <span className="font-semibold text-charcoal group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
