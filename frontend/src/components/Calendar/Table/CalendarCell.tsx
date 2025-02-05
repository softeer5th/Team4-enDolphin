
import { Flex } from '@/components/Flex';
import { MINUTES, type Time } from '@/constants/date';
import { isWeekend } from '@/utils/date';

import { CalendarDetailCell } from './CalendarDetailCell';
import { cellStyle } from './index.css';

interface CalendarCellProps {
  date: Date;
  time: Time;
  selected: boolean;
}

export const CalendarCell = ({ date, time, selected }: CalendarCellProps) => {
  const formatTimeToStyle = (time: Time) => {
    if (time === 'empty') return 'empty';
    if (time === 'all') return 'all';
    return 'default';
  };

  return (
    <div 
      aria-selected={selected}
      className={cellStyle({ 
        day: isWeekend(date) ? 'holiday' : 'default', 
        time: formatTimeToStyle(time),
        state: selected ? 'selected' : 'default',
      })}
      role='gridcell'
      tabIndex={0}
    >
      {(time === 'empty' || time === 'all') ? null : (
        <Flex direction='column' height='100%'>
          {MINUTES.map((minute) => {
            const newDate = new Date(date);
            newDate.setHours(time);
            newDate.setMinutes(minute);
            return <CalendarDetailCell date={newDate} key={newDate.getTime()} />;
          })}
        </Flex>
      )}
    </div>
  );
};