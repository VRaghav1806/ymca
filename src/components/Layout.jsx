import React from 'react';
import { Sidebar } from './Sidebar';
import { Preview } from './Preview';
import { useScoreboard } from '../hooks/useScoreboard';

export const Layout = () => {
  const { 
    scoreboard, 
    updateScoreboard, 
    updateMatch,
    addMatch,
    removeMatch,
    undo, redo, canUndo, canRedo,
    zoom, handleZoomIn, handleZoomOut, resetZoom, resetForm
  } = useScoreboard();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        scoreboard={scoreboard} 
        updateScoreboard={updateScoreboard} 
        updateMatch={updateMatch} 
        addMatch={addMatch}
        removeMatch={removeMatch}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        zoom={zoom}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        resetZoom={resetZoom}
        resetForm={resetForm}
      />
      <Preview scoreboard={scoreboard} zoom={zoom} />
    </div>
  );
};
