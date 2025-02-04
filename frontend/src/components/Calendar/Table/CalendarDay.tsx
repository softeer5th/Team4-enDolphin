import { memo } from 'react';

import { TIMES } from '../../../constants/date';
import { CalendarCell } from './CalendarCell';
import { dayStyle } from './index.css';

interface CalendarDayProps {
  holiday?: boolean;
  selected: boolean;
}

export const CalendarDay = memo(({ holiday = false, selected }: CalendarDayProps) => (
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
));