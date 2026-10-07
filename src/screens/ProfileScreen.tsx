import React from 'react';
import { ResidentProfile } from '../types';
import {
  User,
  ShieldCheck,
  Bookmark,
  MessageSquare,
  Star,
  Bell,
  Settings,
  HelpCircle,
  PlusCircle,
  ChevronRight,
  MapPin,
  Building2,
  Share2,
} from 'lucide-react';

interface ProfileScreenProps {
  resident: ResidentProfile;
  savedCount: number;
  reviewsCount: number;
  unreadMessagesCount: number;
  onOpenSavedTab: () => void;
  onOpenMessagesTab: () => void;
  onOpenNotifications: () => void;
  onOpenListBusiness: () => void;
  onShowReviewsModal: () => void;
  onShowHelpModal: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  resident,
  savedCount,
  reviewsCount,
  unreadMessagesCount,
  onOpenSavedTab,
  onOpenMessagesTab,
  onOpenNotifications,
  onOpenListBusiness,
  onShowReviewsModal,
  onShowHelpModal,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-28 scrollbar-none">
      {/* 1. TOP BAR */}
      <div className="px-5 pt-4 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
          Resident Profile
        </h1>
        <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Verified Resident
        </span>
      </div>

      {/* 2. USER CARD */}
      <div className="p-5 bg-white border-b border-slate-100 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={resident.avatarUrl}
              alt={resident.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500/40 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 truncate font-display">
              {resident.name}
            </h2>
            <div className="flex items-center gap-1 text-xs text-emerald-800 font-semibold mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{resident.flatNo} ({resident.tower})</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Signature Global Andour Heights · Resident since {resident.residentSince}
            </p>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={onShowReviewsModal}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="text-base font-bold text-slate-900 tabular-nums">{reviewsCount}</div>
            <div className="text-[11px] text-slate-500">My Reviews</div>
          </button>

          <button
            onClick={onOpenSavedTab}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="text-base font-bold text-slate-900 tabular-nums">{savedCount}</div>
            <div className="text-[11px] text-slate-500">Saved</div>
          </button>

          <button
            onClick={onOpenMessagesTab}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="text-base font-bold text-slate-900 tabular-nums">
              {unreadMessagesCount > 0 ? unreadMessagesCount : 'Active'}
            </div>
            <div className="text-[11px] text-slate-500">Messages</div>
          </button>
        </div>
      </div>

      {/* 3. PROMINENT "LIST YOUR BUSINESS" BANNER */}
      <div className="p-5">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              For Society Entrepreneurs
            </span>
            <h3 className="text-base font-bold leading-tight font-display">
              List Your Home Business
            </h3>
            <p className="text-xs text-emerald-100 leading-snug">
              Promote your catering, tailoring, tuition, craft, or salon right to your neighbours.
            </p>
          </div>

          <button
            onClick={onOpenListBusiness}
            className="px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* 4. OPTIONS MENU LIST */}
      <div className="px-5 space-y-2">
        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {/* My Reviews */}
          <button
            onClick={onShowReviewsModal}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">My Reviews</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Saved Businesses */}
          <button
            onClick={onOpenSavedTab}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Saved Businesses</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* My Messages */}
          <button
            onClick={onOpenMessagesTab}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">My Messages</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Notifications</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Help & Support */}
          <button
            onClick={onShowHelpModal}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">Help & Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Footer Note */}
        <div className="py-4 text-center text-xs text-slate-400">
          Andour Connect v2.4 · Hyperlocal Edition
          <div className="text-[11px] text-slate-400 mt-0.5">Signature Global Andour Heights, Sector 71, Gurugram</div>
        </div>
      </div>
    </div>
  );
};
