import { useCallback, useState } from 'react';

import { useDatePickerRange } from '@/hooks/useDatePicker/useDatePickerRange';
import { isSameDate } from '@/utils/date';

import type { CommonDatePickerProps } from '.';
import { DatePickerContext } from './context/DatePickerContext';
import Header from './Header';
import Table from './Table';
import type { HighlightRange } from './Table/Highlight';

export interface DatePickerRange extends CommonDatePickerProps {
  highlightRange: HighlightRange;
  setHighlightStart: (date: Date | null) => void;
  setHighlightEnd: (date: Date | null) => void;
}

const DatePickerRange = ({ highlightRange, ...props }: DatePickerRange) => {
  const [isOpen, setIsOpen] = useState(!props.trigger);
  const { onDateCellClick } = useDatePickerRange({ 
    highlightRange, ...props, 
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

export default DatePickerRange;
