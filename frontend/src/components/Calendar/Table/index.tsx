
import { useClickOutside } from '@/hooks/useClickOutside';
import type { TimeInfo } from '@/hooks/useSelectTime';
import { isSameDate } from '@/utils/date';

import { useCalendarContext } from '../context/CalendarContext';
import { useTimeTableContext } from '../context/TimeTableContext';
import { TimeTableProvider } from '../context/TimeTableProvider';
import { CalendarDay } from './CalendarDay';
import { CalendarSide } from './CalendarSide';
import { containerStyle, contentsStyle } from './index.css';

const CalendarContents = () => {
  const { selected, dates } = useCalendarContext();
  const { reset } = useTimeTableContext();
  const ref = useClickOutside<HTMLDivElement>(reset);

  return (
    <div className={contentsStyle} ref={ref}>
      {dates.map((date) => 
        <CalendarDay
          date={date}
          key={date.getTime()}
          selected={isSameDate(selected, date)}
        />)}
    </div>
  );
};

export const CalendarTable = ({ context }: { context?: TimeInfo }) => (
  <TimeTableProvider outerContext={context}>
    <div className={containerStyle}>
      <CalendarSide />
      <CalendarContents />
    </div>
  </TimeTableProvider>
);