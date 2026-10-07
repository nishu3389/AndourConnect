import React from 'react';
import { Review, ServiceProvider } from '../types';
import { X, Star, MessageSquare } from 'lucide-react';

interface MyReviewsModalProps {
  onClose: () => void;
  providers: ServiceProvider[];
  residentName: string;
}

export const MyReviewsModal: React.FC<MyReviewsModalProps> = ({
  onClose,
  providers,
  residentName,
}) => {
  // Collect all reviews authored by the resident or sample verified resident reviews
  const myReviews: { providerName: string; review: Review }[] = [];

  providers.forEach((prov) => {
    prov.reviews.forEach((rev) => {
      if (rev.authorName.toLowerCase().includes('sharma') || rev.authorName === residentName) {
        myReviews.push({ providerName: prov.name, review: rev });
      }
    });
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-6 duration-300">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            <h3 className="font-bold text-base text-slate-900 font-display">
              My Resident Reviews ({myReviews.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 flex-1 scrollbar-none">
          {myReviews.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-10">
              You haven't reviewed any businesses yet. Explore and rate your neighbours!
            </p>
          ) : (
            myReviews.map(({ providerName, review }) => (
              <div key={review.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-slate-900">{providerName}</strong>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-slate-800">{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600">{review.comment}</p>
                <span className="text-[10px] text-slate-400 block">{review.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
