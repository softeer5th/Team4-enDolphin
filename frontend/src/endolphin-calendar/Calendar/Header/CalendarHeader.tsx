import { isSameDate } from '@/utils/date';

import { useCalendarContext } from '../context/CalendarTableContext';
import { CalendarCell } from '../Table/CalendarCell';
import { SideCell } from '../Table/SideCell';
import { containerStyle } from './index.css';

export const CalendarHeader = () => {
  const { selected, dates } = useCalendarContext();

  return (
    <div className={containerStyle}>
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