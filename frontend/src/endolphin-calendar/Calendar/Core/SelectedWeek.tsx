import { useCalendarContext } from '@/endolphin-calendar/context/CalendarContext';
import { isSameDate } from '@/utils/date';

import { WEEK } from '../../../constants/date';
import { sideCellStyle } from '../Table/index.css';
import { weekStyle } from './index.css';
import { WeekCell } from './WeekCell';

export const SelectedWeek = () => {
  const { selectedDate, selectedWeek } = useCalendarContext();
  const today = new Date();

  return (
    <div className={weekStyle}>
      <div className={sideCellStyle({
        time: 'default', 
      })}
      />
      {WEEK.map((day, i) => 
        <WeekCell
          date={selectedWeek[i]}
          day={day}
          isToday={isSameDate(selectedWeek[i], today)}
          key={day}
          selected={isSameDate(selectedWeek[i], selectedDate)}
        />)}
    </div>
  );
};