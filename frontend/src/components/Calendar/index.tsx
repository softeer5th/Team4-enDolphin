import { Core } from './Core';
import { CalendarProvider } from './Core/CalendarProvider';
import { CalendarHeader } from './Header/CalendarHeader';
import { wrapperStyle } from './index.css';
import { CalendarTable } from './Table';

export const Calendar = () => (
  <CalendarProvider>
    <Core />
    <div className={wrapperStyle}>
      <CalendarHeader />
      <CalendarTable />
    </div>
  </CalendarProvider>
);
