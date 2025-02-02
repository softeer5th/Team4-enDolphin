
import { formatDateToWeek, isSameDate } from '../../../utils/date';
import { useCalendarContext } from '../context/CalendarContext';
import { CalendarDay } from './CalendarDay';
import { CalendarSide } from './CalendarSide';
import { containerStyle, contentsStyle } from './index.css';

export const CalendarTable = () => {
  // TODO: 아래 두 코드가 묶어서 반복되므로 단일 관리?
  const { selected } = useCalendarContext();
  const { dates } = formatDateToWeek(selected);

  return(
    <div className={containerStyle}>
      <div className={contentsStyle}>
        <CalendarSide />
        {dates.map((date) => 
          <CalendarDay
            holiday={date.getDay() === 0 || date.getDay() === 6}
            key={date.getTime()}
            selected={isSameDate(selected, date)}
          />)}
      </div>
    </div>
  );
};