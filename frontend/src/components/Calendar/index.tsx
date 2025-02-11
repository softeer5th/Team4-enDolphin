import clsx from '@/utils/clsx';

import { CalendarProvider } from './context/CalendarProvider';
import type { CalendarSharedInfo } from './context/SharedCalendarContext';
import { TimeTableProvider } from './context/TimeTableProvider';
import { Core } from './Core';
import { calendarStyle, wrapperStyle } from './index.css';
import { CalendarTable } from './Table';

interface CalendarProps extends CalendarSharedInfo {
  className?: string;
}

export const Calendar = ({ className, ...context }: CalendarProps) => (
  <CalendarProvider outerContext={context}>
    <div className={clsx(className, calendarStyle)}>
      <Core />
      <TimeTableProvider>
        <div className={wrapperStyle}>
          <CalendarTable />
        </div>
      </TimeTableProvider>
    </div>
  </CalendarProvider>
);
