
import { useCalendarContext } from '@/endolphin-calendar/context/CalendarContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { isSameDate } from '@/utils/date';

import { useTimeTableContext } from '../context/TimeTableContext';
import { CalendarDay } from './CalendarDay';
import { CalendarSide } from './CalendarSide';
import { containerStyle, contentsStyle } from './index.css';

export const CalendarTable = () => {
  const { selectedDate, selectedWeek } = useCalendarContext();
  const { reset } = useTimeTableContext();
  const calendarTableRef = useClickOutside<HTMLDivElement>(reset);

  return(
    <div className={containerStyle}>
      <div className={contentsStyle} ref={calendarTableRef}>
        <CalendarSide />
        {selectedWeek.map((date) => 
          <CalendarDay
            date={date}
            key={date.getTime()}
            selected={isSameDate(selectedDate, date)}
          />)}
      </div>
    </div>
  );
};