import React, { useState, useMemo } from 'react';
import { Conversation, ServiceProvider } from '../types';
import { Search, MessageSquare, X } from 'lucide-react';

interface MessagesScreenProps {
  conversations: Record<string, Conversation>;
  allProviders: ServiceProvider[];
  onOpenConversation: (providerId: string) => void;
  onStartNewChat: () => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  conversations,
  allProviders,
  onOpenConversation,
  onStartNewChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const conversationList = Object.values(conversations);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversationList;
    const q = searchQuery.toLowerCase().trim();
    return conversationList.filter(
      (c) =>
        c.providerName.toLowerCase().includes(q) ||
        c.ownerName.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [conversationList, searchQuery]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden pb-24">
      {/* 1. TOP HEADER */}
      <div className="px-5 pt-4 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
            Messages
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct real-time chats with society businesses
          </p>
        </div>

        <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
          {conversationList.length} chats
        </span>
      </div>

      {/* 2. SEARCH CONVERSATIONS */}
      <div className="p-4 bg-white border-b border-slate-100 shadow-2xs">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-100 rounded-2xl text-slate-500">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations"
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
      </div>

      {/* 3. CONVERSATIONS LIST */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-none">
        {filteredConversations.length === 0 ? (
          <div className="py-20 text-center space-y-3 px-6 max-w-xs mx-auto">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-800 font-display">
              {searchQuery ? 'No matching conversations' : 'No messages yet'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {searchQuery
                ? 'Try searching by a different name or message keyword.'
                : 'Browse provider profiles and tap "Message" to start a direct chat with your neighbours!'}
            </p>
            {!searchQuery && (
              <button
                onClick={onStartNewChat}
                className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Browse Directory
              </button>
            )}
          </div>
        ) : (
          filteredConversations.map((conv) => {
            return (
              <div
                key={conv.providerId}
                onClick={() => onOpenConversation(conv.providerId)}
                className="p-4 bg-white hover:bg-slate-50/80 active:bg-slate-100 transition-colors flex items-center gap-3.5 cursor-pointer"
              >
                {/* Provider Avatar */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-2xs">
                    {conv.ownerName.charAt(0)}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <strong className="text-sm font-bold text-slate-900 truncate">
                      {conv.providerName}
                    </strong>
                    <span className="text-[11px] text-slate-400 shrink-0 tabular-nums">
                      {conv.lastTimestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 truncate leading-snug">
                    {conv.lastMessage || 'Say hello...'}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span className="text-emerald-700 font-medium">{conv.ownerName}</span>
                    <span>·</span>
                    <span>{conv.providerFlat}</span>
                  </div>
                </div>

                {/* Unread badge */}
                {conv.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
