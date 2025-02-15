import { useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import { useSelectTime } from '@/hooks/useSelectTime';
import { formatDateToWeekRange } from '@/utils/date';
import { formatDateToBarString, formatDateToDateTimeString } from '@/utils/date/format';

import { usePersonalEventsQuery } from '../../api/queries';
import type { PersonalEventResponse } from '../../model';
import { CalendarCardList } from '../CalendarCardList';
import { SchedulePopover } from '../SchedulePopover';
import { calendarStyle, containerStyle } from './index.css';

const CalendarTable = (
  { personalEvents = [] }: { personalEvents?: PersonalEventResponse[] },
) => {
  const { handleMouseUp, ...time } = useSelectTime();
  const [open, setOpen] = useState(false);

  const handleMouseUpAddSchedule = () => {
    setOpen(true);
  };

  return (
    <div className={containerStyle}>
      {open && 
      <SchedulePopover
        endDateTime={formatDateToDateTimeString(time.doneEndTime)}
        setIsOpen={setOpen}
        startDateTime={formatDateToDateTimeString(time.doneStartTime)}
        type='add'
      />}
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
    startDate: formatDateToBarString(startDate), 
    endDate: formatDateToBarString(endDate),
  });

  return (
    <Calendar {...calendar} className={calendarStyle}>
      <Calendar.Core />
      <Calendar.Header />
      {isLoading ? <div>로딩중...</div> : <CalendarTable personalEvents={personalEvents} />}
    </Calendar>
  );
};