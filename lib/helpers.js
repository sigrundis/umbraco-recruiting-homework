export const isBrowser = typeof window !== 'undefined';

export const generateDateString = (date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
