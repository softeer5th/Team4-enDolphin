import { WEEK } from '../../../constants/date';
import { formatDateToWeek, isSameDate } from '../../../utils/date';
import { useCalendarContext } from '../context/CalendarContext';
import { sideCellStyle } from '../Table/index.css';
import { weekStyle } from './index.css';
import { WeekCell } from './WeekCell';

export const SelectedWeek = () => {
  const { selected, setSelected } = useCalendarContext();
  const { dates } = formatDateToWeek(selected);
  const today = new Date();

  const handleClickCell = (date: Date) => {
    setSelected(date);
  };

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
          key={`${day}${i}`}
          onClick={() => handleClickCell(dates[i])}
          selected={isSameDate(dates[i], selected)}
        />)}
    </div>
  );
};