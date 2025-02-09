import { CalendarTableProvider } from './context/CalendarTableProvider';
import { TimeTableProvider } from './context/TimeTableProvider';
import { Core } from './Core';
import { CalendarHeader } from './Header/CalendarHeader';
import { wrapperStyle } from './index.css';
import { CalendarTable } from './Table';

export const Calendar = () => (
  <CalendarTableProvider>
    <Core />
    <TimeTableProvider>
      <div className={wrapperStyle}>
        <CalendarHeader />
        <CalendarTable />
      </div>
    </TimeTableProvider>
  </CalendarTableProvider>
);
