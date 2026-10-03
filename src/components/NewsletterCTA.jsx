import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Sparkles, Check, Heart, Mail, Plane } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function NewsletterCTA() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setSubscribed(true);
    showToast('Welcome to L’Trave! Your first journal is en route ✉️', 'success');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#F6D9DC', '#E2DDF5', '#DCECF8', '#F8EDC8']
      });
    } catch {}
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFF9F4] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Pastel Sunset Gradient Container */}
        <div className="relative rounded-[3rem] p-8 sm:p-14 lg:p-20 bg-gradient-to-tr from-[#F9D5CA] via-lavender-200 to-[#D4EEF2] shadow-soft-xl border border-white text-center overflow-hidden">
          
          {/* Subtle fluid wave backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
            <img src="/bg-wave.png" alt="" className="w-full h-full object-cover" />
          </div>

          {/* Subtle logo watermark in background */}
          <div className="absolute -bottom-10 -right-10 w-72 h-auto opacity-10 pointer-events-none rotate-[-6deg]">
            <img src="/logo-transparent.png" alt="" className="w-full h-auto" />
          </div>

          {/* Subtle decorative background illustrations / floating stamps */}
          <div className="absolute top-6 left-8 stamp-border p-3 rounded-2xl bg-white/40 rotate-[-12deg] hidden sm:block pointer-events-none">
            <Plane className="w-5 h-5 text-charcoal/40" />
          </div>
          <div className="absolute bottom-8 right-10 stamp-border p-3 rounded-2xl bg-white/40 rotate-[14deg] hidden sm:block pointer-events-none">
            <Mail className="w-5 h-5 text-charcoal/40" />
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-charcoal text-xs font-semibold uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blush-400" />
              <span>Weekly Sunday Dispatch</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight font-bold">
              Your Next Adventure Starts Here.
            </h2>

            {/* Supporting Text */}
            <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              Get inspiring destinations, travel guides, hidden gems, and exclusive trip ideas delivered to your inbox every Sunday morning.
            </p>

            {/* Input Form */}
            {!subscribed ? (
              <form 
                onSubmit={handleSubmit}
                className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-5 py-4 rounded-full bg-white/95 text-charcoal text-sm placeholder:text-charcoal/45 focus:outline-hidden focus:ring-2 focus:ring-charcoal shadow-soft border border-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-charcoal text-cream hover:bg-charcoal/90 active:scale-95 text-xs font-semibold uppercase tracking-wider shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>Join <span className="font-brand text-sm normal-case tracking-normal">L<span className="text-blush-300 font-serif">’</span>Trave</span></span>
                  <Send className="w-3.5 h-3.5 text-blush-200" />
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md max-w-md mx-auto shadow-soft animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-mint-200 text-charcoal flex items-center justify-center mx-auto mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-charcoal">
                  You are officially part of the <span className="font-brand font-medium">L<span className="text-[#E28A7A]">’</span>Trave</span> circle!
                </h4>
                <p className="text-xs text-charcoal/70 mt-1">
                  We just sent an introductory field guide to <span className="font-semibold">{email}</span>.
                </p>
              </div>
            )}

            {/* Privacy note */}
            <p className="text-[11px] text-charcoal/60 pt-2">
              No spam, ever. Unsubscribe with one click anytime. Read our{' '}
              <span className="underline cursor-pointer hover:text-charcoal">Privacy Promise</span>.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
