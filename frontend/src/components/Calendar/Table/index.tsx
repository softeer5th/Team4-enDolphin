
import { isSameDate } from '@/utils/date';

import { useCalendarContext } from '../context/CalendarContext';
import { CalendarDay } from './CalendarDay';
import { CalendarSide } from './CalendarSide';
import { containerStyle, contentsStyle } from './index.css';

export const CalendarTable = () => {
  const { selected, dates } = useCalendarContext();

  return(
    <div className={containerStyle}>
      <div className={contentsStyle}>
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