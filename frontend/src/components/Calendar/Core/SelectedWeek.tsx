import { formatDateToWeek } from '../../../utils/date';
import { useCalendarContext } from '../context/CalendarContext';
import { sideCellStyle } from '../Table/index.css';
import { weekStyle } from './index.css';
import { WeekCell } from './WeekCell';

export const SelectedWeek = () => {
  const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const { selected } = useCalendarContext();
  const { days } = formatDateToWeek(selected);
  const today = new Date().getDate();

  return (
    <div className={weekStyle}>
      <div className={sideCellStyle({
        time: 'default', 
      })}
      />
      {WEEK.map((day, i) => 
        <WeekCell
          date={days[i]}
          day={day}
          // TODO: today 비교하는 로직 수정
          isToday={days[i] === today}
          key={`${day}${i}`}
          selected={selected.getDate() === days[i]}
        />)}
    </div>
  );
};