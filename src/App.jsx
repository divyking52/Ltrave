import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DestinationFinder from './components/DestinationFinder';
import FeaturedDestinations from './components/FeaturedDestinations';
import TravelExperiences from './components/TravelExperiences';
import TripPlanner from './components/TripPlanner';
import TravelStories from './components/TravelStories';
import TravelJournal from './components/TravelJournal';
import VisualStorytelling from './components/VisualStorytelling';
import NewsletterCTA from './components/NewsletterCTA';
import Footer from './components/Footer';
import DestinationModal from './components/DestinationModal';
import SavedTripsDrawer from './components/SavedTripsDrawer';
import SearchModal from './components/SearchModal';
import StoryModal from './components/StoryModal';
import ArticleModal from './components/ArticleModal';
import Toast from './components/Toast';
import IntroLoader from './components/IntroLoader';

function MainLayout() {
  const { showIntroLoader, setShowIntroLoader } = useApp();

  return (
    <div className="relative min-h-screen text-[#29272A] font-sans selection:bg-blush-300 selection:text-charcoal overflow-x-hidden">
      {/* Cinematic Airplane Landing & Logo Intro Loader */}
      {showIntroLoader && (
        <IntroLoader onComplete={() => setShowIntroLoader(false)} />
      )}

      {/* Fixed Global 3D Silk Wave Background with generous overbleed */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -inset-x-[15%] -inset-y-[10%] w-[130%] h-[120%]">
          <img 
            src="/bg-wave.png" 
            alt="Background Wave" 
            className="w-full h-full object-cover object-top opacity-55 animate-wave-drift transform-gpu" 
          />
        </div>
        {/* Subtle warm wash overlay & edge feathering */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F4]/40 via-transparent to-[#FFF9F4]/40" />
        <div className="absolute inset-0 bg-[#FFF9F4]/70" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <main>
          <Hero />

          {/* Section 5: Interactive Destination Finder */}
          <DestinationFinder />

          {/* Section 6: Featured Destinations (Editorial Magazine Layout) */}
          <FeaturedDestinations />

          {/* Section 7: Travel Experiences */}
          <TravelExperiences />

          {/* Section 8: "Build Your Trip" 5-Step Interactive Planner */}
          <TripPlanner />

          {/* Section 9: Travel Stories ("Stories From The Road") */}
          <TravelStories />

          {/* Section 10: Travel Journal & Blog Field Guides */}
          <TravelJournal />

          {/* Section 11: Visual Storytelling, Passport Stamps & Audio Ambience */}
          <VisualStorytelling />

          {/* Section 12: Newsletter Subscription CTA */}
          <NewsletterCTA />
        </main>

        {/* Section 13: Footer */}
        <Footer />

        {/* Overlay Modals & Drawers */}
        <DestinationModal />
        <SavedTripsDrawer />
        <SearchModal />
        <StoryModal />
        <ArticleModal />
        <Toast />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
