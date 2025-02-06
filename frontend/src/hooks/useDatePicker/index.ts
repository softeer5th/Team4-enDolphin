import { useEffect, useState } from 'react';

import { getDateParts, getDaysInMonth } from '@/utils/date/calendar';
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
  // TODO: calendarDates 외부로 분리
  const [calendarDates, setCalendarDates] = useState<Date[][]>(
    generateMonthCalendar(baseDate),
  );
  const { highlightRange, setHighlightStart, setHighlightEnd } = useHighlightRange();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // TODO: calendarDates 외부로 분리
  useEffect(() => {
    setCalendarDates(generateMonthCalendar(baseDate));
  }, [baseDate, selectedDate, highlightRange]);

  const handleDateSelect = (date: Date | null) => {
    if (!date) {
      setSelectedDate(null);
      return; 
    }
    const { year, month } = getDateParts(baseDate);
    const daysInMonth = getDaysInMonth(baseDate);

    const startOfCurrentMonth = new Date(year, month, 1);
    const endOfCurrentMonth = new Date(year, month, daysInMonth);

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