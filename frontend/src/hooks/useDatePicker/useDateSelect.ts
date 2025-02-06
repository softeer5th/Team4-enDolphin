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
      setHighlightEnd(date);
      return;
    }
    handleDateSelect(null);
    setHighlightStart(null);
    setHighlightEnd(null);
  };

  return selectDate;
};
