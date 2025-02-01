import type { Time } from '../types';
import { cellStyle } from './index.css';

interface CalendarCellProps {
  holiday?: boolean;
  time: Time;
}

export const CalendarCell = ({ holiday = false, time }: CalendarCellProps) => {
  if (time === 'empty') {
    return <div className={cellStyle({ day: holiday ? 'holiday' : 'default', time: 'empty' })} />;
  }

  return (
    <div 
      className={cellStyle({ 
        day: holiday ? 'holiday' : 'default', 
        time: time === 'all' ? 'all' : 'default', 
      })}>
    </div>
  );
};