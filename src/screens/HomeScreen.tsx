import React, { useState } from 'react';
import { ServiceProvider, ServiceCategory, ResidentProfile } from '../types';
import { SERVICE_CATEGORIES } from '../data/initialData';
import { ProviderCard } from '../components/ProviderCard';
import { ViewToggle, ViewMode } from '../components/ViewToggle';
import { SponsoredAdsBanner } from '../components/SponsoredAdsBanner';
import {
  Bell,
  Search,
  Shirt,
  Gem,
  Sparkles,
  Scissors,
  GraduationCap,
  Activity,
  Palette,
  Music,
  Layers,
  ChevronRight,
  TrendingUp,
  Star,
  Clock,
  HeartHandshake,
} from 'lucide-react';

interface HomeScreenProps {
  providers: ServiceProvider[];
  resident: ResidentProfile;
  savedProviderIds: string[];
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
  onOpenProfileTab: () => void;
  onSearchFocus: () => void;
  onSelectCategory: (category: ServiceCategory) => void;
  onOpenProvider: (provider: ServiceProvider) => void;
  onOpenChat: (provider: ServiceProvider) => void;
  onToggleSave: (providerId: string) => void;
  onOpenExplore: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  providers,
  resident,
  savedProviderIds,
  unreadNotificationCount,
  onOpenNotifications,
  onOpenProfileTab,
  onSearchFocus,
  onSelectCategory,
  onOpenProvider,
  onOpenChat,
  onToggleSave,
  onOpenExplore,
}) => {
  // View mode state for grid/list toggle
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Category icon mapping helper
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="w-4 h-4" />;
      case 'Gem':
        return <Gem className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Scissors':
        return <Scissors className="w-4 h-4" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4" />;
      case 'Activity':
        return <Activity className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Music':
        return <Music className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const popularProviders = providers.filter((p) => p.isPopular).slice(0, 6);
  const topRatedProviders = providers.filter((p) => p.rating >= 4.9).slice(0, 4);
  const recommendedProviders = providers.filter((p) => p.isRecommended).slice(0, 4);

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-[#FAFAFA] scrollbar-none font-sans">
      {/* 1. MINIMALIST TOP HEADER */}
      <div className="px-5 pt-3.5 pb-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              Andour Heights
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-display">
            Hello, Neighbour 👋
          </h1>
          <p className="text-[11px] text-slate-500 font-normal">
            Discover trusted services around you
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full" />
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfileTab}
            className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 hover:ring-2 hover:ring-slate-300 transition-all cursor-pointer"
            aria-label="Resident profile"
          >
            <img
              src={resident.avatarUrl}
              alt={resident.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>

      {/* 2. PROMINENT MINIMALIST SEARCH BAR */}
      <div className="px-5 py-3 bg-white border-b border-slate-100/70">
        <button
          onClick={onSearchFocus}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-left text-slate-400 transition-all cursor-pointer border border-slate-200/60"
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs sm:text-sm font-normal text-slate-500 truncate">
            Search services, businesses or people
          </span>
        </button>
      </div>

      {/* AUTO SCROLLING SPONSORED ADS BANNER */}
      <SponsoredAdsBanner
        providers={providers}
        onOpenProvider={onOpenProvider}
      />

      {/* 3. CLEAN HORIZONTAL SERVICE CATEGORIES - STICKY TOP ON SCROLL */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/70 py-2.5 shadow-2xs transition-shadow">
        <div className="px-5 flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
            Categories
          </span>
          <button
            onClick={onOpenExplore}
            className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5 cursor-pointer"
          >
            <span>View all</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 px-5 overflow-x-auto scrollbar-none no-scrollbar pb-0.5">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 shrink-0 transition-colors cursor-pointer group"
            >
              <span className="text-slate-600 group-hover:text-emerald-700">
                {renderCategoryIcon(cat.iconName)}
              </span>
              <span className="text-xs font-medium text-slate-700 whitespace-nowrap group-hover:text-slate-900">
                {cat.shortName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. MAIN CONTENT FEEDS */}
      <div className="px-4 py-4 space-y-6">
        
        {/* SECTION 1: POPULAR NEAR YOU WITH GRID/LIST TOGGLE */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight font-display">
                Popular Near You
              </h2>
              <span className="text-[11px] text-slate-400">
                Top rated home services in society
              </span>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center gap-2">
              <ViewToggle mode={viewMode} onChange={setViewMode} />
            </div>
          </div>

          {/* Cards Container: Grid (2-columns) or List (vertical stack) */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 gap-3'
                : 'flex flex-col gap-2.5'
            }
          >
            {popularProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                layout={viewMode}
                isSaved={savedProviderIds.includes(provider.id)}
                onToggleSave={onToggleSave}
                onOpenProfile={onOpenProvider}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        </section>

        {/* SECTION 2: TOP RATED */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <h2 className="text-sm font-bold text-slate-900 tracking-tight font-display">
                Top Rated by Neighbours
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">4.9★+</span>
          </div>

          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 gap-3'
                : 'flex flex-col gap-2.5'
            }
          >
            {topRatedProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                layout={viewMode}
                isSaved={savedProviderIds.includes(provider.id)}
                onToggleSave={onToggleSave}
                onOpenProfile={onOpenProvider}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        </section>

        {/* SECTION 3: RECOMMENDED BY NEIGHBOURS */}
        {recommendedProviders.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                <h2 className="text-sm font-bold text-slate-900 tracking-tight font-display">
                  Recommended by Neighbours
                </h2>
              </div>
            </div>

            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 gap-3'
                  : 'flex flex-col gap-2.5'
              }
            >
              {recommendedProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  layout={viewMode}
                  isSaved={savedProviderIds.includes(provider.id)}
                  onToggleSave={onToggleSave}
                  onOpenProfile={onOpenProvider}
                  onOpenChat={onOpenChat}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
