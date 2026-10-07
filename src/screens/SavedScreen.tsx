import React, { useState } from 'react';
import { ServiceProvider } from '../types';
import { ProviderCard } from '../components/ProviderCard';
import { ViewToggle, ViewMode } from '../components/ViewToggle';
import { Bookmark, Compass } from 'lucide-react';

interface SavedScreenProps {
  savedProviders: ServiceProvider[];
  onOpenProvider: (provider: ServiceProvider) => void;
  onOpenChat: (provider: ServiceProvider) => void;
  onToggleSave: (providerId: string) => void;
  onExplore: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedProviders,
  onOpenProvider,
  onOpenChat,
  onToggleSave,
  onExplore,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden pb-24">
      {/* 1. TOP HEADER */}
      <div className="px-5 pt-4 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-display">
            Saved Businesses
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Your bookmarked society service providers
          </p>
        </div>

        {savedProviders.length > 0 && (
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        )}
      </div>

      {/* 2. BODY CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        {savedProviders.length === 0 ? (
          <div className="py-24 text-center space-y-3 max-w-xs mx-auto">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Bookmark className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-800 font-display">
              No saved businesses yet
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Save services you may want to contact later. Tap the heart icon on any provider card.
            </p>
            <button
              onClick={onExplore}
              className="mt-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Businesses</span>
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
            {savedProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                layout={viewMode}
                isSaved={true}
                onToggleSave={onToggleSave}
                onOpenProfile={onOpenProvider}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
