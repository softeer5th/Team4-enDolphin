import type { TimeInfo } from '@/hooks/useSelectTime';
import { isSameDate } from '@/utils/date';

import { useCalendarContext } from '../context/CalendarContext';
import { TimeTableProvider } from '../context/TimeTableProvider';
import { CalendarDay } from './CalendarDay';
import { CalendarSide } from './CalendarSide';
import { containerStyle, contentsStyle } from './index.css';

const CalendarContents = () => {
  const { selected, dates } = useCalendarContext();

  return (
    <div className={contentsStyle}>
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