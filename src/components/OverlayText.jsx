import React from 'react';

export const OverlayText = React.memo(({ text, x, y, fontSize, color = '#ffffff', weight = 'bold', align = 'center', width }) => {
  if (!text && text !== 0) return null;

  return (
    <div
      className="font-oswald tracking-wide"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        fontSize: `${fontSize}px`,
        color,
        fontWeight: weight,
        textAlign: align,
        width: width ? `${width}px` : 'auto',
        transform: align === 'center' ? 'translateX(-50%)' : (align === 'right' ? 'translateX(-100%)' : 'none'),
        whiteSpace: 'nowrap',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        pointerEvents: 'none',
      }}
    >
      {text}
    </div>
  );
});
