
import type { Time } from '../../../constants/date';
import { cellStyle } from './index.css';

interface CalendarCellProps {
  holiday?: boolean;
  time: Time;
  selected: boolean;
}

export const CalendarCell = ({ holiday = false, time, selected }: CalendarCellProps) => {
  const formatTimeToStyle = (time: Time) => {
    if (time === 'empty') return 'empty';
    if (time === 'all') return 'all';
    return 'default';
  };

  return (
    <div 
      aria-selected={selected}
      className={cellStyle({ 
        day: holiday ? 'holiday' : 'default', 
        time: formatTimeToStyle(time),
        state: selected ? 'selected' : 'default',
      })}
      role='gridcell'
      tabIndex={0}
    >
    </div>
  );
};