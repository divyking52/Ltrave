import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Globe } from 'lucide-react';

export default function IntroLoader({ onComplete }) {
  const [phase, setPhase] = useState('flying'); // 'flying' -> 'impact' -> 'fading' -> 'done'
  const [subStatus, setSubStatus] = useState('Approaching Runway...');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Stage 1a: Approach & entry into orbit around logo (0s -> 0.95s)
    const orbitTextTimer = setTimeout(() => {
      setSubStatus('Revolving Around L’Trave...');
    }, 950);

    // Stage 1b: Complete revolution & strike logo (2.8s)
    const impactTimer = setTimeout(() => {
      setPhase('impact');
      setSubStatus('Welcome to L’Trave');

      // Trigger celebratory impact sparkles & pastel dust
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { x: 0.5, y: 0.46 },
          colors: ['#F6D9DC', '#F9D5CA', '#E2DDF5', '#DCECF8', '#F8EDC8', '#D9F0E4'],
          ticks: 140,
          gravity: 0.65,
          scalar: 1,
        });
      } catch (e) {
        console.warn('Confetti error', e);
      }

      // Stage 2: Logo illuminates & glows (2.8s -> 3.9s)
      const fadeTimer = setTimeout(() => {
        setPhase('fading');

        // Stage 3: Smooth exit unveil (3.9s -> 4.5s)
        const doneTimer = setTimeout(() => {
          setPhase('done');
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 650);

        return () => clearTimeout(doneTimer);
      }, 1100);

      return () => clearTimeout(fadeTimer);
    }, 2800);

    return () => {
      clearTimeout(orbitTextTimer);
      clearTimeout(impactTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('fading');
    setTimeout(() => {
      setPhase('done');
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF9F4] subtle-grain overflow-hidden transition-all duration-700 ${
        phase === 'fading' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 46%, rgba(249, 213, 202, 0.5) 0%, transparent 60%),
          radial-gradient(circle at 15% 85%, rgba(226, 221, 245, 0.4) 0%, transparent 50%),
          #FFF9F4
        `
      }}
    >
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-white/85 hover:bg-white text-charcoal/70 hover:text-charcoal text-xs font-semibold uppercase tracking-wider border border-charcoal/10 shadow-xs hover:shadow-md transition-all z-50 cursor-pointer backdrop-blur-sm"
      >
        Skip Intro
      </button>

      {/* Centerpiece Stage Container */}
      <div className="relative flex flex-col items-center justify-center p-4">
        
        {/* Radial Sunburst / Impact Aura Halo */}
        <div
          className={`absolute w-[460px] sm:w-[580px] h-[460px] sm:h-[580px] rounded-full sunset-glow-aura pointer-events-none transition-all duration-700 ${
            phase === 'impact'
              ? 'scale-125 opacity-100'
              : phase === 'flying'
              ? 'scale-90 opacity-40 animate-orbit-halo'
              : 'scale-150 opacity-0'
          }`}
        />

        {/* Concentric Shockwave Rings on Airplane Impact */}
        {phase === 'impact' && (
          <>
            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blush-300 via-sunset-apricot to-paleyellow-200 animate-ping pointer-events-none opacity-75" />
            <div
              className="absolute w-56 h-56 rounded-full border-2 border-[#E28A7A]/60 animate-ping pointer-events-none opacity-50"
              style={{ animationDuration: '1.2s' }}
            />
            <div
              className="absolute w-80 h-80 rounded-full border border-lavender-400/40 animate-ping pointer-events-none opacity-40"
              style={{ animationDuration: '1.6s' }}
            />
          </>
        )}

        {/* The Official L'Trave Logo Image */}
        <div
          className={`relative z-20 transition-all duration-700 transform ${
            phase === 'flying'
              ? 'opacity-40 scale-95 filter blur-[1px]'
              : phase === 'impact'
              ? 'animate-impact-bloom opacity-100 scale-100'
              : 'opacity-100 scale-100'
          }`}
        >
          <img
            src="/logo-transparent.png"
            alt="L'Trave — Go Somewhere Beautiful"
            className="w-[300px] sm:w-[420px] md:w-[480px] h-auto object-contain drop-shadow-sm"
          />
        </div>

        {/* Loading status & journal prompt */}
        <div className="mt-8 flex flex-col items-center space-y-2 relative z-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-charcoal/70 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-charcoal/10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E28A7A] animate-spin" style={{ animationDuration: '6s' }} />
            <span>{subStatus}</span>
          </div>

          <p className="font-handwriting text-2xl sm:text-3xl text-charcoal/80 animate-pulse pt-1">
            “Go somewhere beautiful…”
          </p>
        </div>

      </div>

      {/* SVG Canvas for Flight Path, Orbit & Supersonic Airplane */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glowing gradients for the contrail and airplane */}
          <linearGradient id="orbitContrailGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9D5CA" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#E28A7A" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#E2DDF5" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#F8EDC8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E28A7A" stopOpacity="1" />
          </linearGradient>

          <filter id="trailBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient feathered underglow along the orbit path */}
        <path
          d="M -40,1040 C 140,880 340,600 500,600 C 640,600 740,540 740,460 C 740,380 640,320 500,320 C 360,320 260,380 260,460 C 260,540 360,600 500,600 C 590,600 580,500 500,460"
          fill="none"
          stroke="#F9D5CA"
          strokeWidth="10"
          strokeOpacity="0.35"
          filter="url(#trailBlur)"
          className="animate-flight-trail"
        />

        {/* The Master Flight & Orbit Contrail Path */}
        <path
          id="flightOrbitPath"
          d="M -40,1040 C 140,880 340,600 500,600 C 640,600 740,540 740,460 C 740,380 640,320 500,320 C 360,320 260,380 260,460 C 260,540 360,600 500,600 C 590,600 580,500 500,460"
          fill="none"
          stroke="url(#orbitContrailGlow)"
          strokeWidth="3.2"
          strokeDasharray="8 6"
          strokeLinecap="round"
          className="animate-flight-trail"
          filter="url(#trailBlur)"
        />

        {/* The Flying Airplane following the 360-degree Orbit */}
        {phase === 'flying' && (
          <g>
            <animateMotion
              dur="2.8s"
              repeatCount="1"
              rotate="auto"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 0.33; 0.90; 1"
              keySplines="0.25 0.1 0.25 1; 0.38 0 0.52 1; 0.25 0.1 0.25 1"
            >
              <mpath href="#flightOrbitPath" xlinkHref="#flightOrbitPath" />
            </animateMotion>

            {/* Supersonic Luxury Jet Group */}
            <g transform="scale(1.2)">
              {/* Thruster exhaust flame trail behind airplane */}
              <path d="M -18,0 L -36,0" stroke="#F9D5CA" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
              <circle cx="-24" cy="0" r="3" fill="#E28A7A" opacity="0.9" />
              <circle cx="-32" cy="0" r="2.2" fill="#F8EDC8" opacity="0.8" />
              <circle cx="-40" cy="0" r="1.5" fill="#FFF9F4" opacity="0.7" />

              {/* Shadow underneath airplane */}
              <ellipse cx="2" cy="7" rx="18" ry="6" fill="rgba(41, 39, 42, 0.18)" filter="url(#trailBlur)" />

              {/* Main Fuselage Body */}
              <path
                d="M 22,0 C 16,-2 10,-3.5 0,-3.5 L -8,-3.5 L -16,-2 L -18,-1 L -18,1 L -16,2 L -8,3.5 L 0,3.5 C 10,3.5 16,2 22,0 Z"
                fill="#29272A"
              />

              {/* Main Swept Wings */}
              <path
                d="M 4,-3.5 L -6,-24 L -10,-24 L -6,-3.5 L -6,3.5 L -10,24 L -6,24 L 4,3.5 Z"
                fill="#29272A"
              />

              {/* Wing Engine Pods */}
              <rect x="-8" y="-12" width="10" height="3" rx="1.5" fill="#E28A7A" />
              <rect x="-8" y="9" width="10" height="3" rx="1.5" fill="#E28A7A" />

              {/* Tail Horizontal Stabilizers */}
              <path
                d="M -13,-1 L -17,-10 L -20,-10 L -17,-1 L -17,1 L -20,10 L -17,10 L -13,1 Z"
                fill="#29272A"
              />

              {/* Golden Cockpit Glass Windshield */}
              <path d="M 12,-1.5 C 15,-1 17,0 17,0 C 17,0 15,1 12,1.5 Z" fill="#F8EDC8" />

              {/* Wingtip Navigation Strobe Lights */}
              <circle cx="-8" cy="-23" r="1.5" fill="#E28A7A" />
              <circle cx="-8" cy="23" r="1.5" fill="#78C4CD" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
