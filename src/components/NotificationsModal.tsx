import React from 'react';
import { SocietyNotification } from '../types';
import { X, Bell, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface NotificationsModalProps {
  notifications: SocietyNotification[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-6 duration-300">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-base text-slate-900 font-display">
              Society Notifications
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 scrollbar-none">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.read
                  ? 'bg-white border-slate-200/80 text-slate-600'
                  : 'bg-emerald-50/50 border-emerald-200 text-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {item.title}
                </h4>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
