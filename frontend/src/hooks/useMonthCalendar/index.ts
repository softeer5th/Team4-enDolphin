import { useState } from 'react';

import { getDaysInMonth } from '@/utils/date/calendar';

import { useDaysInMonth } from './useDaysInMonth';
import type { HighlightRange } from './useHighlightRange';
import { useHighlightRange } from './useHighlightRange';
import { useMonthNavigation } from './useMonthNavigation';

export interface UseMonthCalendarReturn {
  currentDate: Date;
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
  const { currentDate, goToPrevMonth, goToNextMonth } = useMonthNavigation();
  
  const calendarDates = useDaysInMonth(currentDate);
  const { highlightRange, setHighlightStart, setHighlightEnd } = useHighlightRange();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);

    const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const endOfCurrentMonth = new Date(currentYear, currentMonth, daysInMonth);

    if (date < startOfCurrentMonth) {
      goToPrevMonth();
    } else if (date > endOfCurrentMonth) {
      goToNextMonth();
    }
    setSelectedDate(date);
  };

  return {
    currentDate,
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