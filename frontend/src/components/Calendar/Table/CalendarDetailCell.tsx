import { isDateInRange } from '@/utils/date';

import { useTimeTableContext } from '../context/TimeTableContext';
import { cellDetailStyle } from './index.css';

export const CalendarDetailCell = ({ date }: { date: Date }) => {
  const { 
    selectedStartTime, 
    selectedEndTime, 
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = useTimeTableContext();
  const selected = isDateInRange(date, selectedStartTime, selectedEndTime);

  return (
    <div
      className={cellDetailStyle({ state: selected ? 'selected' : 'default' })}
      key={date.getTime()}
      onMouseDown={()=>handleMouseDown(date)}
      onMouseEnter={()=>handleMouseEnter(date)}
      onMouseUp={handleMouseUp}
    />
  );
};