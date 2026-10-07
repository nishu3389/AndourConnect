import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onChange, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/60 ${className}`}
      role="group"
      aria-label="View mode toggle"
    >
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={`p-1.5 rounded-md transition-all cursor-pointer ${
          mode === 'grid'
            ? 'bg-white text-slate-900 shadow-2xs font-semibold'
            : 'text-slate-400 hover:text-slate-700'
        }`}
        title="Grid view"
        aria-label="Grid view"
      >
        <LayoutGrid className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => onChange('list')}
        className={`p-1.5 rounded-md transition-all cursor-pointer ${
          mode === 'list'
            ? 'bg-white text-slate-900 shadow-2xs font-semibold'
            : 'text-slate-400 hover:text-slate-700'
        }`}
        title="List view"
        aria-label="List view"
      >
        <List className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
