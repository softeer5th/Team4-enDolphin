import type { ReactNode } from '@tanstack/react-router';
import { useState } from 'react';

import { useDatePickerSelect } from '@/hooks/useDatePicker/useDatePickerSelect';
import { isSameDate } from '@/utils/date';

import type { CommonDatePickerProps } from '.';
import { DatePickerContext } from './context/DatePickerContext';
import Header from './Header';
import Table from './Table';

export interface DatePickerSelectProps extends CommonDatePickerProps {
  trigger?: ReactNode;
  selectedDate: Date | null;
  handleDateSelect: (date: Date | null) => void;
}

const DatePickerSelect = ({ selectedDate, ...props }: DatePickerSelectProps) => {
  const [isOpen, setIsOpen] = useState(!props.trigger);
  
  const { calendarDates, highlightRange, onDateCellClick } = useDatePickerSelect(props);

  const isDateSelected = (date: Date) => selectedDate ? isSameDate(date, selectedDate) : false;

  return (
    <DatePickerContext.Provider 
      value={{
        calendarType: 'select',
        selectedDate,
        calendarDates,
        onDateCellClick,
        highlightRange,
        isDateSelected,
        ...props,
      }}
    >
      <div onClick={() => setIsOpen(prev => !prev)}>
        {props.trigger}
      </div>
      {isOpen && (
        <div className='containerStyle'>
          <Header />
          <Table />
        </div>
      )}
    </DatePickerContext.Provider>
    
  );
};

export default DatePickerSelect;
