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

// TODO: 리팩터링
// 현재 커스텀 훅 계층 구조가 복잡하게 꼬여 있음.. 설계 다시 짜봐야 할 듯
const DatePickerSelect = ({ 
  className, selectedDate, trigger, ...props 
}: DatePickerSelectProps) => {
  const [isOpen, setIsOpen] = useState(!trigger);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <DatePickerSelectProvider
      {...props}
      selectedDate={selectedDate}
    >
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
