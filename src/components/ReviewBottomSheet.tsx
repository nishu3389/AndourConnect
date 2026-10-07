import React, { useState } from 'react';
import { ServiceProvider, Review } from '../types';
import { X, Star, Heart, CheckCircle2 } from 'lucide-react';

interface ReviewBottomSheetProps {
  provider: ServiceProvider;
  residentName: string;
  residentFlat: string;
  onClose: () => void;
  onSubmitReview: (providerId: string, review: Review) => void;
}

export const ReviewBottomSheet: React.FC<ReviewBottomSheetProps> = ({
  provider,
  residentName,
  residentFlat,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratingLabels: Record<number, string> = {
    1: '1 – Poor',
    2: '2 – Fair',
    3: '3 – Good',
    4: '4 – Very Good',
    5: '5 – Excellent',
  };

  const activeRating = hoverRating || rating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      authorName: residentName,
      authorFlat: residentFlat,
      rating,
      date: 'Just now',
      comment: comment.trim(),
      helpfulCount: 0,
      isHelpfulByUser: false,
    };

    onSubmitReview(provider.id, newReview);
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Handle bar on mobile */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-display">
              How was your experience?
            </h3>
            <p className="text-xs text-slate-500">
              Reviewing <strong className="text-slate-800">{provider.name}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Review Submitted!</h4>
              <p className="text-xs text-slate-500">
                Thank you for supporting fellow neighbours in Andour Heights.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star Rating Area */}
              <div className="text-center space-y-2 py-1">
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1.5 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= activeRating
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-slate-200 stroke-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="text-xs font-bold text-emerald-800 tracking-wide">
                  {ratingLabels[activeRating]}
                </div>
              </div>

              {/* Reviewer Note */}
              <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600 border border-slate-100 flex items-center justify-between">
                <span>Posting as: <strong>{residentName}</strong> ({residentFlat})</span>
                <span className="text-emerald-700 font-semibold">Verified Resident</span>
              </div>

              {/* Comment Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Share your experience with your neighbours...
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell neighbours about quality, timeliness, pricing, and how your interaction went..."
                  className="w-full text-xs sm:text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={!comment.trim()}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-[0.98]"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
