import React, { createContext, useContext, useState, useEffect } from 'react';
import { destinationsData } from '../data/travelData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Saved trips stored in localStorage
  const [savedTripIds, setSavedTripIds] = useState(() => {
    try {
      const local = localStorage.getItem('ltrave_saved_trips');
      return local ? JSON.parse(local) : ['amalfi-coast', 'kyoto'];
    } catch {
      return ['amalfi-coast', 'kyoto'];
    }
  });

  // Custom planned itineraries from the builder
  const [customItineraries, setCustomItineraries] = useState(() => {
    try {
      const local = localStorage.getItem('ltrave_custom_itineraries');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  // Modal and drawer visibility
  const [activeDestination, setActiveDestination] = useState(null);
  const [activeStory, setActiveStory] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Intro flight loading animation
  const [showIntroLoader, setShowIntroLoader] = useState(true);
  const replayIntroLoader = () => setShowIntroLoader(true);

  // Sync saved trips to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ltrave_saved_trips', JSON.stringify(savedTripIds));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [savedTripIds]);

  // Sync custom itineraries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ltrave_custom_itineraries', JSON.stringify(customItineraries));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [customItineraries]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleSaveTrip = (id) => {
    setSavedTripIds(prev => {
      const exists = prev.includes(id);
      const dest = destinationsData.find(d => d.id === id);
      const name = dest ? dest.name : 'Destination';

      if (exists) {
        showToast(`Removed ${name} from your saved journal`, 'default');
        return prev.filter(item => item !== id);
      } else {
        showToast(`Saved ${name} to your travel journal ✨`, 'success');
        return [...prev, id];
      }
    });
  };

  const isSaved = (id) => savedTripIds.includes(id);

  const saveCustomItinerary = (itinerary) => {
    setCustomItineraries(prev => [itinerary, ...prev]);
    showToast(`Bespoke itinerary saved for ${itinerary.destinationName}! ✈️`, 'success');
  };

  const removeCustomItinerary = (id) => {
    setCustomItineraries(prev => prev.filter(item => item.id !== id));
    showToast(`Itinerary removed`, 'default');
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Keyboard shortcut listener (Cmd/Ctrl + K to open search, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsSavedDrawerOpen(false);
        setActiveDestination(null);
        setActiveStory(null);
        setActiveArticle(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        savedTripIds,
        customItineraries,
        toggleSaveTrip,
        isSaved,
        saveCustomItinerary,
        removeCustomItinerary,
        activeDestination,
        setActiveDestination,
        activeStory,
        setActiveStory,
        activeArticle,
        setActiveArticle,
        isSearchOpen,
        setIsSearchOpen,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        toast,
        showToast,
        scrollToSection,
        showIntroLoader,
        setShowIntroLoader,
        replayIntroLoader
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
