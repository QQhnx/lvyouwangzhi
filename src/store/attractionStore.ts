import { create } from 'zustand';
import { Attraction, Season, GuideCategory } from '../types';
import { attractions as attractionsData } from '../data/attractions';
import { seasons as seasonsData } from '../data/seasons';

interface AttractionState {
  attractions: Attraction[];
  currentAttraction: Attraction | null;
  seasons: Season[];
  currentSeason: Season;
  selectedCategory: GuideCategory | null;
  isMapOpen: boolean;
  
  setCurrentAttraction: (id: string) => void;
  setCurrentSeason: (seasonId: Season['id']) => void;
  setSelectedCategory: (category: GuideCategory | null) => void;
  toggleMap: () => void;
}

export const useAttractionStore = create<AttractionState>((set, get) => ({
  attractions: attractionsData,
  currentAttraction: null,
  seasons: seasonsData,
  currentSeason: seasonsData[0],
  selectedCategory: null,
  isMapOpen: false,
  
  setCurrentAttraction: (id) => {
    const attraction = get().attractions.find(a => a.id === id);
    set({ currentAttraction: attraction || null });
  },
  
  setCurrentSeason: (seasonId) => {
    const season = get().seasons.find(s => s.id === seasonId);
    if (season) {
      set({ currentSeason: season });
    }
  },
  
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
  
  toggleMap: () => {
    set(state => ({ isMapOpen: !state.isMapOpen }));
  },
}));
