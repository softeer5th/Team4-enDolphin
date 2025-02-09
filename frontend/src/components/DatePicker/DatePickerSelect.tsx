import type { ReactNode } from '@tanstack/react-router';
import { useState } from 'react';

import { useDatePickerSelect } from '@/hooks/useDatePicker/useDatePickerSelect';

import type { CommonDatePickerProps } from '.';
import Header from './Header';
import Table from './Table';
import { DatePickerContext } from './Table/context/DatePickerContext';

export interface DatePickerSelectProps extends CommonDatePickerProps {
  trigger?: ReactNode;
  selectedDate: Date | null;
  handleDateSelect: (date: Date | null) => void;
}

const DatePickerSelect = (props: DatePickerSelectProps) => {
  const [isOpen, setIsOpen] = useState(!props.trigger);
  
  // 커스텀 훅을 통해 상태와 날짜 선택 로직 분리
  const { calendarDates, highlightRange, onDateCellSelect } = useDatePickerSelect(props);

  return (
    <DatePickerContext.Provider 
      value={{
        calendarType: 'select',
        calendarDates,
        onDateCellSelect,
        highlightRange,
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
