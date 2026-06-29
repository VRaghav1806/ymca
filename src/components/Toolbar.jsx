import React from 'react';
import { Undo, Redo, ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react';

export const Toolbar = ({ onUndo, onRedo, canUndo, canRedo, onZoomIn, onZoomOut, onResetZoom, onResetForm, zoom }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-card border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 rounded-md hover:bg-border/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-300 cursor-pointer"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 rounded-md hover:bg-border/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-300 cursor-pointer"
          title="Redo"
        >
          <Redo size={18} />
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          onClick={onResetForm}
          className="p-2 rounded-md hover:bg-red-900/30 text-red-400 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
          title="Reset Form"
        >
          <RotateCcw size={16} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-mono w-12 text-right">{Math.round(zoom * 100)}%</span>
        <button
          onClick={onZoomOut}
          className="p-2 rounded-md hover:bg-border/50 transition-colors text-gray-300 cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={onResetZoom}
          className="p-2 rounded-md hover:bg-border/50 transition-colors text-gray-300 cursor-pointer"
          title="Reset Zoom"
        >
          <Maximize size={18} />
        </button>
        <button
          onClick={onZoomIn}
          className="p-2 rounded-md hover:bg-border/50 transition-colors text-gray-300 cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
      </div>
    </div>
  );
};
