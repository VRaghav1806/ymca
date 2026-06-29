import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Preview } from './Preview';
import { DownloadButton } from './DownloadButton';
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

  const [activeTab, setActiveTab] = useState('edit');

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-background">
      {/* Mobile Tabs */}
      <div className="md:hidden flex border-b border-border bg-background z-30 shrink-0">
        <button 
          className={`flex-1 py-4 font-bold text-sm tracking-wider uppercase transition-colors ${activeTab === 'edit' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('edit')}
        >
          Editor
        </button>
        <button 
          className={`flex-1 py-4 font-bold text-sm tracking-wider uppercase transition-colors ${activeTab === 'preview' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className={`${activeTab === 'edit' ? 'flex' : 'hidden'} md:flex h-full w-full md:w-[35%] lg:w-[30%] shrink-0`}>
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
      </div>
      
      <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} md:flex h-full flex-1 min-w-0 relative`}>
        <Preview scoreboard={scoreboard} zoom={zoom} />
      </div>
    </div>
  );
};
