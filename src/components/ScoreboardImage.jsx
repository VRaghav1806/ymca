import React from 'react';
import { Clock, Calendar, MapPin, Users, Trophy } from 'lucide-react';

export const ScoreboardImage = React.memo(({ scoreboard }) => {
  return (
    <div id="scoreboard-preview-area" className="w-[1080px] bg-[#0a0a0a] text-white font-oswald p-8 flex flex-col relative" style={{ width: '1080px', minHeight: '1920px' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col flex-1 w-full">
         {/* Header Section from Image */}
         <div className="w-full mb-8 relative flex justify-center shrink-0">
            <img 
              src={new URL('../assets/header.png', import.meta.url).href} 
              alt="Tournament Header" 
              className="w-full h-auto object-cover border-b-[3px] border-[#FFD700]"
              onError={(e) => {
                 e.target.onerror = null;
                 e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="300" fill="%23111"><rect width="1080" height="300" /><text x="50%" y="50%" fill="white" font-size="30" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">Please save your header image as src/assets/header.png</text></svg>';
              }}
            />
         </div>

         {/* Matches Grid */}
         <div className="flex-1 flex flex-col justify-start gap-6 py-4">
            {scoreboard.matches.map((match, i) => (
               <div key={match.id} className="w-full border-[3px] border-[#FFD700] flex flex-col bg-[#05070a] shadow-xl">
                  {/* Match Header (Top Row) */}
                  <div className="flex justify-between items-center px-4 h-[46px] border-b-[3px] border-[#FFD700]">
                     {/* Match Pill */}
                     <div className="border-[1.5px] border-[#FFD700] rounded-full px-5 h-[30px] flex items-center justify-center">
                        <span className="text-[#FFD700] text-[1.1rem] font-bold tracking-widest uppercase leading-none relative bottom-[2px]">MATCH {i + 1}</span>
                     </div>
                     
                     {/* Time */}
                     <div className="flex items-center justify-center gap-[6px]">
                        <Clock size={20} className="text-[#FFD700] relative bottom-[1px]" strokeWidth={2.5} />
                        <span className="text-white text-[1.3rem] font-bold tracking-wider leading-none relative bottom-[2px]">{match.time}</span>
                     </div>
                     
                     {/* Court Pill */}
                     <div className="border-[1.5px] border-[#FFD700] rounded-full px-5 h-[30px] flex items-center justify-center">
                        <span className="text-[#FFD700] text-[1.1rem] font-bold tracking-widest uppercase leading-none relative bottom-[2px]">{match.court}</span>
                     </div>
                  </div>
                  
                  {/* Match Table Data */}
                  <div className="flex w-full h-[120px]">
                     {/* Left side: Teams and scores */}
                     <div className="flex-1 flex flex-col">
                        {/* Header Row */}
                        <div className="flex border-b-[3px] border-[#FFD700] h-[36px]">
                           <div className="w-[50%] flex items-center justify-center border-r-[3px] border-[#FFD700]">
                              <span className="text-[#FFD700] text-[1.1rem] font-bold tracking-widest leading-none relative bottom-[1px]">TEAM</span>
                           </div>
                           <div className="w-[25%] flex items-center justify-center border-r-[3px] border-[#FFD700]">
                              <span className="text-[#FFD700] text-[1.1rem] font-bold tracking-widest leading-none relative bottom-[1px]">HALF TIME</span>
                           </div>
                           <div className="w-[25%] flex items-center justify-center">
                              <span className="text-[#FFD700] text-[1.1rem] font-bold tracking-widest leading-none relative bottom-[1px]">FULL TIME</span>
                           </div>
                        </div>
                        {match.isWalkover ? (
                           <div className="flex h-[84px]">
                              {/* Team Column */}
                              <div className="w-[50%] flex flex-col border-r-[3px] border-[#FFD700]">
                                 <div className="flex-1 flex items-center px-6 border-b-[3px] border-[#FFD700]">
                                    <span className="text-white text-[1.35rem] font-bold uppercase tracking-wider leading-none relative bottom-[1px]">{match.team1}</span>
                                 </div>
                                 <div className="flex-1 flex items-center px-6">
                                    <span className="text-white text-[1.35rem] font-bold uppercase tracking-wider leading-none relative bottom-[1px]">{match.team2}</span>
                                 </div>
                              </div>
                              {/* Half Time Walkover */}
                              <div className="w-[25%] flex items-center justify-center border-r-[3px] border-[#FFD700]">
                                 <span className="text-gray-300 text-[1.25rem] font-bold uppercase tracking-widest leading-none relative bottom-[1px]">WALK OVER</span>
                              </div>
                              {/* Full Time Walkover */}
                              <div className="w-[25%] flex items-center justify-center">
                                 <span className="text-gray-300 text-[1.25rem] font-bold uppercase tracking-widest leading-none relative bottom-[1px]">WALK OVER</span>
                              </div>
                           </div>
                        ) : (
                           <>
                              {/* Team 1 Row */}
                              <div className="flex border-b-[3px] border-[#FFD700] h-[42px]">
                                 <div className="w-[50%] flex items-center px-6 border-r-[3px] border-[#FFD700]">
                                    <span className="text-white text-[1.35rem] font-bold uppercase tracking-wider leading-none relative bottom-[1px]">{match.team1}</span>
                                 </div>
                                 <div className="w-[25%] flex items-center justify-center border-r-[3px] border-[#FFD700]">
                                    <span className="text-white text-[1.35rem] font-bold leading-none relative bottom-[1px]">{match.half1}</span>
                                 </div>
                                 <div className="w-[25%] flex items-center justify-center">
                                    <span className="text-white text-[1.35rem] font-bold leading-none relative bottom-[1px]">{match.full1}</span>
                                 </div>
                              </div>
                              {/* Team 2 Row */}
                              <div className="flex h-[42px]">
                                 <div className="w-[50%] flex items-center px-6 border-r-[3px] border-[#FFD700]">
                                    <span className="text-white text-[1.35rem] font-bold uppercase tracking-wider leading-none relative bottom-[1px]">{match.team2}</span>
                                 </div>
                                 <div className="w-[25%] flex items-center justify-center border-r-[3px] border-[#FFD700]">
                                    <span className="text-white text-[1.35rem] font-bold leading-none relative bottom-[1px]">{match.half2}</span>
                                 </div>
                                 <div className="w-[25%] flex items-center justify-center">
                                    <span className="text-white text-[1.35rem] font-bold leading-none relative bottom-[1px]">{match.full2}</span>
                                 </div>
                              </div>
                           </>
                        )}
                     </div>
                     
                     {/* Right side: WINNING TEAM */}
                     <div className="w-[280px] border-l-[3px] border-[#FFD700] flex flex-col bg-[#4a0000]">
                        <div className="h-[36px] border-b-[3px] border-[#FFD700] flex items-center justify-center bg-[#7a0000]">
                           <span className="text-[#FFD700] text-[1.1rem] font-bold tracking-widest leading-none relative bottom-[1px]">WINNING TEAM</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-3 px-4">
                           {(match.isWalkover ? match.walkoverWinner : match.winner) && (
                             <>
                               <Trophy size={28} className="text-[#FFD700] shrink-0 relative bottom-[1px]" />
                               <span className="text-[#FFD700] text-3xl font-bold text-center uppercase drop-shadow-xl tracking-wider leading-none relative bottom-[3px]">
                                 {match.isWalkover ? match.walkoverWinner : match.winner}
                               </span>
                             </>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Footer */}
         <div className="mt-8 border-[4px] border-[#FFD700] rounded-[2rem] flex items-center justify-between px-6 py-6 bg-black shadow-2xl shrink-0">
            <div className="flex items-center gap-3">
               <Calendar size={40} className="text-[#FFD700] shrink-0" />
               <div className="flex gap-2 items-center">
                  <span className="text-gray-400 text-[1.4rem] font-bold tracking-widest shrink-0">DATE:</span>
                  <span className="text-white text-2xl font-bold border-b-4 border-gray-600 min-w-[140px] pb-1">{scoreboard.date}</span>
               </div>
            </div>
            <div className="w-[3px] h-12 bg-[#FFD700] shrink-0"></div>
            <div className="flex items-center gap-3">
               <MapPin size={40} className="text-[#FFD700] shrink-0" />
               <div className="flex gap-2 items-center">
                  <span className="text-gray-400 text-[1.4rem] font-bold tracking-widest shrink-0">VENUE:</span>
                  <span className="text-white text-2xl font-bold border-b-4 border-gray-600 min-w-[160px] pb-1 text-center truncate">{scoreboard.venue}</span>
               </div>
            </div>
            <div className="w-[3px] h-12 bg-[#FFD700] shrink-0"></div>
            <div className="flex items-center gap-3">
               <Users size={40} className="text-[#FFD700] shrink-0" />
               <div className="flex gap-2 items-center">
                  <span className="text-gray-400 text-[1.4rem] font-bold tracking-widest shrink-0">CATEGORY:</span>
                  <span className="text-white text-2xl font-bold border-b-4 border-gray-600 min-w-[140px] pb-1 truncate">{scoreboard.category}</span>
               </div>
            </div>
         </div>

         {/* Bottom-most text */}
         <div className="text-center mt-8 text-[#FFD700] text-[1.4rem] font-bold tracking-[0.3em] uppercase drop-shadow-md shrink-0">
            ★ COIMBATORE BASKETBALL. OUR PRIDE. OUR GAME. ★
         </div>
      </div>
    </div>
  );
});
