const baseMatch = {
  team1: { x: 180, y: 390, fontSize: 26, weight: '600', align: 'center', width: 280, color: '#FFFFFF' }, // Wait, in the image TEAM column is wider, centered? Or left aligned? Let's use left align
  team2: { x: 180, y: 440, fontSize: 26, weight: '600', align: 'center', width: 280, color: '#FFFFFF' },
  half1: { x: 410, y: 390, fontSize: 26, weight: '600', align: 'center', width: 100, color: '#FFFFFF' },
  half2: { x: 410, y: 440, fontSize: 26, weight: '600', align: 'center', width: 100, color: '#FFFFFF' },
  full1: { x: 610, y: 390, fontSize: 26, weight: '600', align: 'center', width: 100, color: '#FFFFFF' },
  full2: { x: 610, y: 440, fontSize: 26, weight: '600', align: 'center', width: 100, color: '#FFFFFF' },
  winner: { x: 860, y: 415, fontSize: 28, weight: '700', align: 'center', width: 260, color: '#FFD700' }, // Gold
  time: { x: 540, y: 330, fontSize: 22, weight: '600', align: 'center', width: 200, color: '#FFFFFF' },
};

export const getDynamicMatchPosition = (index) => {
  const offsetY = index * 235; // The gap between matches is larger in this new blank image. Let's estimate 235 based on 6 matches fitting in the available space.
  const match = {};
  for (const [key, val] of Object.entries(baseMatch)) {
    match[key] = { ...val, y: val.y + offsetY };
  }
  return match;
};

export const positions = {
  // Title, Subtitle, Year are baked in
  date: { x: 230, y: 1775, fontSize: 22, weight: '600', align: 'left', width: 200, color: '#FFFFFF' },
  venue: { x: 560, y: 1775, fontSize: 22, weight: '600', align: 'center', width: 300, color: '#FFFFFF' },
  category: { x: 880, y: 1775, fontSize: 22, weight: '600', align: 'left', width: 200, color: '#FFFFFF' },
};
