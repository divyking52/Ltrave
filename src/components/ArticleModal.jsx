import React from 'react';
import { useApp } from '../context/AppContext';
import { X, BookOpen, Clock, Calendar, Share2, Tag, ArrowRight } from 'lucide-react';

export default function ArticleModal() {
  const { activeArticle, setActiveArticle, showToast } = useApp();

  if (!activeArticle) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setActiveArticle(null)}
      />

      <div className="relative w-full max-w-3xl bg-[#FFFDFB] rounded-[2.5rem] shadow-soft-xl border border-white overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:px-8 border-b border-lavender-200/50 bg-cream/90 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            <BookOpen className="w-4 h-4 text-paleyellow-500" />
            <span>Field Dispatch • {activeArticle.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-white text-charcoal/70 hover:text-charcoal transition-colors"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveArticle(null)}
              className="p-2 rounded-full hover:bg-white text-charcoal transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 flex-1">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/50 uppercase tracking-widest">
              <span className="px-2.5 py-0.5 rounded-md bg-lavender-100 text-charcoal">
                {activeArticle.category}
              </span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
              {activeArticle.title}
            </h2>

            <p className="text-sm sm:text-base text-charcoal/70 font-serif italic">
              {activeArticle.subtitle}
            </p>
          </div>

          {/* Article Image */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-soft">
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
            <p className="font-medium text-charcoal text-base sm:text-lg">
              {activeArticle.excerpt}
            </p>

            {activeArticle.content && activeArticle.content.map((para, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-charcoal/5">
                <p className="text-charcoal/80 text-sm leading-relaxed">{para}</p>
              </div>
            ))}
          </div>

          {/* Author Footnote */}
          <div className="pt-6 border-t border-charcoal/10 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-charcoal/50 block">Written by</span>
              <span className="font-serif font-bold text-base text-charcoal">{activeArticle.author}</span>
            </div>

            <span className="text-xs text-charcoal/50 italic font-serif">
              Published in L'Trave Journal Edition
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
