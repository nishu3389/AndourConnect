import React from 'react';
import { ServiceProvider } from '../types';
import { getRelevantBannerImage } from '../utils/bannerImages';
import {
  Star,
  MapPin,
  MessageSquare,
  Phone,
  ChevronRight,
  Heart,
} from 'lucide-react';

interface ProviderCardProps {
  provider: ServiceProvider;
  layout?: 'grid' | 'list';
  isSaved?: boolean;
  onToggleSave?: (providerId: string) => void;
  onOpenProfile: (provider: ServiceProvider) => void;
  onOpenChat: (provider: ServiceProvider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  layout = 'list',
  isSaved = false,
  onToggleSave,
  onOpenProfile,
  onOpenChat,
}) => {
  const bannerImage = getRelevantBannerImage(provider);

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = provider.phone.split('/')[0].trim();
    window.location.href = `tel:${cleanPhone}`;
  };

  const handleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenChat(provider);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSave) onToggleSave(provider.id);
  };

  // ================= GRID VIEW =================
  if (layout === 'grid') {
    return (
      <div
        onClick={() => onOpenProfile(provider)}
        className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 p-2.5 flex flex-col justify-between transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.98]"
      >
        <div>
          {/* Square/Proportional Image with quiet Save button */}
          <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100 mb-2">
            <img
              src={bannerImage}
              alt={provider.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            
            {/* Minimal Favorite Button */}
            <button
              onClick={handleSave}
              aria-label={isSaved ? 'Remove from saved' : 'Save business'}
              className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 flex items-center justify-center hover:text-rose-500 transition-colors shadow-2xs"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                }`}
              />
            </button>

            {/* Flat badge minimal */}
            <div className="absolute bottom-1.5 left-1.5 bg-black/55 backdrop-blur-xs text-white text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-1 font-medium">
              <MapPin className="w-2.5 h-2.5 text-emerald-400" />
              <span>{provider.flatNo}</span>
            </div>
          </div>

          {/* Category & Rating - Category extends flexibly right up to the rating */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-1 gap-1">
            <span className="truncate uppercase tracking-wider flex-1 min-w-0 mr-1 text-slate-500 font-medium">
              {provider.category}
            </span>
            <div className="flex items-center gap-0.5 text-slate-800 font-semibold tabular-nums shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{provider.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title - Full title shown in grid view without truncation */}
          <h3 className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
            {provider.name}
          </h3>

          {/* Owner info */}
          <p className="text-[11px] text-slate-500 mt-1 font-normal">
            By {provider.ownerName}
          </p>
        </div>

        {/* Minimal Quick Actions */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <button
            onClick={handleChat}
            className="flex-1 py-1.5 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3 h-3 text-emerald-600" />
            <span>Chat</span>
          </button>

          <button
            onClick={handleCall}
            className="flex-1 py-1.5 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <Phone className="w-3 h-3 text-slate-600" />
            <span>Call</span>
          </button>
        </div>
      </div>
    );
  }

  // ================= LIST VIEW =================
  return (
    <div
      onClick={() => onOpenProfile(provider)}
      className="group bg-white rounded-2xl border border-slate-200/70 hover:border-slate-300 p-3.5 transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.99]"
    >
      {/* Top row: Thumbnail + Info */}
      <div className="flex items-start gap-3.5">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-slate-100 shrink-0 mt-0.5">
          <img
            src={bannerImage}
            alt={provider.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={handleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save business'}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 flex items-center justify-center hover:text-rose-500 transition-colors shadow-2xs"
          >
            <Heart
              className={`w-3 h-3 ${
                isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {/* Info Column */}
        <div className="flex-1 min-w-0">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-500 uppercase tracking-wider text-[10px]">{provider.category}</span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">{provider.flatNo}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-800 font-semibold tabular-nums shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{provider.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px] font-normal">({provider.reviewCount})</span>
            </div>
          </div>

          {/* Business Name */}
          <h3 className="font-semibold text-sm text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
            {provider.name}
          </h3>

          {/* Description - max 2 lines */}
          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal line-clamp-2">
            {provider.description}
          </p>
        </div>
      </div>

      {/* Full-width bottom row spanning beneath image & info so "By XXX" user name does not wrap into 2 lines */}
      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
        <span className="text-xs text-slate-500 font-normal truncate mr-2 flex items-center gap-1 min-w-0">
          <span className="shrink-0">By</span>
          <strong className="text-slate-800 font-medium truncate">{provider.ownerName}</strong>
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleChat}
            className="py-1 px-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3 h-3 text-emerald-600" />
            <span>Chat</span>
          </button>

          <button
            onClick={handleCall}
            className="py-1 px-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Phone className="w-3 h-3 text-slate-600" />
            <span>Call</span>
          </button>

          <div className="text-slate-300 pl-0.5">
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
