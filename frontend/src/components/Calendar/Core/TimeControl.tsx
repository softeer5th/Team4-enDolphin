import { useCalendar } from '../../../hooks/useCalendar';
import { formatDateToWeek } from '../../../utils/date';

export const TimeControl = () => {
  const { 
    selected,
    handleClickToday, 
    handleClickPrevWeek, 
    handleClickNextWeek,
    handleChangeWeek, 
  } = useCalendar();
  const { year, month, week, days } = formatDateToWeek(selected);

  return  (
    <div>
      <button onClick={handleClickPrevWeek}>{'<'}</button>
      <input
        onChange={(e) => handleChangeWeek(new Date(e.target.value))}
        type='text'
        value={`${year}년 ${month}월 ${week}`}
      />
      <button onClick={handleClickNextWeek}>{'>'}</button>
      {/* TODO: 버튼 컴포넌트 완성 시 교체 */}
      <button onClick={handleClickToday}>오늘</button>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {days.map((date) => ( <div>{date}</div>))}
      </div>
    </div>
  );
};