import React from 'react';
import { SectionCard } from './SectionCard';
import { InputField } from './InputField';
import { NumberInput } from './NumberInput';
import { uppercaseFormat } from '../utils/helpers';
import { Clock, MapPin, Trophy } from 'lucide-react';

export const MatchEditor = React.memo(({ match, index, onChange }) => {
  const handleChange = (field) => (value) => {
    onChange(index, { [field]: value });
  };

  const handleTeamChange = (field) => (value) => {
    onChange(index, { [field]: uppercaseFormat(value) });
  };

  return (
    <SectionCard title={`Match ${index + 1}`}>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <InputField 
          label="Time" 
          value={match.time} 
          onChange={handleChange('time')} 
          icon={Clock}
          placeholder="e.g. 10:00 AM" 
        />
        <InputField 
          label="Court" 
          value={match.court} 
          onChange={handleChange('court')} 
          icon={MapPin}
          placeholder="e.g. COURT 1" 
        />
      </div>

      <div className="space-y-4">
        {/* Team 1 */}
        <div className="bg-background/80 p-3 rounded-md border border-border">
          <InputField 
            label="Team 1 Name" 
            value={match.team1} 
            onChange={handleTeamChange('team1')} 
            placeholder="e.g. LAKERS" 
          />
          <div className="grid grid-cols-2 gap-3 mt-2">
            <NumberInput label="Half Time" value={match.half1} onChange={handleChange('half1')} placeholder="0" disabled={match.isWalkover} />
            <NumberInput label="Full Time" value={match.full1} onChange={handleChange('full1')} placeholder="0" disabled={match.isWalkover} />
          </div>
        </div>

        {/* Team 2 */}
        <div className="bg-background/80 p-3 rounded-md border border-border">
          <InputField 
            label="Team 2 Name" 
            value={match.team2} 
            onChange={handleTeamChange('team2')} 
            placeholder="e.g. BULLS" 
          />
          <div className="grid grid-cols-2 gap-3 mt-2">
            <NumberInput label="Half Time" value={match.half2} onChange={handleChange('half2')} placeholder="0" disabled={match.isWalkover} />
            <NumberInput label="Full Time" value={match.full2} onChange={handleChange('full2')} placeholder="0" disabled={match.isWalkover} />
          </div>
        </div>
      </div>

      {/* Winner & Walkover */}
      <div className="mt-4 pt-3 border-t border-border flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-yellow-500" />
            <span className="text-xs text-gray-400 font-semibold tracking-wide uppercase">Winner {match.isWalkover ? '(Manual)' : '(Auto)'}</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer bg-input px-2 py-1 rounded border border-border hover:bg-border transition-colors">
            <input 
               type="checkbox" 
               checked={match.isWalkover || false} 
               onChange={(e) => onChange(index, { isWalkover: e.target.checked })} 
               className="accent-yellow-500"
            />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Walkover</span>
          </label>
        </div>
        
        {match.isWalkover ? (
          <select 
             className="w-full bg-input text-white font-bold border border-border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-primary"
             value={match.walkoverWinner || ''}
             onChange={(e) => onChange(index, { walkoverWinner: e.target.value })}
          >
             <option value="">Select Winner...</option>
             {match.team1 && <option value={match.team1}>{match.team1}</option>}
             {match.team2 && <option value={match.team2}>{match.team2}</option>}
          </select>
        ) : (
          <div className={`p-2 rounded-md text-center font-bold text-lg border ${match.winner ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' : 'bg-input text-gray-500 border-border'}`}>
            {match.winner || 'TBD'}
          </div>
        )}
      </div>
    </SectionCard>
  );
});
