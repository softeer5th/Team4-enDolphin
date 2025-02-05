import { useState } from 'react';

import { getDaysInMonth } from '@/utils/date/calendar/calendarHelpers';

import { useDaysInMonth } from './useDaysInMonth';
import type { HighlightRange } from './useHighlightRange';
import { useHighlightRange } from './useHighlightRange';
import { useMonthNavigation } from './useMonthNavigation';

export interface UseMonthCalendarReturn {
  currentMonth: number;
  currentYear: number;
  calendarDates: Date[][];
  selectedDate: Date | null;
  highlightRange: HighlightRange | null;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  handleDateSelect: (date: Date) => void;
  setHighlightStart: (date: Date) => void;
  setHighlightEnd: (date: Date) => void;
}

export const useMonthCalendar = (): UseMonthCalendarReturn => {
  const { currentMonth, currentYear, goToPrevMonth, goToNextMonth } = useMonthNavigation();
  const calendarDates = useDaysInMonth(currentYear, currentMonth);
  const { highlightRange, setHighlightStart, setHighlightEnd } = useHighlightRange();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const endOfCurrentMonth = new Date(
      currentYear,
      currentMonth,
      getDaysInMonth(currentYear, currentMonth),
    );
    if (date < startOfCurrentMonth) {
      goToPrevMonth();
    } else if (date > endOfCurrentMonth) {
      goToNextMonth();
    }
    setSelectedDate(date);
  };

  return {
    currentMonth,
    currentYear,
    calendarDates,
    selectedDate,
    highlightRange,
    goToPrevMonth,
    goToNextMonth,
    handleDateSelect,
    setHighlightStart,
    setHighlightEnd,
  };
};

export default useMonthCalendar;