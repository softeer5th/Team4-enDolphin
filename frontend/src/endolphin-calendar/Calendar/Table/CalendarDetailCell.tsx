import { isDateInRange } from '@/utils/date';

import { useTimeTableContext } from '../context/TimeTableContext';
import { cellDetailStyle } from './index.css';

export const CalendarDetailCell = ({ date }: { date: Date }) => {
  const { 
    selectedStartTime,
    selectedEndTime,
    doneStartTime,
    doneEndTime,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleClick,
  } = useTimeTableContext();
  const selected = isDateInRange(date, selectedStartTime, selectedEndTime);
  const done = isDateInRange(date, doneStartTime, doneEndTime);

  const stateStyle = (() => {
    if (done) return 'done';
    if (selected) return 'selected';
    return 'default';
  })();

  return (
    <div
      className={cellDetailStyle({ state: stateStyle })}
      key={date.getTime()}
      onClick={()=>handleClick(date)}
      onMouseDown={()=>handleMouseDown(date)}
      onMouseEnter={()=>handleMouseEnter(date)}
      onMouseUp={handleMouseUp}
    />
  );
};