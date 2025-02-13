import { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import { Flex } from '../Flex';
import type { CommonDatePickerProps } from '.';
import DatePickerSelectProvider from './context/DatePickerSelectProvider';
import Header from './Header';
import { defaultContainerStyle, defaultWrapperStyle, triggerWrapperStyle } from './index.css';
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
        {
          trigger && 
          <div
            className={triggerWrapperStyle}
            onClick={() => setIsOpen((prev) => !prev)}
            ref={ref}
          >
            {trigger}
          </div>
        }
        {isOpen && (
          <div className={defaultWrapperStyle({ trigger })}>
            <RootContainer className={className ?? defaultContainerStyle}>
              <Header />
              <Table />
            </RootContainer>
          </div>
        )}
      </Flex>
    </DatePickerSelectProvider>
  );
};

export default DatePickerSelect;
