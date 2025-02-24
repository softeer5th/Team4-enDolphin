import type { WEEKDAY } from '@/constants/date';
import { isSameDate } from '@/utils/date';

import { Text } from '../../Text';
import { weekCellBoxStyle, weekCellStyle } from './index.css';

interface WeekCellProps {
  day: WEEKDAY;
  date: Date;
  isToday: boolean;
  selected: Date;
}

export const WeekCell = ({ day, date, isToday, selected }: WeekCellProps) => {
  const dayStyleName = (day: WEEKDAY) => {
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
    <div
      className={weekCellStyle({ 
        day: dayStyleName(day), 
        state: isSameDate(date, selected) ? 'selected' : 'default', 
      })}
      key={`${selected.getTime()} ${day}`}
    >
      <Text typo='b3M'>{day}</Text>
      <div className={weekCellBoxStyle({ day: isToday ? 'today' : dayStyleName(day) })}>
        <Text>{date.getDate()}</Text>
      </div>
    </div>
  );
};