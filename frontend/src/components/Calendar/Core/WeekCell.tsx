import type { MouseEvent } from 'react';

import { Text } from '../../Text';
import { weekCellBoxStyle, weekCellStyle } from './index.css';

interface WeekCellProps {
  day: string;
  date: Date;
  isToday: boolean;
  selected: boolean;
  onClickHandler: (event: MouseEvent<HTMLDivElement>) => void;
}

export const WeekCell = ({ day, date, isToday, selected, onClickHandler }: WeekCellProps) => {

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
    <div
      className={weekCellStyle({ 
        day: dayStyleName(day), 
        state: selected ? 'selected' : 'default', 
      })}
      onClick={onClickHandler}
    >
      <Text typo='b3M'>{day}</Text>
      <div className={weekCellBoxStyle({ day: isToday ? 'today' : dayStyleName(day) })}>
        <Text>{date.getDate()}</Text>
      </div>
    </div>
  );
};