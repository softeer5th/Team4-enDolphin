import { formatDateToWeek } from '../../../utils/date';
import { Text } from '../../Text';
import { weekCellBoxStyle, weekCellStyle, weekStyle } from '../index.css';
import { sideCellStyle } from '../Table/index.css';
import { useCalendarContext } from './CalendarContext';

export const SelectedWeak = () => {
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
        />)}
    </div>
  );
};

const WeekCell = ({ day, date, isToday }: { day: string; date: number; isToday: boolean }) => {
  const dayStyleName = (day: string) => {
    switch (day) {
      case 'SUN':
        return 'sunday';
      case 'SAT':
        return 'saturday';
      default:
        return 'default';
    }
  };
  return (
    <div className={weekCellStyle({ day: dayStyleName(day) })}>
      <Text typo='b3M'>{day}</Text>
      <div className={weekCellBoxStyle({ day: isToday ? 'today' : dayStyleName(day) })}>
        <Text>{date}</Text>
      </div>
    </div>
  );
};