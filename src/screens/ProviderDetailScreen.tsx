import React, { useState } from 'react';
import { ServiceProvider, Review } from '../types';
import { getRelevantBannerImage } from '../utils/bannerImages';
import { getProviderServiceItems } from '../utils/pricingData';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MessageSquare,
  Phone,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  ExternalLink,
  Tag,
} from 'lucide-react';

interface ProviderDetailScreenProps {
  provider: ServiceProvider;
  isSaved: boolean;
  onBack: () => void;
  onOpenChat: (provider: ServiceProvider) => void;
  onToggleSave: (providerId: string) => void;
  onOpenReviewModal: (provider: ServiceProvider) => void;
  onToggleReviewHelpful: (providerId: string, reviewId: string) => void;
}

export const ProviderDetailScreen: React.FC<ProviderDetailScreenProps> = ({
  provider,
  isSaved,
  onBack,
  onOpenChat,
  onToggleSave,
  onOpenReviewModal,
  onToggleReviewHelpful,
}) => {
  const [shareCopied, setShareCopied] = useState(false);

  const bannerImage = getRelevantBannerImage(provider);
  const serviceItems = getProviderServiceItems(provider);

  const cleanPhone = provider.phone.replace(/[^0-9]/g, '').slice(-10);
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
    `Hello ${provider.ownerName}, I live in Andour Heights and saw your ${provider.name} profile on Andour Connect. I'd like to check your services!`
  )}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${provider.name} by ${provider.ownerName} (${provider.flatNo}) on Andour Connect - Signature Global Andour Heights.`
      );
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const totalReviews = provider.reviewCount || provider.reviews.length;
  const dist = provider.distribution;

  // Percentage calculations for rating distribution bars
  const getPercentage = (count: number) => {
    if (!totalReviews) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 pb-28 scrollbar-none">
      {/* 1. COVER / BANNER AREA */}
      <div className="relative h-56 sm:h-64 bg-slate-900">
        <img
          src={bannerImage}
          alt={provider.name}
          className="w-full h-full object-cover brightness-[0.85]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40" />

        {/* Top App Bar Over Cover */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white z-10">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(provider.id)}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors text-white"
              aria-label="Save"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors text-white"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resident Business Tag Over Cover */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <span className="text-[11px] font-semibold bg-emerald-950/85 backdrop-blur-md text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/20 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Resident Business
          </span>

          <span className="text-xs bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-200">
            {provider.category}
          </span>
        </div>
      </div>

      {/* Share Toast Feedback */}
      {shareCopied && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Business info copied to clipboard</span>
        </div>
      )}

      {/* 2. PROFILE HEADER INFO */}
      <div className="bg-white border-b border-slate-100 px-5 pt-4 pb-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display leading-tight">
              {provider.name}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {provider.category}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl text-slate-900 tabular-nums">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="font-bold text-sm">{provider.rating.toFixed(1)}</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5">
              {totalReviews} Reviews
            </span>
          </div>
        </div>

        {/* Provided By Kicker */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Provided by</span>
            <strong className="text-slate-900 text-sm font-semibold">{provider.ownerName}</strong>
          </div>

          <div className="text-right">
            <span className="text-slate-400 block text-[11px]">Society Residence</span>
            <strong className="text-emerald-700 text-sm font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {provider.flatNo}
            </strong>
          </div>
        </div>

        {/* 3. PRIMARY CTA BUTTONS: Prominent [ Message ] [ Call ] */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => onOpenChat(provider)}
            className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message</span>
          </button>

          <a
            href={`tel:${provider.phone.split('/')[0].trim()}`}
            className="py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-semibold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>
        </div>

        {/* WhatsApp & Alternate Contact Option */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5"
          >
            <span>Chat on WhatsApp ({cleanPhone})</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {provider.alternatePhone && (
            <span className="text-slate-500">
              Alt: {provider.alternatePhone}
            </span>
          )}
        </div>
      </div>

      {/* 4. ABOUT SECTION */}
      <div className="bg-white border-b border-slate-100 px-5 py-5 space-y-2 mt-2">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          About
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {provider.about || provider.description}
        </p>

        {/* Working Hours snippet */}
        <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {provider.workingHours.days} · {provider.workingHours.hours}
          </span>
        </div>
      </div>

      {/* 5. SERVICES & PRICING SECTION - BEST UI/UX PRICING WITH IMAGE & NON-IMAGE VARIANTS */}
      <div className="bg-white border-b border-slate-100 px-5 py-5 space-y-3 mt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Services & Pricing
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Verified society rates & packages
            </p>
          </div>
          <span className="text-[10px] text-emerald-800 bg-emerald-50 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100">
            {serviceItems.length} Services
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {serviceItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50/70 hover:bg-slate-100/70 rounded-2xl border border-slate-100 transition-colors"
            >
              {item.image ? (
                /* Variant 1: With Image */
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                        {item.name}
                      </h3>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-emerald-700 tabular-nums">
                        {item.price}
                      </span>
                      {item.duration && (
                        <span className="text-[11px] text-slate-400">
                          · {item.duration}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center justify-between">
                      <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/80">
                        In-Society Service
                      </span>
                      <button
                        onClick={() => onOpenChat(provider)}
                        className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inquire</span>
                        <MessageSquare className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-2xs border border-slate-200/60 mt-0.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ) : (
                /* Variant 2: Non-Image (Clean Typography & Multiline Detail) */
                <div>
                  <div className="flex items-start justify-between gap-2.5">
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug flex-1">
                      {item.name}
                    </h3>
                    <span className="text-sm sm:text-base font-bold text-emerald-700 tabular-nums shrink-0 ml-1">
                      {item.price}
                    </span>
                  </div>

                  {item.duration && (
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-normal">
                      {item.duration}
                    </span>
                  )}

                  {item.description && (
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      Resident Rate
                    </span>
                    <button
                      onClick={() => onOpenChat(provider)}
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <MessageSquare className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 6. RATINGS & REVIEWS SECTION */}
      <div className="bg-white px-5 py-5 space-y-4 mt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Ratings & Reviews
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Real feedback from Andour Heights residents
            </p>
          </div>
          <button
            onClick={() => onOpenReviewModal(provider)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 hover:bg-emerald-100/60 transition-colors cursor-pointer"
          >
            Write a Review
          </button>
        </div>

        {/* Overall Score + Distribution Bars */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center sm:text-left shrink-0">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-3xl font-extrabold text-slate-900 tabular-nums font-display">
              <Star className="w-7 h-7 fill-amber-400 text-amber-500" />
              <span>{provider.rating.toFixed(1)}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Distribution Bars (5★ to 1★) */}
          <div className="w-full flex-1 space-y-1.5 text-[11px] text-slate-600">
            {[
              { star: '5 ★', count: dist.star5 },
              { star: '4 ★', count: dist.star4 },
              { star: '3 ★', count: dist.star3 },
              { star: '2 ★', count: dist.star2 },
              { star: '1 ★', count: dist.star1 },
            ].map((item) => {
              const pct = getPercentage(item.count);
              return (
                <div key={item.star} className="flex items-center gap-2">
                  <span className="w-6 font-medium text-slate-700">{item.star}</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-right tabular-nums text-slate-400">{item.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews Horizontal Scroll Header Subtext */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span className="font-medium text-slate-600">Resident Experiences ({provider.reviews.length})</span>
          <span className="text-slate-400">Swipe horizontally →</span>
        </div>

        {/* Individual Review Cards - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none no-scrollbar snap-x snap-mandatory -mx-1 px-1">
          {provider.reviews.map((rev) => (
            <div
              key={rev.id}
              className="w-[280px] shrink-0 snap-start p-4 bg-white border border-slate-200/80 rounded-2xl shadow-2xs space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <strong className="text-slate-900 block leading-tight truncate">{rev.authorName}</strong>
                      <span className="text-[10px] text-slate-400 font-medium truncate block">
                        {rev.authorFlat} · Verified Neighbour
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 tabular-nums shrink-0 ml-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span className="font-semibold text-slate-800 text-xs">{rev.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal line-clamp-3">
                  {rev.comment}
                </p>
              </div>

              {/* Helpful button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{rev.date}</span>
                <button
                  onClick={() => onToggleReviewHelpful(provider.id, rev.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    rev.isHelpfulByUser
                      ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
