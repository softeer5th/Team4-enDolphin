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
  const isDateSelected = (date: Date) => 
    props.selectedDate ? isSameDate(date, props.selectedDate) : false;

  return (
    <DatePickerContext.Provider 
      value={{
        ...props,
        calendarType: 'select',
        onDateCellClick,
        isDateSelected,
        highlightRange,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export default DatePickerSelectProvider;