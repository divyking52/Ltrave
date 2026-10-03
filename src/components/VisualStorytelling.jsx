import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MapPin, Stamp, Volume2, VolumeX, Heart, Compass, Check } from 'lucide-react';

export default function VisualStorytelling() {
  const { showToast } = useApp();
  const [stampedList, setStampedList] = useState(['amalfi', 'kyoto']);
  const [ambientActive, setAmbientActive] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  // Digital Passport Stamps
  const passportStamps = [
    { id: 'amalfi', place: 'Amalfi Coast', code: 'IT-AMF', date: 'EST. 1928', color: 'border-blush-400 text-blush-400' },
    { id: 'kyoto', place: 'Kyoto Sanctuary', code: 'JP-KYO', date: 'EST. 794', color: 'border-mint-400 text-mint-400' },
    { id: 'santorini', place: 'Santorini Caldera', code: 'GR-SAN', date: 'EST. 1956', color: 'border-babyblue-400 text-babyblue-400' },
    { id: 'cappadocia', place: 'Cappadocia Dawn', code: 'TR-CAP', date: 'EST. 1985', color: 'border-paleyellow-400 text-paleyellow-400' },
    { id: 'swiss', place: 'Swiss Alps', code: 'CH-ALP', date: 'EST. 1865', color: 'border-lavender-400 text-lavender-400' },
    { id: 'bali', place: 'Bali Island', code: 'ID-DPS', date: 'EST. 1970', color: 'border-mint-400 text-mint-400' }
  ];

  const handleStamp = (id, name) => {
    if (stampedList.includes(id)) {
      setStampedList(prev => prev.filter(item => item !== id));
      showToast(`Removed ${name} stamp`, 'default');
    } else {
      setStampedList(prev => [...prev, id]);
      showToast(`Collected passport stamp for ${name}! ✈️`, 'success');
    }
  };

  // Ambient sound generator using Web Audio API (Serene Ocean Breeze / Chime)
  const toggleAmbientSound = () => {
    if (!ambientActive) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        
        // Generate gentle warm soothing noise
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02; // pinkish gentle wave noise
          lastOut = output[i];
          output[i] *= 0.12; // gentle volume
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        whiteNoise.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        setAudioContext({ ctx, whiteNoise, gainNode });
        setAmbientActive(true);
        showToast('Serene coastal ambience playing 🌊', 'info');
      } catch (e) {
        setAmbientActive(true);
        showToast('Serene ambience mode active', 'info');
      }
    } else {
      if (audioContext && audioContext.ctx) {
        try {
          audioContext.ctx.close();
        } catch {}
      }
      setAudioContext(null);
      setAmbientActive(false);
      showToast('Ambience muted', 'default');
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFFDFB] border-y border-lavender-200/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Ambient Sound Toggle Pill */}
        <div className="flex justify-center mb-12">
          <button
            onClick={toggleAmbientSound}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 border ${
              ambientActive
                ? 'bg-charcoal text-cream border-charcoal shadow-soft'
                : 'bg-white/80 hover:bg-white text-charcoal/70 border-lavender-200/60 shadow-xs'
            }`}
          >
            {ambientActive ? (
              <>
                <Volume2 className="w-4 h-4 text-blush-300 animate-pulse" />
                <span>Coastal Ambience Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-charcoal/50" />
                <span>Enable Serene Audio Ambience</span>
              </>
            )}
          </button>
        </div>

        {/* Two-Column Section: Left Editorial Quote & Right Collectible Passport Stamps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Editorial Philosophical Solace */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/50">
              The Philosophy of Travel
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight">
              “The real voyage of discovery consists not in seeking new landscapes, but in having{' '}
              <span className="italic underline decoration-blush-300 decoration-wavy">
                new eyes
              </span>.”
            </h3>

            <p className="font-handwriting text-2xl text-charcoal/70">
              — Marcel Proust, In Search of Lost Time
            </p>

            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-normal">
              At L’Trave, we believe in travel that enriches the spirit rather than drains the destination. We champion slow journeys, respect for ancient heritage, and leaving every place even more poetic than you found it.
            </p>

            {/* Travel route ribbon mockup */}
            <div className="p-4 rounded-2xl bg-cream border border-lavender-200/60 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blush-400" />
                <span className="font-serif font-bold text-charcoal">Positano</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-charcoal/20 mx-2 relative">
                <Compass className="w-3.5 h-3.5 text-charcoal/40 absolute -top-2 left-1/2 -translate-x-1/2" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-mint-400" />
                <span className="font-serif font-bold text-charcoal">Kyoto</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-charcoal/20 mx-2" />
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-paleyellow-400" />
                <span className="font-serif font-bold text-charcoal">Santorini</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Passport Stamps Album */}
          <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-6 sm:p-8 border border-lavender-100 shadow-soft-lg">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-charcoal/10">
              <div className="flex items-center gap-2">
                <Stamp className="w-5 h-5 text-charcoal" />
                <h4 className="font-serif text-xl font-bold text-charcoal">
                  Your Wanderer's Passport
                </h4>
              </div>
              <span className="text-xs text-charcoal/60 font-serif italic">
                {stampedList.length} of {passportStamps.length} Collected
              </span>
            </div>

            <p className="text-xs text-charcoal/65 mb-6">
              Click any stamp to collect or uncollect destinations from your personal digital travel dossier:
            </p>

            {/* Stamps Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {passportStamps.map((stamp) => {
                const isCollected = stampedList.includes(stamp.id);
                return (
                  <button
                    key={stamp.id}
                    onClick={() => handleStamp(stamp.id, stamp.place)}
                    className={`p-4 rounded-2xl border-2 border-dashed transition-all duration-300 relative text-center flex flex-col justify-between items-center min-h-[110px] ${
                      isCollected
                        ? `${stamp.color} bg-white shadow-soft scale-[1.03] rotate-[1deg]`
                        : 'border-charcoal/15 bg-cream/40 opacity-40 hover:opacity-80 hover:border-charcoal/30'
                    }`}
                  >
                    <span className="text-[10px] font-mono tracking-widest uppercase block">
                      {stamp.code}
                    </span>

                    <span className="font-serif text-xs font-bold leading-tight my-1 text-charcoal">
                      {stamp.place}
                    </span>

                    <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-charcoal/50">
                      {isCollected ? (
                        <>
                          <Check className="w-3 h-3 text-mint-500" />
                          <span>STAMPED</span>
                        </>
                      ) : (
                        <span>CLICK TO STAMP</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-charcoal/5 text-center">
              <span className="text-[11px] text-charcoal/50 font-handwriting text-lg">
                “Collect moments, quiet vistas, and fragrant mornings…”
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
