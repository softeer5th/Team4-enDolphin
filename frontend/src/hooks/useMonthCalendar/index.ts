import { useState } from 'react';

import { useDaysInMonth } from './useDaysInMonth';
import type { HighlightRange } from './useHighlightRange';
import { useHighlightRange } from './useHighlightRange';
import { useMonthNavigation } from './useMonthNavigation';

export interface UseMonthCalendarReturn {
  currentMonth: number;
  currentYear: number;
  daysInMonth: Date[][];
  selectedDate: Date | null;
  highlightRange: HighlightRange | null;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  setSelectedDate: (date: Date) => void;
  setHighlightStart: (date: Date) => void;
  setHighlightEnd: (date: Date) => void;
}

export const useMonthCalendar = (): UseMonthCalendarReturn => {
  const { currentMonth, currentYear, goToPrevMonth, goToNextMonth } = useMonthNavigation();
  const daysInMonth = useDaysInMonth(currentYear, currentMonth);
  const { highlightRange, setHighlightStart, setHighlightEnd } = useHighlightRange();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return {
    currentMonth,
    currentYear,
    daysInMonth,
    selectedDate,
    highlightRange,
    goToPrevMonth,
    goToNextMonth,
    setSelectedDate,
    setHighlightStart,
    setHighlightEnd,
  };
};

export default useMonthCalendar;