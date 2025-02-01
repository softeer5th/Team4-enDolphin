import { CalendarDay } from './CalendarDay';
import { CalendarHeader } from './Header/CalendarHeader';
import { containerStyle, contentsStyle, wrapperStyle } from './index.css';
import { CalendarSide } from './Side/CalendarSide';

export const Calendar = () => {
  const DAYS = new Array(7).fill(0).map((_, i) => i);
  return (
    <div className={wrapperStyle}>
      <CalendarHeader />
      <div className={containerStyle}>
        <div className={contentsStyle}>
          <CalendarSide />
          {DAYS.map((day) => <CalendarDay holiday={day === 0 || day === 6} key={day}  />)}
        </div>
      </div>
    </div>
  );
};