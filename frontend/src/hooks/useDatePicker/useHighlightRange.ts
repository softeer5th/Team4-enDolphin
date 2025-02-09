import { useState } from 'react';

export interface HighlightRange {
  start: Date | null;
  end: Date | null;
}

// interface UseHighlightRangeProps {
//   setHighlightRange: React.Dispatch<React.SetStateAction<HighlightRange>>;
// }

export const useHighlightRange = () => {
  const [highlightRange, setHighlightRange] = useState<HighlightRange>({ start: null, end: null });
  const setHighlightStart = (date: Date | null) =>
    setHighlightRange((prev: HighlightRange) => ({ ...prev, start: date }));
  const setHighlightEnd = (date: Date | null) =>
    setHighlightRange(prev => ({ ...prev, end: date }));
  return { highlightRange, setHighlightStart, setHighlightEnd, setHighlightRange };
};
