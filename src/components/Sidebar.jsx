import React from 'react';
import { TournamentEditor } from './TournamentEditor';
import { MatchEditor } from './MatchEditor';
import { DownloadButton } from './DownloadButton';
import { Toolbar } from './Toolbar';
import { Plus, Minus } from 'lucide-react';

export const Sidebar = ({ 
  scoreboard, 
  updateScoreboard, 
  updateMatch,
  addMatch,
  removeMatch,
  undo, redo, canUndo, canRedo, 
  zoom, handleZoomIn, handleZoomOut, resetZoom, resetForm
}) => {
  return (
    <div className="w-full md:w-[35%] lg:w-[30%] h-full bg-background border-r border-border flex flex-col relative z-20 shadow-xl overflow-hidden">
      <Toolbar 
        onUndo={undo} 
        onRedo={redo} 
        canUndo={canUndo} 
        canRedo={canRedo} 
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={resetZoom}
        onResetForm={resetForm}
      />
      
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <h2 className="text-xl font-bold mb-6 text-foreground tracking-tight">YMCA Scoreboard Editor</h2>
        
        <TournamentEditor scoreboard={scoreboard} onChange={updateScoreboard} />
        
        <div className="mt-6 mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Matches</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-primary/20 text-primary px-2 py-1 rounded-full">{scoreboard.matches.length} MATCHES</span>
            <div className="flex items-center bg-input border border-border rounded-md overflow-hidden">
              <button 
                onClick={removeMatch} 
                disabled={scoreboard.matches.length === 0}
                className="p-1 hover:bg-border transition-colors disabled:opacity-50 cursor-pointer text-gray-300"
                title="Remove Match"
              >
                <Minus size={16} />
              </button>
              <div className="w-px h-4 bg-border" />
              <button 
                onClick={addMatch} 
                className="p-1 hover:bg-border transition-colors cursor-pointer text-gray-300"
                title="Add Match"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {scoreboard.matches.map((match, index) => (
          <MatchEditor 
            key={match.id} 
            match={match} 
            index={index} 
            onChange={updateMatch} 
          />
        ))}

        <DownloadButton className="mt-6 mb-4" />
      </div>
    </div>
  );
};
