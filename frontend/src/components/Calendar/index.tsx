import { CalendarDay } from './CalendarDay';
import { CalendarSide } from './CalendarSide';
import { CalendarHeader } from './Header/CalendarHeader';
import { containerStyle, contentsStyle, wrapperStyle } from './index.css';

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