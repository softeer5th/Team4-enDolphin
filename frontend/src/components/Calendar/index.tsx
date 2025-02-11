import { Flex } from '../Flex';
import { CalendarProvider } from './context/CalendarProvider';
import type { CalendarSharedInfo } from './context/SharedCalendarContext';
import { TimeTableProvider } from './context/TimeTableProvider';
import { Core } from './Core';
import { CalendarHeader } from './Header/CalendarHeader';
import { wrapperStyle } from './index.css';
import { CalendarTable } from './Table';

interface CalendarProps extends CalendarSharedInfo {
  className?: string;
}

export const Calendar = ({ className, ...context }: CalendarProps) => (
  <CalendarProvider outerContext={context}>
    <Flex
      className={className}
      direction='column'
      width='100%'
    >
      <Core />
      <TimeTableProvider>
        <div className={wrapperStyle}>
          <CalendarHeader />
          <CalendarTable />
        </div>
      </TimeTableProvider>
    </Flex>
  </CalendarProvider>
);
