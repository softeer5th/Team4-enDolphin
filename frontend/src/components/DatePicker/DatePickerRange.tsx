import { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import type { CommonDatePickerProps } from '.';
import DatePickerRangeProvider from './context/DatePickerRangeProvider';
import Header from './Header';
import { defaultContainerStyle, triggerWrapperStyle } from './index.css';
import RootContainer from './RootContainer';
import Table from './Table';
import type { HighlightRange } from './Table/Highlight';

export interface DatePickerRangeProps extends CommonDatePickerProps {
  highlightRange: HighlightRange;
  setHighlightStart: (date: Date | null) => void;
  setHighlightEnd: (date: Date | null) => void;
}

const DatePickerRange = ({ 
  className, trigger, highlightRange, ...props
}: DatePickerRangeProps) => {
  const [isOpen, setIsOpen] = useState(!trigger);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <DatePickerRangeProvider
      highlightRange={highlightRange}
      {...props}
    >
      <div className={triggerWrapperStyle} onClick={() => setIsOpen(true)}>
        {trigger}
        {isOpen && (
          <RootContainer className={className ?? defaultContainerStyle} ref={ref}>
            <Header />
            <Table />
          </RootContainer>
        )}
      </div>
    </DatePickerRangeProvider>
  );
};

export default DatePickerRange;
