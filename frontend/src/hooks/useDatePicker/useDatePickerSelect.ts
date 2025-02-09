import { useMemo } from 'react';

import { useHighlightRange } from '@/hooks/useDatePicker/useHighlightRange';
import { formatDateToWeekDates } from '@/utils/date';
import { getDateParts, getDaysInMonth } from '@/utils/date/calendar';
import { generateMonthCalendar } from '@/utils/date/calendar/calendarGeneration';

export const useDatePickerSelect = (props: {
  baseDate?: Date;
  handleDateSelect: (date: Date | null) => void;
  gotoPrevMonth: () => void;
  gotoNextMonth: () => void;
}) => {
  const calendarDates = useMemo(
    () => generateMonthCalendar(props.baseDate ?? new Date()),
    [props.baseDate],
  );
  const { highlightRange, setHighlightRange } = useHighlightRange();

  const onDateCellSelect = (date: Date | null) => {
    if (!date) {
      props.handleDateSelect(null);
      setHighlightRange({ start: null, end: null });
      return;
    }
    const { year, month } = getDateParts(props.baseDate!);
    const daysInMonth = getDaysInMonth(props.baseDate!);
    const startOfCurrentMonth = new Date(year, month, 1);
    const endOfCurrentMonth = new Date(year, month, daysInMonth);
    if (date < startOfCurrentMonth) {
      props.gotoPrevMonth();
    } else if (date > endOfCurrentMonth) {
      props.gotoNextMonth();
    }
    props.handleDateSelect(date);
    const weekDates = formatDateToWeekDates(date);
    const [startOfWeek, endOfWeek] = [weekDates[0], weekDates[weekDates.length - 1]];
    setHighlightRange({ start: startOfWeek, end: endOfWeek });
  };

  return { calendarDates, highlightRange, onDateCellSelect };
};
