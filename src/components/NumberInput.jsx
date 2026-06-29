import React from 'react';

export const NumberInput = React.memo(({ label, value, onChange, placeholder, disabled }) => {
  return (
    <div className={`flex flex-col gap-1 mb-3 ${disabled ? 'opacity-50' : ''}`}>
      <label className="text-xs text-gray-400 font-semibold tracking-wide uppercase text-center">{label}</label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const val = e.target.value.replace(/[^0-9]/g, '');
          onChange(val);
        }}
        placeholder={placeholder}
        className="w-full bg-input border border-border rounded-md py-2 px-2 text-center text-lg font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors disabled:cursor-not-allowed"
      />
    </div>
  );
});
