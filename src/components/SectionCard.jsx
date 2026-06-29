import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const SectionCard = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card rounded-lg shadow-md border border-border overflow-hidden mb-4 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-border/50 transition-colors cursor-pointer"
      >
        <h3 className="font-semibold text-card-foreground">{title}</h3>
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 border-t border-border bg-background/50">
          {children}
        </div>
      </div>
    </div>
  );
};
