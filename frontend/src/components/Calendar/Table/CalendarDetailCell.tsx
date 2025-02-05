import { isDateInRange } from '@/utils/date';

import { useTimeTableContext } from '../context/TimeTableContext';
import { cellDetailStyle } from './index.css';

export const CalendarDetailCell = ({ date }: { date: Date }) => {
  const { 
    selectedStartTime, 
    selectedEndTime, 
    handleSelectStartTime, 
    handleSelectEndTime, 
  } = useTimeTableContext();

  const selected = isDateInRange(date, selectedStartTime, selectedEndTime);
  const handleSelectTime = () => {
    // eslint-disable-next-line no-console
    console.log(date);
    handleSelectStartTime(date);
    handleSelectEndTime(date);
  };

  return (
    <div
      className={cellDetailStyle({ state: selected ? 'selected' : 'default' })}
      key={date.getTime()}
      onClick={handleSelectTime}
    />
  );
};