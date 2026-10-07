import React, { useState, useEffect, useRef } from 'react';
import { ServiceProvider, Conversation, ChatMessage } from '../types';
import {
  ArrowLeft,
  Phone,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Image as ImageIcon,
  Clock,
  Sparkles,
  MapPin,
  Tag,
  X,
} from 'lucide-react';

interface ChatScreenProps {
  provider: ServiceProvider;
  conversation: Conversation;
  onBack: () => void;
  onSendMessage: (providerId: string, text: string, sharedServiceInfo?: any) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  provider,
  conversation,
  onBack,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = conversation.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText.trim();
    setInputText('');
    setShowAttachMenu(false);
    onSendMessage(provider.id, textToSend);

    // Simulate provider typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1100);
  };

  const handleQuickAction = (text: string, serviceInfo?: any) => {
    onSendMessage(provider.id, text, serviceInfo);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1100);
  };

  const handleSendSimulatedImage = () => {
    setShowAttachMenu(false);
    onSendMessage(provider.id, '📷 Sent photo of fabric / reference requirement');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F3F4F6] overflow-hidden">
      {/* 1. CHAT HEADER */}
      <div className="px-3.5 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between shadow-2xs z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Provider Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-2xs">
              {provider.ownerName.charAt(0)}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          {/* Name & Online Status */}
          <div className="leading-tight">
            <h3 className="font-bold text-sm text-slate-900 truncate max-w-[170px] sm:max-w-xs font-display">
              {provider.name}
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>Online · {provider.flatNo}</span>
            </div>
          </div>
        </div>

        {/* Call Icon Action */}
        <a
          href={`tel:${provider.phone.split('/')[0].trim()}`}
          className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-full transition-colors"
          title={`Call ${provider.phone}`}
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* 2. MESSAGE THREAD AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-none">
        {/* Date Separator */}
        <div className="text-center my-1">
          <span className="text-[10px] font-semibold text-slate-500 bg-white/80 border border-slate-200/60 px-3 py-1 rounded-full shadow-2xs">
            Today
          </span>
        </div>

        {/* Society Welcome Notice in chat */}
        <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-3 text-center text-xs text-emerald-900 max-w-sm mx-auto shadow-2xs">
          <p className="font-semibold">{provider.name} by {provider.ownerName}</p>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            Resident of {provider.flatNo} ({provider.tower}) · Andour Heights
          </p>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-2xs leading-relaxed ${
                  isUser
                    ? 'bg-emerald-700 text-white rounded-br-2xs'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-2xs'
                }`}
              >
                {/* Service Card snippet if shared */}
                {msg.sharedServiceInfo && (
                  <div className={`mb-2 p-2 rounded-xl text-xs flex items-center gap-2 border ${
                    isUser ? 'bg-emerald-800/80 border-emerald-600/40 text-emerald-100' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <Tag className="w-4 h-4 shrink-0" />
                    <div>
                      <strong className="block font-semibold">{msg.sharedServiceInfo.serviceName}</strong>
                      <span className="text-[10px] opacity-80">{msg.sharedServiceInfo.flat || provider.flatNo}</span>
                    </div>
                  </div>
                )}

                <p>{msg.text}</p>
              </div>

              {/* Timestamp & Read indicator */}
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                <span>{msg.timestamp}</span>
                {isUser && (
                  <span>
                    {msg.status === 'read' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-slate-400 inline" />
                    )}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 py-1">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
              {provider.ownerName.charAt(0)}
            </div>
            <span className="italic text-[11px]">{provider.ownerName} is typing</span>
            <span className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. SHARING SERVICE INFO CHIPS */}
      <div className="bg-white border-t border-slate-100 px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Share:
        </span>
        <button
          onClick={() => handleQuickAction('Hi! Can I visit your flat today to check your services?')}
          className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
        >
          Check Today's Availability
        </button>
        <button
          onClick={() => handleQuickAction(`Hello ${provider.ownerName}, please share your estimated pricing and service menu.`)}
          className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
        >
          Inquire Rates
        </button>
        <button
          onClick={() => handleQuickAction('I live in Andour Heights. Do you do doorstep home visits in my tower?')}
          className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
        >
          Doorstep Visit?
        </button>
      </div>

      {/* 4. ATTACHMENT ACTION SHEET */}
      {showAttachMenu && (
        <div className="bg-white border-t border-slate-200 p-3 flex items-center justify-around text-xs animate-in slide-in-from-bottom-2 duration-150">
          <button
            onClick={handleSendSimulatedImage}
            className="flex flex-col items-center gap-1 p-2 hover:bg-slate-100 rounded-xl text-slate-700"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span>Send Photo</span>
          </button>

          <button
            onClick={() => {
              setShowAttachMenu(false);
              handleQuickAction(`Sharing service inquiry: ${provider.services[0]}`, {
                serviceName: provider.services[0],
                flat: provider.flatNo,
              });
            }}
            className="flex flex-col items-center gap-1 p-2 hover:bg-slate-100 rounded-xl text-slate-700"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <span>Share Service</span>
          </button>
        </div>
      )}

      {/* 5. BOTTOM COMPOSER */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          className={`p-2.5 rounded-full transition-colors cursor-pointer ${
            showAttachMenu ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
          aria-label="Attachments"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-full transition-transform active:scale-90 cursor-pointer shadow-xs"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
