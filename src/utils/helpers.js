export const uppercaseFormat = (str) => {
  if (typeof str !== 'string') return '';
  return str.toUpperCase();
};

export const numbersOnlyFormat = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[^0-9]/g, '');
};
