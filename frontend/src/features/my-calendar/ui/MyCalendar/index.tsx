import { useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { useSelectTime } from '@/hooks/useSelectTime';
import { formatDateToWeekRange } from '@/utils/date';
import { formatDateToBarString } from '@/utils/date/format';

import { usePersonalEventsQuery } from '../../api/queries';
import type { PersonalEventResponse } from '../../model';
import { CalendarCardList } from '../CalendarCardList';
import { SchedulePopover } from '../SchedulePopover';
import { calendarStyle, containerStyle } from './index.css';

// TODO: 자주 쓰이는 타입 정의는 따로 빼기
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const CalendarTable = (
  { personalEvents = [] }: { personalEvents?: PersonalEventResponse },
) => {
  const { handleMouseUp, ...time } = useSelectTime();
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState<DateRange[]>([]);

  const handleMouseUpAddSchedule = () => {
    setOpen(true);
  };

  return (
    <div className={containerStyle}>
      <SchedulePopover
        cards={cards}
        endDate={time.doneEndTime}
        isOpen={open}
        setCards={setCards}
        setIsOpen={setOpen}
        startDate={time.doneStartTime}
        type='add'
      />
      <CalendarCardList cards={personalEvents} />
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
  const { startDate, endDate } = formatDateToWeekRange(calendar.selectedDate);

  const { personalEvents, isLoading } = usePersonalEventsQuery({ 
    startDateTime: formatDateToBarString(startDate), 
    endDateTime: formatDateToBarString(endDate),
  });

  return (
    <Calendar {...calendar} className={calendarStyle}>
      <Calendar.Core />
      {isLoading ? <div>로딩중...</div> : <CalendarTable personalEvents={personalEvents} />}
    </Calendar>
  );
};