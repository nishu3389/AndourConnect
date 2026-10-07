import React, { useState, useEffect, useRef } from 'react';
import { ServiceProvider } from '../types';
import { Sparkles, ChevronRight, Tag } from 'lucide-react';

export interface SponsoredAd {
  id: string;
  providerId: string;
  tag: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  ctaText: string;
}

export const SPONSORED_ADS: SponsoredAd[] = [
  {
    id: 'ad-1',
    providerId: 'nishal-nails-makeover',
    tag: 'Sponsored · Flat J-003',
    title: 'Festive Glam & Gel Nail Art',
    subtitle: 'French ombre & lash lifts. Doorstep trials for society residents.',
    badge: 'Special Resident Offer',
    image: '/src/assets/images/nail_makeover_banner_1791310401888.jpg',
    ctaText: 'View Studio',
  },
  {
    id: 'ad-2',
    providerId: 'lendrobe',
    tag: 'Sponsored · Flat Q055',
    title: 'Wedding Wardrobe Rentals',
    subtitle: 'Premium designer lehengas & gowns ready to wear without heavy cost.',
    badge: 'Popular in Tower Q',
    image: '/src/assets/images/home_boutique_craft_1791308100452.jpg',
    ctaText: 'Rent Outfits',
  },
  {
    id: 'ad-3',
    providerId: 'sachin-pal-fitness',
    tag: 'Sponsored · National Athlete',
    title: 'Society Fitness & Rehab Camp',
    subtitle: 'Back rehab, pilates & marathon prep at Central Lawn at 6:30 AM.',
    badge: 'Complimentary Demo',
    image: '/src/assets/images/fitness_training_banner_1791310435080.jpg',
    ctaText: 'Join Morning Batch',
  },
  {
    id: 'ad-4',
    providerId: 'elegant-trends',
    tag: 'Sponsored · Flat F117',
    title: 'Royal Kundan & Polki Jewellery',
    subtitle: 'Anti-tarnish sets. Walk in to try on with your festive outfits.',
    badge: 'New Festive Stock',
    image: '/src/assets/images/jewellery_luxury_banner_1791310423328.jpg',
    ctaText: 'Check Collection',
  },
  {
    id: 'ad-5',
    providerId: 'surprakash-dance-music',
    tag: 'Sponsored · Flat B024',
    title: 'Kathak & Classical Vocal Classes',
    subtitle: 'Certified tutoring by Dr. Saumya Pandey. Free demo this Sunday 4:30 PM.',
    badge: 'Admissions Open',
    image: '/src/assets/images/dance_music_banner_1791310450521.jpg',
    ctaText: 'Free Sunday Demo',
  },
  {
    id: 'ad-6',
    providerId: 'abacus-mental-math',
    tag: 'Sponsored · Flat C-034',
    title: 'Abacus & Speed Mental Math',
    subtitle: 'Small batches for primary children. Build focus & mental calculation.',
    badge: 'Free Demo Class',
    image: '/src/assets/images/education_study_banner_1791353888492.jpg',
    ctaText: 'Book Free Demo',
  },
  {
    id: 'ad-7',
    providerId: 'toys-playschool-daycare',
    tag: 'Sponsored · Flat M 064',
    title: 'Montessori Daycare & Playschool',
    subtitle: 'Safe in-society home daycare with sensory play, snacks & storytelling.',
    badge: 'Limited Society Seats',
    image: '/src/assets/images/playschool_daycare_banner_1791353904942.jpg',
    ctaText: 'Explore Daycare',
  },
];

interface SponsoredAdsBannerProps {
  providers: ServiceProvider[];
  onOpenProvider: (provider: ServiceProvider) => void;
}

export const SponsoredAdsBanner: React.FC<SponsoredAdsBannerProps> = ({
  providers,
  onOpenProvider,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SPONSORED_ADS.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleAdClick = (ad: SponsoredAd) => {
    const target = providers.find((p) => p.id === ad.providerId);
    if (target) {
      onOpenProvider(target);
    }
  };

  return (
    <div
      className="px-4 py-2.5 bg-white border-b border-slate-100/80 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xs h-40 sm:h-44 bg-slate-900 group">
        {/* Banner Images Slider */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SPONSORED_ADS.map((ad) => (
            <div
              key={ad.id}
              onClick={() => handleAdClick(ad)}
              className="relative w-full h-full shrink-0 cursor-pointer overflow-hidden"
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover brightness-[0.80] group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              {/* Ad Content: Clean Image + Title & Desc only */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display tracking-tight leading-tight text-white drop-shadow-xs">
                    {ad.title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 font-normal leading-snug line-clamp-2 max-w-sm">
                    {ad.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Indicator Dots */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 pointer-events-auto bg-black/35 backdrop-blur-xs px-2 py-1 rounded-full">
          {SPONSORED_ADS.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-3.5 bg-white'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
