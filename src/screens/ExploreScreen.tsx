import React, { useState, useMemo } from 'react';
import { ServiceProvider, ServiceCategory } from '../types';
import { FILTER_CHIPS, CATEGORY_MAPPING } from '../data/initialData';
import { ProviderCard } from '../components/ProviderCard';
import { ViewToggle, ViewMode } from '../components/ViewToggle';
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowLeft,
  Check,
  RotateCcw,
} from 'lucide-react';

interface ExploreScreenProps {
  providers: ServiceProvider[];
  savedProviderIds: string[];
  initialCategory?: ServiceCategory;
  initialSearchQuery?: string;
  onBackToHome: () => void;
  onOpenProvider: (provider: ServiceProvider) => void;
  onOpenChat: (provider: ServiceProvider) => void;
  onToggleSave: (providerId: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  providers,
  savedProviderIds,
  initialCategory = 'All',
  initialSearchQuery = '',
  onBackToHome,
  onOpenProvider,
  onOpenChat,
  onToggleSave,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeChip, setActiveChip] = useState<string>(() => {
    if (initialCategory === 'All') return 'All';
    const found = Object.entries(CATEGORY_MAPPING).find(([chip, cat]) => cat === initialCategory);
    return found ? found[0] : 'All';
  });

  // Advanced Filters State
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'az' | 'recent'>('rating');
  const [selectedCategoryOverride, setSelectedCategoryOverride] = useState<ServiceCategory>(initialCategory);

  const handleChipClick = (chip: string) => {
    setActiveChip(chip);
    const mapped = CATEGORY_MAPPING[chip] || 'All';
    setSelectedCategoryOverride(mapped);
  };

  const filteredResults = useMemo(() => {
    return providers.filter((p) => {
      if (selectedCategoryOverride !== 'All' && p.category !== selectedCategoryOverride) {
        return false;
      }
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = p.name.toLowerCase().includes(q);
        const inOwner = p.ownerName.toLowerCase().includes(q);
        const inFlat = p.flatNo.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inCategory = p.category.toLowerCase().includes(q);
        const inServices = p.services.some((s) => s.toLowerCase().includes(q));

        if (!inName && !inOwner && !inFlat && !inDesc && !inCategory && !inServices) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'az') return a.name.localeCompare(b.name);
      if (sortBy === 'recent') return (b.isRecentlyAdded ? 1 : 0) - (a.isRecentlyAdded ? 1 : 0);
      return 0;
    });
  }, [providers, selectedCategoryOverride, minRating, searchQuery, sortBy]);

  const isCategoryView = selectedCategoryOverride !== 'All';

  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden">
      {/* 1. MINIMAL SEARCH & CONTROLS HEADER */}
      <div className="bg-white border-b border-slate-100 px-4 pt-3 pb-2.5 space-y-2.5 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToHome}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/60 focus-within:border-emerald-600 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus={!isCategoryView}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isCategoryView ? `Search in ${selectedCategoryOverride}...` : 'Search services or providers...'}
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-0.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowAdvancedFilter(true)}
            className={`p-2 rounded-xl border transition-colors flex items-center justify-center ${
              minRating > 0 || sortBy !== 'rating'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            aria-label="Filter Options"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar pb-0.5">
          {FILTER_CHIPS.map((chip) => {
            const isSelected = activeChip === chip;
            return (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CATEGORY INTRO BANNER IF FILTERED */}
      {isCategoryView && (
        <div className="bg-white border-b border-slate-100/80 px-5 py-2.5 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {selectedCategoryOverride}
            </h2>
            <p className="text-[11px] text-slate-500">
              Verified resident services in Andour Heights
            </p>
          </div>
          <button
            onClick={() => handleChipClick('All')}
            className="text-[11px] text-slate-400 hover:text-slate-800"
          >
            Clear
          </button>
        </div>
      )}

      {/* 3. SUBHEADER WITH RESULT COUNT AND GRID/LIST TOGGLE */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500">
        <span>
          <strong className="text-slate-800 font-semibold tabular-nums">{filteredResults.length}</strong> businesses
          {minRating > 0 && <span className="text-emerald-700 ml-1.5 font-medium">· ★ {minRating}+</span>}
        </span>

        {/* View Toggle */}
        <ViewToggle mode={viewMode} onChange={setViewMode} />
      </div>

      {/* 4. RESULTS STREAM */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-none">
        {filteredResults.length === 0 ? (
          <div className="py-20 text-center space-y-2 max-w-xs mx-auto">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-2">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              No services found
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Try another category or search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleChipClick('All');
                setMinRating(0);
                setSortBy('rating');
              }}
              className="mt-3 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 gap-3'
                : 'flex flex-col gap-2.5'
            }
          >
            {filteredResults.map((provider) => (
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
        )}
      </div>

      {/* 5. ADVANCED FILTER MODAL */}
      {showAdvancedFilter && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Filter & Sort
              </h3>
              <button
                onClick={() => setShowAdvancedFilter(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Minimum Rating */}
            <div>
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Minimum Rating
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    type="button"
                    onClick={() => setMinRating(ratingVal)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      minRating === ratingVal
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {ratingVal === 0 ? 'Any' : `${ratingVal} ★+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Sort By
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'rating', label: 'Top Rated' },
                  { id: 'reviews', label: 'Most Reviewed' },
                  { id: 'az', label: 'A-Z' },
                  { id: 'recent', label: 'Recently Added' },
                ].map((sortOption) => (
                  <button
                    key={sortOption.id}
                    type="button"
                    onClick={() => setSortBy(sortOption.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left flex items-center justify-between transition-all ${
                      sortBy === sortOption.id
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{sortOption.label}</span>
                    {sortBy === sortOption.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMinRating(0);
                  setSortBy('rating');
                }}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAdvancedFilter(false)}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
