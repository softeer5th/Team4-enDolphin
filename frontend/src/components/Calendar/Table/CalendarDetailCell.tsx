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
  const OFFSET = 15 * 60 * 1000;
  const formatEndTime = (endTime: Date | null) => {
    if (!endTime) return null;
    return new Date(endTime.getTime() - OFFSET);
  };
  const selected = isDateInRange(date, selectedStartTime, formatEndTime(selectedEndTime));
  const done = isDateInRange(date, doneStartTime, formatEndTime(doneEndTime));

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
      onMouseUp={()=>handleMouseUp()}
    />
  );
};