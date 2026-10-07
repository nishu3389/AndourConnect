export type ServiceCategory =
  | 'All'
  | 'Clothes & Fashion'
  | 'Jewellery & Accessories'
  | 'Beauty & Wellness'
  | 'Salon & Grooming'
  | 'Education & Coaching'
  | 'Health & Fitness'
  | 'Arts, Crafts & Decor'
  | 'Dance, Music & Cultural'
  | 'Miscellaneous Services';

export interface WorkingHours {
  days: string;
  hours: string;
  isAvailableNow: boolean;
  notes?: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorFlat: string;
  authorAvatar?: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  helpfulCount: number;
  isHelpfulByUser?: boolean;
  tags?: string[];
}

export interface RatingDistribution {
  star5: number;
  star4: number;
  star3: number;
  star2: number;
  star1: number;
}

export interface ServiceItem {
  name: string;
  price: string;
  duration?: string;
  popular?: boolean;
  description?: string;
  image?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: Exclude<ServiceCategory, 'All'>;
  ownerName: string;
  flatNo: string;
  tower: string;
  phone: string;
  whatsapp?: string;
  alternatePhone?: string;
  description: string;
  about?: string;
  services: string[];
  serviceItems?: ServiceItem[];
  workingHours: WorkingHours;
  rating: number;
  reviewCount: number;
  distribution: RatingDistribution;
  reviews: Review[];
  priceRange?: string;
  consultationType?: string; // 'Home Visit', 'At Provider Flat', 'Both'
  isPopular?: boolean;
  isTopRated?: boolean;
  isRecommended?: boolean;
  isRecentlyAdded?: boolean;
  highlights?: string[];
  imageKey?: 'fashion' | 'craft' | 'wellness' | 'fitness' | 'education' | 'general' | 'nails' | 'jewellery' | 'music';
  coverImage?: string;
  avatarBg?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'provider';
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  dateLabel?: string;
  sharedServiceInfo?: {
    serviceName: string;
    price?: string;
    flat?: string;
  };
}

export interface Conversation {
  providerId: string;
  providerName: string;
  providerFlat: string;
  ownerName: string;
  category: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
  isOnline?: boolean;
  lastSeen?: string;
}

export type NavigationTab = 'home' | 'explore' | 'messages' | 'saved' | 'profile';

export interface ResidentProfile {
  name: string;
  tower: string;
  flatNo: string;
  email: string;
  phone: string;
  avatarUrl: string;
  residentSince: string;
}

export interface SocietyNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'business' | 'notice' | 'message';
  read: boolean;
}
