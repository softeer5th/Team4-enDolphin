import { memo } from 'react';

import { TIMES } from '../../../constants/date';
import { CalendarCell } from './CalendarCell';
import { dayStyle } from './index.css';

interface CalendarDayProps {
  date: Date;
  selected: boolean;
}

export const CalendarDay = memo(({ date, selected }: CalendarDayProps) => (
  <div className={dayStyle}>
    <CalendarCell
      date={date}
      selected={selected}
      time='all'
    />
    <CalendarCell
      date={date}
      selected={selected}
      time='empty'
    />
    {TIMES.map((time) => (
      <CalendarCell
        date={date}
        key={time}
        selected={selected}
        time={time}
      />
    ),
    )}
  </div>
));