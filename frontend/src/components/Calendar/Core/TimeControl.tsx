import { formatDateToWeek } from '../../../utils/date';
import Button from '../../Button';
import { useCalendarContext } from '../context/CalendarContext';
import { timeControlStyle } from './index.css';

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
    <div className={timeControlStyle}>
      {/* TODO: 캘린더 버튼 컴포넌트 완성 시 교체 */}
      <button onClick={handleClickPrevWeek}>{'<'}</button>
      <span>{weekString}</span>
      <button onClick={handleClickNextWeek}>{'>'}</button>
      <Button
        onClick={handleClickToday}
        style='outline'
        type='secondary'
      >
        오늘
      </Button>
    </div>
  );
};