import { formatDateToWeek } from '../../../utils/date';
import { useCalendarContext } from '../context/CalendarContext';

export const TimeControl = () => {
  const { 
    selected,
    handleClickToday, 
    handleClickPrevWeek, 
    handleClickNextWeek,
  } = useCalendarContext();
  const { year, month, week  } = formatDateToWeek(selected);
  const weekString = `${year}년 ${month}월 ${week}`;

  return  (
    <div>
      <button onClick={handleClickPrevWeek}>{'<'}</button>
      <span>{weekString}</span>
      <button onClick={handleClickNextWeek}>{'>'}</button>
      {/* TODO: 버튼 컴포넌트 완성 시 교체 */}
      <button onClick={handleClickToday}>오늘</button>
    </div>
  );
};