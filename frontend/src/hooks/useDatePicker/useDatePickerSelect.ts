import { useMemo } from 'react';

import { useHighlightRange } from '@/hooks/useDatePicker/useHighlightRange';
import { formatDateToWeekDates } from '@/utils/date';
import { getDateParts, getDaysInMonth } from '@/utils/date/calendar';
import { generateMonthCalendar } from '@/utils/date/calendar/calendarGeneration';

interface UseDatePickerSelectProps {
  baseDate?: Date;
  handleDateSelect: (date: Date | null) => void;
  gotoPrevMonth: () => void;
  gotoNextMonth: () => void;
}

export const useDatePickerSelect = ({
  baseDate,
  handleDateSelect,
  gotoPrevMonth,
  gotoNextMonth,
}: UseDatePickerSelectProps) => {
  const calendarDates = useMemo(
    () => generateMonthCalendar(baseDate ?? new Date()),
    [baseDate],
  );
  const { highlightRange, setHighlightRange } = useHighlightRange();

  const onDateCellClick = (date: Date | null) => {
    if (!date) {
      handleDateSelect(null);
      setHighlightRange({ start: null, end: null });
      return;
    }

    const { year, month } = getDateParts(baseDate!);
    const daysInMonth = getDaysInMonth(baseDate!);
    const startOfCurrentMonth = new Date(year, month, 1);
    const endOfCurrentMonth = new Date(year, month, daysInMonth);

    if (date < startOfCurrentMonth) {
      gotoPrevMonth();
    } else if (date > endOfCurrentMonth) {
      gotoNextMonth();
    }
    
    handleDateSelect(date);
    const weekDates = formatDateToWeekDates(date);
    const [startOfWeek, endOfWeek] = [weekDates[0], weekDates[weekDates.length - 1]];
    setHighlightRange({ start: startOfWeek, end: endOfWeek });
  };

  return { calendarDates, highlightRange, onDateCellClick };
};
