import { Calendar } from '@/components/Calendar';
import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { useSelectTime } from '@/hooks/useSelectTime';

import { calendarStyle } from './index.css';

const CalendarTable = () => {
  const time = useSelectTime();
  return (
    <Calendar.Table context={time} />
  );
};

export const MyCalendar = () => {
  const calendar = useSharedCalendarContext();
  return (
    <Calendar {...calendar} className={calendarStyle}>
      <Calendar.Core />
      <CalendarTable />
    </Calendar>
  );
};