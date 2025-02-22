import { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import type { CommonDatePickerProps } from '.';
import DatePickerSelectProvider from './context/DatePickerSelectProvider';
import Header from './Header';
import { containerStyle, defaultContainerStyle, defaultWrapperStyle } from './index.css';
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
      <div className={containerStyle} ref={trigger ? ref : undefined}>
        {
          trigger && 
          <div onClick={() => setIsOpen((prev) => !prev)}>
            {trigger}
          </div>
        }
        {isOpen && (
          <div className={defaultWrapperStyle({ trigger: !!trigger  })}>
            <RootContainer className={className ?? defaultContainerStyle}>
              <Header />
              <Table />
            </RootContainer>
          </div>
        )}
      </div>
    </DatePickerSelectProvider>
  );
};

export default DatePickerSelect;
