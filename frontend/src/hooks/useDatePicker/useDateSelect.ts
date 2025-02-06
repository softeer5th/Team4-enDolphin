import { DatePickerContext } from '@/components/DatePicker/DatePickerContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import { isSameDate } from '@/utils/date';

export const useDateSelect = (date: Date) => {
  const {
    calendarType,
    handleDateSelect,
    highlightRange,
    setHighlightStart,
    setHighlightEnd,
  } = useSafeContext(DatePickerContext);

  const selectDate = () => {
    handleDateSelect(date);
    if (calendarType === 'select') return;
    if (!highlightRange.start) {
      setHighlightStart(date);
      return;
    }
    if (!highlightRange.end) {
      if (date < highlightRange.start) {
        setHighlightStart(date);
        return;
      }
      if (isSameDate(date, highlightRange.start)) {
        handleDateSelect(null);
        setHighlightStart(null);
        return;
      }
      
      setHighlightEnd(date);
      return;
    }
    handleDateSelect(null);
    setHighlightStart(null);
    setHighlightEnd(null);
  };

  return selectDate;
};
