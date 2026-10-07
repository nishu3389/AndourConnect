import React from 'react';
import { X, HelpCircle, PhoneCall, Shield, MessageCircle } from 'lucide-react';

interface HelpSupportModalProps {
  onClose: () => void;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-6 duration-300">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-base text-slate-900 font-display">
              Help & Resident Support
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-600 flex-1 scrollbar-none">
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1 text-emerald-950">
            <h4 className="font-bold text-sm">Andour Connect Purpose</h4>
            <p className="leading-relaxed">
              This app is a hyperlocal directory exclusive to residents of Signature Global Andour Heights, Sector 71, Gurugram.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Frequently Asked Questions</h4>
            
            <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 space-y-1">
              <strong className="text-slate-800 block">How do I contact a provider?</strong>
              <p>You can tap "Message" to chat in real time, or tap "Call" to ring them directly on their registered phone number.</p>
            </div>

            <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 space-y-1">
              <strong className="text-slate-800 block">Who can list a business?</strong>
              <p>Only verified residents who live in Andour Heights towers can submit home businesses.</p>
            </div>

            <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 space-y-1">
              <strong className="text-slate-800 block">Society Resting Hours:</strong>
              <p>Please refrain from unscheduled door visits between 1:30 PM – 4:00 PM and after 9:00 PM.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
