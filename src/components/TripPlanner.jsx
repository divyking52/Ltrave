import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { destinationsData } from '../data/travelData';
import { 
  Sparkles, Check, ArrowRight, ArrowLeft, Calendar, 
  DollarSign, MapPin, Compass, Bookmark, Printer, Share2, 
  Clock, Sun, Moon, Coffee, Heart 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TripPlanner() {
  const { saveCustomItinerary } = useApp();

  // Wizard Step (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Selections
  const [selectedDestination, setSelectedDestination] = useState(destinationsData[0].id);
  const [selectedStyle, setSelectedStyle] = useState('Relaxed & Slow');
  const [selectedDuration, setSelectedDuration] = useState('5 Days');
  const [selectedBudget, setSelectedBudget] = useState('Curated Comfort ($$$)');
  const [hasSavedCurrent, setHasSavedCurrent] = useState(false);

  // Available options
  const travelStyles = [
    {
      title: 'Relaxed & Slow',
      icon: '🌿',
      desc: 'Unrushed mornings, lingering meals, scenic strolls, and spa visits.'
    },
    {
      title: 'Cultural Deep-Dive',
      icon: '🏛️',
      desc: 'Ancient landmarks, historic artisans, local ceremonies, and museums.'
    },
    {
      title: 'Culinary Exploration',
      icon: '🍷',
      desc: 'Market walks, winery tastings, family trattorias, and cooking masterclasses.'
    },
    {
      title: 'Thrill & Outdoor',
      icon: '🧗‍♀️',
      desc: 'Mountain ascents, kayak adventures, sunrise trails, and wild vistas.'
    },
    {
      title: 'Luxury Pampering',
      icon: '✨',
      desc: 'Five-star cliffside suites, private boat charters, and bespoke dining.'
    }
  ];

  const durations = [
    { label: 'Weekend Escape', days: '3-4 Days', badge: 'Quick Refresh' },
    { label: 'Golden Week', days: '5-7 Days', badge: 'Recommended' },
    { label: 'Grand Voyage', days: '10-14 Days', badge: 'Complete Immersion' }
  ];

  const budgets = [
    {
      tier: 'Conscious Explorer ($$)',
      range: '$120 - $200 / day',
      desc: 'Charming boutique guesthouses, local trattorias, scenic rail passes.'
    },
    {
      tier: 'Curated Comfort ($$$)',
      range: '$250 - $450 / day',
      desc: 'Historic boutique hotels, private local guides, fine seasonal dining.'
    },
    {
      tier: 'Luxury & Splurge ($$$$)',
      range: '$600+ / day',
      desc: 'Five-star suites, private catamaran charters, Michelin-starred feasts.'
    }
  ];

  const currentDestObj = destinationsData.find(d => d.id === selectedDestination) || destinationsData[0];

  // Dynamically generate day-by-day itinerary
  const generateDynamicPlan = () => {
    const numDays = selectedDuration.includes('3-4') ? 4 : selectedDuration.includes('10-14') ? 7 : 5;
    
    const dayTemplates = [
      {
        day: 1,
        title: `Arrival & Gentle Acclimatization in ${currentDestObj.name}`,
        morning: `Private arrival transfer, check into boutique lodging with welcome tea & citrus granita`,
        afternoon: `Unpack, wander the surrounding stone lanes, orientation walk with local neighborhood map`,
        evening: `Sunset aperitivo on a scenic terrace overlooking the vista, intimate welcome dinner`,
        dining: `Trattoria / Izakaya chosen for slow home-style local ingredients`
      },
      {
        day: 2,
        title: `Signature Landmarks & Private ${selectedStyle} Highlights`,
        morning: `Early dawn exploration of ${currentDestObj.highlights[0] || 'iconic scenic viewpoint'} without crowds`,
        afternoon: `Bespoke artisanal experience: ${currentDestObj.highlights[1] || 'hands-on craft or cellar tasting'}`,
        evening: `Casual stroll under evening street lamps, artisanal dessert and nightcap`,
        dining: `Family-owned restaurant known for seasonal heritage recipes`
      },
      {
        day: 3,
        title: `Immersive Landscape & Secret Vantage Points`,
        morning: `Scenic journey into the countryside or coastal trail (${currentDestObj.highlights[2] || 'nature ridge hike'})`,
        afternoon: `Al fresco picnic lunch with regional cheeses, freshly baked breads, and local wine`,
        evening: `Relaxing thermal bath, mineral pool soak, or quiet library reading hour`,
        dining: `Chef's tasting menu celebrating local terroir and wild herbs`
      },
      {
        day: 4,
        title: `Artisans, Hidden Courtyards & Local Treasures`,
        morning: `Visit bustling morning produce and flower market, meet neighborhood bakers and cheese mongers`,
        afternoon: `Private boat ride or scenic rail pass to adjacent quiet historic hamlet`,
        evening: `Sunset rooftop cocktails with panoramic golden hour skyline views`,
        dining: `Seaside or riverfront table with fresh catch of the day`
      },
      {
        day: 5,
        title: `Reflective Farewell & Final Indulgences`,
        morning: `Slow morning coffee, journal writing on sunlit terrace, final stroll through favorite garden`,
        afternoon: `Curate bespoke souvenir keepsakes (olive oil, hand-thrown ceramics, artisanal textiles)`,
        evening: `Celebratory multi-course farewell dinner with vintage wine pairing`,
        dining: `Iconic destination restaurant with unforgettable panoramic views`
      },
      {
        day: 6,
        title: `Off-the-Beaten-Track Expedition`,
        morning: `Day trip to secluded neighboring villages hidden from mainstream itineraries`,
        afternoon: `Wild meadow walk or coastal cove swim in turquoise secluded water`,
        evening: `Cozy hearthside dinner listening to acoustic regional music`,
        dining: `Rustic mountain refuge or fishermen's cantina`
      },
      {
        day: 7,
        title: `Deep Rest & Golden Memories`,
        morning: `Gentle sunrise meditation or yoga overlooking the valleys`,
        afternoon: `Private spa treatment with botanical oils indigenous to the region`,
        evening: `Private candlelit dinner in an olive grove or ancient stone courtyard`,
        dining: `Intimate candlelit feast prepared by private in-villa chef`
      }
    ];

    return dayTemplates.slice(0, numDays);
  };

  const itineraryDays = generateDynamicPlan();

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
    if (currentStep === 4) {
      // Trigger festive celebratory confetti on reaching Step 5!
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#F6D9DC', '#D9F0E4', '#E2DDF5', '#F8EDC8', '#DCECF8']
        });
      } catch (err) {
        // ignore
      }
    }
  };

  const handleSaveItinerary = () => {
    const newItin = {
      id: `itin-${Date.now()}`,
      destinationId: currentDestObj.id,
      destinationName: currentDestObj.name,
      country: currentDestObj.country,
      image: currentDestObj.heroImage,
      style: selectedStyle,
      duration: selectedDuration,
      budget: selectedBudget,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      days: itineraryDays
    };

    saveCustomItinerary(newItin);
    setHasSavedCurrent(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F6D9DC', '#D9F0E4', '#E2DDF5', '#29272A']
      });
    } catch {}
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="planner" className="py-20 lg:py-28 bg-[#FFF9F4] relative overflow-hidden subtle-grain bg-topographic">
      {/* Background atelier ambient lighting */}
      <div className="absolute top-1/4 -right-10 w-[480px] h-[480px] bg-gradient-to-bl from-paleyellow-200/40 via-mint-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-10 -left-10 w-[450px] h-[450px] bg-gradient-to-tr from-blush-200/40 via-lavender-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-100 text-charcoal text-[11px] font-semibold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-mint-400" />
            <span>Interactive Itinerary Studio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight">
            Let's Build Your Perfect Escape
          </h2>

          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed font-normal">
            Follow our 5-step visual planner. Curate destination, vibe, pace, and comfort level to generate your bespoke travel journal.
          </p>
        </div>

        {/* 5-Step Progress Indicators */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-5 gap-2 sm:gap-4 relative">
            {[
              { num: '01', title: 'Destination' },
              { num: '02', title: 'Style' },
              { num: '03', title: 'Duration' },
              { num: '04', title: 'Budget' },
              { num: '05', title: 'Itinerary' }
            ].map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isPast = currentStep > stepNum;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(stepNum)}
                  className={`text-left p-2.5 sm:p-4 rounded-2xl transition-all duration-300 relative border ${
                    isActive
                      ? 'bg-charcoal text-cream shadow-soft border-charcoal'
                      : isPast
                      ? 'bg-mint-100 text-charcoal border-mint-200'
                      : 'bg-white/80 text-charcoal/60 border-charcoal/5 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                      Step {step.num}
                    </span>
                    {isPast && <Check className="w-3 h-3 text-mint-500" />}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold truncate">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wizard Main Content Container */}
        <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-6 sm:p-10 shadow-soft-xl border border-white">

          {/* STEP 1: CHOOSE DESTINATION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">Step 01: Choose Your Destination</h3>
                  <p className="text-xs text-charcoal/60">Select the landscape calling to your spirit right now.</p>
                </div>
                <span className="text-xs font-serif italic text-charcoal/50">1 of 5</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[460px] overflow-y-auto p-1 pr-2">
                {destinationsData.map((dest) => {
                  const isSelected = selectedDestination === dest.id;
                  return (
                    <div
                      key={dest.id}
                      onClick={() => setSelectedDestination(dest.id)}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] group transition-all duration-300 border-2 ${
                        isSelected
                          ? 'border-charcoal ring-4 ring-blush-200 scale-[1.02]'
                          : 'border-transparent hover:scale-[1.01]'
                      }`}
                    >
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                      
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-blush-300 text-charcoal flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase tracking-wider block opacity-90">{dest.country}</span>
                        <span className="font-serif text-base font-bold leading-tight block truncate">{dest.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE TRAVEL STYLE */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">Step 02: Choose Your Travel Style</h3>
                  <p className="text-xs text-charcoal/60">How would you like your days to unfold?</p>
                </div>
                <span className="text-xs font-serif italic text-charcoal/50">2 of 5</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {travelStyles.map((style) => {
                  const isSelected = selectedStyle === style.title;
                  return (
                    <div
                      key={style.title}
                      onClick={() => setSelectedStyle(style.title)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex items-start gap-4 ${
                        isSelected
                          ? 'bg-charcoal text-cream shadow-soft border-charcoal scale-[1.02]'
                          : 'bg-white/80 hover:bg-white text-charcoal border-charcoal/5'
                      }`}
                    >
                      <span className="text-3xl flex-shrink-0">{style.icon}</span>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-serif text-base font-bold">{style.title}</h4>
                          {isSelected && <Check className="w-4 h-4 text-blush-200" />}
                        </div>
                        <p className={`text-xs leading-relaxed ${isSelected ? 'text-cream/80' : 'text-charcoal/65'}`}>
                          {style.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE DURATION */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">Step 03: Choose Duration</h3>
                  <p className="text-xs text-charcoal/60">How long can you unplug and immerse?</p>
                </div>
                <span className="text-xs font-serif italic text-charcoal/50">3 of 5</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {durations.map((dur) => {
                  const isSelected = selectedDuration === dur.days;
                  return (
                    <div
                      key={dur.days}
                      onClick={() => setSelectedDuration(dur.days)}
                      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border text-center flex flex-col justify-between items-center ${
                        isSelected
                          ? 'bg-blush-300 text-charcoal shadow-soft border-blush-400 scale-[1.03]'
                          : 'bg-white/80 hover:bg-white text-charcoal border-charcoal/5'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/70 mb-3">
                        {dur.badge}
                      </span>
                      <Calendar className="w-8 h-8 mb-2 opacity-80" />
                      <h4 className="font-serif text-2xl font-bold mb-1">{dur.days}</h4>
                      <p className="text-xs opacity-75">{dur.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: CHOOSE BUDGET */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">Step 04: Choose Budget Comfort</h3>
                  <p className="text-xs text-charcoal/60">Set your preferred level of indulgence.</p>
                </div>
                <span className="text-xs font-serif italic text-charcoal/50">4 of 5</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {budgets.map((b) => {
                  const isSelected = selectedBudget === b.tier;
                  return (
                    <div
                      key={b.tier}
                      onClick={() => setSelectedBudget(b.tier)}
                      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                        isSelected
                          ? 'bg-mint-300 text-charcoal shadow-soft border-mint-400 scale-[1.03]'
                          : 'bg-white/80 hover:bg-white text-charcoal border-charcoal/5'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <DollarSign className="w-5 h-5 opacity-80" />
                          {isSelected && <Check className="w-4 h-4 text-charcoal" />}
                        </div>
                        <h4 className="font-serif text-lg font-bold mb-1">{b.tier.split('(')[0]}</h4>
                        <span className="text-xs font-semibold block text-charcoal/70 mb-2">{b.range}</span>
                        <p className="text-xs text-charcoal/65 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: GENERATED BESPOKE ITINERARY */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-fadeIn" id="printable-itinerary">
              
              {/* Top Banner Card */}
              <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-blush-200 via-paleyellow-100 to-mint-200 border border-white shadow-soft">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-charcoal text-[11px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-paleyellow-400" />
                      <span>Bespoke Dossier N° {Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold">
                      Your Journey: {currentDestObj.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/75 max-w-xl">
                      A {selectedDuration} journey styled around <span className="font-semibold">{selectedStyle}</span> with {selectedBudget.split('(')[0]}.
                    </p>
                  </div>

                  {/* Actions: Save & Print */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSaveItinerary}
                      disabled={hasSavedCurrent}
                      className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                        hasSavedCurrent
                          ? 'bg-charcoal text-cream opacity-80 cursor-default'
                          : 'bg-charcoal text-cream hover:bg-charcoal/90 hover:scale-105 active:scale-95 shadow-soft'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${hasSavedCurrent ? 'fill-cream' : ''}`} />
                      <span>{hasSavedCurrent ? 'Saved in Journal' : 'Save Itinerary'}</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="p-3 rounded-full bg-white hover:bg-cream text-charcoal shadow-soft border border-charcoal/10 transition-colors"
                      title="Print or Save as PDF"
                      aria-label="Print itinerary"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="space-y-4">
                <h4 className="font-serif text-2xl text-charcoal flex items-center gap-2">
                  <span>Day-by-Day Itinerary</span>
                  <span className="text-xs font-sans font-medium text-charcoal/50">({itineraryDays.length} Days Planned)</span>
                </h4>

                <div className="space-y-4">
                  {itineraryDays.map((dayItem) => (
                    <div
                      key={dayItem.day}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-lavender-200/50 shadow-xs hover:shadow-soft transition-all"
                    >
                      <div className="flex items-start sm:items-center justify-between gap-4 border-b border-charcoal/5 pb-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-blush-200 text-charcoal font-serif font-bold text-sm flex items-center justify-center">
                            {dayItem.day}
                          </span>
                          <h5 className="font-serif text-lg font-bold text-charcoal">
                            {dayItem.title}
                          </h5>
                        </div>
                        <span className="text-[11px] uppercase font-semibold text-charcoal/50 whitespace-nowrap">
                          Day {dayItem.day}
                        </span>
                      </div>

                      {/* Day schedule points */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="flex items-start gap-2.5">
                          <Sun className="w-4 h-4 text-paleyellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-charcoal/70 uppercase text-[10px] block">Morning</span>
                            <p className="text-charcoal/80 leading-relaxed">{dayItem.morning}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-mint-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-charcoal/70 uppercase text-[10px] block">Afternoon</span>
                            <p className="text-charcoal/80 leading-relaxed">{dayItem.afternoon}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Moon className="w-4 h-4 text-lavender-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-charcoal/70 uppercase text-[10px] block">Evening Dining</span>
                            <p className="text-charcoal/80 leading-relaxed">{dayItem.evening}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Tips & Packing Checklist Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-paleyellow-50 rounded-2xl p-5 border border-paleyellow-200">
                  <h5 className="font-serif text-lg font-bold text-charcoal mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-paleyellow-400" />
                    <span>Insider Local Advice</span>
                  </h5>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    {currentDestObj.curatedTips}
                  </p>
                </div>

                <div className="bg-mint-50 rounded-2xl p-5 border border-mint-200">
                  <h5 className="font-serif text-lg font-bold text-charcoal mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-mint-400" />
                    <span>Packing Checklist</span>
                  </h5>
                  <ul className="text-xs text-charcoal/75 space-y-1">
                    {currentDestObj.packingMustHaves.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

          {/* Navigation Controls: Back / Next */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-charcoal/10">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-charcoal/70 hover:text-charcoal hover:bg-cream border border-charcoal/10 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-charcoal text-cream hover:bg-charcoal/90 shadow-soft hover:shadow-soft-lg active:scale-95 transition-all flex items-center gap-2 group"
              >
                <span>Continue to Step 0{currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-charcoal/70 hover:text-charcoal hover:bg-cream border border-charcoal/10 transition-colors"
              >
                Create Another Itinerary
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
