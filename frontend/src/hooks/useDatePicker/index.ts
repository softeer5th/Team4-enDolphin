import { useEffect, useState } from 'react';

import { getDaysInMonth } from '@/utils/date/calendar';
import { generateMonthCalendar } from '@/utils/date/calendar/calendarGeneration';

import type { HighlightRange } from './useHighlightRange';
import { useHighlightRange } from './useHighlightRange';
import { useMonthNavigation } from './useMonthNavigation';

export interface UseMonthCalendarReturn {
  baseDate: Date;
  calendarDates: Date[][];
  selectedDate: Date | null;
  highlightRange: HighlightRange;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  handleDateSelect: (date: Date | null) => void;
  setHighlightStart: (date: Date | null) => void;
  setHighlightEnd: (date: Date | null) => void;
}

export const useDatePicker = (): UseMonthCalendarReturn => {
  const { baseDate, goToPrevMonth, goToNextMonth } = useMonthNavigation();
  const [calendarDates, setCalendarDates] = useState<Date[][]>(
    generateMonthCalendar(baseDate),
  );
  const { highlightRange, setHighlightStart, setHighlightEnd } = useHighlightRange();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  useEffect(() => {
    setCalendarDates(generateMonthCalendar(baseDate));
  }, [baseDate, selectedDate, highlightRange]);

  const handleDateSelect = (date: Date | null) => {
    if (!date) {
      setSelectedDate(null);
      return; 
    }
    const currentYear = baseDate.getFullYear();
    const currentMonth = baseDate.getMonth();
    const calendarDates = getDaysInMonth(baseDate);

    const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const endOfCurrentMonth = new Date(currentYear, currentMonth, calendarDates);

    if (date < startOfCurrentMonth) {
      goToPrevMonth();
    } else if (date > endOfCurrentMonth) {
      goToNextMonth();
    }
    setSelectedDate(date);
  };

  return {
    baseDate, calendarDates, selectedDate, highlightRange, 
    goToPrevMonth, goToNextMonth, handleDateSelect, setHighlightStart, setHighlightEnd,
  };
};

export default useDatePicker;