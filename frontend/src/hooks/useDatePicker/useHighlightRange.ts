import { useState } from 'react';

import type { HighlightRange } from '@/components/DatePicker';

export const useHighlightRange = () => {
  const [highlightRange, setHighlightRange] = useState<HighlightRange>({ start: null, end: null });

  const setHighlightStart = (date: Date | null) =>
    setHighlightRange((prev: HighlightRange) => ({ ...prev, start: date }));

  const setHighlightEnd = (date: Date | null) =>
    setHighlightRange(prev => ({ ...prev, end: date }));
  
  return { highlightRange, setHighlightStart, setHighlightEnd, setHighlightRange };
};
