import React from 'react';

export const InputField = React.memo(({ label, value, onChange, icon: Icon, placeholder }) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label className="text-xs text-gray-400 font-semibold tracking-wide uppercase">{label}</label>
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 text-gray-500" size={16} />}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-input border border-border rounded-md py-2 ${Icon ? 'pl-9' : 'pl-3'} pr-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
        />
      </div>
    </div>
  );
});
