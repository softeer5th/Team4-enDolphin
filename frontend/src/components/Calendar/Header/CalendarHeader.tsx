import { useCalendarContext } from '../Core/CalendarContext';
import { CalendarCell } from '../Table/CalendarCell';
import { SideCell } from '../Table/SideCell';
import { containerStyle } from './index.css';

export const CalendarHeader = () => {
  const DAYS = new Array(7).fill(0)
    .map((_, i) => i);

  const { selected } = useCalendarContext();

  return (
    <div className={containerStyle}>
      <SideCell time='all' />
      {DAYS.map((day) => 
        <CalendarCell
          holiday={day === 0 || day === 6}
          key={day}
          selected={selected.getDay() === day}
          time='all'
        />)}
    </div>
  );
};