import type { Time } from '../types';
import { CalendarCell } from './CalendarCell';
import { dayStyle } from './index.css';

interface CalendarDayProps {
  holiday?: boolean;
  selected: boolean;
}

export const CalendarDay = ({ holiday = false, selected }: CalendarDayProps) => {
  const TIMES: Time[] = new Array(24).fill(0)
    .map((_, i) => i);
  return (
    <div className={dayStyle}>
      <CalendarCell
        holiday={holiday}
        selected={selected}
        time='all'
      />
      <CalendarCell
        holiday={holiday}
        selected={selected}
        time='empty'
      />
      {TIMES.map((time) => 
        <CalendarCell
          holiday={holiday}
          key={time}
          selected={selected}
          time={time}
        />,
      )}
    </div>
  );
};