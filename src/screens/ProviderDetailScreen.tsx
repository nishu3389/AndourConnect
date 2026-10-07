import React, { useState, useMemo } from 'react';
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
  Copy,
  Check,
  Link2,
  X,
  MessageCircle,
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedDeepLink, setCopiedDeepLink] = useState(false);

  const bannerImage = getRelevantBannerImage(provider);
  const serviceItems = getProviderServiceItems(provider);

  const cleanPhone = provider.phone.replace(/[^0-9]/g, '').slice(-10);
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
    `Hello ${provider.ownerName}, I live in Andour Heights and saw your ${provider.name} profile on Andour Connect. I'd like to check your services!`
  )}`;

  const totalReviews = provider.reviewCount || provider.reviews.length;
  const dist = provider.distribution;

  // Generate a rich temporary deep-link text describing the business
  const shareData = useMemo(() => {
    // Unique temporary session token
    const tempToken = Math.random().toString(36).substring(2, 7).toUpperCase();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const deepLinkUrl = `${origin}${path}?provider=${encodeURIComponent(provider.id)}&ref=${tempToken}`;

    const topServices = provider.services.slice(0, 3).map((s) => `  • ${s}`).join('\n');
    const startingRate = serviceItems[0]?.price ? ` (Rates from ${serviceItems[0].price})` : '';

    const text = `🏡 *${provider.name}* (${provider.category})
⭐ ${provider.rating.toFixed(1)}/5 (${totalReviews} reviews) · Verified Resident Business
📍 Flat ${provider.flatNo} (${provider.tower}), Signature Global Andour Heights
👤 Resident Owner: ${provider.ownerName}
📞 Phone: ${provider.phone}

✨ *Top Services:*
${topServices}${startingRate}

🔗 *View profile, menu & chat directly on Andour Connect:*
${deepLinkUrl}

_(Temporary link active for Andour Heights residents · Token #${tempToken})_`;

    return { text, deepLinkUrl, tempToken };
  }, [provider, totalReviews, serviceItems]);

  const handleOpenShare = () => {
    setShowShareModal(true);
  };

  const handleCopyShareText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.text);
      setCopiedDeepLink(true);
      setShareCopied(true);
      setTimeout(() => setCopiedDeepLink(false), 2500);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${provider.name} · Andour Heights`,
          text: shareData.text,
          url: shareData.deepLinkUrl,
        });
      } catch (e) {
        handleCopyShareText();
      }
    } else {
      handleCopyShareText();
    }
  };

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
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(provider.id)}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors text-white cursor-pointer"
              aria-label="Save"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'
                }`}
              />
            </button>

            {/* Share Button in Top Bar */}
            <button
              onClick={handleOpenShare}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors text-white cursor-pointer"
              aria-label="Share business deep-link"
              title="Share temporary deep-link text"
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
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Deep-link text copied to clipboard!</span>
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

        {/* Share Button: Generates Temporary Deep-Link Text */}
        <button
          onClick={handleOpenShare}
          className="w-full mt-1.5 py-2.5 px-3 bg-emerald-50/90 hover:bg-emerald-100/90 border border-emerald-200/80 text-emerald-800 font-semibold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer group"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
          <span>Share Deep-Link with Neighbours</span>
        </button>

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

      {/* 7. TEMPORARY DEEP-LINK SHARE BOTTOM SHEET */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none animate-in slide-in-from-bottom-5 duration-250 border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle on mobile */}
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2 sm:hidden" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 font-display leading-tight">
                    Share Business Deep-Link
                  </h3>
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                    Temporary link for WhatsApp & messaging apps
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close share sheet"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Generated Deep-Link Text Preview Card */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Generated Message Preview</span>
                </span>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 font-medium px-2 py-0.5 rounded-full border border-emerald-100">
                  Token #{shareData.tempToken}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed select-all max-h-48 overflow-y-auto">
                {shareData.text}
              </div>
            </div>

            {/* Quick Share Actions */}
            <div className="space-y-2 pt-1">
              {/* WhatsApp Share Button */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareData.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setShowShareModal(false);
                  setShareCopied(true);
                  setTimeout(() => setShareCopied(false), 2500);
                }}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                {/* Copy Text Button */}
                <button
                  onClick={handleCopyShareText}
                  className={`py-2.5 px-3 border font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    copiedDeepLink
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  {copiedDeepLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>

                {/* Native / Other Apps Share Button */}
                <button
                  onClick={handleNativeShare}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Other Apps</span>
                </button>
              </div>
            </div>

            {/* Security & Expiry Note */}
            <div className="p-2.5 bg-slate-100/70 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
              <span>
                Temporary deep-link is active for residents of Signature Global Andour Heights.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
