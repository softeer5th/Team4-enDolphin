import { formatDateToWeek } from '../../../utils/date';
import { Text } from '../../Text';
import { sideCellStyle } from '../Table/index.css';
import { useCalendarContext } from './CalendarContext';
import { weekCellBoxStyle, weekCellStyle, weekStyle } from './index.css';

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
          selected={selected.getDate() === days[i]}
        />)}
    </div>
  );
};

interface WeekCellProps {
  day: string;
  date: number;
  isToday: boolean;
  selected: boolean;
}

const WeekCell = ({ day, date, isToday, selected }: WeekCellProps) => {
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
    <div className={weekCellStyle({ 
      day: dayStyleName(day), 
      state: selected ? 'selected' : 'default', 
    })}
    >
      <Text typo='b3M'>{day}</Text>
      <div className={weekCellBoxStyle({ day: isToday ? 'today' : dayStyleName(day) })}>
        <Text>{date}</Text>
      </div>
    </div>
  );
};