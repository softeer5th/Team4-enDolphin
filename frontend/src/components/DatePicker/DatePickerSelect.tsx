import { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import { Flex } from '../Flex';
import type { CommonDatePickerProps } from '.';
import DatePickerSelectProvider from './context/DatePickerSelectProvider';
import Header from './Header';
import { defaultContainerStyle, triggerWrapperStyle } from './index.css';
import RootContainer from './RootContainer';
import Table from './Table';

export interface DatePickerSelectProps extends CommonDatePickerProps {
  selectedDate: Date | null;
  handleDateSelect: (date: Date) => void;
}
const DatePickerSelect = ({ 
  className, selectedDate, trigger, ...props 
}: DatePickerSelectProps) => {
  const [isOpen, setIsOpen] = useState(!trigger);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <DatePickerSelectProvider selectedDate={selectedDate} {...props}>
      <Flex direction='column'>
        <div className={triggerWrapperStyle} onClick={() => setIsOpen(true)}>
          {trigger}
          {isOpen && (
            <RootContainer className={className ?? defaultContainerStyle} ref={ref}>
              <Header />
              <Table />
            </RootContainer>
          )}
        </div>
      </Flex>
    </DatePickerSelectProvider>
  );
};

export default DatePickerSelect;
