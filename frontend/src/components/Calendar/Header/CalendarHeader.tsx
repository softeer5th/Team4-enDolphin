import { isSameDate } from '@/utils/date';

import { useCalendarContext } from '../context/CalendarContext';
import { CalendarCell } from '../Table/CalendarCell';
import { SideCell } from '../Table/SideCell';
import { headerStyle } from './index.css';

export const CalendarHeader = () => {
  const { selected, dates } = useCalendarContext();

  return (
    <div className={headerStyle}>
      <SideCell time='all' />
      {dates.map((date) => 
        <CalendarCell
          date={date}
          key={date.getTime()}
          selected={isSameDate(selected, date)}
          time='all'
        />)}
    </div>
  );
};