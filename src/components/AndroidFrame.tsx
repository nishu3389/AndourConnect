import React, { useState } from 'react';
import { Smartphone, Maximize2, Minimize2 } from 'lucide-react';
import { AndroidStatusBar } from './AndroidStatusBar';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const [isFramed, setIsFramed] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-0 md:p-6 select-none font-sans overflow-x-hidden">
      {/* Desktop Device View Mode Switcher Header */}
      <aside aria-label="Device Controls" className="hidden md:flex items-center justify-between w-full max-w-sm mb-3 px-2 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-neutral-200">Andour Connect</span>
          <span className="text-neutral-500">· Android Mobile</span>
        </div>

        <button
          onClick={() => setIsFramed(!isFramed)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors text-[11px] font-medium cursor-pointer"
        >
          {isFramed ? (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Full Screen</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
      </aside>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col bg-white overflow-hidden ${
          isFramed
            ? 'max-w-[420px] h-[100dvh] md:h-[860px] md:rounded-[44px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_12px_#1c1c1e,0_0_0_14px_#38383a]'
            : 'max-w-4xl min-h-[92vh] rounded-2xl shadow-2xl'
        }`}
      >
        {/* Status Bar */}
        <header className="shrink-0 bg-white z-40 border-b border-transparent">
          <AndroidStatusBar darkIcons={true} />
        </header>

        {/* Screen Content Viewport */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>

        {/* Android Gesture Bar */}
        <footer aria-label="System Navigation" className="shrink-0 bg-white py-1.5 flex justify-center z-40">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </footer>
      </div>
    </div>
  );
};
