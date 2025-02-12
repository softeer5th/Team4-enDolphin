import { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import type { CommonDatePickerProps } from '.';
import DatePickerRangeProvider from './context/DatePickerRangeProvider';
import Header from './Header';
import { defaultContainerStyle, defaultWrapperStyle, triggerWrapperStyle } from './index.css';
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
      <div
        className={triggerWrapperStyle}
        onClick={() => setIsOpen((prev) => !prev)}
        ref={ref}
      >
        {trigger}
        {isOpen && (
          <div className={defaultWrapperStyle}>
            <RootContainer className={className ?? defaultContainerStyle}>
              <Header />
              <Table />
            </RootContainer>
          </div>
        )}
      </div>
    </DatePickerRangeProvider>
  );
};

export default DatePickerRange;
