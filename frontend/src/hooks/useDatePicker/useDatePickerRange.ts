import { useMemo } from 'react';

import type { HighlightRange } from '@/components/DatePicker';
import { isSameDate } from '@/utils/date';
import { generateMonthCalendar } from '@/utils/date/calendar/calendarGeneration';

interface UseDatePickerRangeProps {
  baseDate?: Date;
  highlightRange: HighlightRange;
  setHighlightStart: (date: Date | null) => void;
  setHighlightEnd: (date: Date | null) => void;
}

export const useDatePickerRange = ({
  baseDate,
  highlightRange,
  setHighlightStart,
  setHighlightEnd,
}: UseDatePickerRangeProps) => {
  const calendarDates = useMemo(
    () => generateMonthCalendar(baseDate ?? new Date()),
    [baseDate],
  );

  const onDateCellClick = (date: Date) => {
    const { start, end } = highlightRange;
    if (!start) {
      setHighlightStart(date);
      return;
    }
  
    if (!end) {
      if (date < start) {
        setHighlightStart(date);
      } else if (isSameDate(date, start)) {
        setHighlightStart(null);
      } else {
        setHighlightEnd(date);
      }
      return;
    }
    setHighlightStart(null);
    setHighlightEnd(null);
  };
  return { calendarDates, onDateCellClick };
};
