import { CalendarCell } from './CalendarCell';
import { dayStyle } from './index.css';
import type { Time } from './types';

export const CalendarDay = ({ holiday = false }: { holiday?: boolean }) => {
  const TIMES: Time[] = new Array(24).fill(0).map((_, i) => i);
  return (
    <div className={dayStyle}>
      <CalendarCell holiday={holiday} time='all' />
      {TIMES.map((time) => (
        <CalendarCell holiday={holiday} key={time} time={time} />
      ))}
    </div>
  );
};