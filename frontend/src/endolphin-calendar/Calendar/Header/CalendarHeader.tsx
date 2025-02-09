import { useCalendarContext } from '@/endolphin-calendar/context/CalendarContext';
import { isSameDate } from '@/utils/date';

import { CalendarCell } from '../Table/CalendarCell';
import { SideCell } from '../Table/SideCell';
import { containerStyle } from './index.css';

export const CalendarHeader = () => {
  const { selectedDate, selectedWeek } = useCalendarContext();

  return (
    <div className={containerStyle}>
      <SideCell time='all' />
      {selectedWeek.map((date) => 
        <CalendarCell
          date={date}
          key={date.getTime()}
          selected={isSameDate(selectedDate, date)}
          time='all'
        />)}
    </div>
  );
};