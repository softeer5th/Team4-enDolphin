import { CalendarCell } from '../Day/CalendarCell';
import { SideCell } from '../Side/SideCell';
import { containerStyle } from './index.css';

export const CalendarHeader = () => {
  const DAYS = new Array(7).fill(0).map((_, i) => i);
  return (
    <div className={containerStyle}>
      <SideCell time='all'/>
      {DAYS.map((day) => <CalendarCell holiday={day === 0 || day === 6} key={day} time='all'/>)}
    </div>
  );
};