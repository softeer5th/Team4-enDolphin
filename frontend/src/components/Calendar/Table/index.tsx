
import { useClickOutside } from '@/hooks/useClickOutside';
import { isSameDate } from '@/utils/date';

import { useCalendarContext } from '../context/CalendarContext';
import { useTimeTableContext } from '../context/TimeTableContext';
import { CalendarDay } from './CalendarDay';
import { CalendarSide } from './CalendarSide';
import { containerStyle, contentsStyle } from './index.css';

export const CalendarTable = () => {
  const { selected, dates } = useCalendarContext();
  const { reset } = useTimeTableContext();
  const calendarTableRef = useClickOutside<HTMLDivElement>(reset);

  return(
    <div className={containerStyle}>
      <div className={contentsStyle} ref={calendarTableRef}>
        <CalendarSide />
        {dates.map((date) => 
          <CalendarDay
            date={date}
            key={date.getTime()}
            selected={isSameDate(selected, date)}
          />)}
      </div>
    </div>
  );
};