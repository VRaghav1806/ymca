import React from 'react';
import { SectionCard } from './SectionCard';
import { InputField } from './InputField';
import { uppercaseFormat } from '../utils/helpers';

export const TournamentEditor = React.memo(({ scoreboard, onChange }) => {
  const handleChange = (field) => (value) => {
    onChange({ ...scoreboard, [field]: value });
  };

  const handleUpperChange = (field) => (value) => {
    onChange({ ...scoreboard, [field]: uppercaseFormat(value) });
  };

  return (
    <SectionCard title="Tournament Details" defaultOpen={true}>
      <div className="space-y-1">
        <InputField 
          label="Category" 
          value={scoreboard.category} 
          onChange={handleUpperChange('category')} 
          placeholder="e.g. MEN OPEN" 
        />
        <InputField 
          label="Venue" 
          value={scoreboard.venue} 
          onChange={handleUpperChange('venue')} 
          placeholder="e.g. YMCA ARENA" 
        />
        <InputField 
          label="Date" 
          value={scoreboard.date} 
          onChange={handleUpperChange('date')} 
          placeholder="e.g. OCT 24, 2026" 
        />
      </div>
    </SectionCard>
  );
});
