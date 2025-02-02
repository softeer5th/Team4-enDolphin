
import type { Time } from '../../../constants/date';
import { cellStyle } from './index.css';

interface CalendarCellProps {
  holiday?: boolean;
  time: Time;
  selected: boolean;
}

export const CalendarCell = ({ holiday = false, time, selected }: CalendarCellProps) => {
  if (time === 'empty') {
    return (
      <div 
        className={cellStyle({ 
          day: holiday ? 'holiday' : 'default', 
          time: 'empty',
          state: selected ? 'selected' : 'default', 
        })}
      />
    );
  }

  return (
    <div 
      className={cellStyle({ 
        day: holiday ? 'holiday' : 'default', 
        time: time === 'all' ? 'all' : 'default', 
        state: selected ? 'selected' : 'default',
      })}
    >
    </div>
  );
};