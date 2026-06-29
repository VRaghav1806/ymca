import React from 'react';
import { ScoreboardImage } from './ScoreboardImage';

export const Preview = ({ scoreboard, zoom }) => {
  // Calculate the empty DOM space created by the CSS transform scale
  // Scoreboard is hardcoded to 1080px wide
  const emptyX = (1080 - (1080 * zoom)) / 2;

  return (
    <div className="flex-1 h-full bg-[#0a0a0a] overflow-auto relative flex custom-scrollbar p-8">
      {/* m-auto on a tightly fitting wrapper ensures perfect centering on large screens and safe top-left alignment on small screens */}
      <div className="m-auto w-fit h-fit">
        <div 
          className="transition-transform duration-200 ease-out origin-top shadow-2xl"
          style={{ 
            transform: `scale(${zoom})`,
            // Dynamically collapse the empty DOM space so the wrapper shrinks to fit the scaled image
            marginLeft: `-${emptyX}px`,
            marginRight: `-${emptyX}px`
          }}
        >
          <ScoreboardImage scoreboard={scoreboard} />
        </div>
      </div>
    </div>
  );
};
