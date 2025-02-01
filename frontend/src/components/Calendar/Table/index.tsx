import { useCalendarContext } from '../Core/CalendarContext';
import { CalendarDay } from './CalendarDay';
import { CalendarSide } from './CalendarSide';
import { containerStyle, contentsStyle } from './index.css';

export const CalendarTable = () => {
  // TODO: 단순 요일이 아니라 날짜로 변경
  const DAYS = new Array(7).fill(0)
    .map((_, i) => i);

  const { selected } = useCalendarContext();

  return(
    <div className={containerStyle}>
      <div className={contentsStyle}>
        <CalendarSide />
        {DAYS.map((day) => 
          <CalendarDay
            holiday={day === 0 || day === 6}
            key={day}
            selected={selected.getDay() === day}
          />)}
      </div>
    </div>
  );
};