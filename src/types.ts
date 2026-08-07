export type Region = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';

export type PackageCategory = 'Royal & Heritage' | 'Spiritual & Pilgrimage' | 'Himalayan & Trekking' | 'Backwaters & Coastal' | 'Wildlife & Safari';

export interface DayItinerary {
  dayNumber: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  stay: string;
}

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  durationDays: number;
  priceINR: number;
  priceFormatted: string;
  rating: number;
  reviewCount: number;
  region: Region;
  category: PackageCategory;
  heroImage: string;
  galleryImages: string[];
  highlights: string[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  bestTime: string;
  startingCity: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  location: string;
  region: Region;
  coverImage: string;
  excerpt: string;
  contentParagraphs: string[];
  keyQuote?: string;
  photographyTips?: {
    gear: string;
    bestHour: string;
    proTip: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  state: string;
  region: Region;
  imageUrl: string;
  photographer: string;
  cameraSettings: {
    camera: string;
    lens: string;
    iso: string;
    aperture: string;
    shutter: string;
  };
  description: string;
  tags: string[];
}

export interface BookingFormState {
  destinationPackageId?: string;
  destinationName: string;
  startDate: string;
  durationDays: number;
  adults: number;
  children: number;
  vehiclePreference: 'Luxury SUV (Innova Crysta)' | 'Luxury Sedan (Camry/Mercedes)' | 'Tempo Traveller (12-Seater)' | 'Vintage Heritage Coach';
  hotelPreference: '5-Star Heritage Palace' | 'Boutique Resort' | 'Standard 4-Star Comfort';
  specialAddons: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorCity: string;
  avatarUrl: string;
  rating: number;
  date: string;
  tourName: string;
  comment: string;
}

export interface AiItineraryDay {
  dayNumber: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  insiderTip: string;
  stayRecommendation: string;
}

export interface AiItinerary {
  title: string;
  tagline: string;
  overview: string;
  duration: string;
  estimatedPricePerPerson: string;
  recommendedBestSeason: string;
  keyHighlights: string[];
  days: AiItineraryDay[];
  includedServices: string[];
  culturalTrivia: string;
}
