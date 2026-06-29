import React from 'react';
import { ScoreboardImage } from './ScoreboardImage';

export const Preview = ({ scoreboard, zoom }) => {
  return (
    <div className="flex-1 h-full bg-[#0a0a0a] overflow-auto relative flex custom-scrollbar">
      {/* 
        Using m-auto on the child solves the infamous flexbox cutoff bug. 
        It perfectly centers the scoreboard on large screens, but gracefully aligns 
        it to the top-left on small screens so you can still scroll to see everything! 
      */}
      <div className="m-auto w-fit h-fit p-8">
        <div 
          className="transition-transform duration-200 ease-out origin-center shadow-2xl"
          style={{ transform: `scale(${zoom})` }}
        >
          <ScoreboardImage scoreboard={scoreboard} />
        </div>
      </div>
    </div>
  );
};
