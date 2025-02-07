import { CalendarProvider } from './context/CalendarProvider';
import { TimeTableProvider } from './context/TimeTableProvider';
import { Core } from './Core';
import { CalendarHeader } from './Header/CalendarHeader';
import { wrapperStyle } from './index.css';
import { CalendarTable } from './Table';

export const Calendar = () => (
  <CalendarProvider>
    <Core />
    <TimeTableProvider>
      <div className={wrapperStyle}>
        <CalendarHeader />
        <CalendarTable />
      </div>
    </TimeTableProvider>
  </CalendarProvider>
);
