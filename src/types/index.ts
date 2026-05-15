export type AttractionCategory = 'building' | 'garden' | 'water' | 'culture';

export interface Attraction {
  id: string;
  name: string;
  tagline: string;
  category: AttractionCategory;
  tags: string[];
  
  heroImage: string;
  gallery: string[];
  panoramaUrl?: string;
  
  cultureContent: {
    history: string;
    architecture: string;
    significance: string;
  };
  
  archives: {
    height?: string;
    area?: string;
    builtYear?: string;
    rebuiltYear?: string;
    features: string[];
  };
  
  coordinates: {
    x: number;
    y: number;
  };
  
  relatedIds: string[];
}

export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonHighlight {
  title: string;
  description: string;
  image: string;
}

export interface Season {
  id: SeasonType;
  name: string;
  nameEn: string;
  description: string;
  highlights: SeasonHighlight[];
  bestTime: string;
  photographyTips: string[];
}

export type GuideCategory = 'transport' | 'food' | 'accommodation' | 'souvenirs';

export interface GuideItem {
  id: string;
  title: string;
  description: string;
  category: GuideCategory;
  icon?: string;
  details?: string[];
}

export interface MapMarker {
  attractionId: string;
  position: { x: number; y: number };
  icon: string;
}
