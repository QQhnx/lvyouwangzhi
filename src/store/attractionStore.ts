import { create } from 'zustand';
import { Attraction, Season } from '../types';
import { attractions as attractionsData } from '../data/attractions';
import { seasons as seasonsData } from '../data/seasons';

interface AttractionState {
  attractions: Attraction[];
  currentAttraction: Attraction | null;
  seasons: Season[];
  currentSeason: Season;
  
  setCurrentAttraction: (id: string) => void;
  setCurrentSeason: (seasonId: Season['id']) => void;
}

export const useAttractionStore = create<AttractionState>((set, get) => ({
  attractions: attractionsData,
  currentAttraction: null,
  seasons: seasonsData,
  currentSeason: seasonsData[0],
  
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
}));
