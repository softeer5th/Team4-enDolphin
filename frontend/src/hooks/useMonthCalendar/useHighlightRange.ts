import { useState } from 'react';

export interface HighlightRange {
  start: Date | null;
  end: Date | null;
}

export const useHighlightRange = () => {
  const [highlightRange, setHighlightRange] = useState<HighlightRange>({ start: null, end: null });
  const setHighlightStart = (date: Date) =>
    setHighlightRange(prev => ({ ...prev, start: date }));
  const setHighlightEnd = (date: Date) =>
    setHighlightRange(prev => ({ ...prev, end: date }));
  return { highlightRange, setHighlightStart, setHighlightEnd };
};
