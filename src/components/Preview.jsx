import React from 'react';
import { ScoreboardImage } from './ScoreboardImage';

export const Preview = ({ scoreboard, zoom }) => {
  return (
    <div className="flex-1 h-full bg-[#0a0a0a] overflow-auto relative flex items-center justify-center p-8 custom-scrollbar">
      <div 
        className="transition-transform duration-200 ease-out origin-center"
        style={{ 
          transform: `scale(${zoom})`,
          margin: zoom > 1 ? 'auto' : undefined
        }}
      >
        <ScoreboardImage scoreboard={scoreboard} />
      </div>
    </div>
  );
};
