import React from 'react';
import { Wifi, Signal, BatteryMedium } from 'lucide-react';

interface AndroidStatusBarProps {
  darkIcons?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({ darkIcons = true }) => {
  return (
    <div
      className={`w-full px-5 pt-2 pb-1.5 flex items-center justify-between text-xs select-none transition-colors ${
        darkIcons ? 'text-slate-800' : 'text-white'
      }`}
    >
      {/* Clock */}
      <span className="font-semibold text-[13px] tracking-tight">9:41</span>

      {/* Camera cutout notch simulation placeholder */}
      <div className="w-3.5 h-3.5 rounded-full bg-black/40 border border-white/20 mx-auto opacity-0" />

      {/* System status icons: 5G, Wi-Fi, Battery */}
      <div className="flex items-center gap-1.5 font-medium text-[11px]">
        <span className="text-[10px] font-bold tracking-tighter">5G</span>
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5 ml-0.5">
          <span className="text-[10px] font-semibold tabular-nums">96%</span>
          <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
            <div className="w-full h-full bg-current rounded-2xs" />
          </div>
        </div>
      </div>
    </div>
  );
};
