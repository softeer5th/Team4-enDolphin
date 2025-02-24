
import { formatDateToWeekDates, getDateParts } from '@/utils/date';
import { getDaysInMonth } from '@/utils/date/calendar';

interface UseDatePickerSelectProps {
  baseDate: Date;
  selectedDate: Date | null;
  handleDateSelect: (date: Date) => void;
  gotoPrevMonth: () => void;
  gotoNextMonth: () => void;
}

export const useDatePickerSelect = ({
  baseDate,
  selectedDate,
  handleDateSelect,
  gotoPrevMonth,
  gotoNextMonth,
}: UseDatePickerSelectProps) => {
  const onDateCellClick = (date: Date) => {
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
  };

  const getHighlightRange = () => {
    const weekDates = formatDateToWeekDates(selectedDate);
    if (!weekDates) return { start: null, end: null };
    
    const [startOfWeek, endOfWeek] = [weekDates[0], weekDates[weekDates.length - 1]];
    return { start: startOfWeek, end: endOfWeek };
  };

  return { highlightRange: getHighlightRange(), onDateCellClick };
};
