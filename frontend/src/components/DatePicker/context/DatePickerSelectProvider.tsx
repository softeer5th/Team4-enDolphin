import { type PropsWithChildren } from 'react';

import { useDatePickerSelect } from '@/hooks/useDatePicker/useDatePickerSelect';
import { isSameDate } from '@/utils/date';

import type { DatePickerSelectProps } from '../DatePickerSelect';
import { DatePickerContext } from './DatePickerContext';

interface DatePickerRangeProviderProps extends PropsWithChildren, DatePickerSelectProps {}

const DatePickerSelectProvider = ({ 
  children,
  ...props
}: DatePickerRangeProviderProps) => {
  const { highlightRange, onDateCellClick } = useDatePickerSelect(props);
  const selectedDate = props.selectedDate;
  const isDateSelected = (date: Date) => selectedDate ? isSameDate(date, selectedDate) : false;

  return (
    <DatePickerContext.Provider 
      value={{
        calendarType: 'select',
        onDateCellClick,
        isDateSelected,
        highlightRange,
        ...props,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export default DatePickerSelectProvider;