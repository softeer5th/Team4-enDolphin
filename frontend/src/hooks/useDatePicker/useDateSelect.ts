import { DatePickerContext } from '@/components/DatePicker/DatePickerContext';
import { useSafeContext } from '@/hooks/useSafeContext';

export const useDateSelect = (date: Date) => {
  const {
    calendarType,
    handleDateSelect,
    highlightRange,
    setHighlightStart,
    setHighlightEnd,
  } = useSafeContext(DatePickerContext);
  const selectDate = () => {
    if (calendarType === 'select') {
      handleDateSelect(date);
      return;
    }
    if (!highlightRange.start) {
      setHighlightStart(date);
      return;
    }
    if (!highlightRange.end) {
      setHighlightEnd(date);
      return;
    }
    setHighlightStart(null);
    setHighlightEnd(null);
  };

  return selectDate;
};
