import { type PropsWithChildren, useCallback } from 'react';

import { useDatePickerRange } from '@/hooks/useDatePicker/useDatePickerRange';
import { isSameDate } from '@/utils/date';

import type { DatePickerRangeProps } from '../DatePickerRange';
import { DatePickerContext } from './DatePickerContext';

interface DatePickerRangeProviderProps extends PropsWithChildren, DatePickerRangeProps {}

const DatePickerRangeProvider = ({ 
  children,
  highlightRange,
  ...props
}: DatePickerRangeProviderProps) => {

  const { onDateCellClick } = useDatePickerRange({
    highlightRange,
    ...props,
  });
  
  const isDateSelected = useCallback((date: Date) => {
    const isStartSelected = highlightRange.start ? isSameDate(date, highlightRange.start) : false;
    const isEndSelected = highlightRange.end ? isSameDate(date, highlightRange.end) : false;
    return isStartSelected || isEndSelected;
  }, [highlightRange]);

  return (
    <DatePickerContext.Provider 
      value={{
        calendarType: 'range',
        onDateCellClick,
        isDateSelected,
        selectedDate: null,
        highlightRange,
        ...props,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export default DatePickerRangeProvider;