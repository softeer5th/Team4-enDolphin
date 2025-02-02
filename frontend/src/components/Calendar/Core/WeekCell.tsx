import { Text } from '../../Text';
import { weekCellBoxStyle, weekCellStyle } from './index.css';

interface WeekCellProps {
  day: string;
  date: number;
  isToday: boolean;
  selected: boolean;
}

export const WeekCell = ({ day, date, isToday, selected }: WeekCellProps) => {
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