import { type PropsWithChildren } from 'react';

import { useDatePickerSelect } from '@/hooks/useDatePicker/useDatePickerSelect';
import { isSameDate } from '@/utils/date';

import type { DatePickerSelectProps } from '../DatePickerSelect';
import { DatePickerContext } from './DatePickerContext';

interface DatePickerRangeProviderProps extends PropsWithChildren, DatePickerSelectProps {}

const DatePickerSelectProvider = ({ 
  children,
  selectedDate,
  ...props
}: DatePickerRangeProviderProps) => {

  const { highlightRange, onDateCellClick } = useDatePickerSelect(props);

  const isDateSelected = (date: Date) => selectedDate ? isSameDate(date, selectedDate) : false;

  return (
    <DatePickerContext.Provider 
      value={{
        calendarType: 'select',
        onDateCellClick,
        isDateSelected,
        selectedDate,
        highlightRange,
        ...props,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export default DatePickerSelectProvider;