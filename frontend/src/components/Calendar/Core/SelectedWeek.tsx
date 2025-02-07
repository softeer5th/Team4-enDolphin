import { isSameDate } from '@/utils/date';

import { WEEK } from '../../../constants/date';
import { useCalendarContext } from '../context/CalendarContext';
import { sideCellStyle } from '../Table/index.css';
import { weekStyle } from './index.css';
import { WeekCell } from './WeekCell';

export const SelectedWeek = () => {
  const { selected, dates } = useCalendarContext();
  const today = new Date();

  return (
    <div className={weekStyle}>
      <div className={sideCellStyle({
        time: 'default', 
      })}
      />
      {WEEK.map((day, i) => 
        <WeekCell
          date={dates[i]}
          day={day}
          isToday={isSameDate(dates[i], today)}
          key={day}
          selected={isSameDate(dates[i], selected)}
        />)}
    </div>
  );
};