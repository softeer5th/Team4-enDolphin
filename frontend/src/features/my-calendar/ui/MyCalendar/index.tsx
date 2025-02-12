import { useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { useSelectTime } from '@/hooks/useSelectTime';

import { CalendarCardList } from '../CalendarCadList';
import { SchedulePopover } from '../SchedulePopover';
import { calendarStyle, containerStyle } from './index.css';

// TODO: 자주 쓰이는 타입 정의는 따로 빼기
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const CalendarTable = () => {
  const { handleMouseUp, ...time } = useSelectTime();
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState<DateRange[]>([]);

  const handleMouseUpAddSchedule = ({ startDate, endDate }: DateRange) => {
    setCards([...cards, { startDate, endDate }]);
    setOpen(true);
  };

  return (
    <div className={containerStyle}>
      <SchedulePopover
        isOpen={open}  
        setIsOpen={setOpen}
        type='add'
      />
      <CalendarCardList cards={cards} />
      <Calendar.Table 
        context={{
          handleMouseUp: () => handleMouseUp(handleMouseUpAddSchedule),
          ...time,
        }}
      />
    </div>
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