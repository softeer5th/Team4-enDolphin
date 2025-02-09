
import { getDateParts, getDaysInMonth } from '@/utils/date/calendar';

import type { HighlightRange } from './useHighlightRange';
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

interface UseDatePickerProps {
  baseDate: Date;
  selectedDate?: Date | null;
  highlightRange: HighlightRange;
  handleBaseDateChange: (date: Date | null) => void;
  handleSelectedDateChange: (date: Date | null) => void;
  handleHighlightRangeChange: (range: HighlightRange) => void;
}

export const useDatePicker = ({
  baseDate,
  selectedDate,
  handleSelectedDateChange,
}: UseDatePickerProps) => {
  const { gotoPrevMonth, gotoNextMonth } = useMonthNavigation();
  // TODO: calendarDates 외부로 분리

  const handleDateSelect = (date: Date | null) => {
    if (!date) {
      handleSelectedDateChange(null);
      return;
    }
    const { year, month } = getDateParts(baseDate);
    const daysInMonth = getDaysInMonth(baseDate);

    const startOfCurrentMonth = new Date(year, month, 1);
    const endOfCurrentMonth = new Date(year, month, daysInMonth);

    if (date < startOfCurrentMonth) {
      gotoPrevMonth();
    } else if (date > endOfCurrentMonth) {
      gotoNextMonth();
    }
    handleSelectedDateChange(date);
  };

  return {
    baseDate, selectedDate,
    gotoPrevMonth, gotoNextMonth, handleDateSelect,
  };
};

export default useDatePicker;