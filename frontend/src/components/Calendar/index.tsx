import  type { PropsWithChildren } from 'react';
import { isValidElement } from 'react';

import clsx from '@/utils/clsx';

import { CalendarProvider } from './context/CalendarProvider';
import type { CalendarSharedInfo } from './context/SharedCalendarContext';
import { Core } from './Core';
import { CalendarHeader } from './Header/CalendarHeader';
import { calendarStyle } from './index.css';
import { CalendarTable } from './Table';

interface CalendarProps extends Partial<CalendarSharedInfo>, PropsWithChildren {
  className?: string;
}

export const Calendar = ({ className, children, ...context }: CalendarProps) => {
  const isTableUsed = (() => {
    if (!Array.isArray(children)) return false;
    return children.some(
      (child) => isValidElement(child) && child.type === CalendarHeader,
    );
  })();
  
  return (
    <CalendarProvider isTableUsed={isTableUsed} outerContext={context}>
      <div className={clsx(className, calendarStyle)}>
        {children}
      </div>
    </CalendarProvider>
  );
};

Calendar.Core = Core;
Calendar.Header = CalendarHeader;
Calendar.Table = CalendarTable;