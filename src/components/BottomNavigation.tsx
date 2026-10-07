import React from 'react';
import { NavigationTab } from '../types';
import { Home, Compass, MessageSquare, Bookmark, User } from 'lucide-react';

interface BottomNavigationProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unreadCount?: number;
  savedCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
  unreadCount = 0,
  savedCount = 0,
}) => {
  const navItems: { tab: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: 'home', label: 'Home', icon: Home },
    { tab: 'explore', label: 'Explore', icon: Compass },
    { tab: 'messages', label: 'Messages', icon: MessageSquare },
    { tab: 'saved', label: 'Saved', icon: Bookmark },
    { tab: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="w-full bg-white border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around select-none shadow-xs z-30">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onSelectTab(item.tab)}
            className="flex-1 flex flex-col items-center justify-center py-1 group cursor-pointer transition-transform active:scale-95"
            aria-label={item.label}
          >
            {/* Minimalist active indicator pill */}
            <div
              className={`relative px-4 py-1 rounded-full transition-all duration-150 flex items-center justify-center ${
                isActive
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.8]'}`} />

              {/* Badges */}
              {item.tab === 'messages' && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              {item.tab === 'saved' && savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-700 text-white text-[9px] font-bold px-1 rounded-full">
                  {savedCount}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                isActive ? 'font-semibold text-slate-900' : 'font-normal text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
