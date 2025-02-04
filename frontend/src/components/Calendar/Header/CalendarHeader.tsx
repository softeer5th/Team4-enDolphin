import { formatDateToWeekDates, isHoliday, isSameDate } from '@/utils/date';

import { useCalendarContext } from '../context/CalendarContext';
import { CalendarCell } from '../Table/CalendarCell';
import { SideCell } from '../Table/SideCell';
import { containerStyle } from './index.css';

export const CalendarHeader = () => {
  const { selected } = useCalendarContext();
  const dates = formatDateToWeekDates(selected);

  return (
    <div className={containerStyle}>
      <SideCell time='all' />
      {dates.map((date) => 
        <CalendarCell
          holiday={isHoliday(date)}
          key={date.getTime()}
          selected={isSameDate(selected, date)}
          time='all'
        />)}
    </div>
  );
};